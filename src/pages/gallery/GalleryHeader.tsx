import Image from "next/image";

export default function GalleryHeader() {
  return (
    <section className="relative pt-24 pb-12">
      <Image
        src="https://res.cloudinary.com/dhlyei79o/image/upload/v1749844860/PAB8263-HDR-scaled_dkwpxs.jpg"
        alt="Gallery background"
        fill
        priority
        className="object-cover object-center z-0"
      />

      <div className="absolute inset-0 bg-white/40 z-10" />

      <div className="relative z-20 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-white/70 ">
              Gallery
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Visual Stories
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Explore the beauty of coastal dining through our curated
              collection of moments, from exquisite dishes to breathtaking ocean
              views and memorable celebrations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
