import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer.jsx";

const TourCard = ({ title, desc, price, originalPrice, duration, highlights, faqInfo, theme, slug }) => {
  // Check if this tour should have Basic and Premium options (removed streetfood)
  const hasBasicPremium = false; // No longer offering Basic/Premium options
  // Check if this is a nightlife tour (only has premium option)
  const isNightlife = slug === "nightlife";
  // Check if this is a specialty tour (photography or cu-chi-motorcycle) that uses WhatsApp
  const isSpecialtyTour = slug === "photography" || slug === "cu-chi-motorcycle";
  const isHistory = slug === "history";
  const isMorning = theme === "morning";

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
      className={`rounded-2xl shadow-xl overflow-visible hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative h-full flex flex-col ${
        theme === "night"
          ? "bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 text-white"
          : "bg-white border border-gray-200 text-[#2d5016]"
      }`}
    >
      {/* Price Circle - Top Right */}
      {price && (
        <div className="absolute -top-8 -right-3 z-10">
          {originalPrice && (
            <div className="absolute -top-3 -left-3 z-20">
              <span className={`inline-block px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-full shadow-xl border-2 ${
                isMorning ? "bg-red-500 text-white border-white" : "bg-red-500 text-white border-white"
              }`}>
                20% OFF
              </span>
            </div>
          )}
          <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 ${
            isMorning 
              ? "bg-gradient-to-br from-[#2d5016] to-[#3a7d2f] text-white border-white/20" 
              : "bg-gradient-to-br from-[#4cc9f0] to-[#4361ee] text-white border-white/20"
          }`}>
            {originalPrice && (
              <span className="text-[9px] sm:text-xs line-through opacity-70 mb-0.5 font-medium">
                ${originalPrice.replace('$', '')}
              </span>
            )}
            <div className="flex items-baseline justify-center leading-none">
              <span className="text-2xl sm:text-3xl font-bold">$</span>
              <span className="text-2xl sm:text-3xl font-extrabold">
                {price.replace('$', '')}
              </span>
            </div>
            {duration && (
              <span className="text-[9px] sm:text-[10px] opacity-90 mt-1 font-medium">
                {duration}
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className={`p-6 sm:p-7 flex flex-col flex-1 text-center ${price ? 'pt-14 sm:pt-16' : ''}`}>
        {/* Header Section */}
        <div className="mb-5">
          {/* Title */}
          <Link to={
            isSpecialtyTour ? "#" 
            : slug === "streetfood" 
            ? `/booking/${slug}/premium`
            : `/tours/${slug}`
          }>
            <h3 className={`text-xl sm:text-2xl font-bold mb-3 leading-tight hover:opacity-80 transition ${
              isMorning ? "text-[#2d5016]" : "text-white"
            }`}>
              {title}
            </h3>
          </Link>
          
          {/* Countdown Timer for Street Food Tour */}
          {slug === "streetfood" && originalPrice && (
            <div className="mb-3 flex justify-center">
              <CountdownTimer 
                endDate="2025-12-22T23:59:59" 
                theme={theme}
              />
            </div>
          )}

          {/* Description */}
          {desc && (
            <p className={`text-sm leading-relaxed ${
              isMorning ? "text-gray-600" : "text-gray-300"
            }`}>
              {desc}
            </p>
          )}
        </div>

        {/* Highlights - Only show if no FAQ info */}
        {!faqInfo && highlights && highlights.length > 0 && (
          <div className="mb-5 flex-grow">
            <div className={`space-y-2 ${isMorning ? "text-gray-700" : "text-gray-300"}`}>
              {highlights.slice(0, 5).map((highlight, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-center gap-2.5 p-2 rounded-lg ${
                    isMorning 
                      ? "bg-gray-50 hover:bg-gray-100" 
                      : "bg-white/5 hover:bg-white/10"
                  } transition-colors`}
                >
                  <span className={`flex-shrink-0 text-base font-bold ${isMorning ? "text-green-600" : "text-green-400"}`}>
                    ✓
                  </span>
                  <span className={`text-sm leading-relaxed text-center ${isMorning ? "text-gray-700" : "text-gray-200"}`}>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Info - Beautiful Grid with Cards */}
        {faqInfo && (
          <div className="mb-5">
            <div className="grid grid-cols-2 gap-2.5">
              {faqInfo.stops && (
                <div className={`rounded-lg p-2.5 ${
                  isMorning 
                    ? "bg-green-50 border border-green-100" 
                    : "bg-green-900/20 border border-green-700/30"
                }`}>
                  <div className="text-xl mb-1">📍</div>
                  <div className={`text-xs font-semibold ${
                    isMorning ? "text-gray-800" : "text-gray-200"
                  }`}>
                    {faqInfo.stops}
                  </div>
                </div>
              )}
              {faqInfo.dishes && (
                <div className={`rounded-lg p-2.5 ${
                  isMorning 
                    ? "bg-orange-50 border border-orange-100" 
                    : "bg-orange-900/20 border border-orange-700/30"
                }`}>
                  <div className="text-xl mb-1">🍜</div>
                  <div className={`text-xs font-semibold ${
                    isMorning ? "text-gray-800" : "text-gray-200"
                  }`}>
                    {faqInfo.dishes}
                  </div>
                </div>
              )}
              {faqInfo.transportation && (
                <div className={`rounded-lg p-2.5 ${
                  isMorning 
                    ? "bg-blue-50 border border-blue-100" 
                    : "bg-blue-900/20 border border-blue-700/30"
                }`}>
                  <div className="text-xl mb-1">🏍️</div>
                  <div className={`text-xs font-semibold leading-tight ${
                    isMorning ? "text-gray-800" : "text-gray-200"
                  }`}>
                    {faqInfo.transportation}
                  </div>
                </div>
              )}
              {faqInfo.startTime && (
                <div className={`rounded-lg p-2.5 ${
                  isMorning 
                    ? "bg-purple-50 border border-purple-100" 
                    : "bg-purple-900/20 border border-purple-700/30"
                }`}>
                  <div className="text-xl mb-1">⏰</div>
                  <div className={`text-xs font-semibold leading-tight ${
                    isMorning ? "text-gray-800" : "text-gray-200"
                  }`}>
                    {faqInfo.startTime}
                  </div>
                </div>
              )}
              {faqInfo.vegetarianOption && (
                <div className={`rounded-lg p-2.5 ${
                  isMorning 
                    ? "bg-emerald-50 border border-emerald-100" 
                    : "bg-emerald-900/20 border border-emerald-700/30"
                }`}>
                  <div className="text-xl mb-1">🥬</div>
                  <div className={`text-xs font-semibold ${
                    isMorning ? "text-gray-800" : "text-gray-200"
                  }`}>
                    {faqInfo.vegetarianOption}
                  </div>
                </div>
              )}
              {faqInfo.kosherOption && (
                <div className={`rounded-lg p-2.5 ${
                  isMorning 
                    ? "bg-amber-50 border border-amber-100" 
                    : "bg-amber-900/20 border border-amber-700/30"
                }`}>
                  <div className="text-xl mb-1">✡️</div>
                  <div className={`text-xs font-semibold ${
                    isMorning ? "text-gray-800" : "text-gray-200"
                  }`}>
                    {faqInfo.kosherOption}
                  </div>
                </div>
              )}
              {faqInfo.guide && (
                <div className={`rounded-lg p-2.5 ${
                  isMorning 
                    ? "bg-cyan-50 border border-cyan-100" 
                    : "bg-cyan-900/20 border border-cyan-700/30"
                }`}>
                  <div className="text-xl mb-1">👨‍🏫</div>
                  <div className={`text-xs font-semibold ${
                    isMorning ? "text-gray-800" : "text-gray-200"
                  }`}>
                    {faqInfo.guide}
                  </div>
                </div>
              )}
              {faqInfo.photos && (
                <div className={`rounded-lg p-2.5 ${
                  isMorning 
                    ? "bg-pink-50 border border-pink-100" 
                    : "bg-pink-900/20 border border-pink-700/30"
                }`}>
                  <div className="text-xl mb-1">📸</div>
                  <div className={`text-xs font-semibold ${
                    isMorning ? "text-gray-800" : "text-gray-200"
                  }`}>
                    {faqInfo.photos}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-auto pt-4">
          {hasBasicPremium ? (
            <div className="flex gap-2.5">
              <Link
                to={`/booking/${slug}/basic`}
                className={`flex-1 px-4 py-2.5 rounded-xl border-2 font-semibold transition-all text-sm text-center ${
                  theme === "night"
                    ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                    : "border-[#2d5016]/30 text-[#2d5016] hover:bg-[#2d5016]/5 hover:border-[#2d5016]/50"
                }`}
              >
                Basic
              </Link>
              <Link
                to={`/booking/${slug}/premium`}
                className={`flex-1 px-4 py-2.5 rounded-xl font-semibold transition-all text-sm text-center shadow-md hover:shadow-lg ${
                  theme === "night"
                    ? "bg-gradient-to-r from-[#4cc9f0] to-[#4361ee] text-white hover:opacity-90"
                    : "bg-gradient-to-r from-[#2d5016] to-[#3a7d2f] text-white hover:opacity-90"
                }`}
              >
                Premium
              </Link>
            </div>
          ) : (
            <>
              {isSpecialtyTour ? (
                <button
                  onClick={handleWhatsAppBooking}
                  className={`w-full px-6 py-3.5 rounded-xl font-bold text-base text-center shadow-lg hover:shadow-xl transition-all duration-300 ${
                    theme === "night"
                      ? "bg-gradient-to-r from-white to-gray-100 text-[#2d5016] hover:scale-[1.02]"
                      : "bg-gradient-to-r from-[#2d5016] to-[#3a7d2f] text-white hover:scale-[1.02]"
                  }`}
                >
                  Book Tour
                </button>
              ) : (
                <Link
                  to={
                    isNightlife 
                      ? `/booking/${slug}` 
                      : isHistory 
                      ? `/booking/${slug}` 
                      : slug === "streetfood"
                      ? `/booking/${slug}/premium`
                      : `/booking/${slug}/basic`
                  }
                  className={`w-full px-6 py-3.5 rounded-xl font-bold text-base text-center shadow-lg hover:shadow-xl transition-all duration-300 ${
                    theme === "night"
                      ? "bg-gradient-to-r from-[#4cc9f0] to-[#4361ee] text-white hover:scale-[1.02]"
                      : "bg-gradient-to-r from-[#2d5016] to-[#3a7d2f] text-white hover:scale-[1.02]"
                  }`}
                >
                  {isNightlife ? "Premium Tour" : "Book Tour"}
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourCard;
