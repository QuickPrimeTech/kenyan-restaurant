import ContactHeader from "@/pages/contact/ContactHeader";
import ContactForm from "@/pages/contact/ContactForm";
import ContactInfo from "@/pages/contact/ContactInfo";
import ContactMap from "@/pages/contact/ContactMap";

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
