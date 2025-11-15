import { Hero } from "./components/Hero";
import { UserTypes } from "./components/UserTypes";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { ImpactStats } from "./components/ImpactStats";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <UserTypes />
      <Features />
      <HowItWorks />
      <ImpactStats />
      <CTASection />
      <Footer />
    </div>
  );
}