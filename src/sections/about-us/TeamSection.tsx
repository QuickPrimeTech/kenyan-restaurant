import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { H2, Paragraph } from "@/components/ui/typography";

export default function TeamSection() {
  const team = [
    {
      name: "Wambui Mwangi",
      role: "Founder & Executive Chef",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753128200/image_mm485m.jpg",
      bio: "With over 30 years of culinary experience, Wambui blends traditional Swahili flavors with modern Kenyan cuisine, crafting every dish with heritage and heart.",
    },
    {
      name: "James Otieno",
      role: "Co-Founder & General Manager",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753127972/a2526bbc-98b1-42ac-ac99-a8f30058c564_xhsycg.jpg",
      bio: "James ensures smooth day-to-day operations and brings a warm, welcoming spirit to every guest experience, just like a true Kenyan host.",
    },
    {
      name: "Vivian Njeri",
      role: "Head Chef",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753128233/762f6e1d-96c4-43c5-918a-65663b716339_decnfl.jpg",
      bio: "Achieng is the creative force in the kitchen, known for fusing coastal traditions with fresh, locally sourced ingredients to elevate everyday meals.",
    },
    {
      name: "Brian Kiptoo",
      role: "Sous Chef & Grill Master",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753128008/827628f6-6d71-48a0-9aab-e6936a4f2bc7_zqlwzi.jpg",
      bio: "Brian brings fire to the grill and precision to the plate. Raised in Eldoret, his smoky nyama choma and sukuma twists are guest favorites.",
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <H2 className="mb-2">Meet Our Team</H2>
          <Paragraph>
            The passionate individuals who bring our coastal dining vision to
            life every day
          </Paragraph>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {team.map((member, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="overflow-hidden hover:shadow-xl py-0 pb-3 transition-shadow duration-300 h-full">
                  <div className="relative aspect-square">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
