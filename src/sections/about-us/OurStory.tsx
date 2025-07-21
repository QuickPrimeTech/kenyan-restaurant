import Image from "next/image";

export default function OurStory() {
  return (
    <section className="section bg-white" aria-labelledby="our-story-title">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2
            id="our-story-title"
            className="font-serif text-4xl font-bold text-gray-900 mb-6"
          >
            Our Story
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            From a neighborhood dream to a beloved local gem
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              The Beginning
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ziwa Restaurant was born in 2014 out of a simple idea: to create a
              place where friends and family could gather over good food, great
              music, and warm conversation. Located along Ngong Road in Nairobi,
              Ziwa began as a cozy roadside joint with just a handful of plastic
              tables, a borrowed jiko, and a small chalkboard menu.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our founder, Wambui Mwangi, grew up in the coastal town of Kilifi,
              where food wasn&apos;t just nourishment—it was celebration.
              Inspired by her grandmother&apos;s traditional Swahili recipes and
              her own travels across Kenya, she set out to blend coastal flavors
              with Nairobi&apos;s vibrant urban culture. Word spread fast. Soon,
              Ziwa wasn&apos;t just a spot for a quick meal—it became a place
              people came to feel at home.
            </p>
          </div>
          <div>
            <Image
              src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1753127116/imgi_107_seafront-cafe_s6j0gv.jpg"
              alt="Ziwa’s original location – a humble roadside café with a coastal feel"
              width={500}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1753126994/imgi_179_onda-restaurant_siqodo.jpg"
              alt="Ziwa today – modern restaurant interior with coastal inspiration"
              width={500}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Today
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Today, Ziwa has evolved into a full-service restaurant known for
              its signature Swahili biryani, grilled seafood, and creative takes
              on Kenyan classics. While the space has grown and the kitchen has
              modernized, our spirit remains unchanged—we&apos;re still your
              neighborhood spot with coastal soul.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Our team is made up of passionate chefs, local farmers, and
              friendly staff who care deeply about quality, culture, and
              community. Whether it&apos;s your first visit or your fiftieth, we
              welcome you with the same warmth and flavors that started it all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
