import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle, ChevronRight, ChevronLeft, Check,
  MapPin, UsersRound, CalendarRange, Sparkles, Sliders,
  UtensilsCrossed, Mountain, Waves, Moon, Landmark, Brush,
  Globe2, Aperture, Leaf, Zap, BedDouble, Gem, Crown,
  Building2, Sun, Ship, Sailboat,
  User, Users2, Baby, Handshake,
} from "lucide-react";

type Answers = {
  destinations: string[];
  groupType: string;
  duration: string;
  interests: string[];
  pace: string;
  accommodation: string;
  name: string;
  email: string;
  message: string;
};

const DESTINATIONS = [
  { id: "hcmc",    label: "Hồ Chí Minh City",  Icon: Building2,  sub: "Saigon vibes" },
  { id: "hanoi",   label: "Hà Nội",              Icon: Landmark,   sub: "Ancient capital" },
  { id: "danang",  label: "Đà Nẵng / Hội An",   Icon: Sun,        sub: "Coast & heritage" },
  { id: "halong",  label: "Hạ Long Bay",         Icon: Ship,       sub: "Iconic seascape" },
  { id: "sapa",    label: "Sapa / North",         Icon: Mountain,   sub: "Mountain trekking" },
  { id: "mekong",  label: "Mekong Delta",         Icon: Sailboat,   sub: "River & markets" },
];

const GROUP_TYPES = [
  { id: "solo",     label: "Solo",               Icon: User,       sub: "Just me" },
  { id: "couple",   label: "Couple",             Icon: Users2,     sub: "Two of us" },
  { id: "friends",  label: "Group of friends",   Icon: UsersRound, sub: "3–10 people" },
  { id: "family",   label: "Family with kids",   Icon: Baby,       sub: "Kid-friendly pace" },
  { id: "extended", label: "Multi-generation",   Icon: Handshake,  sub: "All ages welcome" },
];

const DURATIONS = [
  { label: "4–5 days",  sub: "Quick escape" },
  { label: "6–8 days",  sub: "Perfect week" },
  { label: "9–12 days", sub: "Deep dive" },
  { label: "13–16 days",sub: "Full journey" },
  { label: "17+ days",  sub: "Extended trip" },
];

const INTERESTS = [
  { label: "Street food & markets", Icon: UtensilsCrossed },
  { label: "History & heritage",    Icon: Landmark },
  { label: "Nature & hiking",       Icon: Mountain },
  { label: "Beach & relaxation",    Icon: Waves },
  { label: "Photography",           Icon: Aperture },
  { label: "Local culture",         Icon: Globe2 },
  { label: "Art & architecture",    Icon: Brush },
  { label: "Nightlife",             Icon: Moon },
  { label: "Wellness & spa",        Icon: Leaf },
];

const PACES = [
  { id: "slow",     label: "Slow & immersive",  desc: "Fewer places, deeper experiences",  Icon: Leaf },
  { id: "balanced", label: "Balanced",           desc: "A mix of sightseeing and downtime", Icon: Sliders },
  { id: "active",   label: "Active & full",      desc: "See as much as possible",           Icon: Zap },
];

const ACCOMMODATIONS = [
  { id: "comfort",  label: "Comfortable",  desc: "Mid-range hotels & guesthouses",    Icon: BedDouble },
  { id: "boutique", label: "Boutique",     desc: "Design hotels & heritage stays",    Icon: Gem },
  { id: "luxury",   label: "Luxury",       desc: "5-star resorts & exclusive hotels", Icon: Crown },
];

const STEPS = ["Destinations", "Group", "Duration", "Interests", "Your Style", "Contact"];
const STEP_ICONS = [MapPin, UsersRound, CalendarRange, Sparkles, Sliders, CheckCircle];

const serif = "'Cormorant Garamond', serif";

export function PlanningWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Answers>({
    destinations: [], groupType: "", duration: "", interests: [],
    pace: "", accommodation: "", name: "", email: "", message: "",
  });

  const toggleDest = (id: string) =>
    setAnswers((a) => ({
      ...a,
      destinations: a.destinations.includes(id)
        ? a.destinations.filter((d) => d !== id)
        : [...a.destinations, id],
    }));

  const toggleInterest = (label: string) =>
    setAnswers((a) => ({
      ...a,
      interests: a.interests.includes(label)
        ? a.interests.filter((i) => i !== label)
        : [...a.interests, label],
    }));

  const canNext = () => {
    if (step === 0) return answers.destinations.length > 0;
    if (step === 1) return !!answers.groupType;
    if (step === 2) return !!answers.duration;
    if (step === 3) return answers.interests.length > 0;
    if (step === 4) return !!answers.pace && !!answers.accommodation;
    if (step === 5) return !!answers.name && !!answers.email;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const inputCls = "w-full bg-[#F7F4F0] border border-[rgba(44,34,20,0.1)] px-4 py-3 text-[#1C1A17] placeholder-[#AAAAAA] outline-none focus:border-[#C4622D]/50 transition-all";
  const labelCls: React.CSSProperties = {
    fontFamily: serif,
    fontSize: "0.8rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "#6B5E4C",
    display: "block",
    marginBottom: "0.5rem",
  };
  const inputStyle: React.CSSProperties = { fontFamily: serif, fontSize: "1.05rem" };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 bg-[#F7F4F0]"
      style={{ fontFamily: serif }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p style={{ fontFamily: serif, fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C4622D" }} className="uppercase mb-4">
            Start Planning
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.15,
              color: "#1C1A17",
            }}
            className="mb-3"
          >
            Tell us about your trip.<br />
            <em style={{ color: "#C4622D" }}>We'll do the rest.</em>
          </h2>
          <p style={{ fontFamily: serif, fontSize: "1rem", color: "#6B5E4C" }}>
            Takes 2 minutes · Free · No commitment
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white shadow-xl shadow-black/8 overflow-hidden"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                className="w-20 h-20 bg-[#2A4A2E]/10 flex items-center justify-center mb-6"
              >
                <CheckCircle size={40} className="text-[#2A4A2E]" />
              </motion.div>
              <h3 style={{ fontFamily: serif, fontSize: "1.8rem", fontWeight: 500, color: "#1C1A17" }} className="mb-2">
                Your trip is in our hands.
              </h3>
              <p style={{ fontFamily: serif, fontSize: "1.05rem", color: "#6B5E4C", lineHeight: 1.75 }} className="max-w-sm mx-auto mb-8">
                A member of our local team will reach out within 24 hours to craft your personalised itinerary.
              </p>
              <a
                href="https://wa.me/84772751430?text=Hi%21%20I%20just%20filled%20in%20the%20VHO%20trip%20planner."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 text-sm hover:bg-[#1ebc5a] transition-colors mb-8"
                style={{ fontFamily: serif, fontSize: "1rem" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Also reach us on WhatsApp
              </a>
              <div className="bg-[#F7F4F0] p-4 w-full max-w-md text-left">
                <p style={{ fontFamily: serif, fontSize: "0.75rem", letterSpacing: "0.15em", color: "#6B5E4C" }} className="uppercase mb-3">Your preferences</p>
                <div className="flex flex-wrap gap-2">
                  {answers.destinations.map((d) => {
                    const dest = DESTINATIONS.find((x) => x.id === d);
                    return dest ? (
                      <span key={d} style={{ fontFamily: serif, fontSize: "0.9rem" }} className="bg-white border border-[rgba(44,34,20,0.1)] text-[#1C1A17] px-3 py-1.5">
                        {dest.label}
                      </span>
                    ) : null;
                  })}
                  {answers.duration && (
                    <span style={{ fontFamily: serif, fontSize: "0.9rem" }} className="bg-white border border-[rgba(44,34,20,0.1)] text-[#1C1A17] px-3 py-1.5">
                      {answers.duration}
                    </span>
                  )}
                  {answers.interests.slice(0, 3).map((i) => (
                    <span key={i} style={{ fontFamily: serif, fontSize: "0.9rem" }} className="bg-white border border-[rgba(44,34,20,0.1)] text-[#1C1A17] px-3 py-1.5">{i}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="lg:grid lg:grid-cols-[260px_1fr]">

              {/* ── LEFT SIDEBAR ── */}
              <div className="bg-[#2A4A2E] p-8 flex flex-col">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 bg-white/15 flex items-center justify-center flex-shrink-0">
                    <span style={{ fontFamily: serif, fontSize: "0.9rem", color: "white" }}>V</span>
                  </div>
                  <span style={{ fontFamily: serif, fontSize: "1rem", color: "white", letterSpacing: "0.05em" }}>Vietnamese Hangout</span>
                </div>

                <div className="flex flex-col gap-0 flex-1">
                  {STEPS.map((s, i) => {
                    const StepIcon = STEP_ICONS[i];
                    const done = i < step;
                    const active = i === step;
                    return (
                      <div key={s} className="flex items-start gap-3">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`w-8 h-8 flex items-center justify-center transition-all ${
                            done   ? "bg-[#C4622D] text-white" :
                            active ? "bg-white text-[#2A4A2E] ring-2 ring-white/30 ring-offset-2 ring-offset-[#2A4A2E]" :
                                     "bg-white/10 text-white/30"
                          }`}>
                            {done ? <Check size={13} /> : <StepIcon size={13} />}
                          </div>
                          {i < STEPS.length - 1 && (
                            <div className={`w-px h-8 mt-1 transition-all ${done ? "bg-[#C4622D]/50" : "bg-white/10"}`} />
                          )}
                        </div>
                        <div className="pt-1.5 pb-8">
                          <p style={{ fontFamily: serif, fontSize: "0.95rem" }} className={`leading-none transition-colors ${
                            active ? "text-white" : done ? "text-white/50" : "text-white/25"
                          }`}>
                            {s}
                          </p>
                          {active && (
                            <p style={{ fontFamily: serif, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }} className="mt-1">In progress</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-2.5">
                  {[
                    { Icon: Sparkles, text: "4.9 / 5 from 340+ travellers" },
                    { Icon: CheckCircle, text: "Free · No commitment" },
                    { Icon: Zap,         text: "Response within 24 hours" },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-2">
                      <Icon size={12} className="text-white/40 flex-shrink-0" strokeWidth={1.5} />
                      <p style={{ fontFamily: serif, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT CONTENT ── */}
              <div className="flex flex-col">
                <div className="h-0.5 bg-[#F0EDE8]">
                  <motion.div
                    className="h-full bg-[#C4622D]"
                    animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.25 }}
                      className="p-8 flex-1 min-h-[380px]"
                    >
                      {/* Step 0: Destinations */}
                      {step === 0 && (
                        <div>
                          <p style={{ fontFamily: serif, fontSize: "0.7rem", letterSpacing: "0.2em", color: "#C4622D" }} className="uppercase mb-1">Step 1 of 6</p>
                          <h3 style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 500, color: "#1C1A17" }} className="mb-1">Where in Vietnam calls to you?</h3>
                          <p style={{ fontFamily: serif, fontSize: "1rem", color: "#9B9B9B" }} className="mb-6">Select all that interest you</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {DESTINATIONS.map((d) => {
                              const sel = answers.destinations.includes(d.id);
                              return (
                                <button key={d.id} type="button" onClick={() => toggleDest(d.id)}
                                  className={`relative flex flex-col items-start gap-1 p-4 border text-left transition-all ${
                                    sel ? "border-[#C4622D] bg-[#C4622D]/5" : "border-[rgba(44,34,20,0.1)] hover:border-[#C4622D]/40 bg-[#FAFAFA]"
                                  }`}>
                                  {sel && (
                                    <span className="absolute top-2 right-2 w-5 h-5 bg-[#C4622D] flex items-center justify-center">
                                      <Check size={11} className="text-white" />
                                    </span>
                                  )}
                                  <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${sel ? "bg-[#C4622D] text-white" : "bg-[#F0EDE8] text-[#6B5E4C]"}`}>
                                    <d.Icon size={17} strokeWidth={1.5} />
                                  </div>
                                  <span style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: sel ? "#C4622D" : "#1C1A17" }} className="leading-tight">{d.label}</span>
                                  <span style={{ fontFamily: serif, fontSize: "0.85rem", color: "#9B9B9B" }}>{d.sub}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Step 1: Group type */}
                      {step === 1 && (
                        <div>
                          <p style={{ fontFamily: serif, fontSize: "0.7rem", letterSpacing: "0.2em", color: "#C4622D" }} className="uppercase mb-1">Step 2 of 6</p>
                          <h3 style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 500, color: "#1C1A17" }} className="mb-1">Who's travelling with you?</h3>
                          <p style={{ fontFamily: serif, fontSize: "1rem", color: "#9B9B9B" }} className="mb-6">Choose one</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {GROUP_TYPES.map((g) => {
                              const sel = answers.groupType === g.id;
                              return (
                                <button key={g.id} type="button"
                                  onClick={() => setAnswers({ ...answers, groupType: g.id })}
                                  className={`flex items-center gap-4 p-4 border text-left transition-all ${
                                    sel ? "border-[#C4622D] bg-[#C4622D]/5" : "border-[rgba(44,34,20,0.1)] hover:border-[#C4622D]/40 bg-[#FAFAFA]"
                                  }`}>
                                  <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors ${sel ? "bg-[#C4622D] text-white" : "bg-[#F0EDE8] text-[#6B5E4C]"}`}>
                                    <g.Icon size={18} strokeWidth={1.5} />
                                  </div>
                                  <div>
                                    <p style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: sel ? "#C4622D" : "#1C1A17" }}>{g.label}</p>
                                    <p style={{ fontFamily: serif, fontSize: "0.85rem", color: "#9B9B9B" }}>{g.sub}</p>
                                  </div>
                                  {sel && (
                                    <span className="ml-auto w-5 h-5 bg-[#C4622D] flex items-center justify-center flex-shrink-0">
                                      <Check size={11} className="text-white" />
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Step 2: Duration */}
                      {step === 2 && (
                        <div>
                          <p style={{ fontFamily: serif, fontSize: "0.7rem", letterSpacing: "0.2em", color: "#C4622D" }} className="uppercase mb-1">Step 3 of 6</p>
                          <h3 style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 500, color: "#1C1A17" }} className="mb-1">How long is your trip?</h3>
                          <p style={{ fontFamily: serif, fontSize: "1rem", color: "#9B9B9B" }} className="mb-6">Total days in Vietnam</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {DURATIONS.map((d) => {
                              const sel = answers.duration === d.label;
                              return (
                                <button key={d.label} type="button"
                                  onClick={() => setAnswers({ ...answers, duration: d.label })}
                                  className={`flex flex-col items-center justify-center py-5 px-3 border transition-all ${
                                    sel ? "border-[#C4622D] bg-[#C4622D]/5" : "border-[rgba(44,34,20,0.1)] hover:border-[#C4622D]/40 bg-[#FAFAFA]"
                                  }`}>
                                  <span style={{ fontFamily: serif, fontSize: "1.2rem", fontWeight: 500, color: sel ? "#C4622D" : "#1C1A17" }}>{d.label}</span>
                                  <span style={{ fontFamily: serif, fontSize: "0.85rem", color: "#9B9B9B" }} className="mt-1">{d.sub}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Step 3: Interests */}
                      {step === 3 && (
                        <div>
                          <p style={{ fontFamily: serif, fontSize: "0.7rem", letterSpacing: "0.2em", color: "#C4622D" }} className="uppercase mb-1">Step 4 of 6</p>
                          <h3 style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 500, color: "#1C1A17" }} className="mb-1">What do you love about travel?</h3>
                          <p style={{ fontFamily: serif, fontSize: "1rem", color: "#9B9B9B" }} className="mb-6">Pick everything that matters to you</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {INTERESTS.map(({ label, Icon }) => {
                              const sel = answers.interests.includes(label);
                              return (
                                <button key={label} type="button" onClick={() => toggleInterest(label)}
                                  className={`flex items-center gap-3 p-3.5 border text-left transition-all ${
                                    sel ? "border-[#C4622D] bg-[#C4622D]/5" : "border-[rgba(44,34,20,0.1)] hover:border-[#C4622D]/40 bg-[#FAFAFA]"
                                  }`}>
                                  <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${
                                    sel ? "bg-[#C4622D] text-white" : "bg-[#F0EDE8] text-[#9B9B9B]"
                                  }`}>
                                    <Icon size={14} />
                                  </div>
                                  <span style={{ fontFamily: serif, fontSize: "0.95rem", color: sel ? "#C4622D" : "#4A4A4A" }} className="leading-tight">{label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Step 4: Style */}
                      {step === 4 && (
                        <div className="flex flex-col gap-6">
                          <div>
                            <p style={{ fontFamily: serif, fontSize: "0.7rem", letterSpacing: "0.2em", color: "#C4622D" }} className="uppercase mb-1">Step 5 of 6</p>
                            <h3 style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 500, color: "#1C1A17" }} className="mb-4">Your travel style</h3>
                            <p style={{ fontFamily: serif, fontSize: "0.8rem", letterSpacing: "0.12em", color: "#6B5E4C" }} className="uppercase mb-3">Travel pace</p>
                            <div className="flex flex-col gap-2">
                              {PACES.map((p) => {
                                const sel = answers.pace === p.id;
                                const PaceIcon = p.Icon;
                                return (
                                  <button key={p.id} type="button"
                                    onClick={() => setAnswers({ ...answers, pace: p.id })}
                                    className={`flex items-center gap-4 p-4 border text-left transition-all ${
                                      sel ? "border-[#C4622D] bg-[#C4622D]/5" : "border-[rgba(44,34,20,0.1)] hover:border-[#C4622D]/40 bg-[#FAFAFA]"
                                    }`}>
                                    <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${
                                      sel ? "bg-[#C4622D] text-white" : "bg-[#F0EDE8] text-[#9B9B9B]"
                                    }`}>
                                      <PaceIcon size={16} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1">
                                      <p style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: sel ? "#C4622D" : "#1C1A17" }}>{p.label}</p>
                                      <p style={{ fontFamily: serif, fontSize: "0.85rem", color: "#9B9B9B" }}>{p.desc}</p>
                                    </div>
                                    <div className={`w-5 h-5 border-2 flex-shrink-0 transition-all flex items-center justify-center ${
                                      sel ? "border-[#C4622D] bg-[#C4622D]" : "border-[#D0D0D0]"
                                    }`}>
                                      {sel && <Check size={11} className="text-white" />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          <div>
                            <p style={{ fontFamily: serif, fontSize: "0.8rem", letterSpacing: "0.12em", color: "#6B5E4C" }} className="uppercase mb-3">Accommodation</p>
                            <div className="flex flex-col gap-2">
                              {ACCOMMODATIONS.map((a) => {
                                const sel = answers.accommodation === a.id;
                                const AccomIcon = a.Icon;
                                return (
                                  <button key={a.id} type="button"
                                    onClick={() => setAnswers({ ...answers, accommodation: a.id })}
                                    className={`flex items-center gap-4 p-4 border text-left transition-all ${
                                      sel ? "border-[#C4622D] bg-[#C4622D]/5" : "border-[rgba(44,34,20,0.1)] hover:border-[#C4622D]/40 bg-[#FAFAFA]"
                                    }`}>
                                    <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${
                                      sel ? "bg-[#C4622D] text-white" : "bg-[#F0EDE8] text-[#9B9B9B]"
                                    }`}>
                                      <AccomIcon size={16} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1">
                                      <p style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: sel ? "#C4622D" : "#1C1A17" }}>{a.label}</p>
                                      <p style={{ fontFamily: serif, fontSize: "0.85rem", color: "#9B9B9B" }}>{a.desc}</p>
                                    </div>
                                    <div className={`w-5 h-5 border-2 flex-shrink-0 transition-all flex items-center justify-center ${
                                      sel ? "border-[#C4622D] bg-[#C4622D]" : "border-[#D0D0D0]"
                                    }`}>
                                      {sel && <Check size={11} className="text-white" />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 5: Contact */}
                      {step === 5 && (
                        <div>
                          <p style={{ fontFamily: serif, fontSize: "0.7rem", letterSpacing: "0.2em", color: "#C4622D" }} className="uppercase mb-1">Step 6 of 6</p>
                          <h3 style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 500, color: "#1C1A17" }} className="mb-1">Almost there.</h3>
                          <p style={{ fontFamily: serif, fontSize: "1rem", color: "#9B9B9B" }} className="mb-6">We'll send your tailored proposal within 24 hours.</p>
                          <div className="flex flex-col gap-4">
                            <div>
                              <label style={labelCls}>Your name</label>
                              <input required type="text" value={answers.name}
                                onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                                placeholder="Sophie Nguyen" className={inputCls} style={inputStyle} />
                            </div>
                            <div>
                              <label style={labelCls}>Email address</label>
                              <input required type="email" value={answers.email}
                                onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                                placeholder="sophie@email.com" className={inputCls} style={inputStyle} />
                            </div>
                            <div>
                              <label style={labelCls}>Anything else? <span style={{ textTransform: "none", letterSpacing: 0, color: "#AAAAAA" }}>(optional)</span></label>
                              <textarea rows={3} value={answers.message}
                                onChange={(e) => setAnswers({ ...answers, message: e.target.value })}
                                placeholder="Dietary needs, accessibility, a dream experience..."
                                className={`${inputCls} resize-none`} style={inputStyle} />
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="px-8 py-5 border-t border-[rgba(44,34,20,0.08)] flex items-center justify-between bg-[#FAFAFA]">
                    <button type="button"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      style={{ fontFamily: serif, fontSize: "0.95rem", color: "#9B9B9B" }}
                      className={`flex items-center gap-1.5 hover:text-[#1C1A17] transition-colors ${step === 0 ? "invisible" : ""}`}>
                      <ChevronLeft size={16} /> Back
                    </button>

                    <div className="flex items-center gap-2">
                      {STEPS.map((_, i) => (
                        <div key={i} className={`transition-all ${
                          i === step ? "w-5 h-1.5 bg-[#C4622D]" : i < step ? "w-1.5 h-1.5 bg-[#C4622D]/40" : "w-1.5 h-1.5 bg-[#E0E0E0]"
                        }`} />
                      ))}
                    </div>

                    {step < STEPS.length - 1 ? (
                      <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canNext()}
                        style={{ fontFamily: serif, fontSize: "0.95rem", letterSpacing: "0.1em" }}
                        className="flex items-center gap-2 bg-[#C4622D] text-white px-6 py-2.5 uppercase tracking-widest hover:bg-[#A84E22] transition-all disabled:opacity-35 disabled:cursor-not-allowed">
                        Continue <ChevronRight size={15} />
                      </button>
                    ) : (
                      <button type="submit" disabled={!canNext()}
                        style={{ fontFamily: serif, fontSize: "0.95rem" }}
                        className="flex items-center gap-2 bg-[#2A4A2E] text-white px-6 py-2.5 hover:bg-[#1E3620] transition-all disabled:opacity-35 disabled:cursor-not-allowed">
                        Get my free proposal →
                      </button>
                    )}
                  </div>
                </form>
              </div>

            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
