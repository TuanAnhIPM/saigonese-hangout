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
    { img: "/images/reviews/z6763788547158_acf65ece8d10df39383da0983eae1349.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763788806963_a2eadc97ec6bd319a9a8a52ff3e50e8e.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763789087560_b7a16cc10de227182696a3dc9f6c1c54.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763789357431_671ea0b6ca1d20e0dd0090bc4a45541f.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763789574774_f16535e5405f6ae22657bcf1e15f07b3.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763789817213_8b8fc2f9ad085816b4f2fcc5175a52e1.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763790058951_34a4321b94785940fe08377f0ac7ff5f.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763790277116_3f411317b958f27aa427b8ec279b5269.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763790648132_c8ec14deca8913fcbabb16bb1d038251.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763790863779_ef721defa7f67f5877e65ead85829f87.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763791013394_9dc4a679515fc9f76228f0c854d01f6e.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763791149450_b30bf76d7115497351884c1a173473d3.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763791242887_10b759cbe66166c109b069b540e51414.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763796568920_b8133c338b7e505093d5caeae534a4e5.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763796660666_16424b797b7cdd09d2a6e89cc13852fa.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763802175809_59a63fe933dbeba5adffc60b2ed987fe.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763802289877_77f080918c1e5f7574384b1d26c16a33.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763802684085_7d7fa35b4c38a95fb9ce11ee4610c62e.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763802959118_891d9acad1d2267f116faab9dd6b0cba.jpg", alt: "Customer review" },
    { img: "/images/reviews/z6763803221977_48464ba9d287a6d6dec513fe524b2523.jpg", alt: "Customer review" },
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

      {/* Review Images - Flexible Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ${
              isMorning ? "bg-white border border-gray-200" : "bg-white/10 border border-white/10"
            } cursor-pointer group flex items-center justify-center`}
          >
            <img
              src={r.img}
              alt={r.alt}
              className="w-full h-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
              loading="lazy"
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
