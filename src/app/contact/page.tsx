import ContactHeader from "@/sections/contact/ContactHeader";
import { ContactForm } from "@/components/contact-form";
import ContactInfo from "@/sections/contact/ContactInfo";
import { MapCard } from "@/components/map-card";
import { H2 } from "@/components/ui/typography";

export default function ContactPage() {
  return (
    <>
      <ContactHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 section gap-12">
        <ContactForm />
        <ContactInfo />
      </div>
      <section
        className="section"
        id="contact-map"
        aria-labelledby="contact-map-header"
      >
        <H2 id="contact-map-header" className="mb-8 text-center">
          Find Us
        </H2>
        <MapCard />
      </section>
    </>
  );
}
