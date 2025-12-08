"use client";
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
import { H2 } from "@/components/ui/typography";
import { Testimonial } from "@/types/testimonial";
import { useState } from "react";
import { TestimonialDialog } from "@/components/testimonials/testimonial-dialog";
import { Button } from "@/components/ui/button";

export default function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  const testimonials: Testimonial[] = [
    {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjV1vv9evIElYUomNLQlu9m91MG42X6s62EJRoMtlQmEoAdYPZ07=w72-h72-p-rp-mo-ba4-br100",
      name: "Shahriar Shakil Shuvo",
      text: "Ziwa Restaurant in Mombasa is an absolute gem! Located near Fort Jesus and overlooking the ocean, the view alone is worth the visit. But the real star is the food—delicious Swahili and seafood dishes that are full of rich, authentic flavors. I tried the grilled lobster and biryani, and both were perfectly cooked and generously portioned. The ambiance is laid-back yet vibrant, with a cool sea breeze and the sound of waves nearby. The staff were friendly, attentive, and made great recommendations from the menu. Prices are reasonable considering the quality and location. If you're in Old Town Mombasa and want a memorable meal with a touch of local culture, Forodhani is the place to be. Highly recommended!",
      rating: 5,
    },
    {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjWsFI54HN1_h5MbbO1Xai5Xvo_d_GMjaJwESKPn-Mtnhr8QYb88iQ=w36-h36-p-rp-mo-ba3-br100",
      name: "Michel Libamira",
      text: "Wonderful. The views are amazing. The food is 10/10. They don't serve alcohol. But you can sneak in ;-)",
      rating: 4,
    },
    {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjVOeut2Xs6yphx8cBquunIC4voAoFMfuHKiQUcLLS2PtZDEnOen6Q=w36-h36-p-rp-mo-ba4-br100",
      name: "Henry Ochieng",
      text: "Good ambience for a relaxed meal near the waves. Excellent food with good portions. Good service from well mannered staff.",
      rating: 4,
    },
    {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjUs0rxk50PSltlmeml5It8GEknB5wnYTRdVZzjQXjP-lK6VvS3lVA=w36-h36-p-rp-mo-ba6-br100",
      name: "Kit Teguh",
      text: "I came here on a Friday for lunch not knowing that about this time, it is prayer time and they will not serve you until 1:30PM, so if you come just a heads up. I didn't really mind, as you can still sit down and enjoy the view of the coast which is great on a good day. True to their word the staff will begin their service at the appointed time. I've got a nice mutton biriani with fall off the bone kind of meat. It's a well balanced meal with a nice bit of salsa and kachumbari. Maybe it's not the best biriani in town (checkout Mangaboy for this), but it's pretty solid. I would stay here for hours on end reading, but after 2PM the lunch crowd came and it gets pretty busy. But this place is definitely worth the little walk from Fort Jesus.",
      rating: 5,
    },
  ];

  return (
    <section className="section bg-grey-bg py-20 px-4">
      <H2 className="text-center mb-8">What Our Guests Say</H2>

      <div className="relative w-full max-w-6xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full">
                  <CardHeader className="pt-4 pb-0 rounded-t-lg flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <Avatar className="size-12">
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {testimonial.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Local Guide
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-5 ${
                            testimonial.rating > i
                              ? "fill-current"
                              : "stroke-current"
                          } text-yellow-500`}
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 pt-0">
                    <div>
                      <p className="text-muted-foreground font-chivo leading-relaxed line-clamp-4">
                        &quot;{testimonial.text}&quot;
                      </p>
                      {testimonial.text.length > 150 && (
                        <Button
                          className="px-0 cursor-pointer"
                          variant="link"
                          onClick={() => setSelectedTestimonial(testimonial)}
                        >
                          See more
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {selectedTestimonial && (
        <TestimonialDialog
          isOpen={!!selectedTestimonial}
          testimonial={selectedTestimonial}
          onOpenChange={(open: boolean) =>
            setSelectedTestimonial((prev) => (open ? prev : null))
          }
        />
      )}
    </section>
  );
}
