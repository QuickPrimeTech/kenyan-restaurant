import { Badge } from "@/components/ui/badge";
import { H1 } from "@/components/ui/typography";
import Image from "next/image";

export default function ContactHeader() {
  return (
    <section
      className="relative section w-full mt-16"
      aria-labelledby="contact-header"
      role="region"
    >
      <Image
        src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1753124395/ccedbed8-827e-46b2-bec0-091ec79f7dc4_vqxshc.jpg"
        alt="Contact background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div>
          <Badge className="text-sm p-3 rounded-full font-medium mb-4">
            Contact Us
          </Badge>
          <H1 id="contact-header" className="text-white mb-4">
            Get in Touch
          </H1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            We&apos;d love to hear from you. Whether you have questions about
            our menu, want to make a reservation, or need assistance planning a
            special event, our team is here to help.
          </p>
        </div>
      </div>
    </section>
  );
}
