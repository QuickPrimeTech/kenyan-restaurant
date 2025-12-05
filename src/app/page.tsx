import HeroSection from "@/sections/home/hero-section";
import MenuHighlights from "@/sections/home/menu-highlights";
import AboutSection from "@/sections/home/about-section";
import ReviewsSection from "@/sections/home/reviews";
import CallToAction from "@/components/cta";
import FAQ from "@/sections/home/faqs";
import ContactSummary from "@/sections/home/contact-summary";
import InstagramFeed from "@/sections/home/instagram-feed";
import api from "@/lib/api-client";
import { OffersSection } from "@/sections/home/offers";

// force static, no auto revalidation (only on-demand ISR)
export const dynamic = "force-static";
export const revalidate = false;

export default async function HomePage() {
  const { data: offers } = await api.get("/offers");
  return (
    <>
      <HeroSection />
      <MenuHighlights />
      <OffersSection offers={offers} />
      <AboutSection />
      <ReviewsSection />
      <CallToAction />
      <FAQ />
      <ContactSummary />
      <InstagramFeed />
    </>
  );
}
