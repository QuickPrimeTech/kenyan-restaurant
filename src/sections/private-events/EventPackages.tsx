import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function EventPackages() {
  const packages = [
    {
      name: "Intimate Gathering",
      capacity: "Up to 20 guests",
      price: "Starting at $75/person",
      features: [
        "Private dining room",
        "Customized 3-course menu",
        "Dedicated server",
        "Complimentary wine pairing",
        "Special occasion cake",
        "Personalized menu cards",
      ],
      popular: false,
    },
    {
      name: "Celebration Package",
      capacity: "21-40 guests",
      price: "Starting at $95/person",
      features: [
        "Oceanview private dining room",
        "5-course tasting menu",
        "Dedicated event coordinator",
        "Premium wine selection",
        "Floral centerpieces",
        "Professional photography",
        "Custom event signage",
        "Valet parking",
      ],
      popular: true,
    },
    {
      name: "Grand Event",
      capacity: "41-100 guests",
      price: "Starting at $125/person",
      features: [
        "Full restaurant buyout option",
        "Chef's signature menu",
        "Full bar service",
        "Live music coordination",
        "Event planning services",
        "Bridal suite access",
        "Rehearsal dinner discount",
        "Overnight accommodation assistance",
      ],
      popular: false,
    },
  ];

  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className=" text-4xl font-bold mb-6">Event Packages</h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Choose from our carefully crafted packages or let us create a custom
            experience just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className="relative border-2 px-6 py-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <CardHeader className="text-center">
                <h3 className=" text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="mb-2">{pkg.capacity}</p>
                <p className="text-3xl font-bold">{pkg.price}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full py-3 rounded-full font-semibold">
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
