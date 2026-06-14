import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Tell us what you love",
    body: "Share your travel style, who you're going with, what excites you — food, culture, nature, hidden gems — and your dates. No forms, just a conversation.",
  },
  {
    number: "02",
    title: "We craft your itinerary",
    body: "Our local team designs a day-by-day plan tailored to your tastes: places that match you, paced so nothing feels rushed, with all logistics handled.",
  },
  {
    number: "03",
    title: "We refine until it's right",
    body: "We go back and forth with you — adjusting the pace, swapping experiences, fine-tuning every detail — until the itinerary feels exactly like yours. No limit on revisions.",
  },
  {
    number: "04",
    title: "You travel, fully relaxed",
    body: "Arrive in Vietnam and simply enjoy. Every detail — transfers, bookings, guides — is taken care of. You're in the hands of people who know this country deeply.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#F7F4F0]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-[#C4622D] tracking-[0.2em] uppercase text-xs mb-4"
          >
            The process
          </p>
          <h2
            className="text-[#1C1A17] mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            Four steps to a trip that feels like you
          </h2>
          <p
            className="text-[#6B5E4C] max-w-lg mx-auto leading-relaxed"
          >
            We've removed every part of travel planning that's stressful. You make one
            decision: reach out to us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              {/* Connector line between cards */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%+1rem)] right-0 w-8 h-px bg-gradient-to-r from-[#C4622D]/30 to-transparent z-10" />
              )}

              <div className="bg-white rounded-2xl p-8 h-full border border-[rgba(44,34,20,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                {/* Number — the visual anchor, no icon */}
                <div className="mb-7">
                  <div
                    className="w-8 h-0.5 bg-[#C4622D] mb-4 group-hover:w-12 transition-all duration-300"
                  />
                  <span
                    className="text-[#1C1A17] leading-none select-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "4rem",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      opacity: 0.15,
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <h3
                  className="text-[#1C1A17] mb-3"
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 500,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.05rem",
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: "#6B5E4C",
                  }}
                >
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
