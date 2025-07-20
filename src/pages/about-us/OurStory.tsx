import Image from "next/image";

export default function OurStory() {
  return (
    <section className="section bg-white">
      <div className="container mx-auto ">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            From humble beginnings to coastal dining excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
              The Beginning
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              In 1987, Maria and Giuseppe Marinelli arrived from the coastal
              regions of Italy with nothing but a dream and generations of
              family recipes. They opened a small 20-seat restaurant with a
              simple mission: to bring authentic coastal flavors to their new
              community.
            </p>
            <p className="text-gray-600 leading-relaxed">
              What started as a family venture quickly became a beloved local
              institution, known for its warm hospitality, fresh ingredients,
              and the unmistakable taste of the Mediterranean coast.
            </p>
          </div>
          <div>
            <Image
              src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1749652905/biophilic_yyuc9b.jpg"
              alt="Original restaurant"
              width={500}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1749651788/Prawn_Biryani_Presentation_bqlpk1.jpg"
              alt="Modern restaurant"
              width={500}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
              Today
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Today, Coastal Breeze spans three generations of the Marinelli
              family, each bringing their own innovations while honoring the
              traditions that made us who we are. Our commitment to
              sustainability, local sourcing, and culinary excellence remains
              unwavering.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We&apos;ve grown from that small family restaurant to a 120-seat
              coastal dining destination, but our heart remains the same:
              creating memorable experiences through exceptional food and
              genuine hospitality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
