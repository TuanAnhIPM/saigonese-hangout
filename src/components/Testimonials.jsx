import React from "react";
import { Link } from "react-router-dom";

const Testimonials = ({ theme }) => {
  const isMorning = theme === "morning";

  const reviews = [
    { img: "/images/reviews/799b02374d80fadea391.jpg", alt: "Customer review" },
    { img: "/images/reviews/a641bbeef75940071948.jpg", alt: "Customer review" },
    { img: "/images/reviews/e6d93be51352a40cfd43.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763787743073_344d1cb3dd087785237067c1ebdb2811.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763787842101_05659e45c2a19a170393e8ab0391271b.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763787958687_4e090ae3cf10a35f2997ed414db25d63.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763788107305_14dd713a5bb4f278c34597cb76c938da.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763788306323_c58597856098a86e3dfc1314ffc88598.jpg", alt: "Customer review" },
  ];

  return (
    <section
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16 text-center transition-all duration-700 ${
        isMorning ? "bg-[#f9f9f9] text-gray-800" : "bg-[#0b0b14] text-white"
      }`}
    >
      <h2
        className={`text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 ${
          isMorning ? "text-[#2d5016]" : "text-[#4cc9f0]"
        }`}
      >
        What Our Guests Say
      </h2>

      <p
        className={`mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base ${
          isMorning ? "text-gray-600" : "text-gray-300"
        }`}
      >
        Real experiences shared by travelers who joined our Saigonese Hang-out
        tours.
      </p>

      {/* Review Images */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {reviews.map((r, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:scale-105 transition-transform ${
              isMorning ? "bg-white" : "bg-white/10 border border-white/10"
            }`}
          >
            <img
              src={r.img}
              alt={r.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="mt-8 sm:mt-10">
        <Link
          to="/reviews"
          className={`inline-block font-semibold px-5 sm:px-6 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            isMorning
              ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f] focus-visible:ring-[#2d5016]"
              : "bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white hover:opacity-90 focus-visible:ring-[#4cc9f0]"
          }`}
        >
          See More Reviews →
        </Link>
      </div>

      <p
        className={`mt-4 sm:mt-6 text-xs sm:text-sm ${
          isMorning ? "text-gray-500" : "text-gray-400"
        }`}
      >
        *All reviews are authentic screenshots shared by our customers.
      </p>
    </section>
  );
};

export default Testimonials;
