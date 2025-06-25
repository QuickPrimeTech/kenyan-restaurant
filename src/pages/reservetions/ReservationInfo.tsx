import { Clock, Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReservationInfo() {
  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto ">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
              Reservation Information
            </h2>
            <p className="text-gray-600">
              Everything you need to know about dining with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Operating Hours
                </h3>
                <div className="text-gray-600 text-sm space-y-1">
                  <div>Mon-Thu: 11am-10pm</div>
                  <div>Fri-Sat: 11am-11pm</div>
                  <div>Sun: 10am-9pm</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Call Us
                </h3>
                <div className="text-gray-600 text-sm">
                  <div>(555) 123-4567</div>
                  <div>Available 9am-9pm daily</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Email Us
                </h3>
                <div className="text-gray-600 text-sm">
                  <div>reservations@coastalbreeze.com</div>
                  <div>Response within 2 hours</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Location
                </h3>
                <div className="text-gray-600 text-sm">
                  <div>123 Ocean Drive</div>
                  <div>Seaside Bay, CA 90210</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">
                Reservation Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Booking Guidelines
                  </h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Reservations recommended, especially weekends</li>
                    <li>• Tables held for 15 minutes past reservation time</li>
                    <li>• Large parties (8+) require advance booking</li>
                    <li>• Same-day reservations available by phone</li>
                    <li>• Outdoor seating subject to weather conditions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Cancellation Policy
                  </h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Free cancellation up to 2 hours before</li>
                    <li>• Large parties require 24-hour notice</li>
                    <li>• No-show fee may apply for special occasions</li>
                    <li>• Modifications welcome with advance notice</li>
                    <li>• Weather cancellations fully refunded</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
