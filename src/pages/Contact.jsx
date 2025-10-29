import Footer from "../components/Footer.jsx";
// QR contact image is now in public folder, referenced directly

const Contact = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Mobile-first responsive section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 text-center py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d5016] mb-3 sm:mb-4 leading-tight">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed px-2">
            Scan the QR below to message us directly on WhatsApp or reach us via the buttons.
          </p>
        </div>

        {/* QR Code Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200 inline-block">
            <img
              src="/images/qr-contact.jpg"
              alt="WhatsApp QR - Saigonese Hang-out"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
            />
          </div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
            Scan to chat with Saigonese Hang-out
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="w-full max-w-md sm:max-w-lg">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="https://wa.me/+84978270038"
              className="flex-1 bg-[#c2a46b] px-6 py-4 sm:py-3 rounded-xl text-white font-semibold text-base sm:text-lg hover:bg-[#b3925e] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span className="text-lg sm:text-xl">📱</span>
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/saigonesehangout/"
              className="flex-1 bg-[#2d5016] px-6 py-4 sm:py-3 rounded-xl text-white font-semibold text-base sm:text-lg hover:bg-[#3a7d2f] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5016] focus-visible:ring-offset-2"
            >
              <span className="text-lg sm:text-xl">📸</span>
              Instagram
            </a>
          </div>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-8 sm:mt-10 md:mt-12 max-w-lg mx-auto">
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold text-[#2d5016] mb-3">
              Other Ways to Reach Us
            </h3>
            <div className="space-y-2 text-sm sm:text-base text-gray-700">
              <p className="flex items-center justify-center gap-2">
                <span className="text-green-500">📞</span>
                <span className="font-medium">+84 979 270 038</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="text-blue-500">✉️</span>
                <span>thestoriesguys@gmail.com</span>
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-3">
                Available Mon–Sun, 8:30am – 6:00pm
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer theme="morning" />
    </div>
  );
};

export default Contact;
