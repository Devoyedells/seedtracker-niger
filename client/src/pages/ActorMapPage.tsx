import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Map as MapIcon, Loader2 } from "lucide-react";
import "leaflet/dist/leaflet.css";
import api from "@/services/api";
import { User } from "@/context/AuthContext";

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

export default function ActorMapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const featureGroupRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const [selectedState, setSelectedState] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

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

    // Using simple L.circleMarker avoids React component overhead (massive performance gain for many markers)
    import("leaflet").then((L) => {
      // Clear previous feature group if exists
      if (featureGroupRef.current) {
        leafletMapRef.current.removeLayer(featureGroupRef.current);
      }

      const featureGroup = L.featureGroup();
      featureGroupRef.current = featureGroup;

      let addedCount = 0;

      actors.forEach((actor) => {
        if (!actor.lat || !actor.lng) return;

        // Filtering Logic
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

      // Auto-fit bounds if we have actors (re-fit when filters change)
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
      `}</style>

      {/* Header & Filters */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <MapIcon className="w-6 h-6 text-brand-green" /> Actor Map
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Geospatial visualization of all registered value chain actors.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
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
    </div>
  );
}
