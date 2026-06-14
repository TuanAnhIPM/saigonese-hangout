import { motion } from "motion/react";

const reasons = [
  {
    title: "We are locals",
    body: "Born and raised in Vietnam, our team understands the country's history, culture, and people — not from a guide book, but from a lifetime. That knowledge becomes your advantage.",
  },
  {
    title: "We listen first",
    body: "Before we suggest a single place, we want to know you — your pace, your people, your passions. Every itinerary starts from that conversation.",
  },
  {
    title: "We save your time",
    body: "You don't have to wade through hundreds of TripAdvisor tabs or ask strangers in Facebook groups. One conversation with us replaces weeks of research.",
  },
  {
    title: "Nothing is pre-packaged",
    body: "We don't sell fixed tours. Every journey we design is built from scratch — for your group, your travel style, and the trip you actually want.",
  },
];

export function WhyVHO() {
  return (
    <section id="why-vho" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: image + quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="overflow-hidden aspect-[4/5] max-h-[540px]">
              <img
                src="https://images.unsplash.com/photo-1616472961382-13c212a1911b?w=800&h=1000&fit=crop&auto=format"
                alt="Vietnam street life"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/65 to-transparent" />
            </div>

            <blockquote className="absolute bottom-0 left-0 right-0 p-7">
              <p
                className="text-white leading-relaxed mb-3"
                style={{ fontSize: "1.1rem", fontStyle: "italic" }}
              >
                "They didn't give us a tour. They gave us a version of Vietnam that felt like ours."
              </p>
              <p className="text-white/55 text-xs tracking-wider">
                — Amélie & Marc, Paris · Family of four
              </p>
            </blockquote>

            {/* Typographic stat — no orange fill */}
            <div className="absolute -top-3 -right-3 bg-white border border-[rgba(44,34,20,0.1)] px-5 py-4 shadow-sm">
              <p
                className="text-[#1C1A17] leading-none"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.4rem",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                100%
              </p>
              <p className="text-[#6B5E4C] text-xs mt-1.5 tracking-wide">
                custom itineraries
              </p>
            </div>
          </motion.div>

          {/* Right: heading + editorial list */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-10"
            >
              <p className="text-[#C4622D] tracking-[0.2em] uppercase text-xs mb-4">
                Why us
              </p>
              <h2
                className="text-[#1C1A17]"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                A local friend <br />who plans everything.
              </h2>
            </motion.div>

            {/* Editorial list — no icons */}
            <div className="border-t border-[rgba(44,34,20,0.1)]">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="py-5 border-b border-[rgba(44,34,20,0.07)] group cursor-default"
                >
                  <p
                    className="text-[#1C1A17] group-hover:text-[#C4622D] transition-colors duration-200 mb-1.5"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {r.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.05rem",
                      fontWeight: 400,
                      lineHeight: 1.75,
                      color: "#6B5E4C",
                    }}
                  >
                    {r.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
