import { Leaf, Heart, Award, Users } from "lucide-react";

export default function ValuesSection() {
  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability",
      description:
        "We source responsibly from local fishermen and organic farms, protecting our oceans for future generations.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Family Tradition",
      description:
        "Three generations of culinary expertise, passed down through time-honored recipes and techniques.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description:
        "We never compromise on quality, from ingredient selection to the final presentation of each dish.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description:
        "We're proud to be part of the Seaside Bay community, supporting local businesses and charities.",
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container mx-auto ">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">
            Our Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The principles that guide everything we do, from sourcing
            ingredients to serving our guests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {value.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
