import { motion } from "motion/react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1697015556006-9e767c7187dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white/50 text-xs uppercase tracking-[0.25em] mb-7"
        >
          Bespoke travel — Vietnam
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="text-white mb-8 leading-tight"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 5.4rem)",
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          Your Vietnam,{" "}
          <em style={{ fontStyle: "italic", color: "#F0C97A" }}>
            exactly as you{" "}
            <span style={{ whiteSpace: "nowrap" }}>imagined it.</span>
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-white/55 text-sm mb-10 tracking-wide"
          style={{ letterSpacing: "0.03em" }}
        >
          Tailor-made itineraries crafted by locals who know this country deeply.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
        >
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-white/70 text-white px-10 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-[#1C1A17] active:scale-95 transition-all duration-300"
          >
            Start Planning My Trip
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/35 text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
