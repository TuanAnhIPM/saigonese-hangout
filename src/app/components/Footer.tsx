import { Mail, Instagram, Facebook } from "lucide-react";

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function Footer() {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#1C1A17] py-14 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 border-b border-white/10 pb-12 mb-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#2A4A2E] flex items-center justify-center">
                <span className="text-[#F6EFE2] text-xs font-semibold">V</span>
              </div>
              <span
                className="text-white"
                style={{ fontSize: "1.1rem" }}
              >
                Vietnamese Hangout
              </span>
            </div>
            <p
              className="text-white/40 text-xs leading-relaxed"
            >
              Tailored tours across Vietnam. A local team, a personal approach, and a
              trip built entirely around you.
            </p>
          </div>

          {/* CTA + social */}
          <div className="flex flex-col items-start md:items-end gap-5">
            <button
              onClick={scrollToContact}
              className="border border-white/50 text-white px-6 py-3 text-[11px] uppercase tracking-[0.18em] hover:bg-white hover:text-[#1C1A17] transition-all duration-300"
            >
              Start Planning My Trip
            </button>

            <div className="flex gap-3">
              <a
                href="mailto:hello@vietnamesehangout.com"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors"
                aria-label="Email us"
              >
                <Mail size={15} />
              </a>
              <a
                href="https://wa.me/84772751430"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-[#25D366] hover:border-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="text-white/30 text-xs"
          >
            © 2025 Vietnamese Hangout. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Ho Chi Minh City", "Hanoi", "Da Nang"].map((city) => (
              <span
                key={city}
                className="text-white/30 text-xs"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
