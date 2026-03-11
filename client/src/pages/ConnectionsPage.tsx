import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Map as MapIcon, Loader2, ScanLine, X } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import "leaflet/dist/leaflet.css";
import api from "@/services/api";
import { User } from "@/context/AuthContext";
import ActorProfileModal from "@/components/ActorProfileModal";

const ACTOR_STYLES: Record<
  string,
  { color: string; fillColor: string; label: string; radius: number }
> = {
  producer: {
    color: "#1d4ed8",
    fillColor: "#3b82f6",
    label: "Seed Producers",
    radius: 7,
  },
  processor: {
    color: "#7e22ce",
    fillColor: "#a855f7",
    label: "Processors & Warehouses",
    radius: 7,
  },
  dealer: {
    color: "#005C35",
    fillColor: "#16a34a",
    label: "Dealers & Retailers",
    radius: 7,
  },
  farmer: {
    color: "#065f46",
    fillColor: "#059669",
    label: "Farmers & Cooperatives",
    radius: 6,
  },
  input_provider: {
    color: "#047857",
    fillColor: "#10b981",
    label: "Input Providers",
    radius: 7,
  },
  aggregator: {
    color: "#6b21a8",
    fillColor: "#a855f7",
    label: "Aggregators",
    radius: 7,
  },
  offtaker: {
    color: "#b91c1c",
    fillColor: "#ef4444",
    label: "Offtakers",
    radius: 7,
  },
  others: {
    color: "#4b5563",
    fillColor: "#9ca3af",
    label: "Other",
    radius: 6,
  },
};

const STATE_BOUNDS: Record<
  string,
  { bounds: [[number, number], [number, number]]; name: string; color: string }
> = {
  ekiti: {
    bounds: [
      [7.45, 4.9],
      [8.05, 5.65],
    ],
    name: "Ekiti State",
    color: "#004225",
  },
  niger: {
    bounds: [
      [8.9, 5.3],
      [11.2, 7.2],
    ],
    name: "Niger State",
    color: "#004225",
  },
  anambra: {
    bounds: [
      [5.9, 6.75],
      [6.6, 7.55],
    ],
    name: "Anambra State",
    color: "#004225",
  },
};

export default function ConnectionsPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const featureGroupRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const [selectedState, setSelectedState] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Scanner state
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannedActorId, setScannedActorId] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Fetch a very large limit so we can plot all actors on the map in one go
  const { data: response, isLoading } = useQuery({
    queryKey: ["actors-map-data"],
    queryFn: async () => {
      const res = await api.get("/users/map-data");
      return res.data;
    },
  });

  const actors: User[] = response?.data || [];

  useEffect(() => {
    let L: any;
    let mapInstance: any;

    const initMap = async () => {
      L = (await import("leaflet")).default;

      if (!mapRef.current || leafletMapRef.current) return;

      mapInstance = L.map(mapRef.current, {
        center: [8.5, 6.5],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true,
      });

      leafletMapRef.current = mapInstance;

      // Base Layers
      const osmLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        },
      );

      const satelliteLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          maxZoom: 19,
        },
      );

      // Default to OSM
      osmLayer.addTo(mapInstance);

      // Layer control
      const baseMaps = {
        Map: osmLayer,
        Satellite: satelliteLayer,
      };

      L.control.layers(baseMaps).addTo(mapInstance);

      // Draw state highlight rectangles
      Object.values(STATE_BOUNDS).forEach(({ bounds, name, color }) => {
        const rect = L.rectangle(bounds, {
          color: color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.07,
          dashArray: "6 4",
        }).addTo(mapInstance);

        rect.bindTooltip(name, {
          permanent: true,
          direction: "center",
          className: "state-label-tooltip",
        });
      });

      setMapReady(true);
    };

    initMap();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Sync actors onto the initialized map
  useEffect(() => {
    if (!mapReady || !leafletMapRef.current || !actors.length) return;

    import("leaflet").then((L) => {
      if (featureGroupRef.current) {
        leafletMapRef.current.removeLayer(featureGroupRef.current);
      }

      const featureGroup = L.featureGroup();
      featureGroupRef.current = featureGroup;

      let addedCount = 0;

      actors.forEach((actor) => {
        if (!actor.lat || !actor.lng) return;

        if (
          selectedState !== "all" &&
          actor.registrationState !== selectedState
        )
          return;

        const actorType = actor.actorType || "others";
        if (selectedType !== "all" && actorType !== selectedType) return;

        addedCount++;
        const style = ACTOR_STYLES[actorType] || ACTOR_STYLES.others;

        const circle = L.default
          .circleMarker([parseFloat(actor.lat), parseFloat(actor.lng)], {
            radius: style.radius,
            color: style.color,
            fillColor: style.fillColor,
            fillOpacity: 0.85,
            weight: 1.5,
          })
          .addTo(featureGroup);

        circle.bindPopup(
          `<div style="font-family:sans-serif;font-size:13px;padding:4px 2px;">
            <strong style="color:${style.color}; font-size:14px;">${actor.fullName}</strong>
            <br/>
            <span style="display:inline-block; margin-top:4px; font-weight:600; color:#555;">${style.label}</span>
            <br/>
            <span style="color:#777;font-size:12px;">State: ${actor.registrationState}</span>
          </div>`,
          { maxWidth: 220 },
        );
      });

      featureGroup.addTo(leafletMapRef.current);

      if (addedCount > 0) {
        try {
          leafletMapRef.current.fitBounds(featureGroup.getBounds(), {
            padding: [20, 20],
            maxZoom: 12,
          });
        } catch (e) {
          /* ignore empty bounds */
        }
      }
    });
  }, [actors, mapReady, selectedState, selectedType]);

  // ── QR Scanner Logic ─────────────────────────────────────────────────
  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch {
        /* already stopped */
      }
      scannerRef.current.clear();
      scannerRef.current = null;
    }
  }, []);

  const openScanner = () => {
    setScannerOpen(true);
  };

  const closeScanner = useCallback(async () => {
    await stopScanner();
    setScannerOpen(false);
  }, [stopScanner]);

  // Start camera when scanner dialog opens
  useEffect(() => {
    if (!scannerOpen) return;

    let cancelled = false;

    const startCamera = async () => {
      // Small delay to ensure the DOM element is mounted
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          async (decodedText) => {
            // Validate the scanned text looks like an actorId (e.g. EK-0001)
            const actorIdPattern = /^[A-Z]{2}-\d{4,}$/;
            if (actorIdPattern.test(decodedText)) {
              await stopScanner();
              setScannerOpen(false);
              setScannedActorId(decodedText);
            }
          },
          () => {
            /* ignore scan failures */
          },
        );
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();

    return () => {
      cancelled = true;
      stopScanner();
    };
  }, [scannerOpen, stopScanner]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      {/* Inject tooltip CSS strictly for this component */}
      <style>{`
        .state-label-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          color: #004225 !important;
          letter-spacing: 0.05em !important;
          text-transform: uppercase !important;
          padding: 0 !important;
        }
        .state-label-tooltip::before { display: none !important; }
        .leaflet-popup-content-wrapper {
          border-radius: 10px !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
        }
        #qr-reader video {
          border-radius: 16px !important;
        }
      `}</style>

      {/* Header & Filters */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <MapIcon className="w-6 h-6 text-brand-green" /> Connections
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Geospatial visualization of all registered value chain actors.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Scan QR Button */}
          <button
            onClick={openScanner}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-green text-white font-bold rounded-xl hover:bg-[#00301b] transition-colors shadow-lg shadow-brand-green/20 active:scale-95"
          >
            <ScanLine className="w-4 h-4" />
            Scan QR
          </button>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full sm:w-auto bg-gray-50 border border-gray-200 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          >
            <option value="all">Every State</option>
            <option value="Ekiti">Ekiti State</option>
            <option value="Niger">Niger State</option>
            <option value="Anambra">Anambra State</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-auto bg-gray-50 border border-gray-200 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          >
            <option value="all">All Actor Types</option>
            {Object.entries(ACTOR_STYLES).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex-1 relative min-h-[500px] flex flex-col">
        {isLoading && !mapReady && (
          <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
          </div>
        )}

        <div ref={mapRef} className="flex-1 w-full" />

        {/* Legend */}
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex flex-wrap items-center gap-5 sm:gap-6 flex-shrink-0 z-10 relative">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mr-2">
            Legend
          </span>
          {Object.entries(ACTOR_STYLES).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full border-2"
                style={{
                  backgroundColor: val.fillColor,
                  borderColor: val.color,
                }}
              />
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {val.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── QR Scanner Modal ───────────────────────────────────── */}
      {scannerOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={closeScanner}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeScanner}
              className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-lg font-black text-gray-900 mb-1">
              Scan QR Code
            </h2>
            <p className="text-sm text-gray-500 font-medium mb-5">
              Point your camera at another actor's QR code.
            </p>

            <div
              id="qr-reader"
              className="w-full rounded-2xl overflow-hidden"
            />
          </div>
        </div>
      )}

      {/* ── Actor Profile Modal ────────────────────────────────── */}
      {scannedActorId && (
        <ActorProfileModal
          actorId={scannedActorId}
          onClose={() => setScannedActorId(null)}
        />
      )}
    </div>
  );
}
