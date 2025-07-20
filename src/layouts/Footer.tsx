import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Image
                  width={120}
                  height={120}
                  src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1750685108/Flux_Dev_A_minimalistic_logo_for_a_coastal_restaurant_featurin_0_yyrx6o.jpg"
                  alt="Coastal Breeze Logo"
                  className="object-cover rounded-full bg-black/60s"
                />
              </div>
              <span className="font-serif text-xl font-bold">
                Ziwa Restaurant
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Experience the finest coastal dining with fresh seafood, ocean
              views, and unforgettable flavors. Where every meal is a
              celebration of the sea.
            </p>
            <div className="flex space-x-4">
              <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors cursor-pointer">
                <Link href={"https://www.instagram.com/quickprimetech/"}>
                  <Instagram className="w-5 h-5 text-gray-300 hover:text-white" />
                </Link>
              </div>
              <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors cursor-pointer">
                <Link href={"https://www.instagram.com/quickprimetech/"}>
                  <Facebook className="w-5 h-5 text-gray-300 hover:text-white" />
                </Link>
              </div>
              <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors cursor-pointer">
                <Twitter className="w-5 h-5 text-gray-300 hover:text-white" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/private-events"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Private Events
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/reserve"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Reserve Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  123 Ocean Drive
                  <br />
                  Seaside Bay, CA 90210
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <div>Mon-Thu: 11am-10pm</div>
                  <div>Fri-Sat: 11am-11pm</div>
                  <div>Sun: 10am-9pm</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t flex flex-col lg:flex-row gap-3 items-center justify-between border-gray-800 mt-8 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Ziwa Seafood Restaurant. All rights
            reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Proudly made by{" "}
            <Link
              href="https://quickprimetech.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              QuickPrimeTech
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
