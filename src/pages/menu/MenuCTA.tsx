import { Button } from "@/components/ui/button";

export default function MenuCTA() {
  return (
    <section className="section bg-grey-bg">
      <div className="container mx-auto px-4 text-center">
        <h2 className=" text-4xl font-bold mb-6">
          Ready to Experience Our Cuisine?
        </h2>
        <p className="text-xl  mb-8 max-w-2xl mx-auto">
          Reserve your table now and let our chefs create an unforgettable
          dining experience for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="  px-8 py-4 ">
            Reserve a Table
          </Button>
          <Button size="lg" variant="outline" className=" px-8 py-4 ">
            Order Takeaway
          </Button>
        </div>
      </div>
    </section>
  );
}
