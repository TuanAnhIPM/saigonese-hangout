import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    id: "north-south",
    name: "North to South",
    subtitle: "The Full Vietnam",
    description:
      "From Hanoi's ancient streets to Saigon's electric energy, with Hội An's golden lanterns and the terraced hills of Sapa in between. We compose the journey so every transition feels intentional.",
    tags: ["Culture", "Landscapes", "History", "Food"],
    image:
      "https://images.unsplash.com/photo-1780236250852-3971a716cdb7?w=900&h=600&fit=crop&auto=format",
    color: "#2A4A2E",
  },
  {
    id: "hcmc",
    name: "Hồ Chí Minh City",
    subtitle: "Saigon, Alive",
    description:
      "Rooftop bars above a skyline still becoming itself. Pho at 6 am in Bình Thạnh. War history that demands to be understood, not just seen. Let us show you the city the way locals actually live it.",
    tags: ["City life", "Street food", "History", "Art"],
    image:
      "https://images.unsplash.com/photo-1736665813752-f15663994b6f?w=900&h=600&fit=crop&auto=format",
    color: "#C4622D",
  },
  {
    id: "hanoi",
    name: "Hà Nội",
    subtitle: "The Ancient Capital",
    description:
      "Thirty-six guild streets, a thousand-year-old temple, and the best egg coffee you'll ever taste. Hanoi rewards slowness. We build your time here so you feel the rhythm, not just see the sights.",
    tags: ["Heritage", "Coffee culture", "Old Quarter", "Lakes"],
    image:
      "https://images.unsplash.com/photo-1643029891412-92f9a81a8c16?w=900&h=600&fit=crop&auto=format",
    color: "#2A4A2E",
  },
  {
    id: "danang",
    name: "Đà Nẵng",
    subtitle: "Coast & Culture",
    description:
      "A city between Marble Mountain and the Pacific — with Mỹ Khê beach, Hội An a bike ride away, and Ba Nà Hills above the clouds. The perfect base for a family or a couple who want variety.",
    tags: ["Beach", "Family-friendly", "Day trips", "Nature"],
    image:
      "https://images.unsplash.com/photo-1569271532956-3fb81a207115?w=900&h=600&fit=crop&auto=format",
    color: "#C4622D",
  },
];

export function Destinations() {
  const [active, setActive] = useState("north-south");
  const current = destinations.find((d) => d.id === active)!;

  return (
    <section id="destinations" className="py-24 bg-[#F7F4F0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p
            className="text-[#C4622D] tracking-[0.2em] uppercase text-xs mb-4"
          >
            Where we take you
          </p>
          <h2
            className="text-[#1C1A17]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            Four journeys, <br />
            <em>one country.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
          {/* Tab list */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0 lg:overflow-visible">
            {destinations.map((d, i) => (
              <motion.button
                key={d.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => setActive(d.id)}
                className={`text-left px-5 py-4 rounded transition-all flex-shrink-0 lg:flex-shrink border ${
                  active === d.id
                    ? "bg-white border-transparent shadow-sm"
                    : "border-[rgba(44,34,20,0.1)] hover:border-[rgba(44,34,20,0.2)] hover:bg-white"
                }`}
              >
                <p
                  className={`text-xs tracking-widest uppercase mb-1 ${
                    active === d.id ? "text-[#C4622D]" : "text-[#9B9B9B]"
                  }`}
                >
                  {d.subtitle}
                </p>
                <p
                  className={`font-medium ${active === d.id ? "text-[#1C1A17]" : "text-[#6B5E4C]"}`}
                  style={{ fontSize: "1.05rem" }}
                >
                  {d.name}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Content panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="relative h-56 lg:h-64">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 flex gap-2 flex-wrap">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white p-6">
              <h3
                className="text-[#1C1A17] mb-3"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                }}
              >
                {current.name}
              </h3>
              <p
                className="text-[#6B5E4C] leading-[1.8] mb-5"
                style={{ fontSize: "0.9rem" }}
              >
                {current.description}
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 text-[#C4622D] text-sm hover:gap-3 transition-all"
                style={{ fontWeight: 500 }}
              >
                Plan this trip <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
