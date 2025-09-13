import SiteLayout from "@/components/layout/SiteLayout";
import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import HowItWorks from "@/sections/HowItWorks";
import FinalCTA from "@/sections/FinalCTA";
import './globals.css'
import Footer from "@/components/Footer";
export default function Page() {
  return (
    <SiteLayout>
      <Hero />
      <Features />
      <HowItWorks />
      <FinalCTA />
      <Footer/>
    </SiteLayout>
  );
}
