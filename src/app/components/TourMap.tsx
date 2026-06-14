import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, X } from "lucide-react";

// ── Tour spots ────────────────────────────────────────────────────
const SPOTS = [
  // Street Food
  { id: "f1", name: "Bánh Mì Huynh Hoa", desc: "Saigon's most legendary bánh mì — queue is worth it.", lat: 10.7765, lng: 106.6981, cat: "food", emoji: "🥖" },
  { id: "f2", name: "Bến Thành Market", desc: "Iconic covered market & street food hub since 1914.", lat: 10.7719, lng: 106.6985, cat: "food", emoji: "🏪" },
  { id: "f3", name: "Hẻm Bún Bò Huế", desc: "Hidden alley famous for the city's best spicy noodle soup.", lat: 10.7748, lng: 106.7022, cat: "food", emoji: "🍜" },
  { id: "f4", name: "Bánh Xèo 46A", desc: "Crispy sizzling pancakes in a packed local D3 spot.", lat: 10.7798, lng: 106.6935, cat: "food", emoji: "🥞" },
  { id: "f5", name: "Cơm Tấm Bà Ghẻ", desc: "Broken rice — Saigon's classic comfort meal, done right.", lat: 10.7683, lng: 106.6961, cat: "food", emoji: "🍚" },
  // Coffee
  { id: "c1", name: "The Workshop Coffee", desc: "Specialty beans, industrial vibes — the city's creative hub.", lat: 10.7757, lng: 106.7011, cat: "coffee", emoji: "☕" },
  { id: "c2", name: "Café Apartments (38 NHuệ)", desc: "Nine floors of different cafés in a converted residential block.", lat: 10.7751, lng: 106.7038, cat: "coffee", emoji: "🏢" },
  { id: "c3", name: "Thinker & Dreamer", desc: "Leafy rooftop café tucked in the D1 old quarter.", lat: 10.7773, lng: 106.6944, cat: "coffee", emoji: "🌿" },
  { id: "c4", name: "Cà Phê Trứng Saigon", desc: "Vietnamese egg coffee — rich, creamy, unlike anything else.", lat: 10.7742, lng: 106.7003, cat: "coffee", emoji: "🥚" },
  // History
  { id: "h1", name: "War Remnants Museum", desc: "The most moving museum in Vietnam. Essential, not optional.", lat: 10.7793, lng: 106.6919, cat: "history", emoji: "🏛️" },
  { id: "h2", name: "Reunification Palace", desc: "The room where South Vietnam surrendered on April 30, 1975.", lat: 10.7769, lng: 106.6959, cat: "history", emoji: "🏯" },
  { id: "h3", name: "Notre-Dame Cathedral", desc: "All-brick French colonial cathedral built 1880, no local materials.", lat: 10.7797, lng: 106.6990, cat: "history", emoji: "⛪" },
  { id: "h4", name: "Central Post Office", desc: "Gustave Eiffel-designed masterpiece — still operating today.", lat: 10.7796, lng: 106.6998, cat: "history", emoji: "📮" },
  // Nightlife
  { id: "n1", name: "Bui Vien Walking St.", desc: "Saigon's legendary backpacker strip — loud, lit, and alive.", lat: 10.7671, lng: 106.6904, cat: "night", emoji: "🌃" },
  { id: "n2", name: "Rooftop Bar Mile", desc: "Chill1 → Saigon Saigon → Shri — the rooftop cocktail trail.", lat: 10.7729, lng: 106.7007, cat: "night", emoji: "🍹" },
  { id: "n3", name: "District 4 Late Night", desc: "Where locals eat at midnight — seafood, beer, no tourists.", lat: 10.7634, lng: 106.7009, cat: "night", emoji: "🌙" },
];

const CATS = [
  { id: "all",     label: "All Spots",   color: "#2A4A2E", bg: "#2A4A2E" },
  { id: "food",    label: "Street Food", color: "#C4622D", bg: "#C4622D" },
  { id: "coffee",  label: "Coffee",      color: "#6B5E4C", bg: "#6B5E4C" },
  { id: "history", label: "History",     color: "#4A6FA5", bg: "#4A6FA5" },
  { id: "night",   label: "Night Life",  color: "#7B3FA8", bg: "#7B3FA8" },
];

const CAT_COLOR: Record<string, string> = {
  food: "#C4622D",
  coffee: "#6B5E4C",
  history: "#4A6FA5",
  night: "#7B3FA8",
};

// ── Custom marker icons ───────────────────────────────────────────
function makeMarker(emoji: string, color: string, selected: boolean) {
  const size = selected ? 44 : 36;
  return new L.DivIcon({
    html: `<div style="
      display:flex;align-items:center;justify-content:center;
      width:${size}px;height:${size}px;
      background:${color};border-radius:50%;
      border:2.5px solid white;
      box-shadow:${selected ? "0 4px 16px rgba(0,0,0,0.35)" : "0 2px 8px rgba(0,0,0,0.22)"};
      cursor:pointer;font-size:${selected ? 20 : 16}px;
      transform:translate(-50%,-50%) ${selected ? "scale(1.12)" : "scale(1)"};
      transition:transform 0.2s;
    ">${emoji}</div>`,
    className: "",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

// ── Auto-fit map bounds ───────────────────────────────────────────
function BoundsController({ spots }: { spots: typeof SPOTS }) {
  const map = useMap();
  useEffect(() => {
    if (spots.length === 0) { map.setView([10.775, 106.699], 14); return; }
    const lats = spots.map(s => s.lat);
    const lngs = spots.map(s => s.lng);
    map.fitBounds(
      [[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]],
      { padding: [56, 56], maxZoom: 15 },
    );
  }, [spots, map]);
  return null;
}

export function TourMap() {
  const [activecat, setActivecat] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => activecat === "all" ? SPOTS : SPOTS.filter(s => s.cat === activecat),
    [activecat],
  );

  const selected = selectedId ? SPOTS.find(s => s.id === selectedId) : null;

  return (
    <section id="map" className="py-24 bg-[#FBF7F0]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="text-[#C4622D] tracking-[0.2em] uppercase text-xs mb-3 font-medium">
            Where the magic happens
          </p>
          <h2
            className="text-[#1C1A17] mb-4"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            Explore Saigon <br />
            <em style={{ color: "#C4622D" }}>with our local team</em>
          </h2>
          <p className="text-[#6B5E4C] text-sm max-w-lg leading-relaxed">
            Sixteen handpicked spots — from hidden morning alleys to rooftop bars. Tap a pin to learn more.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATS.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActivecat(cat.id); setSelectedId(null); }}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={
                activecat === cat.id
                  ? { background: cat.bg, color: "#fff", boxShadow: `0 2px 10px ${cat.bg}44` }
                  : { background: "#F0E9DF", color: "#6B5E4C" }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Map + sidebar layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E8DFD4]"
          style={{ height: "520px" }}
        >
          {/* Map */}
          <MapContainer
            center={[10.775, 106.699]}
            zoom={14}
            className="w-full h-full"
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <BoundsController spots={filtered} />
            {filtered.map(spot => (
              <Marker
                key={spot.id}
                position={[spot.lat, spot.lng]}
                icon={makeMarker(spot.emoji, CAT_COLOR[spot.cat], spot.id === selectedId)}
                zIndexOffset={spot.id === selectedId ? 1000 : 0}
                eventHandlers={{ click: () => setSelectedId(id => id === spot.id ? null : spot.id) }}
              >
                <Popup
                  offset={[0, -6]}
                  closeButton={false}
                  className="vho-popup"
                >
                  <div style={{ minWidth: 190 }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ fontSize: 18 }}>{spot.emoji}</span>
                      <p style={{ fontWeight: 700, fontSize: 13, color: "#1C1A17" }}>{spot.name}</p>
                    </div>
                    <p style={{ fontSize: 11.5, color: "#6B5E4C", lineHeight: 1.5 }}>{spot.desc}</p>
                    <div
                      style={{
                        display: "inline-block",
                        marginTop: 8,
                        padding: "2px 10px",
                        borderRadius: 99,
                        fontSize: 10,
                        fontWeight: 600,
                        background: CAT_COLOR[spot.cat] + "18",
                        color: CAT_COLOR[spot.cat],
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {CATS.find(c => c.id === spot.cat)?.label}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Spot count badge */}
          <div
            className="absolute top-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow text-xs font-medium text-[#2A4A2E]"
          >
            <MapPin size={11} className="inline mr-1 text-[#C4622D]" />
            {filtered.length} spots in Saigon
          </div>

          {/* Popup CSS */}
          <style>{`
            .vho-popup .leaflet-popup-content-wrapper {
              border-radius: 14px;
              box-shadow: 0 8px 28px rgba(0,0,0,0.16);
              padding: 0;
              border: none;
            }
            .vho-popup .leaflet-popup-content {
              margin: 14px 16px;
            }
            .vho-popup .leaflet-popup-tip-container { display: none; }
            .leaflet-control-zoom {
              border: none !important;
              box-shadow: 0 2px 10px rgba(0,0,0,0.12) !important;
            }
            .leaflet-control-zoom a {
              border-radius: 8px !important;
              color: #1C1A17 !important;
            }
          `}</style>
        </motion.div>

        {/* Spot grid (mobile-friendly list below map) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((spot, i) => (
            <motion.button
              key={spot.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              onClick={() => setSelectedId(id => id === spot.id ? null : spot.id)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all"
              style={
                selectedId === spot.id
                  ? { background: CAT_COLOR[spot.cat] + "18", border: `1.5px solid ${CAT_COLOR[spot.cat]}55` }
                  : { background: "#F0E9DF", border: "1.5px solid transparent" }
              }
            >
              <span className="text-xl flex-shrink-0">{spot.emoji}</span>
              <span
                className="text-xs font-medium text-[#1C1A17] leading-snug"
              >
                {spot.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#2A4A2E]"
        >
          <div>
            <p
              className="text-white font-medium mb-1"
              style={{ fontSize: "1.1rem" }}
            >
              Want to visit all of these?
            </p>
            <p className="text-white/60 text-sm">
              We'll plan the perfect route — no guesswork, no tourist traps.
            </p>
          </div>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="flex-shrink-0 bg-[#C4622D] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#A84E22] hover:shadow-lg hover:shadow-[#C4622D]/25 active:scale-95 transition-all"
          >
            Plan my Saigon trip
          </button>
        </motion.div>
      </div>
    </section>
  );
}
