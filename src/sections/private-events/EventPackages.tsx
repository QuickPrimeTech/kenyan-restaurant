import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { site } from "@/config/site-config"; // Make sure this is the correct path
import Link from "next/link";
import { H2, Paragraph } from "@/components/ui/typography";

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
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <H2 className="mb-2">Event Packages</H2>
          <Paragraph>
            Choose from our carefully crafted packages or let us create a custom
            experience just for you
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => {
            const message = encodeURIComponent(
              `Hey Ziwa Restaurant, I wanted to get a quote for the ${pkg.name} package.`
            );

            return (
              <Card
                key={index}
                className="relative border-2 px-6 py-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow">
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

                  <Button
                    asChild
                    className="w-full py-3 rounded-full font-semibold"
                  >
                    <Link
                      href={`${site.links.whatsappUrl}?text=${message}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Quote
                      <ExternalLink />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
