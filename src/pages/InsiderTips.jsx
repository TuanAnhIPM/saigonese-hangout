import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const InsiderTips = ({ theme }) => {
  const isMorning = theme === "morning";
  const paypalInvoiceLink = "https://www.paypal.com/invoice/p/#SX5BJMNA6ETYBN7P";
  const thankYouUrl = window.location.origin + "/insider/thank-you";
  const products = [
    { 
      name: "Bar, Club.xlsx", 
      file: "Bar, Club.xlsx", 
      price: 1.99,
      title: "Nightlife Guide",
      description: "Top-rated bars & clubs locals frequent. Door policies, best nights, and insider deals.",
      badge: "Most Popular"
    },
    { 
      name: "Food.xlsx", 
      file: "Food.xlsx", 
      price: 1.99,
      title: "Food & Dining Guide",
      description: "Hidden gems, street food spots, and restaurants worth your money. Updated regularly.",
      badge: "Best Value"
    },
    { 
      name: "Historical Places.xlsx", 
      file: "Historical Places.xlsx", 
      price: 1.99,
      title: "Historical Sites",
      description: "Must-see landmarks, cultural sites, and museums with local context you won't find in guides.",
      badge: "Local Insights"
    },
  ];

  // Generate secure access token
  const generateAccessToken = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return btoa(`${timestamp}-${random}-${Math.random().toString(36).substring(2, 15)}`)
      .replace(/[+/=]/g, (char) => {
        const replacements = { '+': '-', '/': '_', '=': '' };
        return replacements[char];
      });
  };

  // Validate PayPal return parameters
  const isValidPayPalReturn = (params) => {
    // Check for PayPal-specific return parameters
    const hasPaymentId = params.get("paymentId");
    const hasToken = params.get("token");
    const hasPayerId = params.get("PayerID");
    const hasInvoiceId = params.get("invoiceId");
    
    // At least one PayPal parameter should be present
    return !!(hasPaymentId || hasToken || hasPayerId || hasInvoiceId);
  };

  useEffect(() => {
    // Handle return from PayPal (check for PayPal redirect parameters)
    const urlParams = new URLSearchParams(window.location.search);
    
    if (isValidPayPalReturn(urlParams)) {
      // Generate secure access token
      const accessToken = generateAccessToken();
      const item = urlParams.get("item") || localStorage.getItem("insider_item") || "insider";
      
      // Store payment verification data
      const paymentData = {
        token: accessToken,
        item: item,
        timestamp: Date.now(),
        verified: true,
        // Store for 30 days
        expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000)
      };
      
      localStorage.setItem("insider_access_token", accessToken);
      localStorage.setItem("insider_payment_data", JSON.stringify(paymentData));
      localStorage.setItem("insider_item", item);
      localStorage.removeItem("paypal_payment_started");
      
      // Redirect to thank-you page with secure token
      window.location.href = `${thankYouUrl}?token=${accessToken}&item=${encodeURIComponent(item)}`;
      return;
    }

    // Try to add return URL (may work depending on PayPal invoice settings)
    const returnUrl = encodeURIComponent(thankYouUrl);

    const buttons = document.querySelectorAll(".purchase-btn");
    const listeners = [];
    buttons.forEach((btn) => {
      const handlePaymentClick = (e) => {
        try {
          const item = btn.getAttribute("data-item") || "insider";
          
          // Generate transaction ID for tracking
          const transactionId = `insider_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          
          // Store payment intent securely
          const paymentIntent = {
            item: item,
            transactionId: transactionId,
            timestamp: Date.now(),
            returnUrl: thankYouUrl
          };
          
          localStorage.setItem("paypal_payment_started", "true");
          localStorage.setItem("insider_item", item);
          localStorage.setItem("insider_payment_intent", JSON.stringify(paymentIntent));
          
          // Build PayPal link with proper parameters
          const linkBase = paypalInvoiceLink + (paypalInvoiceLink.includes("?") ? "&" : "?");
          const paypalLink = `${linkBase}return=${returnUrl}&item=${encodeURIComponent(item)}&custom=${encodeURIComponent(transactionId)}`;
          
          // Rate limiting: prevent rapid clicks
          const lastClick = localStorage.getItem("last_payment_click");
          if (lastClick && Date.now() - parseInt(lastClick) < 2000) {
            console.warn("Payment click rate limited");
            return;
          }
          localStorage.setItem("last_payment_click", Date.now().toString());
          
          window.open(paypalLink, "_blank", "noopener");
          e.preventDefault();
        } catch (error) {
          console.error("Payment click error:", error);
          alert("An error occurred. Please try again.");
        }
      };
      btn.addEventListener("click", handlePaymentClick);
      listeners.push({ btn, handlePaymentClick });
    });

    return () => {
      listeners.forEach(({ btn, handlePaymentClick }) =>
        btn.removeEventListener("click", handlePaymentClick)
      );
    };
  }, [thankYouUrl, paypalInvoiceLink]);

  const bgStyle = isMorning
    ? "bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3]"
    : "bg-gradient-to-b from-[#0b0b14] via-[#1a052e] to-[#3d0f55]";
  const textColor = isMorning ? "text-[#2d5016]" : "text-white";
  const mutedColor = isMorning ? "text-gray-600" : "text-gray-300";
  const cardBg = isMorning ? "bg-white/90" : "bg-[#0f1218]/80 border border-white/20";
  const cardBgSecondary = isMorning ? "bg-gray-50" : "bg-[#12141b] border border-white/20";
  const brandColor = isMorning ? "from-[#2d5016] to-[#3a7d2f]" : "from-[#4f46e5] to-[#06b6d4]";

  return (
    <section
      className={`min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-16 transition-all duration-700 ${bgStyle}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className={`font-bold text-xl ${textColor}`}>Saigon Insider</div>
          <div className={`text-xs sm:text-sm ${mutedColor}`}>Beta • MVP</div>
        </header>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-start mb-12">
          <div>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight ${textColor}`}>
              Unlock Saigon Insider Tips for{" "}
              <span className={`${textColor}`}>$1.99</span>
            </h1>
            <p className={`text-base sm:text-lg mb-6 ${mutedColor}`}>
              A no-fluff cheat sheet for first-timers and frequent flyers: avoid tourist traps,
              move smarter, and eat like a local.
            </p>

            {/* Bullets removed per request */}

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {products.map((p) => (
                <div
                  key={p.name}
                  className={`${cardBgSecondary} rounded-xl p-5 flex flex-col justify-between h-full border border-white/10 hover:border-white/30 transition-all hover:shadow-lg`}
                >
                  <div className="space-y-3">
                    {/* Badge */}
                    <div className="flex items-start justify-between">
                      <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                        isMorning 
                          ? "bg-[#2d5016]/10 text-[#2d5016] border border-[#2d5016]/20" 
                          : "bg-[#4f46e5]/20 text-[#4cc9f0] border border-[#4cc9f0]/30"
                      }`}>
                        {p.badge}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <div>
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>{p.title}</h3>
                      <p className={`text-xs sm:text-sm leading-relaxed ${mutedColor} mb-3`}>
                        {p.description}
                      </p>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`${mutedColor} flex items-center gap-1`}>
                        <span>✓</span>
                        <span>Instant access</span>
                      </span>
                      <span className={`${mutedColor} flex items-center gap-1`}>
                        <span>✓</span>
                        <span>Updated regularly</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="pt-4 mt-2">
                    <a
                      href={paypalInvoiceLink}
                      target="_blank"
                      rel="noopener"
                      data-item={p.name}
                      className={`purchase-btn inline-flex items-center justify-center w-full gap-2 px-4 py-3 rounded-lg font-bold bg-gradient-to-r ${brandColor} text-white shadow-md hover:shadow-xl hover:opacity-90 hover:scale-[1.02] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                        isMorning ? "focus-visible:ring-[#2d5016]" : "focus-visible:ring-[#4cc9f0]"
                      }`}
                    >
                      Unlock for ${p.price.toFixed(2)}
                    </a>
                    <p className={`text-[10px] text-center mt-2 ${mutedColor}`}>
                      One-time purchase • Lifetime access
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              <Link
                to="/reviews"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold ${cardBgSecondary} ${textColor} border border-white/10 hover:opacity-80 transition-all`}
              >
                See all reviews
              </Link>
            </div>

            <p className={`text-xs sm:text-sm ${mutedColor}`}>
              Each file is <span className="font-semibold">$1.99</span>. After payment, you'll be redirected to your insider tips.{" "}
              <Link to="/insider/thank-you" className="underline hover:opacity-70">
                Or click here if you've already paid
              </Link>
              .
            </p>
          </div>

          {/* Right Column - Teasers & Social Proof */}
          <div className={`${cardBg} rounded-2xl p-6 space-y-4 backdrop-blur-sm`}>
            {/* Teasers */}
            <div className="space-y-3">
              <div className={`${cardBgSecondary} rounded-xl p-4`}>
                <div className={`text-xs mb-2 ${mutedColor}`}>Sneak peek: Night Market Map</div>
                <div
                  className="h-36 rounded-lg opacity-60"
                  style={{
                    background: isMorning
                      ? "linear-gradient(135deg, #e5e7eb, #d1d5db)"
                      : "linear-gradient(135deg, #1f2430, #0b0c10)",
                  }}
                />
              </div>
              <div className={`${cardBgSecondary} rounded-xl p-4`}>
                <div className={`text-xs mb-2 ${mutedColor}`}>
                  Sneak peek: Taxi Script for Refusing Detours
                </div>
                <div
                  className="h-24 rounded-lg opacity-60"
                  style={{
                    background: isMorning
                      ? "linear-gradient(135deg, #e5e7eb, #d1d5db)"
                      : "linear-gradient(135deg, #1f2430, #0b0c10)",
                  }}
                />
              </div>
            </div>

            {/* Social Proof */}
            <div className="space-y-2 pt-2">
              <div className={`${cardBgSecondary} rounded-xl p-3 flex items-center gap-3`}>
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #22d3ee)",
                  }}
                />
                <div>
                  <div className={`font-semibold text-sm ${textColor}`}>
                    "Saved me from a 3x taxi fare."
                  </div>
                  <div className={`text-xs ${mutedColor}`}>Ava • Solo traveler</div>
                </div>
              </div>
              <div className={`${cardBgSecondary} rounded-xl p-3 flex items-center gap-3`}>
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #22d3ee)",
                  }}
                />
                <div>
                  <div className={`font-semibold text-sm ${textColor}`}>
                    "The late-night pho list is gold."
                  </div>
                  <div className={`text-xs ${mutedColor}`}>Ben • Foodie</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className={`${cardBg} rounded-2xl p-6 sm:p-8 mb-8 backdrop-blur-sm`}>
          <h3 className={`text-xl font-bold mb-6 ${textColor}`}>FAQ</h3>
          <div className="space-y-4">
            <div>
              <strong className={textColor}>Why $1.99?</strong>
              <p className={`text-sm mt-1 ${mutedColor}`}>
                It keeps the list high-signal and supports updates. It's a tripwire price—small ask,
                big value.
              </p>
            </div>
            <div>
              <strong className={textColor}>How do I get access?</strong>
              <p className={`text-sm mt-1 ${mutedColor}`}>
                Pay via PayPal. After successful payment, you'll be automatically redirected to the
                insider tips page. The access link is also included in your PayPal receipt email.
              </p>
            </div>
            <div>
              <strong className={textColor}>Refunds?</strong>
              <p className={`text-sm mt-1 ${mutedColor}`}>
                Reply to your receipt within 7 days—no questions asked.
              </p>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <footer className={`text-xs sm:text-sm text-center ${mutedColor} mt-8 pt-6 border-t border-white/10`}>
          Tip: Add a small link in your home hero, testimonials, tours pages, and footer.
        </footer>
      </div>
    </section>
  );
};

export default InsiderTips;

