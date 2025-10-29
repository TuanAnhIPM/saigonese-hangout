import { Link } from "react-router-dom";

const TourCard = ({ title, desc, img, theme, slug }) => {
  // Check if this tour should have Basic and Premium options
  const hasBasicPremium = slug === "streetfood";
  // Check if this is a nightlife tour (only has premium option)
  const isNightlife = slug === "nightlife";
  // Check if this is a specialty tour (photography or cu-chi-motorcycle) that uses WhatsApp
  const isSpecialtyTour = slug === "photography" || slug === "cu-chi-motorcycle";
  const isHistory = slug === "history";

  const handleWhatsAppBooking = () => {
    const emoji = slug === "photography" ? "📸" : slug === "cu-chi-motorcycle" ? "🏍️" : "🎯";
    const message = `${emoji} *BOOK TOUR: ${title}*\n\n` +
      `📝 ${desc}\n\n` +
      `I would like to book the ${title}. Please provide more details and availability.\n\n` +
      `Thank you! ${emoji}🇻🇳`;
    
    const whatsappUrl = `https://wa.me/+84978270038?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className={`rounded-xl shadow-lg overflow-hidden hover:scale-105 transition border ${
        theme === "night"
          ? "border-white/20 bg-[#121212] text-white"
          : "border-gray-200 bg-white text-[#2d5016]"
      }`}
    >
      {/* Image links to detail page */}
      <Link to={isSpecialtyTour ? "#" : `/tours/${slug}`}>
        <img src={img} alt={title} className="w-full h-40 sm:h-48 object-cover" />
      </Link>

      <div className="p-4 sm:p-5 flex flex-col justify-between min-h-[140px] sm:min-h-[150px]">
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">{title}</h3>
          <p className="text-xs sm:text-sm opacity-100 mb-3 sm:mb-4 leading-relaxed">{desc}</p>
        </div>

        {/* Conditional Rendering: Basic & Premium OR Single Book Tour OR WhatsApp */}
        {hasBasicPremium ? (
          <div className="flex gap-2 sm:gap-3 justify-center">
            <Link
              to={`/booking/${slug}/basic`}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border font-medium transition text-sm sm:text-base ${
                theme === "night"
                  ? "border-white text-white hover:bg-white/10"
                  : "border-[#2d5016] text-[#2d5016] hover:bg-[#2d5016]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5016] focus-visible:ring-offset-2"
              }`}
            >
              Basic
            </Link>

            <Link
              to={`/booking/${slug}/premium`}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium transition text-sm sm:text-base ${
                theme === "night"
                  ? "bg-white text-[#0f3e2c] hover:bg-white/80"
                  : "bg-[#2d5016] text-white hover:bg-[#3a7d2f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5016] focus-visible:ring-offset-2"
              }`}
            >
              Premium
            </Link>
          </div>
        ) : (
          <div className="flex justify-center">
            {isSpecialtyTour ? (
              <button
                onClick={handleWhatsAppBooking}
                className={`w-full px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  theme === "night"
                    ? "bg-white text-[#2d5016] hover:bg-white/80 hover:shadow-lg focus-visible:ring-[#4cc9f0]"
                    : "bg-[#2d5016] text-white hover:bg-[#3a7d2f] hover:shadow-lg focus-visible:ring-[#2d5016]"
                }`}
              >
                Book Tour
              </button>
            ) : (
              <Link
                to={isNightlife ? `/booking/${slug}` : isHistory ? `/booking/${slug}` : `/booking/${slug}/basic`}
                className={`w-full px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  theme === "night"
                    ? "bg-white text-[#2d5016] hover:bg-white/80 hover:shadow-lg focus-visible:ring-[#4cc9f0]"
                    : "bg-[#2d5016] text-white hover:bg-[#3a7d2f] hover:shadow-lg focus-visible:ring-[#2d5016]"
                }`}
              >
                {isNightlife ? "Premium Tour" : "Book Tour"}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourCard;
