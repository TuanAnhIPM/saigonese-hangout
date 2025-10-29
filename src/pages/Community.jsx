import React from "react";
import { Link } from "react-router-dom";

const CommunitySection = ({ theme }) => {
  const isMorning = theme === "morning";

  return (
    <section
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16 text-center transition-all duration-700 ${
        isMorning
          ? "bg-[#fffaf4] text-[#2d5016]"
          : "bg-[#0b0b14] text-white"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 ${
            isMorning ? "text-[#2d5016]" : "text-[#4cc9f0]"
          }`}
        >
          Saigon for Saigon ❤️
        </h2>

        <p
          className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 ${
            isMorning ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Every time you book a tour with <span className="font-semibold">Saigonese Hang-out</span>,
          we sponsor <span className="text-[#c2a46b] font-semibold">one meal </span> 
          for a homeless person in Ho Chi Minh City.  
          It's our way of sharing not only the stories of this city — 
          but also its warmth.
        </p>

        <div
          className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg mt-4 sm:mt-6 ${
            isMorning
              ? "bg-white text-gray-800"
              : "bg-white/10 border border-white/20 text-gray-100 backdrop-blur-sm"
          }`}
        >
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
            You explore Saigon.  
            Someone else gets a hot meal.  
            <span
              className={`block mt-2 font-semibold ${
                isMorning ? "text-[#0f3e2c]" : "text-[#ffcd3c]"
              }`}
            >
              That's what community means.
            </span>
          </p>

          <Link
            to="/tours"
            className={`inline-block font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl transition text-sm sm:text-base ${
              isMorning
                ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5016] focus-visible:ring-offset-2"
                : "bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4cc9f0] focus-visible:ring-offset-2"
            }`}
          >
            Book a Tour → Give a Meal
          </Link>
        </div>

        <p
          className={`mt-8 sm:mt-10 text-xs sm:text-sm ${
            isMorning ? "text-gray-500" : "text-gray-400"
          }`}
        >
          *Part of our "Saigon Shares" initiative in collaboration with local kitchens & volunteers.
        </p>
      </div>
    </section>
  );
};

export default CommunitySection;
