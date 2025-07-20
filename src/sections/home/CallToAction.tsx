import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ReservationCTA() {
  return (
    <section className="section">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl font-bold mb-6">
          Ready for an Ocean Adventure?
        </h2>
        <p className="text-lg mb-8">
          Reserve your table today and experience the finest coastal dining with
          breathtaking ocean views.
        </p>
        <Button asChild size="lg">
          <Link href="/reservations">Reserve Your Table</Link>
        </Button>
      </div>
    </section>
  );
}
