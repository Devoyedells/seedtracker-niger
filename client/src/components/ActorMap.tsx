import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import "leaflet/dist/leaflet.css";

// Anonymized actor data for three highlighted states
const actorData = [
  // ─── EKITI STATE (centre ~7.72°N, 5.31°E) ───────────────────────
  { lat: 7.85, lng: 5.22, type: "producer" },
  { lat: 7.72, lng: 5.4, type: "producer" },
  { lat: 7.6, lng: 5.18, type: "input_provider" },
  { lat: 7.95, lng: 5.35, type: "offtaker" },
  { lat: 7.78, lng: 5.28, type: "processor" },
  { lat: 7.55, lng: 5.45, type: "aggregator" },
  { lat: 7.74, lng: 5.32, type: "dealer" },
  { lat: 7.88, lng: 5.15, type: "dealer" },
  { lat: 7.65, lng: 5.5, type: "dealer" },
  { lat: 7.82, lng: 5.42, type: "dealer" },
  { lat: 7.7, lng: 5.2, type: "farmer" },
  { lat: 7.9, lng: 5.28, type: "farmer" },
  { lat: 7.58, lng: 5.38, type: "farmer" },
  { lat: 7.77, lng: 5.48, type: "farmer" },
  { lat: 7.83, lng: 5.08, type: "farmer" },
  { lat: 7.62, lng: 5.25, type: "farmer" },

  // ─── NIGER STATE (centre ~10.0°N, 6.0°E) ────────────────────────
  { lat: 10.32, lng: 5.72, type: "producer" },
  { lat: 9.85, lng: 6.18, type: "producer" },
  { lat: 10.55, lng: 6.3, type: "producer" },
  { lat: 9.7, lng: 5.9, type: "input_provider" },
  { lat: 10.2, lng: 6.5, type: "offtaker" },
  { lat: 10.1, lng: 6.02, type: "processor" },
  { lat: 9.9, lng: 6.42, type: "aggregator" },
  { lat: 10.45, lng: 5.85, type: "processor" },
  { lat: 10.0, lng: 6.0, type: "dealer" },
  { lat: 10.28, lng: 6.22, type: "dealer" },
  { lat: 9.75, lng: 5.8, type: "dealer" },
  { lat: 10.52, lng: 6.1, type: "dealer" },
  { lat: 9.62, lng: 6.35, type: "dealer" },
  { lat: 10.15, lng: 5.95, type: "farmer" },
  { lat: 9.88, lng: 6.12, type: "farmer" },
  { lat: 10.4, lng: 6.4, type: "farmer" },
  { lat: 9.65, lng: 5.75, type: "farmer" },
  { lat: 10.6, lng: 5.98, type: "farmer" },
  { lat: 9.8, lng: 6.55, type: "farmer" },
  { lat: 10.25, lng: 6.65, type: "farmer" },
  { lat: 10.05, lng: 5.62, type: "farmer" },

  // ─── ANAMBRA STATE (centre ~6.22°N, 7.07°E) ─────────────────────
  { lat: 6.35, lng: 6.95, type: "producer" },
  { lat: 6.18, lng: 7.2, type: "producer" },
  { lat: 6.42, lng: 7.12, type: "input_provider" },
  { lat: 6.25, lng: 7.05, type: "processor" },
  { lat: 6.1, lng: 7.18, type: "processor" },
  { lat: 6.38, lng: 6.98, type: "aggregator" },
  { lat: 6.22, lng: 7.1, type: "dealer" },
  { lat: 6.3, lng: 7.0, type: "dealer" },
  { lat: 6.15, lng: 7.25, type: "dealer" },
  { lat: 6.4, lng: 7.18, type: "dealer" },
  { lat: 6.08, lng: 6.95, type: "dealer" },
  { lat: 6.45, lng: 7.3, type: "offtaker" },
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

// Sort actors so they reveal state-by-state (Ekiti, Niger, Anambra)
// and within each state from the center outward
function sortActorsByStateAndDistance(actors: any[]) {
  const STATE_CENTERS: Record<string, { lat: number; lng: number }> = {
    ekiti: { lat: 7.72, lng: 5.31 },
    niger: { lat: 10.0, lng: 6.0 },
    anambra: { lat: 6.22, lng: 7.07 },
  };

  function getStateName(actor: any) {
    const lat = parseFloat(actor.lat);
    const lng = parseFloat(actor.lng);
    if (lat >= 7.45 && lat <= 8.05 && lng >= 4.9 && lng <= 5.65) return "ekiti";
    if (lat >= 8.9 && lat <= 11.2 && lng >= 5.3 && lng <= 7.2) return "niger";
    if (lat >= 5.9 && lat <= 6.6 && lng >= 6.75 && lng <= 7.55)
      return "anambra";
    return "ekiti";
  }

  function dist(a: any, center: { lat: number; lng: number }) {
    return Math.sqrt(
      Math.pow(parseFloat(a.lat) - center.lat, 2) +
        Math.pow(parseFloat(a.lng) - center.lng, 2),
    );
  }

  const ORDER = ["ekiti", "niger", "anambra"];
  const groups: Record<string, any[]> = { ekiti: [], niger: [], anambra: [] };

  actors.forEach((a) => {
    const state = getStateName(a);
    if (groups[state]) groups[state].push(a);
  });

  ORDER.forEach((state) => {
    groups[state].sort(
      (a, b) => dist(a, STATE_CENTERS[state]) - dist(b, STATE_CENTERS[state]),
    );
  });

  return [...groups.ekiti, ...groups.niger, ...groups.anambra];
}

export function ActorMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const featureGroupRef = useRef<any>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const animationTriggeredRef = useRef(false);

  const { data: actors } = useQuery({
    queryKey: ["public-map-actors"],
    queryFn: async () => {
      const res = await api.get("/users/public-data/actors");
      const mapped = res.data.data || [];
      localStorage.setItem("public_map_actors_cache", JSON.stringify(mapped));
      return mapped;
    },
    initialData: () => {
      const cached = localStorage.getItem("public_map_actors_cache");
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          /* ignore */
        }
      }
      return actorData;
    },
  });

  // Initialize map (once)
  useEffect(() => {
    const initMap = async () => {
      const L = (await import("leaflet")).default;
      if (!mapRef.current || leafletMapRef.current) return;

      const mapInstance = L.map(mapRef.current, {
        center: [8.5, 6.5],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      leafletMapRef.current = mapInstance;

      const osmLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "&copy; OpenStreetMap contributors", maxZoom: 19 },
      );
      const satelliteLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { attribution: "Tiles &copy; Esri", maxZoom: 19 },
      );

      osmLayer.addTo(mapInstance);
      L.control
        .layers({ Map: osmLayer, Satellite: satelliteLayer })
        .addTo(mapInstance);

      Object.values(STATE_BOUNDS).forEach(({ bounds, name, color }) => {
        L.rectangle(bounds, {
          color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.07,
          dashArray: "6 4",
        })
          .addTo(mapInstance)
          .bindTooltip(name, {
            permanent: true,
            direction: "center",
            className: "state-label-tooltip",
          });
      });

      featureGroupRef.current = L.featureGroup().addTo(mapInstance);
    };

    initMap();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        animationTriggeredRef.current = false;
      }
    };
  }, []);

  // Animate markers in when scrolled into view
  useEffect(() => {
    if (!isInView || !actors || animationTriggeredRef.current) return;
    if (!leafletMapRef.current || !featureGroupRef.current) return;

    animationTriggeredRef.current = true;

    const runAnimation = async () => {
      const L = (await import("leaflet")).default;
      const fg = featureGroupRef.current;
      fg.clearLayers();

      const sorted = sortActorsByStateAndDistance(actors);

      // Stagger delay: each marker reveals 30ms after the previous one
      const STAGGER_MS = 35;
      const PULSE_DURATION_MS = 600;

      sorted.forEach((actor: any, i: number) => {
        if (!actor.lat || !actor.lng) return;

        setTimeout(() => {
          const actorType = actor.actorType || actor.type || "others";
          const style = ACTOR_STYLES[actorType] || {
            color: "#555",
            fillColor: "#999",
            radius: 6,
            label: "Actor",
          };

          // --- Pulse ring (grows & fades) ---
          const pulse = L.circleMarker([actor.lat, actor.lng], {
            radius: style.radius * 0.5,
            color: style.fillColor,
            fillColor: style.fillColor,
            fillOpacity: 0.6,
            weight: 0,
            className: "map-pulse-ring",
          }).addTo(leafletMapRef.current);

          // Animate pulse using CSS custom animation via SVG path
          const pulsePath = pulse.getElement() as SVGElement | null;
          if (pulsePath) {
            pulsePath.style.transition = `r ${PULSE_DURATION_MS}ms ease-out, opacity ${PULSE_DURATION_MS}ms ease-out`;
            requestAnimationFrame(() => {
              pulsePath.style.opacity = "0";
            });
          }

          // Grow the pulse ring
          let frame = 0;
          const totalFrames = 20;
          const maxRadius = style.radius * 4;
          const grow = () => {
            frame++;
            const progress = frame / totalFrames;
            const r =
              style.radius * 0.5 + (maxRadius - style.radius * 0.5) * progress;
            const opacity = 1 - progress;
            pulse.setRadius(r);
            pulse.setStyle({
              fillOpacity: opacity * 0.5,
              color: style.fillColor,
              fillColor: style.fillColor,
              weight: 0,
            });
            if (frame < totalFrames) {
              requestAnimationFrame(grow);
            } else {
              pulse.remove();
            }
          };
          requestAnimationFrame(grow);

          // --- Main marker (scales in from 0 to full radius) ---
          const circle = L.circleMarker([actor.lat, actor.lng], {
            radius: 0,
            color: style.color,
            fillColor: style.fillColor,
            fillOpacity: 0,
            weight: 1.5,
          }).addTo(fg);

          circle.bindPopup(
            `<div style="font-family:sans-serif;font-size:13px;padding:4px 2px;">
              <strong style="color:${style.color}">${style.label}</strong>
              <br/><span style="color:#555;font-size:12px;">Anonymized location</span>
            </div>`,
            { maxWidth: 220 },
          );

          // Grow from 0 to target radius over ~300ms with a slight overshoot (spring feel)
          let mFrame = 0;
          const mTotalFrames = 18;
          const targetRadius = style.radius;
          const growMarker = () => {
            mFrame++;
            const t = mFrame / mTotalFrames;
            // Ease out with a tiny overshoot using a custom spring-like curve
            const overshoot = 1 + 0.25 * Math.sin(t * Math.PI);
            const r = targetRadius * Math.min(t * overshoot * 1.3, 1.05);
            const opacity = Math.min(t * 2, 1);
            circle.setRadius(r);
            circle.setStyle({ fillOpacity: opacity * 0.85, weight: 1.5 });
            if (mFrame < mTotalFrames) {
              requestAnimationFrame(growMarker);
            } else {
              circle.setRadius(targetRadius);
              circle.setStyle({ fillOpacity: 0.85 });
            }
          };
          requestAnimationFrame(growMarker);
        }, i * STAGGER_MS);
      });
    };

    // Small delay after inView to let the map tile-render first
    setTimeout(runAnimation, 300);
  }, [isInView, actors]);

  // Sync markers if actors data changes after animation (background fetch)
  useEffect(() => {
    if (animationTriggeredRef.current) return; // let animation handle it on first load
    if (!leafletMapRef.current || !featureGroupRef.current || !actors) return;

    const sync = async () => {
      const L = (await import("leaflet")).default;
      const fg = featureGroupRef.current;
      fg.clearLayers();
      actors.forEach((actor: any) => {
        if (!actor.lat || !actor.lng) return;
        const actorType = actor.actorType || actor.type || "others";
        const style = ACTOR_STYLES[actorType] || {
          color: "#555",
          fillColor: "#999",
          radius: 6,
          label: "Actor",
        };
        const circle = L.circleMarker([actor.lat, actor.lng], {
          radius: style.radius,
          color: style.color,
          fillColor: style.fillColor,
          fillOpacity: 0.85,
          weight: 1.5,
        });
        circle.bindPopup(
          `<div style="font-family:sans-serif;font-size:13px;padding:4px 2px;">
            <strong style="color:${style.color}">${style.label}</strong>
            <br/><span style="color:#555;font-size:12px;">Anonymized location</span>
          </div>`,
          { maxWidth: 220 },
        );
        fg.addLayer(circle);
      });
    };
    sync();
  }, [actors]);

  return (
    <section id="map" className="py-24 bg-white" ref={sectionRef}>
      {/* Inject tooltip & pulse CSS */}
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
