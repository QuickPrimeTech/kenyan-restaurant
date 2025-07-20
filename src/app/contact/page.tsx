import ContactHeader from "@/sections/contact/ContactHeader";
import ContactForm from "@/sections/contact/ContactForm";
import ContactInfo from "@/sections/contact/ContactInfo";
import ContactMap from "@/sections/contact/ContactMap";

export default function ContactPage() {
  return (
    <>
      <ContactHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
      <ContactMap />
    </>
  );
}
