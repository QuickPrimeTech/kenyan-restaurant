import CTA from "@/components/cta";
import AboutHeader from "@/sections/about-us/AboutHeader";
import OurStory from "@/sections/about-us/OurStory";
import TeamSection from "@/sections/about-us/TeamSection";
import ValuesSection from "@/sections/about-us/ValuesSection";

export default function AboutPage() {
  return (
    <>
      <AboutHeader />
      <OurStory />
      <TeamSection />
      <ValuesSection />
      <CTA className="mb-16" />
    </>
  );
}
