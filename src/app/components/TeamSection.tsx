import { motion } from "motion/react";

const team = [
  {
    name: "Linh Trần",
    role: "Co-founder · Hồ Chí Minh City expert",
    bio: "Born and raised in Saigon. Linh spent ten years in hospitality before deciding every traveller deserved her kind of local knowledge. She specialises in food, culture, and family trips.",
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=400&fit=crop&auto=format",
    languages: "Vietnamese · English · French",
  },
  {
    name: "Minh Hoàng",
    role: "Co-founder · Hanoi & North Vietnam",
    bio: "A historian at heart. Minh has guided tours across Hanoi's old quarter and the Northern highlands for twelve years. He designs every Hanoi itinerary with the depth of someone who grew up there.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
    languages: "Vietnamese · English · Japanese",
  },
  {
    name: "Mai Phương",
    role: "Destination specialist · Đà Nẵng & Central",
    bio: "Mai grew up between Hội An and Đà Nẵng and knows every hidden beach, every artisan workshop, every restaurant worth the table. She focuses on slow travel and photography-led trips.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format",
    languages: "Vietnamese · English",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-24 px-6 bg-[#FBF7F0]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p
            className="text-[#C4622D] tracking-[0.2em] uppercase text-xs mb-4"
          >
            The people behind your trip
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2
              className="text-[#1C1A17]"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Locals who know Vietnam <br />
              <em>like home.</em>
            </h2>
            <p
              className="text-[#6B5E4C] text-sm max-w-xs leading-relaxed"
            >
              We are not a call centre. You'll speak directly with a Vietnamese local
              who has walked every street they recommend.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-[#FBF7F0] rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <h3
                  className="text-[#1C1A17] mb-0.5"
                  style={{ fontSize: "1.1rem", fontWeight: 500 }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-[#C4622D] text-xs mb-3"
                  style={{ fontWeight: 500 }}
                >
                  {member.role}
                </p>
                <p
                  className="text-[#6B5E4C] text-sm leading-relaxed mb-4"
                >
                  {member.bio}
                </p>
                <p
                  className="text-[#1C1A17]/40 text-xs"
                >
                  {member.languages}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
