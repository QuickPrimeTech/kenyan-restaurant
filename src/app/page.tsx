import HeroSection from "@/sections/home/HeroSection";
import MenuHighlights from "@/sections/home/MenuHighlights";
import AboutSection from "@/sections/home/AboutSection";
import ReviewsSection from "@/sections/home/ReviewsSection";
import CallToAction from "@/sections/home/CallToAction";
import FAQ from "@/sections/home/FAQ";
import ContactSummary from "@/sections/home/ContactSummary";
import InstagramFeed from "@/sections/home/InstagramFeed";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MenuHighlights />
      <AboutSection />
      <ReviewsSection />
      <CallToAction />
      <FAQ />
      <ContactSummary />
      <InstagramFeed />
    </>
  );
}
