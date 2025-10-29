import TourCard from "../components/TourCard.jsx";
import Footer from "../components/Footer.jsx";
import Testimonials from "../components/Testimonials.jsx";
import About from "../pages/About.jsx";
import CommunitySection from "../pages/Community.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Home = ({ theme }) => {
  const isMorning = theme === "morning";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const morningImages = [
    "/images/morning-tours/0.jpg",
    "/images/morning-tours/1.jpg",
    "/images/morning-tours/2.jpg",
    "/images/morning-tours/3.jpg",
    "/images/morning-tours/4.jpg"
  ];

  const nightImages = [
    "/images/night-tours/1.jpg",
    "/images/night-tours/2.jpg",
    "/images/night-tours/3.jpg",
    "/images/night-tours/4.jpg",
    "/images/night-tours/5.jpg",
  ];

  const bgImages = isMorning ? morningImages : nightImages;
  const currentBgImage = bgImages[currentImageIndex];

  // Auto-slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === bgImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // Change image every 2.5 seconds

    return () => clearInterval(interval);
  }, [bgImages.length]);

  const tours = isMorning
    ? [
        {
          title: "History Tour",
          desc: "Learn about the history and culture life of Sài Gòn.",
          img: "/images/morning-tours/history-tour/background.jpg",
          slug: "history",
        },
        {
          title: "Coffee & Market",
          desc: "Taste Vietnamese coffee and explore hidden markets to try tropical fruits.",
          img: "/images/morning-tours/coffee-market-tour/background.jpg",
          slug: "coffee",
        },
      ]
    : [
        {
          title: "Street Food Tour",
          desc: "Taste authentic Saigonese dishes in neon-lit alleys.",
          img: "/images/night-tours/street-food-tour/munchies-bg.jpg",
          slug: "streetfood",
        },
        {
          title: "Night-Life Tour",
          desc: "Drinking, Bar, Karaoke, Club",
          img: "/images/night-tours/night-life-tour/night-life-tour.jpg",
          slug: "nightlife",
        },
      ];

  return (
    <>
      {/* Hero Section with Auto Slideshow */}
      <section className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] overflow-hidden -mt-8 sm:-mt-6 md:-mt-6">
        {/* Background Images with Smooth Transitions */}
        {bgImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Slideshow Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {bgImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? isMorning
                    ? "bg-white shadow-lg scale-125"
                    : "bg-[#4cc9f0] shadow-lg scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center z-10 px-4 sm:px-6">
          <div
            className={`relative px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 rounded-xl sm:rounded-2xl shadow-lg max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl mx-auto text-center transition-all duration-500 ${
              isMorning
                ? "bg-white/85 text-black backdrop-blur-sm"
                : "bg-white/10 text-white border border-white/20 backdrop-blur-md"
            }`}
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2 sm:mb-3 ${
                isMorning ? "text-black" : "text-white"
              }`}
            >
              {isMorning ? "Good Morning Saigon!" : "Good Evening Saigon!"}
            </h2>

            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 ${
                isMorning ? "text-[#333]" : "text-gray-200"
              }`}
            >
              {isMorning
                ? "Start your day with Saigon's soft sunlight, aroma of coffee, and vibrant morning streets."
                : "Let the city lights, flavors, and rhythms lead you through Saigon's nightlife."}
            </p>
            
            <Link
              to="/insider"
              className={`inline-block text-xs sm:text-sm px-4 py-2 rounded-lg font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5016] focus-visible:ring-offset-2 ${
                isMorning
                  ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                  : "bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white hover:opacity-90 focus-visible:ring-[#4cc9f0]"
              }`}
            >
              💡 Unlock Insider Tips for $1.99
            </Link>
          </div>
        </div>
      </section>


      {/* Tour Cards */}
      <section className="max-w-6xl mx-auto text-center py-12 sm:py-16 px-4 sm:px-6 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.title} {...tour} theme={theme} />
          ))}
        </div>
      </section>

     {/* Testimonials Section */}
     <Testimonials theme={theme} />
     {/*About*/}
      <About theme={theme} />
      <CommunitySection theme={theme} />

      <section>
        <Footer theme={theme} />
      </section>
    </>
  );
};

export default Home;
