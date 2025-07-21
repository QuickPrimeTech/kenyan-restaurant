import Image from "next/image";

export default function GalleryHeader() {
  return (
    <section className="relative pt-24 pb-12 bg-header-foreground/10 text-background">
      <Image
        src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1753130180/imgi_108_nomad-beach-bar-view_rtynpo.jpg"
        alt="Gallery background"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-20 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4  ">
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
