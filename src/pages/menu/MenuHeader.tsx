import Image from "next/image";

export default function MenuHeader() {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://res.cloudinary.com/dhlyei79o/image/upload/v1749649461/1755---10-Min-Chicken-Tikka-Naan4296-1602146196824_fumajo.jpg"
          alt="Menu background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Single overlay for whitening */}
        <div className="absolute inset-0 bg-white/60"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="inline-block px-4 py-2 rounded-full text-lg font-medium mb-4">
            Our Menu
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Coastal Culinary Excellence
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted menu featuring the freshest seafood,
            locally sourced ingredients, and innovative coastal cuisine that
            celebrates the flavors of the sea.
          </p>
        </div>
      </div>
    </section>
  );
}
