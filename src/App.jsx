import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import ThemeNavbar from "./components/Navbar/ThemeNavbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Saigonir from "./pages/Saigonir.jsx";
import Tours from "./pages/Tours.jsx";
import Reviews from "./pages/Reviews.jsx";
import InsiderTips from "./pages/InsiderTips.jsx";
import InsiderTipsThankYou from "./pages/InsiderTipsThankYou.jsx";
// Tour Pages
import HistoryTour from "./pages/tours/HistoryTour.jsx";
import CoffeeMarket from "./pages/tours/CoffeeMarket.jsx";
import FoodTour from "./pages/tours/FoodTour.jsx";
import CityTour from "./pages/tours/CityTour.jsx";
import NightLife from "./pages/tours/NightLife.jsx";

// Booking Pages
import HistoryTourBooking from "./pages/booking/history/HistoryTour.jsx";
import CoffeeTourBooking from "./pages/booking/coffee/CoffeeTour.jsx";
import BasicStreetFood from "./pages/booking/streetfood/BasicStreetFood.jsx";
import PremiumStreetFood from "./pages/booking/streetfood/PremiumStreetFood.jsx";
import PremiumNightLife from "./pages/booking/nightlife/PremiumNightLife.jsx";
import BookingSuccess from "./pages/booking/success/BookingSuccess.jsx";

const App = () => {
  const [theme, setTheme] = useState("night");

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        theme === "night"
          ? "bg-gradient-to-b from-[#0b0b14] via-[#1a052e] to-[#3d0f55] text-white"
          : "bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] text-[#2d5016]"
      }`}
    >
      <BrowserRouter>
        <ScrollToTop />
        <ThemeNavbar theme={theme} setTheme={setTheme} />

        <main className="pt-32 sm:pt-28 md:pt-28 px-4 md:px-10">
          <Routes>
            {/* General */}
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/saigonir" element={<Saigonir theme={theme} />} />
            <Route path="/tours" element={<Tours theme={theme} />} />
            <Route path="/reviews" element={<Reviews theme={theme} />} />
            <Route path="/insider" element={<InsiderTips theme={theme} />} />
            <Route path="/insider/thank-you" element={<InsiderTipsThankYou theme={theme} />} />

            {/* Tour Pages */}
            <Route path="/tours/history" element={<HistoryTour theme={theme} />} />
            <Route path="/tours/coffee" element={<CoffeeMarket theme={theme} />} />
            <Route path="/tours/streetfood" element={<FoodTour theme={theme} />} />
            <Route path="/tours/city" element={<CityTour theme={theme} />} />
            <Route path="/tours/nightlife" element={<NightLife theme={theme} />} />

            {/* Booking Pages */}
            <Route path="/booking/history" element={<HistoryTourBooking />} />
            <Route path="/booking/history/basic" element={<HistoryTourBooking />} />
            <Route path="/booking/coffee/basic" element={<CoffeeTourBooking />} />
            <Route path="/booking/streetfood/basic" element={<BasicStreetFood />} />
            <Route path="/booking/streetfood/premium" element={<PremiumStreetFood />} />
            <Route path="/booking/nightlife" element={<PremiumNightLife theme={theme} />} />
            <Route path="/booking/success" element={<BookingSuccess />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
