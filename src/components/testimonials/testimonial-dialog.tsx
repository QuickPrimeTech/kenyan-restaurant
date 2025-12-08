"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Testimonial } from "@/types/testimonial";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";

type TestimonialDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial: Testimonial;
};

export const TestimonialDialog = ({
  isOpen,
  onOpenChange,
  testimonial,
}: TestimonialDialogProps) => {
  const renderStars = (rating: number) =>
    Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            rating > index
              ? "fill-yellow-500 text-yellow-500 animate-pulse"
              : "text-primary/30"
          }`}
        />
      ));

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-w-2xl 
          border border-primary/20 
          rounded-xl 
          animate-[fadeInUp_0.5s_ease] 
          transition-luxury
          px-0
          py-0
          overflow-hidden
          pb-4 
        gap-0
        "
      >
        <DialogHeader className="space-y-6 bg-muted px-3 py-4 rounded-2xl">
          <div className="flex items-center space-x-4">
            <Avatar className="size-16">
              <AvatarImage
                src={testimonial.image}
                alt={testimonial.name}
                className="object-cover"
              />
              <AvatarFallback>{testimonial.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-lg font-semibold text-foreground tracking-tighter">
                {testimonial.name}
              </DialogTitle>
              <div className="flex items-center mt-2 space-x-1">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable content for long reviews */}
        {/* Scrollable content for long reviews */}
        <ScrollArea className="max-h-[50vh] overflow-y-auto custom-scrollbar">
          <blockquote className="relative px-8 py-6">
            <p className="leading-relaxed text-foreground">
              {testimonial.text}
            </p>
          </blockquote>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
