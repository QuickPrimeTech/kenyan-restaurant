import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H2, Paragraph } from "@/components/ui/typography";
import { Calendar } from "lucide-react";

export default function ReservationCTA() {
  return (
    <section className="section bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
      <div className="max-w-4xl mx-auto text-center text-primary-foreground">
        <H2 className="mb-6">Ready for an Ocean Adventure?</H2>
        <Paragraph className="text-lg mb-8">
          Reserve your table today and experience the finest coastal dining with
          breathtaking ocean views.
        </Paragraph>
        <Button asChild size="lg" variant="outline">
          <Link href="/reservations">
            <Calendar /> Reserve Your Table
          </Link>
        </Button>
      </div>
    </section>
  );
}
