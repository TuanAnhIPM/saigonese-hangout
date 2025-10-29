import React, { useRef } from "react";
import { Link } from "react-router-dom";

const InsiderTipsThankYou = ({ theme }) => {
  const isMorning = theme === "morning";
  const tipsRef = useRef(null);

  const bgStyle = isMorning
    ? "bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3]"
    : "bg-gradient-to-b from-[#0b0b14] via-[#1a052e] to-[#3d0f55]";
  const textColor = isMorning ? "text-[#2d5016]" : "text-white";
  const mutedColor = isMorning ? "text-gray-600" : "text-gray-300";
  const cardBg = isMorning ? "bg-white/90" : "bg-[#0f1218]/80 border border-white/20";
  const cardBgSecondary = isMorning ? "bg-gray-50" : "bg-[#11141b] border border-white/20";
  const brandColor = isMorning ? "from-[#2d5016] to-[#3a7d2f]" : "from-[#4f46e5] to-[#06b6d4]";

  const handleCopyAll = async () => {
    if (tipsRef.current) {
      const text = tipsRef.current.innerText.trim();
      try {
        await navigator.clipboard.writeText(text);
        const btn = document.getElementById("copyAll");
        if (btn) {
          const originalText = btn.textContent;
          btn.textContent = "Copied ✓";
          btn.className = btn.className.replace(
            /bg-gradient-to-r.*/,
            "bg-gradient-to-r from-green-500 to-green-400 text-white"
          );
          setTimeout(() => {
            btn.textContent = originalText;
            btn.className = btn.className.replace(
              /bg-gradient-to-r from-green-500 to-green-400 text-white/,
              `bg-gradient-to-r ${brandColor} text-white`
            );
          }, 1600);
        }
      } catch (e) {
        alert("Copy failed. Select all (Cmd/Ctrl+A) and copy manually.");
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const tips = [
    {
      title: "Hidden Cafes Locals Love",
      meta: "District 1 & 3 • Quiet corners • Reliable Wi‑Fi",
      items: [
        "Alley 8 Nguyen Thi Minh Khai — look for the lantern sign, 2nd floor.",
        "Hem 18B Pham Ngoc Thach — small courtyard; best 9–11am.",
        "Pasteur St micro‑roastery — order coconut cold brew, skip pastries.",
      ],
    },
    {
      title: "Scams to Avoid (What to Say)",
      meta: "Keep it short, be firm, smile",
      items: [
        'Unmetered taxi: "Grab thôi, cảm ơn." (I\'ll use Grab, thanks.)',
        'Motorbike shoe shine: "Không cần, cảm ơn." (No need, thanks.)',
        "Menu swap: Check price on order; confirm total before paying.",
      ],
    },
    {
      title: "Best Grab Routes at Rush Hour",
      meta: "4–7pm weekdays • Avoid Cong Hoa, Dien Bien Phu bridges",
      items: [
        "D1 ↔ Airport: set pin at Domestic T1 Gate 3, walk 2 mins to pickup.",
        'Ben Thanh ↔ Thao Dien: ask for "Mai Chi Tho tunnel, not Saigon Bridge".',
        "Nguyen Hue ↔ Tan Dinh: take Hai Ba Trung, avoid Dien Bien Phu.",
      ],
    },
    {
      title: "Late‑Night Eats (After Midnight)",
      meta: "Open late • Clean kitchens • Card friendly",
      items: [
        "Pho on Truong Dinh & Nguyen Thi Minh Khai — broth until ~1:30am.",
        "Broken rice on Nguyen Trai Hem 85 — pork chop + egg, 12–2am.",
        'Banh mi cart at Mac Thi Buoi — ask for "ít pate, thêm đồ chua".',
      ],
    },
    {
      title: "Safety Checklist",
      meta: "Prevent 95% of avoidable issues",
      items: [
        "Cross-body bag; phone away from curb side on streets.",
        "ATM inside malls; cover PIN; keep small bills for taxis/markets.",
        "Download Grab, Google Translate, and offline maps before arrival.",
      ],
    },
  ];

  return (
    <section
      className={`min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-16 transition-all duration-700 ${bgStyle}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className={`font-bold text-xl ${textColor}`}>Saigon Insider</div>
          <div
            className={`text-xs px-3 py-1 rounded-full ${cardBgSecondary} ${mutedColor}`}
          >
            Private link — save this URL
          </div>
        </header>

        {/* Main Card */}
        <div className={`${cardBg} rounded-2xl p-6 sm:p-8 backdrop-blur-sm`}>
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${textColor}`}>
            You're in — here are your insider tips
          </h2>
          <p className={`text-sm sm:text-base mb-6 ${mutedColor}`}>
            Bookmark this page. For offline use, copy everything or print to PDF.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              id="copyAll"
              onClick={handleCopyAll}
              className={`px-4 py-2 rounded-xl font-semibold bg-gradient-to-r ${brandColor} text-white hover:opacity-90 transition-all`}
            >
              Copy all
            </button>
            <button
              id="downloadPdf"
              onClick={handlePrint}
              className={`px-4 py-2 rounded-xl font-semibold ${cardBgSecondary} ${textColor} border border-white/10 hover:opacity-80 transition-all`}
            >
              Print / Save as PDF
            </button>
            <Link
              to="/insider"
              className={`px-4 py-2 rounded-xl font-semibold ${cardBgSecondary} ${textColor} border border-white/10 hover:opacity-80 transition-all`}
            >
              Back
            </Link>
          </div>

          {/* Tips */}
          <div ref={tipsRef} className="space-y-4">
            {tips.map((tip, index) => (
              <div key={index} className={`${cardBgSecondary} rounded-xl p-4 sm:p-6`}>
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${textColor}`}>
                  {tip.title}
                </h3>
                <div className={`text-xs sm:text-sm mb-3 ${mutedColor}`}>{tip.meta}</div>
                <ul className="space-y-2 list-disc list-inside">
                  {tip.items.map((item, i) => (
                    <li key={i} className={`text-sm sm:text-base ${mutedColor}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className={`text-xs sm:text-sm mt-6 ${mutedColor}`}>
            Have feedback or want a refund? Reply to your receipt email.
          </p>
        </div>
      </div>

      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </section>
  );
};

export default InsiderTipsThankYou;

