import { motion } from "motion/react";

const deliverables = [
  {
    title: "Day-by-day itinerary",
    body: "A detailed, personalised plan for every day — crafted around your travel style, not a template.",
  },
  {
    title: "Curated restaurant & experience picks",
    body: "Local spots, street-food gems, fine dining, and the hidden viewpoints no algorithm will surface — selected to match your taste.",
  },
  {
    title: "All logistics handled",
    body: "Private cars, sleeper trains, domestic flights, accommodation — every reservation confirmed before you land.",
  },
  {
    title: "24/7 local support",
    body: "A VHO team member is reachable throughout your trip. Something unexpected? We handle it.",
  },
  {
    title: "A trip that is entirely yours",
    body: "Nothing pre-packaged, nothing off-the-shelf. Every journey we design is built from scratch for your group, your pace, and the version of Vietnam you came to find.",
  },
];

export function WhatYouGet() {
  return (
    <section id="what-you-get" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header — left-aligned, editorial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-end"
        >
          <div>
            <p className="text-[#C4622D] tracking-[0.2em] uppercase text-xs mb-4">
              What's included
            </p>
            <h2
              className="text-[#1C1A17]"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              Everything you need. <br />
              <em>Nothing you don't.</em>
            </h2>
          </div>
          <p className="text-[#6B5E4C] text-sm leading-relaxed lg:max-w-sm lg:ml-auto">
            When you book with VHO, here's exactly what we put together for you — so you can travel with complete peace of mind.
          </p>
        </motion.div>

        {/* Editorial list */}
        <div className="border-t border-[rgba(44,34,20,0.12)]">
          {deliverables.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-2 md:gap-16 py-6 border-b border-[rgba(44,34,20,0.07)] group cursor-default"
            >
              <p
                className="text-[#1C1A17] group-hover:text-[#C4622D] transition-colors duration-200"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.15rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {d.title}
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
                {d.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
