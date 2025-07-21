import HeroSection from "@/sections/home/hero-section";
import MenuHighlights from "@/sections/home/menu-highlights";
import AboutSection from "@/sections/home/about-section";
import ReviewsSection from "@/sections/home/reviews";
import CallToAction from "@/sections/home/cta";
import FAQ from "@/sections/home/faqs";
import ContactSummary from "@/sections/home/contact-summary";
import InstagramFeed from "@/sections/home/instagram-feed";
import PromotionalBanner from "@/sections/home/promotional-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MenuHighlights />
      <PromotionalBanner />
      <AboutSection />
      <ReviewsSection />
      <CallToAction />
      <FAQ />
      <ContactSummary />
      <InstagramFeed />
    </>
  );
}
