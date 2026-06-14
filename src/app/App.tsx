import "../styles/fonts.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { HowItWorks } from "./components/HowItWorks";
import { WhatYouGet } from "./components/WhatYouGet";
import { FeaturedJourneys } from "./components/FeaturedJourneys";
import { WhyVHO } from "./components/WhyVHO";
import { PlanningWizard } from "./components/PlanningWizard";
import { Footer } from "./components/Footer";
import { FloatingCTA } from "./components/FloatingCTA";

export default function App() {
  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; }
      `}</style>
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <WhatYouGet />
      <FeaturedJourneys />
      <WhyVHO />
      <PlanningWizard />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
