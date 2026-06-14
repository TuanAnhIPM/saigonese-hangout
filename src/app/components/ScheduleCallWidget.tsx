import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle } from "lucide-react";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00",
];

const TIMEZONES = [
  { value: "Asia/Bangkok", label: "Asia, UTC+07:00  Bangkok, Hanoi, Jakarta" },
  { value: "Asia/Singapore", label: "Asia, UTC+08:00  Singapore, Kuala Lumpur" },
  { value: "Asia/Tokyo", label: "Asia, UTC+09:00  Tokyo, Seoul" },
  { value: "Australia/Sydney", label: "Australia, UTC+11:00  Sydney, Melbourne" },
  { value: "Europe/London", label: "Europe, UTC+00:00  London" },
  { value: "Europe/Paris", label: "Europe, UTC+01:00  Paris, Berlin, Rome" },
  { value: "America/New_York", label: "America, UTC-05:00  New York" },
  { value: "America/Los_Angeles", label: "America, UTC-08:00  Los Angeles" },
];

const today = new Date().toISOString().split("T")[0];

const inputClass =
  "w-full bg-[#F4F4F4] rounded-xl px-4 py-3 text-[#1C1A17] placeholder-[#AAAAAA] outline-none focus:ring-2 focus:ring-[#C4622D]/30 text-sm transition-all";
const labelClass =
  "block text-[#6B5E4C] text-xs tracking-wider uppercase mb-1.5";

type Props = {
  onClose: () => void;
};

export function ScheduleCallWidget({ onClose }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    timezone: "Asia/Bangkok",
    day: "",
    time: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-20 right-5 z-50 w-[400px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      style={{ maxHeight: "90vh" }}
    >
      {/* Header */}
      <div className="bg-[#C4622D] px-5 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-[#2A4A2E] flex items-center justify-center flex-shrink-0">
            <span
              className="text-[#F6EFE2] text-sm font-semibold"
            >
              L
            </span>
          </div>
          <div>
            <p
              className="text-white font-semibold text-base leading-tight"
            >
              Schedule a Call
            </p>
            <p
              className="text-white/70 text-xs"
            >
              Vietnamese Hangout · Local Team
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="bg-white overflow-y-auto flex-1">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 text-center flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                className="w-16 h-16 bg-[#2A4A2E]/10 rounded-full flex items-center justify-center mb-5"
              >
                <CheckCircle size={32} className="text-[#2A4A2E]" />
              </motion.div>
              <h3
                className="text-[#1C1A17] mb-2"
                style={{ fontSize: "1.3rem", fontWeight: 500 }}
              >
                You're booked!
              </h3>
              <p
                className="text-[#6B5E4C] text-sm leading-relaxed"
              >
                Our team will call you on <span className="font-medium text-[#1C1A17]">{form.day}</span> at{" "}
                <span className="font-medium text-[#1C1A17]">{form.time}</span>.<br />
                A confirmation has been sent to{" "}
                <span className="font-medium text-[#1C1A17]">{form.email}</span>.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="p-5 flex flex-col gap-4"
            >
              {/* Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>
                    First Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    placeholder="Sophie"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Last Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    placeholder="Nguyen"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div
                    className="flex items-center gap-1.5 bg-[#F4F4F4] rounded-xl px-3 py-3 flex-shrink-0 text-sm text-[#1C1A17] border border-transparent"
                  >
                    🇻🇳 <span className="text-[#6B5E4C]">+84</span>
                  </div>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="772 751 430"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className={labelClass}>
                  Time Zone
                </label>
                <select
                  value={form.timezone}
                  onChange={(e) => set("timezone", e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day */}
              <div>
                <label className={labelClass}>
                  Day
                </label>
                <input
                  required
                  type="date"
                  value={form.day}
                  min={today}
                  onChange={(e) => set("day", e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                />
              </div>

              {/* Time */}
              <div>
                <label className={labelClass}>
                  Time
                </label>
                <select
                  required
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="">Select an hour</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="Your email here"
                  className={inputClass}
                />
              </div>

              {/* Privacy */}
              <p
                className="text-[#9B9B9B] text-[11px] leading-relaxed"
              >
                We use the information you provide to us to contact you about our relevant
                content, products, and services. You may unsubscribe from these
                communications at any time. For more information, check out our{" "}
                <button type="button" className="underline hover:text-[#C4622D] transition-colors">
                  Privacy Policy
                </button>
                .
              </p>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#C4622D] text-white py-3.5 rounded-full text-sm font-semibold hover:bg-[#A84E22] hover:shadow-lg hover:shadow-[#C4622D]/25 active:scale-95 transition-all mt-1"
              >
                Schedule My Call
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
