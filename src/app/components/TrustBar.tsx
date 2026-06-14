import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  { target: 4.9, decimals: 1, suffix: " / 5", label: "Average rating", sub: "from 340+ travellers" },
  { target: 500, decimals: 0, suffix: "+", label: "Tailored trips", sub: "designed since 2019" },
  { target: 3, decimals: 0, suffix: " cities", label: "Deep expertise", sub: "HCMC · Hanoi · Đà Nẵng" },
  { target: 100, decimals: 0, suffix: "%", label: "Custom itineraries", sub: "zero pre-packaged tours" },
];

function useCountUp(target: number, decimals: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, decimals]);
  return value;
}

function StatItem({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCountUp(stat.target, stat.decimals, active);
  const display = stat.decimals > 0 ? count.toFixed(stat.decimals) : String(Math.round(count));

  return (
    <div className="flex flex-col md:px-10 first:pl-0 last:pr-0">
      <p
        className="text-[#1C1A17] tabular-nums leading-none"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2.4rem",
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}
      >
        {display}{stat.suffix}
      </p>
      <p className="text-[#1C1A17] text-[11px] font-medium mt-2 tracking-[0.08em] uppercase">
        {stat.label}
      </p>
      <p className="text-[#C4622D] text-xs mt-0.5">
        {stat.sub}
      </p>
    </div>
  );
}

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-white border-b border-[rgba(44,34,20,0.08)]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[rgba(44,34,20,0.1)]"
        >
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} active={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
