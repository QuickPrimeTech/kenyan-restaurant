import { Card, CardContent } from "@/components/ui/card";
import { H2, Paragraph } from "@/components/ui/typography";
import { Leaf, Heart, Award, Users } from "lucide-react";

export default function ValuesSection() {
  const values = [
    {
      icon: <Leaf className="w-8 h-8" aria-hidden="true" />,
      title: "Sustainability",
      description:
        "We source responsibly from local fishermen and organic farms, protecting our oceans for future generations.",
    },
    {
      icon: <Heart className="w-8 h-8" aria-hidden="true" />,
      title: "Family Tradition",
      description:
        "Three generations of culinary expertise, passed down through time-honored recipes and techniques.",
    },
    {
      icon: <Award className="w-8 h-8" aria-hidden="true" />,
      title: "Excellence",
      description:
        "We never compromise on quality, from ingredient selection to the final presentation of each dish.",
    },
    {
      icon: <Users className="w-8 h-8" aria-hidden="true" />,
      title: "Community",
      description:
        "We're proud to be part of the Seaside Bay community, supporting local businesses and charities.",
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <H2 className="mb-2">Our Values</H2>
          <Paragraph>
            The principles that guide everything we do, from sourcing
            ingredients to serving our guests
          </Paragraph>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          role="list"
          aria-label="Our core values"
        >
          {values.map((value, index) => (
            <Card
              key={index}
              role="listitem"
              className="text-center hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-6 flex flex-col items-center">
                <div
                  className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  {value.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
