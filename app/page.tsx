import HeroBooking from "@/components/home/HeroBooking";
import ServicesSection from "@/components/home/ServicesSection";
import TrustFeatures from "@/components/home/TrustFeatures";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import FleetSection from "@/components/home/FleetSection";
import AboutSection from "@/components/home/AboutSection";
import Testimonials from "@/components/home/Testimonials";
import AppDownload from "@/components/home/AppDownload";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";
export default function HomePage() {
  return (
    <>
      <HeroBooking />

      <TrustFeatures />
      <ServicesSection />
      <WhyChooseUs />
      <HowItWorks />
      <FleetSection />
      <AboutSection />
      <Testimonials />
      <AppDownload />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
