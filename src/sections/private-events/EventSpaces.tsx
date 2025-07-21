import { H2, H3, Paragraph } from "@/components/ui/typography";
import Image from "next/image";

export default function EventSpaces() {
  const spaces = [
    {
      name: "Oceanview Private Dining Room",
      capacity: "Up to 40 guests",
      description:
        "Floor-to-ceiling windows with panoramic ocean views, perfect for intimate celebrations and business dinners.",
      features: [
        "Ocean views",
        "Private bar",
        "AV equipment",
        "Climate controlled",
      ],
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753001420/imgi_92_Restaurant-18-scaled_aes5ba.jpg",
    },
    {
      name: "Beachside Terrace",
      capacity: "Up to 80 guests",
      description:
        "Open-air terrace with direct beach access, ideal for cocktail receptions and outdoor ceremonies.",
      features: [
        "Beach access",
        "Sunset views",
        "Outdoor bar",
        "Weather protection",
      ],
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753126670/imgi_198_PMM_4187_pl5v8b.jpg",
    },
    {
      name: "Full Restaurant Buyout",
      capacity: "Up to 120 guests",
      description:
        "Complete restaurant exclusivity for your special event, including all dining areas and outdoor spaces.",
      features: [
        "Exclusive use",
        "Full kitchen access",
        "Multiple spaces",
        "Valet parking",
      ],
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753126994/imgi_179_onda-restaurant_siqodo.jpg",
    },
  ];

  return (
    <section className="section bg-gray-100">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <H2 className="mb-2">Event Spaces</H2>
          <Paragraph>
            Discover our versatile event spaces, each offering unique ambiance
            and stunning coastal views
          </Paragraph>
        </div>

        <div className="space-y-16">
          {spaces.map((space, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <Image
                  src={space.image || "/placeholder.svg"}
                  alt={space.name}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <H3 className="font-serif text-3xl font-bold mb-3">
                  {space.name}
                </H3>
                <p className="font-medium mb-4">{space.capacity}</p>
                <p className="leading-relaxed mb-6">{space.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {space.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
