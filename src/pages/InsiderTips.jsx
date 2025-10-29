import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const InsiderTips = ({ theme }) => {
  const isMorning = theme === "morning";
  const paypalInvoiceLink = "https://www.paypal.com/invoice/p/#SX5BJMNA6ETYBN7P";
  const thankYouUrl = window.location.origin + "/insider/thank-you";

  useEffect(() => {
    // Handle return from PayPal (check for PayPal redirect parameters)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("paymentId") || urlParams.get("token") || urlParams.get("PayerID")) {
      // User returned from PayPal, redirect to thank-you page
      window.location.href = thankYouUrl;
    }

    // Try to add return URL (may work depending on PayPal invoice settings)
    const returnUrl = encodeURIComponent(thankYouUrl);
    const paypalLink =
      paypalInvoiceLink + (paypalInvoiceLink.includes("?") ? "&" : "?") + "return=" + returnUrl;

    const handlePaymentClick = () => {
      localStorage.setItem("paypal_payment_started", "true");
      window.open(paypalLink, "_blank", "noopener");
    };

    const btn = document.getElementById("primary-cta");
    if (btn) {
      btn.addEventListener("click", handlePaymentClick);
      return () => btn.removeEventListener("click", handlePaymentClick);
    }
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

            {/* Bullets */}
            <ul className={`space-y-3 mb-6 ${mutedColor}`}>
              {[
                "Hidden cafes and neighborhoods locals actually love",
                "Top 6 scams to avoid (and what to say instead)",
                "Best Grab routes to dodge traffic at rush hour",
                "Late-night eats: open after midnight and worth it",
                "Carry-on safety checklist and what to leave at home",
              ].map((item, i) => (
                <li
                  key={i}
                  className={`p-3 rounded-lg ${cardBgSecondary} text-sm sm:text-base`}
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-3 mb-4">
              <a
                id="primary-cta"
                href={paypalInvoiceLink}
                target="_blank"
                rel="noopener"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r ${brandColor} text-white shadow-lg hover:opacity-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  isMorning ? "focus-visible:ring-[#2d5016]" : "focus-visible:ring-[#4cc9f0]"
                }`}
              >
                Unlock with PayPal — $1.99
              </a>
              <Link
                to="/reviews"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold ${cardBgSecondary} ${textColor} border border-white/10 hover:opacity-80 transition-all`}
              >
                See all reviews
              </Link>
            </div>

            <p className={`text-xs sm:text-sm ${mutedColor}`}>
              After payment, you'll be redirected to your insider tips.{" "}
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

