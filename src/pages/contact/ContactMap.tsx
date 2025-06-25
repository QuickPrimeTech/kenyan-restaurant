"use client";

import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

import { MapPin } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 34.0195,
  lng: -118.4912,
};

export default function ContactMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
            Find Us
          </h2>
          <p className="text-gray-600">
            Located in the heart of Seaside Bay with stunning ocean views
          </p>
        </div>

        <div className="bg-gray-100 rounded-2xl shadow-lg overflow-hidden">
          <div className="aspect-video bg-gray-200 relative">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
              >
                <Marker position={center} />
              </GoogleMap>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Loading map...
              </div>
            )}
            <div className="absolute inset-0 bg-black/20  z-10 flex flex-col items-center justify-center text-center text-white">
              <MapPin className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
              <p>123 Ocean Drive, Seaside Bay, CA 90210</p>
              <p className="text-sm mt-2">Click to open in Google Maps</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 bg-gray-50 rounded-full px-6 py-3">
            <span className="text-gray-600">🚗 5 min from downtown</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-600">🚌 Bus Route 15 nearby</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-600">🚶‍♂️ Walking distance to pier</span>
          </div>
        </div>
      </div>
    </section>
  );
}
