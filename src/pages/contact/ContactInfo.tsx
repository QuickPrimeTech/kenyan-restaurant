import { MapPin, Phone, Mail, Clock, Car, Utensils } from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8">
            Contact Information
          </h2>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-teal-100 p-3 rounded-full flex-shrink-0">
                <MapPin className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Address
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  123 Ocean Drive
                  <br />
                  Seaside Bay, CA 90210
                  <br />
                  <span className="text-sm text-gray-500">
                    Oceanfront location with stunning views
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Phone
                </h3>
                <p className="text-gray-600">
                  <a
                    href="tel:+15551234567"
                    className="hover:text-teal-600 transition-colors"
                  >
                    (555) 123-4567
                  </a>
                  <br />
                  <span className="text-sm text-gray-500">
                    Available daily 9:00 AM - 9:00 PM
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Email
                </h3>
                <p className="text-gray-600">
                  <a
                    href="mailto:info@coastalbreeze.com"
                    className="hover:text-teal-600 transition-colors"
                  >
                    info@coastalbreeze.com
                  </a>
                  <br />
                  <span className="text-sm text-gray-500">
                    We respond within 24 hours
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Hours
                </h3>
                <div className="text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Monday - Thursday</span>
                    <span>11:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday - Saturday</span>
                    <span>11:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 9:00 PM</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Sunday Brunch: 10:00 AM - 3:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                <Car className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Parking
                </h3>
                <p className="text-gray-600">
                  Complimentary valet parking available
                  <br />
                  <span className="text-sm text-gray-500">
                    Self-parking lot also available adjacent to restaurant
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                <Utensils className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Private Events
                </h3>
                <p className="text-gray-600">
                  <a
                    href="mailto:events@coastalbreeze.com"
                    className="hover:text-teal-600 transition-colors"
                  >
                    events@coastalbreeze.com
                  </a>
                  <br />
                  <span className="text-sm text-gray-500">
                    Dedicated events team available Mon-Fri 9AM-6PM
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
