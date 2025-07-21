import { MapPin, Phone, Mail, Clock, Car, Utensils } from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site-config";
import { H2 } from "@/components/ui/typography";

export default function ContactInfo() {
  return (
    <section className="py-16 bg-gray-50 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <H2 className="mb-8">Contact Information</H2>

          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Address
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  <Link
                    href={site.links.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {site.contact.address}
                  </Link>
                  <br />
                  <span className="text-sm text-gray-500">
                    Easily accessible via Ngong Road
                  </span>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Phone
                </h3>
                <p className="text-gray-600">
                  <Link
                    href={`tel:${site.contact.phone}`}
                    className="underline"
                  >
                    {site.contact.phone}
                  </Link>
                  <br />
                  <span className="text-sm text-gray-500">
                    Available daily {site.hours.weekdays}
                  </span>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Email
                </h3>
                <p className="text-gray-600">
                  <Link
                    href={`mailto:${site.contact.email}`}
                    className="underline"
                  >
                    {site.contact.email}
                  </Link>
                  <br />
                  <span className="text-sm text-gray-500">
                    We usually reply within 24 hours
                  </span>
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Hours
                </h3>
                <div className="text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Weekdays</span>
                    <span>{site.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekends</span>
                    <span>{site.hours.weekends}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Closed on {site.hours.closedOn}
                  </p>
                </div>
              </div>
            </div>

            {/* Parking */}
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Parking
                </h3>
                <p className="text-gray-600">
                  Free parking available on-site
                  <br />
                  <span className="text-sm text-gray-500">
                    Street parking also available nearby
                  </span>
                </p>
              </div>
            </div>

            {/* Private Events */}
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                <Utensils className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Private Events
                </h3>
                <p className="text-gray-600">
                  <Link
                    href={`mailto:${site.contact.email}`}
                    className="underline"
                  >
                    {site.contact.email}
                  </Link>
                  <br />
                  <span className="text-sm text-gray-500">
                    For events, email us Mon–Fri 9AM–6PM
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
