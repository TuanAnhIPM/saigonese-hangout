import TourCard from "../components/TourCard.jsx";
import Footer from "../components/Footer.jsx";
import Testimonials from "../components/Testimonials.jsx";
import About from "../pages/About.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";

// Optimized LazyImage component with Intersection Observer
const LazyImage = ({ src, alt, index, priority = false, themeKey }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Reset state when theme changes (themeKey changes)
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setImageSrc(src);
    if (priority || index < 10) {
      setIsInView(true);
    } else {
      setIsInView(false);
    }
  }, [themeKey, priority, index, src]);

  // Handle HEIC files - automatically use JPG version if HEIC file
  useEffect(() => {
    if (src && src.toLowerCase().endsWith('.heic')) {
      // Replace .HEIC/.heic with .jpg (Python script will convert to lowercase .jpg)
      const jpgSrc = src.replace(/\.heic$/i, '.jpg');
      setImageSrc(jpgSrc);
    }
  }, [src]);

  // Progressive loading - load first 10 images immediately, rest with intersection observer
  useEffect(() => {
    if (priority || index < 10) {
      setIsInView(true);
      return;
    }

    if (!imgRef.current) return;

    const currentElement = imgRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before entering viewport (increased for smoother experience)
        threshold: 0.01,
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [priority, index, themeKey]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    // If HEIC fails, try to show placeholder or skip
    if (imageSrc && imageSrc.toLowerCase().endsWith('.heic')) {
      // Try alternative extensions
      const altSrc = imageSrc.replace(/\.heic$/i, '.jpg');
      if (altSrc !== imageSrc) {
        setImageSrc(altSrc);
        setHasError(false);
      }
    }
  };

  return (
    <div
      ref={imgRef}
      className="relative aspect-square overflow-hidden"
      style={{
        willChange: isInView ? "opacity, transform" : "auto",
        contain: "layout style paint",
        opacity: isLoaded && !hasError ? 1 : 0,
        transition: isLoaded && !hasError ? "opacity 0.3s ease-out" : "none",
        transform: isLoaded && !hasError ? "translateZ(0)" : "translateZ(0) scale(0.98)",
      }}
    >
      {isInView && !hasError && (
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          decoding="async"
          loading={priority || index < 10 ? "eager" : "lazy"}
          fetchPriority={priority || index < 5 ? "high" : "low"}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            transform: "translateZ(0)", // GPU acceleration
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />
      )}
      {hasError && (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400 text-xs">Image</span>
        </div>
      )}
    </div>
  );
};

const Home = ({ theme }) => {
  const isMorning = theme === "morning";

  // Grid with 50 images for hero section
  const heroGridImagesNight = [
    "/images/grid-50-main-page/z7333396906599_231dc0dd7be13814030904844d3e5398.jpg",
    "/images/grid-50-main-page/z7333396912038_f1d5c913edc04a1deac0e2cb6e37f4da.jpg",
    "/images/grid-50-main-page/z7333396922019_48d0806f14edd3944604da799f458f53.jpg",
    "/images/grid-50-main-page/z7333396928534_e756e7afc695ec199b030a0dbd251220.jpg",
    "/images/grid-50-main-page/z7333396929363_537d92ca73b9c22fdef808ac5d69e688.jpg",
    "/images/grid-50-main-page/z7333396935592_cfe400aab5958d30d6ddcb0a28cacb93.jpg",
    "/images/grid-50-main-page/z7333396946496_7ee4960f8d97fef8f3996e32999404d5.jpg",
    "/images/grid-50-main-page/z7333396946691_a71abeaf5318e4d13369e6bccded1896.jpg",
    "/images/grid-50-main-page/z7333396952896_d2df4c859584157ba1106404d828b9fe.jpg",
    "/images/grid-50-main-page/z7333396955724_bda5ae8d16779e25f38b0bcb1e508d15.jpg",
    "/images/grid-50-main-page/z7333396967123_24c149687639178bdbc3b6a46b89a34f.jpg",
    "/images/grid-50-main-page/z7333396975017_66f21e32387240d0e10de09bb0b401e9.jpg",
    "/images/grid-50-main-page/z7333396975251_6b533a78ad1b5bca73721b054395b9ce.jpg",
    "/images/grid-50-main-page/z7333396981083_0addc2cc25d7206c8d71422cdd489e7f.jpg",
    "/images/grid-50-main-page/z7333396990981_29e3d1352f4c9c3fffb8c5ec368e9503.jpg",
    "/images/grid-50-main-page/z7333396995860_fbd802d78625a4bb70711c9edddaabae.jpg",
    "/images/grid-50-main-page/z7333396998055_90df08e840b511f72163496da11b79fb.jpg",
    "/images/grid-50-main-page/z7333397007923_6dedd46afdd7d67f398de7062fdd6b83.jpg",
    "/images/grid-50-main-page/z7333397010780_bcbe2b29d9d07ea2625e98a5b3594864.jpg",
    "/images/grid-50-main-page/z7333397015724_0140099d9c0d4909a4160e7a4a8d1d72.jpg",
    "/images/grid-50-main-page/z7333397021803_3aaf6e77446492f63c85aed539b346ce.jpg",
    "/images/grid-50-main-page/z7333397023852_75a0596a9922050799148198802ebd8f.jpg",
    "/images/grid-50-main-page/z7333397047672_e3a23720d964afc867cdc599f973d649.jpg",
    "/images/grid-50-main-page/z7333397047673_68345a56d822dba442d02d5622467033.jpg",
    "/images/grid-50-main-page/z7333397050413_93c3b00635a1c819284a491a1cf4d86e.jpg",
    "/images/grid-50-main-page/z7333397054688_964b0f33d690dc0ea0b74de6e8bc36fc.jpg",
    "/images/grid-50-main-page/z7333397063130_de025e7be8fd152b81bc4dbadd6b8773.jpg",
    "/images/grid-50-main-page/z7333397071232_91ffc18aa42c8fba6765cf2a4210997f.jpg",
    "/images/grid-50-main-page/z7333397079895_70887d24e26050d0f3cb753bd3cc50a2.jpg",
    "/images/grid-50-main-page/z7333397082868_6a85ee7db30da53fad335f1c67482e24.jpg",
    "/images/grid-50-main-page/z7333397084733_34639fc6380204f3758295f2a4f011a4.jpg",
    "/images/grid-50-main-page/z7333397090386_b8b206b18c80f5702d1065240bd88aac.jpg",
    "/images/grid-50-main-page/z7333397093478_0cffe8ff885008d85c2d8e7241cb532f.jpg",
    "/images/grid-50-main-page/z7333397099822_b75de4ea4dc82e360f9082327dfe54fb.jpg",
    "/images/grid-50-main-page/z7333397109582_149a5fc8edf033cb60f2c5d0a078d7c1.jpg",
    "/images/grid-50-main-page/z7333397113547_4f34e05e56276fb02d0b14a9c076ea15.jpg",
    "/images/grid-50-main-page/z7333397118121_2d367f499de8c1ac2d10f62878d03a0d.jpg",
    "/images/grid-50-main-page/z7333397124401_180f86cf9ca05269018699830cb14a21.jpg",
    "/images/grid-50-main-page/z7333397126498_ef6ebf4580f1db7b5a042a6e578841f7.jpg",
    "/images/grid-50-main-page/z7333397133904_ab4fdc5a66d43f848e13cb18ebed5fff.jpg",
    "/images/grid-50-main-page/z7333397139511_fe394f8889adf57d02e8e7aaa96e72da.jpg",
    "/images/grid-50-main-page/z7333397153157_3bc444b1fde57effa4533f16fd0207a6.jpg",
    "/images/grid-50-main-page/z7333397156241_e8791bee071e8a6c078bb32be4a9e0f2.jpg",
    "/images/grid-50-main-page/z7333397160859_a4a7c68ae665e178810772e8ec4bc6b6.jpg",
    "/images/grid-50-main-page/z7333397162309_2c28ee94b3ff6722485052c80c0ff61c.jpg",
    "/images/grid-50-main-page/z7333397169429_07a033da63fec7ade2625f00e9befa66.jpg",
    "/images/grid-50-main-page/z7333397172013_0f3e42cf82479eaceb4cefb4143bd63d.jpg",
    "/images/grid-50-main-page/z7333397182536_0cde9ec12cbdadaa61d47a4dd7c7ad08.jpg",
    "/images/grid-50-main-page/z7333397185325_24c48ee73493862e51a0f64c89d72f7a.jpg",
    "/images/grid-50-main-page/z7333397196038_ecab1f39440509afb76f290cb32faab1.jpg",
  ];

  // Grid with 50 images for morning tours - all converted to JPG format for browser compatibility
  const heroGridImagesMorning = [
    "/images/grid-50-morning-tour/35cc9279-756a-4992-bdce-88e8d32c6fa4.JPG",
    "/images/grid-50-morning-tour/5d13da6b-e1f9-4f91-b670-c3eb7326fdc3.JPG",
    "/images/grid-50-morning-tour/9abb2b6c-1c7b-46bd-be72-6b8feb91d7ba.JPG",
    "/images/grid-50-morning-tour/FFC41834-B99A-4935-B8E4-5D495008AB06.JPG",
    "/images/grid-50-morning-tour/IMG_8079.JPG",
    "/images/grid-50-morning-tour/IMG_8088.jpg",
    "/images/grid-50-morning-tour/IMG_9022.jpg",
    "/images/grid-50-morning-tour/IMG_9037.JPG",
    "/images/grid-50-morning-tour/IMG_9039.JPG",
    "/images/grid-50-morning-tour/IMG_9045.JPG",
    "/images/grid-50-morning-tour/IMG_9059.JPG",
    "/images/grid-50-morning-tour/IMG_9060.JPG",
    "/images/grid-50-morning-tour/IMG_9226.jpg",
    "/images/grid-50-morning-tour/IMG_9267.jpg",
    "/images/grid-50-morning-tour/IMG_9273.jpg",
    "/images/grid-50-morning-tour/IMG_9276.jpg",
    "/images/grid-50-morning-tour/IMG_9304.jpg",
    "/images/grid-50-morning-tour/IMG_9312.JPG",
    "/images/grid-50-morning-tour/IMG_9313.JPG",
    "/images/grid-50-morning-tour/IMG_9316.JPG",
    "/images/grid-50-morning-tour/IMG_9321.jpg",
    "/images/grid-50-morning-tour/IMG_9341.jpg",
    "/images/grid-50-morning-tour/IMG_9349.jpg",
    "/images/grid-50-morning-tour/IMG_9351.jpg",
    "/images/grid-50-morning-tour/IMG_9356.jpg",
    "/images/grid-50-morning-tour/IMG_9358.jpg",
    "/images/grid-50-morning-tour/IMG_9359.jpg",
    "/images/grid-50-morning-tour/IMG_9362.jpg",
    "/images/grid-50-morning-tour/IMG_9547.jpg",
    "/images/grid-50-morning-tour/IMG_9552.jpg",
    "/images/grid-50-morning-tour/IMG_9612.jpg",
    "/images/grid-50-morning-tour/IMG_9615.jpg",
    "/images/grid-50-morning-tour/IMG_9621.jpg",
    "/images/grid-50-morning-tour/IMG_9624.jpg",
    "/images/grid-50-morning-tour/IMG_9625.jpg",
    "/images/grid-50-morning-tour/IMG_9628.jpg",
    "/images/grid-50-morning-tour/IMG_9630.jpg",
    "/images/grid-50-morning-tour/IMG_9643.jpg",
    "/images/grid-50-morning-tour/IMG_9646.jpg",
    "/images/grid-50-morning-tour/IMG_9649.jpg",
    "/images/grid-50-morning-tour/IMG_9753.jpg",
    "/images/grid-50-morning-tour/IMG_9805.jpg",
    "/images/grid-50-morning-tour/IMG_9808.jpg",
    "/images/grid-50-morning-tour/IMG_9813.jpg",
    "/images/grid-50-morning-tour/IMG_9817.jpg",
    "/images/grid-50-morning-tour/IMG_9821.jpg",
    "/images/grid-50-morning-tour/att.ACwzcvt4CGu5YxjHK6pd-EW7GNbiVDe7znJAYRUtNfo.JPG",
    "/images/grid-50-morning-tour/att.B5CoERhy2b33kBpVgHfsTT-kYdOo6_En4CkdVRFKENU.JPG",
    "/images/grid-50-morning-tour/att.Hhr_tAdz5nkuJfZmEkkh9xSDHEhB0UsPyKOwliO3Irc.JPG",
    "/images/grid-50-morning-tour/att.f3DYZzTkNyeUO7EaaTe3qfmT8HX6OxO40okZ6aGEvSk.JPG",
  ];

  // Select grid images based on theme and memoize to prevent unnecessary re-renders
  const visibleImages = useMemo(() => {
    return isMorning ? heroGridImagesMorning : heroGridImagesNight;
  }, [isMorning]);

  const tours = isMorning
    ? [
        {
          title: "History Tour",
          price: "$34",
          originalPrice: "$40",
          duration: "4 hours",
          desc: "Walk through Saigon's past: colonial architecture, war history, and local culture at 10 iconic locations.",
          slug: "history",
          faqInfo: {
            stops: "6 stops",
            dishes: "1 Local Food + 1 Local Drink",
            transportation: "Go on Scooters (1 person 1 driver)",
            startTime: "Starts at anytime from 7 AM - 6 PM",
            guide: "Knowledgable Guide",
            photos: "Photos included"
          },
          highlights: [
            "Central Post Office & Notre-Dame Cathedral",
            "Independence Palace & Fall of Saigon site",
            "City Book Street cultural experience",
            "Historical landmarks and colonial architecture",
            "Professional English-speaking guide"
          ]
        },
      ]
    : [
        {
          title: "Street Food Tour on Scooter",
          price: "$49",
          originalPrice: "$59",
          duration: "4 hours",
          desc: "New to Saigon? We solve what to eat, how much to pay, and where to go safely.",
          slug: "streetfood",
          faqInfo: {
            price: "999,000 VND",
            stops: "5 stops",
            dishes: "11 dishes",
            transportation: "Go on scooters (1 person 1 driver)",
            startTime: "Starts at anytime from 1 PM - 6 PM",
            duration: "4 hours",
            vegetarianOption: "Vegetarian option available",
            kosherOption: "Kosher option available"
          },
          highlights: [
            "Scooter ride experience (you ride as passenger)",
            "Hidden street food stalls only locals know",
            "Flower market nightlife scene (where locals hang out)",
            "Rooftop bar with panoramic Saigon views",
            "Exclusive Michelin-recognized restaurant experience"
          ]
        },
      ];

  return (
    <>
      {/* Hero Section with 50 Image Grid - Optimized */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] overflow-hidden -mt-8 sm:-mt-6 md:-mt-6">
        {/* Grid with 50 images - Optimized with lazy loading and progressive rendering */}
        <div 
          className="absolute inset-0 grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 gap-0"
          style={{
            contain: "layout style paint",
            transform: "translateZ(0)", // GPU acceleration
            willChange: "contents",
            contentVisibility: "auto", // Skip rendering off-screen content
          }}
        >
          {visibleImages.map((image, index) => (
            <LazyImage
              key={`${isMorning ? 'morning' : 'night'}-${index}`}
              src={image}
              alt={`Saigon ${isMorning ? "Morning" : "Night"} ${index + 1}`}
              index={index}
              priority={index < 10} // First 10 images are priority (reduced for faster initial load)
              themeKey={isMorning ? 'morning' : 'night'} // Force reset when theme changes
            />
          ))}
        </div>
        
        {/* Adaptive overlay for better text readability based on theme */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            isMorning ? "bg-white/20" : "bg-black/40"
          }`}
        />

        {/* Content */}
        <div className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center z-10 px-4 sm:px-6">
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
              to="/top1"
              className={`inline-block text-xs sm:text-sm px-4 py-2 rounded-lg font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5016] focus-visible:ring-offset-2 ${
                isMorning
                  ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                  : "bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white hover:opacity-90 focus-visible:ring-[#4cc9f0]"
              }`}
            >
              🇻🇳 Meet Our Passionate Team
            </Link>
          </div>
        </div>
      </section>


      {/* Tour Cards */}
      <section className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6 fade-in">
        {tours.map((tour) => {
          // Special layout for streetfood tour with image grid
          if (tour.slug === "streetfood") {
            return (
              <div key={tour.title} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 items-stretch">
                {/* Food Images Grid - Left Side */}
                <div className="order-2 lg:order-1 flex flex-col h-full">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 flex-shrink-0">
                    {[
                      '/images/goi-kho-bo.webp',
                      '/images/insider/food/food-4-banh-xeo.jpeg',
                      '/images/insider/food/food-16-banh-canh-cua.jpeg',
                      '/images/insider/food/food-11-bo-nuong-lui-sa.jpeg',
                      '/images/banh-mi.jpeg',
                      '/images/insider/food/food-14-kem-dua.jpeg'
                    ].map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <img
                          src={img}
                          alt={`Street Food ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Motorbike Insurance Card */}
                  <div className={`mt-4 flex-1 flex items-center justify-center ${
                    isMorning 
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200' 
                      : 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-700/50'
                  } rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg`}>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl mb-2">🏍️</div>
                      <p className={`text-base sm:text-lg font-bold mb-1 ${
                        isMorning ? 'text-green-800' : 'text-green-300'
                      }`}>
                        Motorbike Insurance
                      </p>
                      <p className={`text-sm sm:text-base font-semibold ${
                        isMorning ? 'text-green-700' : 'text-green-400'
                      }`}>
                        Up to $4,000
                      </p>
                      <p className={`text-xs sm:text-sm mt-1 ${
                        isMorning ? 'text-green-600' : 'text-green-500'
                      }`}>
                        100.000.000 VND Insurance
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Tour Card - Right Side */}
                <div className="order-1 lg:order-2 flex items-stretch">
                  <div className="w-full max-w-md">
                    <div className="h-full">
                      <TourCard {...tour} theme={theme} />
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Special layout for history tour with historical images grid
          if (tour.slug === "history") {
            return (
              <div key={tour.title} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 items-stretch">
                {/* Historical Images Grid - Left Side */}
                <div className="order-2 lg:order-1 flex flex-col h-full">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 flex-shrink-0">
                    {[
                      '/images/insider/historical/dinh-doc-lap.jpg', // Independence Palace
                      '/images/insider/historical/bao-tang-chung-tich-chien-tranh.jpg', // War Remnants Museum
                      '/images/insider/historical/buu-dien-va-nha-tho-duc-ba.jpg', // Post Office and Notre Dame
                      '/images/insider/historical/ben-nha-rong.jpg', // Dragon Wharf
                      '/images/insider/historical/Bao-tang-My-thuat-Ho-Chi-Minh.jpg', // Fine Arts Museum
                      '/images/insider/historical/ham-giau-vu-khi-biet-dong-sai-gon-1968.jpg' // Secret Bunker
                    ].map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <img
                          src={img}
                          alt={`Historical Place ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Motorbike Insurance Card */}
                  <div className={`mt-4 flex-1 flex items-center justify-center ${
                    isMorning 
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200' 
                      : 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-700/50'
                  } rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg`}>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl mb-2">🏍️</div>
                      <p className={`text-base sm:text-lg font-bold mb-1 ${
                        isMorning ? 'text-green-800' : 'text-green-300'
                      }`}>
                        Motorbike Insurance
                      </p>
                      <p className={`text-sm sm:text-base font-semibold ${
                        isMorning ? 'text-green-700' : 'text-green-400'
                      }`}>
                        Up to $4,000
                      </p>
                      <p className={`text-xs sm:text-sm mt-1 ${
                        isMorning ? 'text-green-600' : 'text-green-500'
                      }`}>
                        100.000.000 VND Insurance
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Tour Card - Right Side */}
                <div className="order-1 lg:order-2 flex items-stretch">
                  <div className="w-full max-w-md">
                    <div className="h-full">
                      <TourCard {...tour} theme={theme} />
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          
          // Default layout for other tours
          return (
            <div key={tour.title} className="text-center mb-8 sm:mb-12">
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <TourCard {...tour} theme={theme} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Partnership Section */}
      <section className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* B2B Partner - East Card */}
          <div className={`${isMorning ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-500/30"} border-2 rounded-2xl p-6 sm:p-8`}>
            <div className="flex flex-col items-center sm:items-start gap-4">
              <div className="flex-shrink-0">
                <a href="https://eastcardil.co.il" target="_blank" rel="noreferrer" className="cursor-pointer hover:opacity-80 transition-opacity">
                  <img 
                    src="/images/partners/east-card-logo.jpeg" 
                    alt="East Card Partner" 
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg sm:rounded-xl shadow-md"
                  />
                </a>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isMorning ? "text-[#2d5016]" : "text-white"}`}>
                  B2B Partner
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isMorning ? "text-gray-700" : "text-gray-200"}`}>
                  Trusted partner of <span className="font-semibold">East Card</span>, providing exclusive Food Tours for Israeli travelers visiting Saigon.
                </p>
              </div>
            </div>
          </div>

          {/* B2B Partner - TCG */}
          <div className={`${isMorning ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-500/30"} border-2 rounded-2xl p-6 sm:p-8`}>
            <div className="flex flex-col items-center sm:items-start gap-4">
              <div className="flex-shrink-0">
                <a href="https://travelcationgroup.com" target="_blank" rel="noreferrer" className="cursor-pointer hover:opacity-80 transition-opacity">
                  <img 
                    src="/images/partners/tcg-logo.gif" 
                    alt="TCG Australia Partner" 
                    className="w-32 h-16 sm:w-40 sm:h-20 object-contain"
                  />
                </a>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isMorning ? "text-[#2d5016]" : "text-white"}`}>
                  B2B Partner
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isMorning ? "text-gray-700" : "text-gray-200"}`}>
                  Proud partner of <span className="font-semibold">TCG Australia</span>, delivering premium tour experiences for Australian travelers exploring Saigon.
                </p>
              </div>
            </div>
          </div>

          {/* Give Asia Donation */}
          <div className={`${isMorning ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/30"} border-2 rounded-2xl p-6 sm:p-8`}>
            <div className="flex flex-col items-center sm:items-start gap-4">
              <div className="flex-shrink-0">
                <a href="https://give.asia" target="_blank" rel="noreferrer" className="cursor-pointer hover:opacity-80 transition-opacity">
                  <img 
                    src="/images/partners/give-asia-logo.png" 
                    alt="Give Asia Logo" 
                    className="w-32 h-16 sm:w-40 sm:h-20 object-contain"
                  />
                </a>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isMorning ? "text-[#2d5016]" : "text-white"}`}>
                  Giving Back
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isMorning ? "text-gray-700" : "text-gray-200"}`}>
                  <span className="font-semibold">10% of tour proceeds</span> are donated to <span className="font-semibold">Give.Asia</span>, Asia's leading free fundraising platform. Founded in 2009, they have helped over 20,000 campaigns across APAC, raising more than SGD$100 million for meaningful causes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Testimonials Section */}
     <Testimonials theme={theme} />
     {/*About*/}
      <About theme={theme} />

      <section>
        <Footer theme={theme} />
      </section>
    </>
  );
};

export default Home;
