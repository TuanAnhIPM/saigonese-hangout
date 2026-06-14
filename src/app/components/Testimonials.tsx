import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie & Tom",
    origin: "Melbourne, Australia",
    trip: "Hanoi & Hạ Long Bay, 10 days",
    avatar: "ST",
    color: "#2A4A2E",
    rating: 5,
    body: "I spent three evenings trying to plan Hanoi on my own and got nowhere. One WhatsApp message to VHO and within 24 hours I had a day-by-day plan that matched exactly what we wanted. We didn't think about logistics once.",
  },
  {
    name: "Kenji Tanaka",
    origin: "Tokyo, Japan",
    trip: "Hội An & Đà Nẵng, 7 days",
    avatar: "KT",
    color: "#C4622D",
    rating: 5,
    body: "As a solo traveller who is particular about food and photography, I was nervous. But VHO just got it — every restaurant, every light, every viewpoint was chosen like they knew me personally. Best trip I've taken.",
  },
  {
    name: "The Müller Family",
    origin: "Munich, Germany",
    trip: "South Vietnam, 12 days",
    avatar: "MF",
    color: "#2A4A2E",
    rating: 5,
    body: "Travelling with two kids and two grandparents sounds chaotic. VHO made it feel easy — the pacing was right for everyone, the accommodation was perfect, and the guide they chose for us became a family friend.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-[#F0C97A] fill-[#F0C97A]" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p
            className="text-[#C4622D] tracking-[0.2em] uppercase text-xs mb-4"
          >
            From travellers
          </p>
          <h2
            className="text-[#1C1A17]"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 500,
            }}
          >
            What people say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-[#F7F4F0] rounded-2xl p-7 border border-[rgba(44,34,20,0.08)] flex flex-col hover:shadow-md transition-shadow"
            >
              <Stars count={t.rating} />
              <p
                className="text-[#1C1A17] leading-relaxed mt-4 mb-6 flex-1"
                style={{
                  fontSize: "0.98rem",
                  fontStyle: "italic",
                }}
              >
                "{t.body}"
              </p>
              <div className="flex items-center gap-3 border-t border-[rgba(44,34,20,0.08)] pt-5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                  style={{ backgroundColor: t.color, fontWeight: 600 }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p
                    className="text-[#1C1A17] text-sm"
                    style={{ fontWeight: 500 }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[#6B5E4C] text-xs"
                  >
                    {t.origin} · {t.trip}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
