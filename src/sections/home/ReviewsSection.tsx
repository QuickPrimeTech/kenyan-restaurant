import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Testimonials() {
  const testimonials = [
    {
      imgsrc:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750874383/clubhouse-colored-background-profile-picture-maker-full-50a8f7a7_vjmcg7.webp",
      name: "Marina Rodriguez",
      text: "The freshest seafood I&apos;ve ever tasted. The ocean views made it even more magical.",
      rating: 5,
    },
    {
      imgsrc:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750874383/christian-buehner-ditylc26zvi-unsplash_q2hzul.jpg",
      name: "Captain James Wilson",
      text: "As a local fisherman, I can say Bahari truly respects the ocean&apos;s bounty.",
      rating: 5,
    },
    {
      imgsrc:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750874385/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2_s7kg3d.jpg",
      name: "Isabella Chen",
      text: "Perfect for our anniversary dinner. The sunset view was absolutely breathtaking.",
      rating: 5,
    },
    {
      imgsrc: "",
      name: "Samuel Green",
      text: "A truly unforgettable dining experience. Will return again!",
      rating: 5,
    },
  ];

  return (
    <section className="section bg-grey-bg py-20 px-4">
      <h2 className="font-serif text-4xl font-bold text-center mb-12">
        What Our Guests Say
      </h2>

      <div className="relative w-full max-w-6xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/3 lg:basis-1/4"
              >
                <Card className="h-full">
                  <CardHeader className="text-orange-400 pt-4 pb-0 rounded-t-lg flex justify-between items-center">
                    <Avatar>
                      <AvatarImage
                        src={
                          testimonial.imgsrc || "https://github.com/shadcn.png"
                        }
                        alt={testimonial.name}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {testimonial.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-orange-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 pt-0">
                    <p className="mb-4 italic">{`"${testimonial.text}"`}</p>
                    <p className="font-semibold">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </section>
  );
}
