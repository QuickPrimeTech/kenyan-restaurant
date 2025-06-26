import Image from "next/image";

export default function AboutHeader() {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://res.cloudinary.com/dhlyei79o/image/upload/v1749651450/upepo-restaurant_zsqdwt.jpg" // Replace with your actual image
          alt="Restaurant exterior"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Optional overlay for readability */}
        <div className="absolute inset-0 bg-header-foreground/20"></div>
      </div>

      <div className="container mx-auto px-4 text-center text-background">
        <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4">
          About Us
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Our Coastal Legacy
        </h1>
        <p className="text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
          For over three decades, Coastal Breeze has been more than just a
          restaurant—we&apos;re a family tradition, a community gathering place,
          and a celebration of coastal cuisine at its finest.
        </p>
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold">37+</div>
            <div>Years</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">50K+</div>
            <div>Happy Guests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">15</div>
            <div>Awards</div>
          </div>
        </div>
      </div>
    </section>
  );
}
