import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Anonymized actor data for three highlighted states
const actorData = [
  // ─── EKITI STATE (centre ~7.72°N, 5.31°E) ───────────────────────
  // Producers
  { lat: 7.85, lng: 5.22, type: "producer" },
  { lat: 7.72, lng: 5.4, type: "producer" },
  { lat: 7.6, lng: 5.18, type: "producer" },
  { lat: 7.95, lng: 5.35, type: "producer" },
  // Processors
  { lat: 7.78, lng: 5.28, type: "processor" },
  { lat: 7.55, lng: 5.45, type: "processor" },
  // Distributors
  { lat: 7.74, lng: 5.32, type: "distributor" },
  { lat: 7.88, lng: 5.15, type: "distributor" },
  { lat: 7.65, lng: 5.5, type: "distributor" },
  { lat: 7.82, lng: 5.42, type: "distributor" },
  // Farmers
  { lat: 7.7, lng: 5.2, type: "farmer" },
  { lat: 7.9, lng: 5.28, type: "farmer" },
  { lat: 7.58, lng: 5.38, type: "farmer" },
  { lat: 7.77, lng: 5.48, type: "farmer" },
  { lat: 7.83, lng: 5.08, type: "farmer" },
  { lat: 7.62, lng: 5.25, type: "farmer" },

  // ─── NIGER STATE (centre ~10.0°N, 6.0°E) ────────────────────────
  // Producers
  { lat: 10.32, lng: 5.72, type: "producer" },
  { lat: 9.85, lng: 6.18, type: "producer" },
  { lat: 10.55, lng: 6.3, type: "producer" },
  { lat: 9.7, lng: 5.9, type: "producer" },
  { lat: 10.2, lng: 6.5, type: "producer" },
  // Processors
  { lat: 10.1, lng: 6.02, type: "processor" },
  { lat: 9.9, lng: 6.42, type: "processor" },
  { lat: 10.45, lng: 5.85, type: "processor" },
  // Distributors
  { lat: 10.0, lng: 6.0, type: "distributor" },
  { lat: 10.28, lng: 6.22, type: "distributor" },
  { lat: 9.75, lng: 5.8, type: "distributor" },
  { lat: 10.52, lng: 6.1, type: "distributor" },
  { lat: 9.62, lng: 6.35, type: "distributor" },
  // Farmers
  { lat: 10.15, lng: 5.95, type: "farmer" },
  { lat: 9.88, lng: 6.12, type: "farmer" },
  { lat: 10.4, lng: 6.4, type: "farmer" },
  { lat: 9.65, lng: 5.75, type: "farmer" },
  { lat: 10.6, lng: 5.98, type: "farmer" },
  { lat: 9.8, lng: 6.55, type: "farmer" },
  { lat: 10.25, lng: 6.65, type: "farmer" },
  { lat: 10.05, lng: 5.62, type: "farmer" },

  // ─── ANAMBRA STATE (centre ~6.22°N, 7.07°E) ─────────────────────
  // Producers
  { lat: 6.35, lng: 6.95, type: "producer" },
  { lat: 6.18, lng: 7.2, type: "producer" },
  { lat: 6.42, lng: 7.12, type: "producer" },
  // Processors
  { lat: 6.25, lng: 7.05, type: "processor" },
  { lat: 6.1, lng: 7.18, type: "processor" },
  { lat: 6.38, lng: 6.98, type: "processor" },
  // Distributors
  { lat: 6.22, lng: 7.1, type: "distributor" },
  { lat: 6.3, lng: 7.0, type: "distributor" },
  { lat: 6.15, lng: 7.25, type: "distributor" },
  { lat: 6.4, lng: 7.18, type: "distributor" },
  { lat: 6.08, lng: 6.95, type: "distributor" },
  { lat: 6.45, lng: 7.3, type: "distributor" },
  // Farmers
  { lat: 6.28, lng: 7.08, type: "farmer" },
  { lat: 6.12, lng: 7.02, type: "farmer" },
  { lat: 6.48, lng: 7.22, type: "farmer" },
  { lat: 6.2, lng: 7.35, type: "farmer" },
  { lat: 6.35, lng: 6.9, type: "farmer" },
  { lat: 6.05, lng: 7.12, type: "farmer" },
  { lat: 6.42, lng: 7.4, type: "farmer" },
];

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
  distributor: {
    color: "#005C35",
    fillColor: "#16a34a",
    label: "Distributors & Retailers",
    radius: 7,
  },
  farmer: {
    color: "#065f46",
    fillColor: "#059669",
    label: "Farmers & Cooperatives",
    radius: 6,
  },
};

// State highlight polygons (simplified bounding boxes as rectangles)
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

export function ActorMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
        scrollWheelZoom: false,
        attributionControl: true,
      });

      leafletMapRef.current = mapInstance;

      // Tile layer — light/neutral Carto style
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        },
      ).addTo(mapInstance);

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

      // Add anonymized actor markers
      actorData.forEach((actor) => {
        const style = ACTOR_STYLES[actor.type];
        const circle = L.circleMarker([actor.lat, actor.lng], {
          radius: style.radius,
          color: style.color,
          fillColor: style.fillColor,
          fillOpacity: 0.85,
          weight: 1.5,
        }).addTo(mapInstance);

        circle.bindPopup(
          `<div style="font-family:sans-serif;font-size:13px;padding:4px 2px;">
            <strong style="color:${style.color}">${style.label}</strong>
            <br/><span style="color:#555;font-size:12px;">Anonymized actor — location approximate</span>
          </div>`,
          { maxWidth: 220 },
        );
      });
    };

    initMap();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <section id="map" className="py-24 bg-white" ref={sectionRef}>
      {/* Inject tooltip CSS */}
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

      <div className="section-px">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#004225]/10 px-4 py-2 rounded-full text-[#004225] mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">
              Geospatial Actor Mapping
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Value Chain Actors by State
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Anonymized map of registered actors across Ekiti, Niger and Anambra
            States <br /> Explore actor density and distribution by type
          </p>
        </motion.div>
      </div>

      {/* Full-bleed map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="overflow-hidden shadow-xl border-y border-gray-200"
      >
        {/* Map container */}
        <div ref={mapRef} style={{ height: "520px", width: "100%" }} />

        {/* Legend bar below map */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex flex-wrap items-center gap-6">
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
              <span className="text-sm text-gray-700">{val.label}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <span
              className="inline-block w-6 h-3 rounded border-2 border-dashed border-[#004225]"
              style={{ backgroundColor: "rgba(0,66,37,0.07)" }}
            />
            <span className="text-sm text-gray-500">
              State boundary (highlighted)
            </span>
          </div>
        </div>
      </motion.div>

      <div className="section-px">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-center text-sm text-gray-400"
        >
          Actor locations are anonymized and approximate for privacy. Zoom in to
          explore clusters.
        </motion.p>
      </div>
    </section>
  );
}
