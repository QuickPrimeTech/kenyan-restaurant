import { Calendar, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { H2, Paragraph } from "@/components/ui/typography";

export default function CTA({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "section bg-gradient-to-br from-primary to-primary/80 rounded-lg text-primary-foreground",
        className
      )}
      aria-label="Ready to dine or order online"
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <H2 className="mb-6">Ready for an Ocean Adventure?</H2>
        <Paragraph className="text-lg mb-8">
          Reserve your table today or order your favorite coastal dishes to
          enjoy wherever you are.
        </Paragraph>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/menu">
              <ShoppingBag className="mr-2" />
              Order Now
            </Link>
          </Button>

          <Button asChild size="lg" variant="cta">
            <Link href="/reservations">
              <Calendar className="mr-2" />
              Reserve Your Table
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
