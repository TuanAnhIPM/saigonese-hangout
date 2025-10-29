import React from "react";

const IMAGES = [
  "/images/reviews/review1.jpg",
  "/images/reviews/review2.jpg",
  "/images/reviews/review3.jpg",
  "/images/reviews/review4.jpg",
];

const Reviews = ({ theme }) => {
  const textColor = theme === "night" ? "text-white" : "text-[#0f3e2c]";
  const subColor = theme === "night" ? "text-gray-300" : "text-gray-600";
  const cardBg = theme === "night" ? "bg-[#120d1a]/40" : "bg-white";

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${textColor}`}>Customer Reviews</h1>
      <p className={`mb-8 ${subColor}`}>
        Authentic screenshots from our customers. Thanks for the love!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {IMAGES.map((src, i) => (
          <div key={i} className={`relative rounded-xl overflow-hidden shadow ${cardBg} border border-white/10`}>
            <img src={src} alt={`Review ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs sm:text-sm px-2 py-1 rounded">
              Review {i + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;


