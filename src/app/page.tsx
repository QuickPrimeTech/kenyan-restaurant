import HeroSection from "@/pages/home/HeroSection";
import MenuHighlights from "@/pages/home/MenuHighlights";
import AboutSection from "@/pages/home/AboutSection";
import ReviewsSection from "@/pages/home/ReviewsSection";
import CallToAction from "@/pages/home/CallToAction";
import FAQ from "@/pages/home/FAQ";
import ContactSummary from "@/pages/home/ContactSummary";
import InstagramFeed from "@/pages/home/InstagramFeed";

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
