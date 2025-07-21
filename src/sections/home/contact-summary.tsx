import { H2 } from "@/components/ui/typography";
import { ContactForm } from "@/components/contact-form";
import { MapCard } from "@/components/map-card";

export default function ContactSummary() {
  return (
    <section className="section min-h-screen">
      <H2 className="mb-12 text-center">Contact Us</H2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MapCard />
        <ContactForm />
      </div>
    </section>
  );
}
