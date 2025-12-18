import React from 'react';

const sections = [
  {
    id: 'culture',
    tag: 'Culture',
    title: 'Vietnam – A vibrant tapestry of tradition and modern life',
    image:
      'https://images.pexels.com/photos/2724664/pexels-photo-2724664.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Ancient Vietnamese temple with traditional architecture',
    excerpt:
      'From northern village communal houses and Hoi An Ancient Town to tiny alley cafés in Saigon, Vietnamese culture is a subtle blend of old and new.',
    bullets: [
      'Walk through small alleys to see authentic local life.',
      'Spend at least one slow morning in a local café to feel the city rhythm.',
      'Visit a morning market in every region you travel through.',
    ],
  },
  {
    id: 'food',
    tag: 'Food',
    title: 'Vietnamese food – Every dish tells a story',
    image:
      'https://images.pexels.com/photos/6612807/pexels-photo-6612807.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Vietnamese dishes on a shared table',
    excerpt:
      'Phở, Bún Bò Huế, Cơm Tấm, Bánh Mì, spring rolls… are not just delicious, they also tell stories about regions, history, and daily life.',
    bullets: [
      'Choose busy spots with lots of locals – food is usually fresher and better.',
      'Ask locals what they like to eat, not just what appears on apps.',
      'Don’t skip clean-looking street stalls – they are Vietnam’s real “million-star restaurants”.',
    ],
  },
  {
    id: 'people',
    tag: 'People',
    title: 'Vietnamese people – Warm, adaptable and full of stories',
    image:
      'https://images.pexels.com/photos/6561160/pexels-photo-6561160.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Smiling Vietnamese people on the street',
    excerpt:
      'What stays with you after a trip is rarely just the landscape, but the smiles and stories of people you meet along the way.',
    bullets: [
      'Don’t be shy to start a conversation – many young locals speak basic English.',
      'Learn a few simple phrases like “xin chào” (hello), “cảm ơn” (thank you), “ngon quá” (so tasty).',
      'Dress respectfully when visiting temples and pagodas.',
    ],
  },
  {
    id: 'tips',
    tag: 'Travel Tips',
    title: 'Traveling Vietnam – Small details that matter a lot',
    image:
      'https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Traveler holding a map exploring the city',
    excerpt:
      'A bit of preparation makes your journey in Vietnam smoother, safer, and much more enjoyable.',
    bullets: [
      'Download ride-hailing apps, offline maps, and a translation app before you arrive.',
      'Drink bottled water, pack basic medicine and sunscreen.',
      'Always confirm prices in advance for services without clear price lists.',
    ],
  },
];

const itineraries = [
  {
    title: '7 days – North to South snapshot',
    days: 'Hanoi – Ninh Binh – Hoi An – Saigon',
    desc: 'A compact but rich route combining heritage, landscapes, and big-city energy.',
  },
  {
    title: '3–4 days – Slow Saigon experience',
    days: 'Districts 1 – 3 – 4 – 5 – Binh Thanh',
    desc: 'Coffee, local markets, street food and night streets – just enough to feel Saigon like a local.',
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900">
      {/* Hero Section (giống vibe Night/Morning) */}
      <div className="relative h-[45vh] sm:h-[55vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Đường phố Việt Nam buổi tối với ánh đèn và xe cộ tấp nập"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Saigonese Hang-out Blog
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              Culture, food, people &amp; travel tips across Vietnam – shared from the perspective
              of young locals living in Saigon.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section (card style giống Night/Morning) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
            Go beyond a checklist and really feel Vietnam
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Instead of rushing through a list of “must-see spots”, we invite you to slow down –
            listen to people’s stories, taste street food properly, and actually feel the rhythm
            of this place.
          </p>
        </div>

        {/* Sections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section) => (
            <article
              key={section.id}
              className="max-w-xl mx-auto rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-gray-800/90 border border-gray-700"
            >
              <div className="h-40 sm:h-44 w-full overflow-hidden">
                <img
                  src={section.image}
                  alt={section.alt}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-purple-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-200">
                    {section.tag}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {section.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-200 mb-3">{section.excerpt}</p>
                <ul className="mt-auto space-y-1.5 text-sm text-gray-300">
                  {section.bullets.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Itineraries */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Short itinerary ideas to really feel Vietnam
          </h2>
          <p className="text-gray-300 mb-5 text-sm sm:text-base max-w-3xl">
            You can combine Saigonese Hang-out tours with your own plans to create a balanced
            experience between exploring, resting, and connecting with locals.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {itineraries.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-700 bg-gray-800/90 p-4 sm:p-5 shadow-lg"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs uppercase tracking-wide text-purple-200 mb-2">
                  {item.days}
                </p>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing note */}
        <section className="border-t border-gray-700 pt-6 mt-4 mb-2">
          <p className="text-sm sm:text-base text-gray-300">
            This is just a starting point. On our tours we share more behind-the-scenes stories,
            local perspectives, and “off-the-beaten-path” spots you won’t easily find on big
            platforms. If there is any topic you want us to go deeper on (Vietnamese coffee,
            nightlife, Saigon then vs now…), just reach out to Saigonese Hang-out!
          </p>
        </section>
      </div>
    </div>
  );
};

export default Blog;


