import Image from "next/image";

export default function ContactHeader() {
  return (
    <section className="relative h-[80vh] w-full">
      <Image
        src="https://res.cloudinary.com/dhlyei79o/image/upload/v1748901619/samples/imagecon-group.jpg" // Replace with your actual image path in public/
        alt="Contact background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div>
          <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Contact Us
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Get in Touch
          </h1>
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
