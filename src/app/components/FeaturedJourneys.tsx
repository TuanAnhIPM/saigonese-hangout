import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const journeys = [
  {
    id: "highlights",
    title: "The Vietnam Highlights",
    tagline: "Hanoi · Hạ Long · Hội An · Hồ Chí Minh",
    duration: "14 days",
    priceFrom: "From $1,850",
    image: "https://images.unsplash.com/photo-1643029891412-92f9a81a8c16?w=1200&h=1600&fit=crop&auto=format",
    badge: "Most popular",
  },
  {
    id: "hoi-an",
    title: "Hội An & Da Nang",
    tagline: "Ancient town · Marble Mountain · Mỹ Khê Beach",
    duration: "7 days",
    priceFrom: "From $920",
    image: "https://images.unsplash.com/photo-1576510636306-f3c0ac68c737?w=900&h=600&fit=crop&auto=format",
    badge: null,
  },
  {
    id: "mekong",
    title: "Saigon & the Mekong",
    tagline: "Hồ Chí Minh City · Cần Thơ · Floating markets",
    duration: "5 days",
    priceFrom: "From $650",
    image: "https://images.unsplash.com/photo-1543411789-1a67a2ac05c6?w=900&h=600&fit=crop&auto=format",
    badge: "Family favourite",
  },
  {
    id: "north",
    title: "Northern Vietnam",
    tagline: "Hà Nội · Sapa · Bắc Hà market",
    duration: "9 days",
    priceFrom: "From $1,100",
    image: "https://images.unsplash.com/photo-1780236250852-3971a716cdb7?w=900&h=600&fit=crop&auto=format",
    badge: null,
  },
];

function JourneyCard({
  journey,
  className = "",
  imageClass = "absolute inset-0 w-full h-full object-cover",
}: {
  journey: typeof journeys[0];
  className?: string;
  imageClass?: string;
}) {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      onClick={scrollToContact}
      className={`group relative overflow-hidden cursor-pointer ${className}`}
    >
      {/* Image */}
      <img
        src={journey.image}
        alt={journey.title}
        className={`${imageClass} group-hover:scale-105 transition-transform duration-700 ease-out`}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

      {/* Badge */}
      {journey.badge && (
        <div className="absolute top-4 left-4">
          <span className="border border-white/50 text-white text-[10px] uppercase tracking-[0.15em] px-3 py-1.5">
            {journey.badge}
          </span>
        </div>
      )}

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] mb-2">
          {journey.duration}
        </p>
        <h3
          style={{ color: "white", fontSize: "1.25rem", fontWeight: 500 }}
          className="mb-1 leading-tight"
        >
          {journey.title}
        </h3>
        <p className="text-white/55 text-xs mb-4 leading-relaxed">
          {journey.tagline}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-sm font-medium">
            {journey.priceFrom}
          </span>
          <span className="flex items-center gap-1.5 text-[#F0C97A] text-xs font-medium group-hover:gap-3 transition-all duration-300">
            Tailor this <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedJourneys() {
  return (
    <section id="journeys" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-[#C4622D] tracking-[0.2em] uppercase text-xs mb-3">
              Signature journeys
            </p>
            <h2
              style={{
                color: "#1C1A17",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              Vietnam, <em>four ways.</em>
            </h2>
          </div>
          <p className="text-[#6B5E4C] text-sm max-w-xs leading-relaxed">
            Starting points, not packages. Every itinerary is rewritten for you.
          </p>
        </motion.div>

        {/* Editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Left: large portrait card */}
          <JourneyCard
            journey={journeys[0]}
            className="h-[420px] lg:h-[580px]"
          />

          {/* Right: 3 stacked landscape cards */}
          <div className="grid grid-rows-3 gap-4 h-[420px] lg:h-[580px]">
            {journeys.slice(1).map((j) => (
              <JourneyCard
                key={j.id}
                journey={j}
                className="h-full"
              />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-[#9B9B9B] text-sm">
            Don't see what you're looking for?{" "}
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[#1C1A17] underline underline-offset-2 hover:text-[#C4622D] transition-colors"
            >
              Build it from scratch →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
