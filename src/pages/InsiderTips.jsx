import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const InsiderTips = ({ theme }) => {
  const isMorning = theme === "morning";
  const [searchParams] = useSearchParams();
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  // PayPal configuration
  const paypalInvoiceLink = "https://www.paypal.com/ncp/payment/EC5ZGXT2TUN4L";
  const thankYouUrl = window.location.origin + "/insider/thank-you";

  // Handle PayPal payment click
  useEffect(() => {
    const buttons = document.querySelectorAll(".purchase-btn");
    const listeners = [];

    buttons.forEach((btn) => {
      const handlePaymentClick = (e) => {
        try {
          const item = btn.getAttribute("data-item") || "insider";
          
          const transactionId = `insider_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          
          const paymentIntent = {
            item: item,
            transactionId: transactionId,
            timestamp: Date.now(),
            returnUrl: thankYouUrl
          };
          
          localStorage.setItem("paypal_payment_started", "true");
          localStorage.setItem("insider_item", item);
          localStorage.setItem("insider_payment_intent", JSON.stringify(paymentIntent));
          
          const returnUrl = encodeURIComponent(thankYouUrl);
          const linkBase = paypalInvoiceLink + (paypalInvoiceLink.includes("?") ? "&" : "?");
          const paypalLink = `${linkBase}return=${returnUrl}&item=${encodeURIComponent(item)}&custom=${encodeURIComponent(transactionId)}`;
          
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
  }, [paypalInvoiceLink, thankYouUrl]);

  // Apply coupon
  const applyCoupon = () => {
    const code = (coupon || '').trim().toUpperCase();
    if (code === 'TOIBIGAY') {
      setCouponMsg('Coupon applied. Redirecting...');
      const token = btoa('coupon-' + Date.now()).replace(/=+$/, '');
      const paymentData = {
        token,
        item: 'insider',
        timestamp: Date.now(),
        verified: true,
        expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000)
      };
      localStorage.setItem('insider_access_token', token);
      localStorage.setItem('insider_payment_data', JSON.stringify(paymentData));
      localStorage.setItem('insider_item', 'insider');
      window.location.href = `${thankYouUrl}?token=${encodeURIComponent(token)}&item=insider`;
    } else {
      setCouponMsg('Invalid coupon');
    }
  };

  const bgStyle = isMorning
    ? "bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3]"
    : "bg-gradient-to-b from-[#0b0b14] via-[#1a052e] to-[#3d0f55]";
  const textColor = isMorning ? "text-[#2d5016]" : "text-white";
  const mutedColor = isMorning ? "text-gray-600" : "text-gray-300";
  const cardBg = isMorning ? "bg-white/90" : "bg-[#0f1218]/80 border border-white/20";
  const cardBgSecondary = isMorning ? "bg-gray-50" : "bg-[#12141b] border border-white/20";
  const brandColor = isMorning ? "from-[#2d5016] to-[#3a7d2f]" : "from-[#4f46e5] to-[#06b6d4]";

  return (
    <section className={`min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-16 transition-all duration-700 ${bgStyle}`}>
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
              <span className={`${textColor}`}>$4.99</span>
            </h1>
            <p className={`text-base sm:text-lg mb-6 ${mutedColor}`}>
              A no-fluff cheat sheet for first-timers and frequent flyers: avoid tourist traps,
              move smarter, and eat like a local.
            </p>

            {/* Product Card */}
            <div className={`${cardBgSecondary} rounded-xl p-5 flex flex-col justify-between h-full border border-white/10 hover:border-white/30 transition-all hover:shadow-lg mb-4`}>
              <div className="space-y-3">
                {/* Badge */}
                <div className="flex items-start justify-between">
                  <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                    isMorning 
                      ? "bg-[#2d5016]/10 text-[#2d5016] border border-[#2d5016]/20" 
                      : "bg-[#4f46e5]/20 text-[#4cc9f0] border border-[#4cc9f0]/30"
                  }`}>
                    Limited Promo
                  </span>
                </div>
                
                {/* Title */}
                <div>
                  <h3 className={`text-lg font-bold ${textColor} mb-2`}>Ultimate Saigon Insider Guide</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${mutedColor} mb-3`}>
                    Skip tourist traps, save money, and move like a local. Hand‑picked spots, scripts that work, and late‑night lifesavers.
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-sm line-through opacity-60 ${mutedColor}`}>$9.99</span>
                    <span className="text-lg font-extrabold text-emerald-400">$4.99</span>
                  </div>
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
                  data-item="insider"
                  className={`purchase-btn inline-flex items-center justify-center w-full gap-2 px-4 py-3 rounded-lg font-bold bg-gradient-to-r ${brandColor} text-white shadow-md hover:shadow-xl hover:opacity-90 hover:scale-[1.02] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isMorning ? "focus-visible:ring-[#2d5016]" : "focus-visible:ring-[#4cc9f0]"
                  }`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.203c-.076.47-.497.82-.974.82Z"/>
                  </svg>
                  Pay with PayPal - $4.99
                </a>
                <p className={`text-[10px] text-center mt-2 ${mutedColor}`}>
                  One-time purchase • Lifetime access • Promo ends soon
                </p>
              </div>
            </div>

            {/* Coupon */}
            <div className="flex items-center gap-2 mb-4">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className={`px-3 py-2 rounded-lg border ${isMorning ? 'border-gray-300 bg-white text-black' : 'border-white/20 bg-[#0f1218] text-white'} outline-none flex-1`}
              />
              <button
                onClick={applyCoupon}
                className={`px-4 py-2 rounded-lg font-semibold bg-gradient-to-r ${brandColor} text-white`}
              >
                Apply Coupon
              </button>
            </div>
            {couponMsg && (
              <p className={`text-sm mb-4 ${couponMsg.includes('Invalid') ? 'text-red-400' : mutedColor}`}>
                {couponMsg}
              </p>
            )}

            <p className={`text-xs sm:text-sm ${mutedColor}`}>
              Each file is <span className="font-semibold">$4.99</span>. After payment, you'll be redirected to your insider tips.{" "}
              <a href={thankYouUrl} className="underline hover:opacity-70">
                Or click here if you've already paid
              </a>
              .
            </p>
          </div>

          {/* Right Column - Teasers & Social Proof */}
          <div className={`${cardBg} rounded-2xl p-6 space-y-4 backdrop-blur-sm`}>
            {/* Teasers */}
            <div className="space-y-3">
              <div className={`${cardBgSecondary} rounded-xl p-4`}>
                <div className={`text-xs mb-2 ${mutedColor}`}>Sneak peek: Food Stops with Maps</div>
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
                  Sneak peek: Insider Tips & Tricks
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
                    "The food stops list is gold."
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
              <strong className={textColor}>Why $4.99?</strong>
              <p className={`text-sm mt-1 ${mutedColor}`}>
                It keeps the list high-signal and supports updates. Still a small ask for big value.
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
      </div>
    </section>
  );
};

export default InsiderTips;
