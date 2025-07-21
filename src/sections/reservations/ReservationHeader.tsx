import { Badge } from "@/components/ui/badge";
import { H1, Paragraph } from "@/components/ui/typography";

export default function ReservationHeader() {
  return (
    <section className="section mt-10 bg-header-foreground/20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Badge className="px-4 py-2 rounded-full text-sm font-medium mb-4">
            Reservations
          </Badge>
          <H1 className="mb-6">Reserve Your Table</H1>
          <Paragraph>
            Secure your spot for an unforgettable coastal dining experience. We
            recommend booking in advance, especially for sunset dining and
            weekend reservations.
          </Paragraph>
        </div>
      </div>
    </section>
  );
}
