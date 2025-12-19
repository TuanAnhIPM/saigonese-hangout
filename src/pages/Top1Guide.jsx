import React from "react";
import Footer from "../components/Footer.jsx";

const Top1Guide = ({ theme }) => {
  const isMorning = theme === "morning";

  const reasons = [
    {
      icon: "🔥",
      title: "Passionate Young Team",
      description: "We're a team of passionate young Saigonese, full of energy and enthusiasm. Our love for our city drives us to share the best of Saigon with you."
    },
    {
      icon: "🗣️",
      title: "Excellent English Communication",
      description: "We speak excellent English because we want to share our Vietnamese pride and patriotism with international visitors. Communication is key to building genuine connections."
    },
    {
      icon: "🇻🇳",
      title: "Vietnamese Pride & Patriotism",
      description: "We're proud to be Vietnamese and passionate about promoting our country's beauty, culture, and spirit to visitors from around the world."
    },
    {
      icon: "🤝",
      title: "Beyond Just Tours - We're Friends",
      description: "This isn't just a tour that ends when it's over. We build lasting friendships. After your tour, we stay connected—you'll have friends in Saigon for life."
    },
    {
      icon: "💬",
      title: "Genuine Connections",
      description: "We believe in creating real, meaningful relationships. Whether you need recommendations, want to hang out again, or just want to chat—we're here for you."
    },
    {
      icon: "🌟",
      title: "Authentic Local Experiences",
      description: "Experience Saigon through the eyes of locals. We take you to places we actually go, share stories we actually care about, and show you the real Saigon we love."
    },
    {
      icon: "🎯",
      title: "Personalized & Flexible",
      description: "Every tour is tailored to your interests. We adapt, we listen, and we make sure you get the experience that matters most to you."
    },
    {
      icon: "📸",
      title: "Memories Captured",
      description: "We document your journey with photos, but more importantly, we create memories together that will last long after you've left Saigon."
    },
    {
      icon: "🛵",
      title: "Local Way to Explore",
      description: "Experience Saigon like a true local on our scooter tours. One person, one driver—safe, fun, and the most authentic way to see the city we call home."
    },
    {
      icon: "💚",
      title: "Giving Back",
      description: "10% of our proceeds go to Give.Asia, supporting meaningful causes across Asia. When you tour with us, you're also making a positive impact."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative w-full min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex items-center justify-center pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 ${
        isMorning ? "bg-gradient-to-br from-[#fffaf4] to-[#f0e6d2]" : "bg-gradient-to-br from-[#0b0b14] via-[#1a052e] to-[#3d0f55]"
      }`}>
        <div className="text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <div className={`inline-block text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 ${
            isMorning ? "text-[#c2a46b]" : "text-[#ffcd3c]"
          }`}>
            🇻🇳
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 ${
            isMorning ? "text-[#2d5016]" : "text-white"
          }`}>
            Meet Our{" "}
            <span className={isMorning ? "text-[#c2a46b]" : "text-[#ffcd3c]"}>
              Passionate Team
            </span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            isMorning ? "text-gray-700" : "text-gray-300"
          }`}>
            We're a team of passionate young Saigonese who speak excellent English because we want to share our Vietnamese pride and patriotism with international visitors. This isn't just a tour—we're building friendships that last beyond your visit.
          </p>
        </div>
      </section>

      {/* Reasons Section */}
      <section className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16 ${
        isMorning ? "bg-[#fffaf4] text-gray-800" : "bg-[#0b0b14] text-gray-200"
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isMorning
                    ? "bg-white text-gray-800 border border-gray-200"
                    : "bg-white/10 border border-white/20 text-gray-100 backdrop-blur-sm"
                }`}
              >
                <div className={`text-4xl sm:text-5xl mb-4 ${
                  isMorning ? "text-[#2d5016]" : "text-[#ffcd3c]"
                }`}>
                  {reason.icon}
                </div>
                <h3 className={`text-xl sm:text-2xl font-semibold mb-3 ${
                  isMorning ? "text-[#2d5016]" : "text-[#4cc9f0]"
                }`}>
                  {reason.title}
                </h3>
                <p className={`leading-relaxed text-sm sm:text-base ${
                  isMorning ? "text-gray-600" : "text-gray-300"
                }`}>
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16 ${
        isMorning ? "bg-white" : "bg-[#1a052e]"
      }`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 text-center ${
            isMorning ? "text-[#2d5016]" : "text-white"
          }`}>
            Our Story
          </h2>
          <div className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg ${
            isMorning
              ? "bg-[#fffaf4] text-gray-800 border border-gray-200"
              : "bg-white/10 border border-white/20 text-gray-100 backdrop-blur-sm"
          }`}>
            <p className={`text-base sm:text-lg md:text-xl leading-relaxed mb-6 ${
              isMorning ? "text-gray-700" : "text-gray-200"
            }`}>
              We're not just another tour company. We're a group of passionate young Saigonese who believe in the power of connection and cultural exchange.
            </p>
            <p className={`text-base sm:text-lg md:text-xl leading-relaxed mb-6 ${
              isMorning ? "text-gray-700" : "text-gray-200"
            }`}>
              <strong className={isMorning ? "text-[#2d5016]" : "text-[#4cc9f0]"}>Why we speak excellent English?</strong> Because we want to share our Vietnamese pride and patriotism with international visitors. We're proud to be Vietnamese, and we want the world to see the beauty, culture, and spirit of our country.
            </p>
            <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${
              isMorning ? "text-gray-700" : "text-gray-200"
            }`}>
              <strong className={isMorning ? "text-[#2d5016]" : "text-[#4cc9f0]"}>Most importantly:</strong> This isn't just a tour that ends when it's over. We build lasting friendships. After your tour, we stay connected—you'll have friends in Saigon for life. Need recommendations? Want to hang out again? Just want to chat? We're here for you, always.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16 text-center ${
        isMorning ? "bg-gradient-to-br from-[#fffaf4] to-[#f0e6d2]" : "bg-gradient-to-br from-[#0b0b14] via-[#1a052e] to-[#3d0f55]"
      }`}>
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 ${
            isMorning ? "text-[#2d5016]" : "text-white"
          }`}>
            Ready to Make Friends in Saigon?
          </h2>
          <p className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed ${
            isMorning ? "text-gray-700" : "text-gray-300"
          }`}>
            Join us for an authentic experience and leave with new friends. We're not just showing you Saigon—we're inviting you into our community. Book your tour today and start building friendships that last!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tours"
              className={`inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isMorning
                  ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f] focus-visible:ring-[#2d5016]"
                  : "bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white hover:opacity-90 focus-visible:ring-[#4cc9f0]"
              }`}
            >
              Explore Our Tours
            </a>
            <a
              href="/contact"
              className={`inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isMorning
                  ? "bg-white text-[#2d5016] border-2 border-[#2d5016] hover:bg-[#f0e6d2] focus-visible:ring-[#2d5016]"
                  : "bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 focus-visible:ring-white"
              }`}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer theme={theme} />
    </div>
  );
};

export default Top1Guide;
