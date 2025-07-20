import { Button } from "@/components/ui/button";
import { Calendar, Phone, Mail } from "lucide-react";

export default function EventContact() {
  return (
    <section className="section bg-gray-100">
      <div className="container mx-auto ">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">Ready to Plan Your Event?</h2>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            Our dedicated events team is here to help you create an
            unforgettable experience. Contact us today to start planning your
            special celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center border-2 border-blue-400 p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Schedule Consultation
            </h3>
            <p>Meet with our events team to discuss your vision</p>
          </div>

          <div className="text-center border-2 border-blue-400 p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Call Direct</h3>
            <p>Speak with our events coordinator immediately</p>
          </div>

          <div className="text-center border-2 border-blue-400 p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Inquiry</h3>
            <p>Send us details about your upcoming event</p>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-4">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4">
              Call (555) 123-4567
            </Button>
          </div>
          <p className="mt-4">Events Team Available: Monday-Friday 9AM-6PM</p>
        </div>
      </div>
    </section>
  );
}
