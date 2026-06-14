import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { id: "how-it-works", label: "How It Works" },
  { id: "what-you-get", label: "What You Get" },
  { id: "journeys", label: "Tour Ideas" },
  { id: "team", label: "About Us" },
];

const SECTIONS = ["hero", "how-it-works", "what-you-get", "journeys", "destinations", "why-vho", "team", "testimonials", "contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#2A4A2E] flex items-center justify-center">
              <span className="text-[#F6EFE2] text-xs font-semibold tracking-wider">V</span>
            </div>
            <span
              className={`font-['Cormorant_Garamond'] font-semibold text-xl tracking-wide transition-colors ${
                scrolled ? "text-[#1C1A17]" : "text-white"
              }`}
            >
              Vietnamese Hangout
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-sm transition-colors relative py-1 ${
                    scrolled
                      ? isActive ? "text-[#C4622D]" : "text-[#6B5E4C] hover:text-[#C4622D]"
                      : isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className={`absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full ${scrolled ? "bg-[#C4622D]" : "bg-white"}`}
                    />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => scrollTo("contact")}
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.18em] border transition-all duration-300 ${
                scrolled
                  ? "border-[#1C1A17] text-[#1C1A17] hover:bg-[#1C1A17] hover:text-white"
                  : "border-white/70 text-white hover:bg-white hover:text-[#1C1A17]"
              }`}
            >
              Plan My Trip
            </button>
          </div>

          <button
            className={`md:hidden transition-colors ${scrolled ? "text-[#1C1A17]" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/20 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[64px] left-0 right-0 z-40 bg-white border-b border-[rgba(44,34,20,0.08)] shadow-xl px-6 py-6 flex flex-col gap-1 md:hidden"
            >
              {NAV_LINKS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-left text-base py-2.5 border-b border-[rgba(44,34,20,0.06)] last:border-0 transition-colors ${
                    activeSection === id ? "text-[#C4622D]" : "text-[#1C1A17] hover:text-[#C4622D]"
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-4 border border-[#1C1A17] text-[#1C1A17] px-5 py-3 text-[11px] uppercase tracking-[0.18em] hover:bg-[#1C1A17] hover:text-white transition-all text-center w-full"
              >
                Plan My Trip
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
