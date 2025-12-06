import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { site } from "@/config/site-config";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary transition-all">
                <Image
                  fill
                  src={site.logo}
                  alt={`${site.restaurantName} Logo`}
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-2xl font-bold text-foreground">
                {site.restaurantName}
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {site.restaurantDescription}
            </p>
            <div className="flex space-x-3">
              {site.socials.map(({ icon: Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-muted/50 hover:bg-primary border border-border hover:border-primary rounded-lg transition-all group"
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-foreground relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              {site.footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-6 text-foreground relative inline-block">
              Get In Touch
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {[
                { icon: MapPin, label: "Address", value: site.contact.address },
                { icon: Phone, label: "Phone", value: site.contact.phone },
                {
                  icon: Clock,
                  label: "Hours",
                  value: `${site.hours.weekdays} / ${site.hours.weekends}`,
                },
              ].map(({ icon: Icon, label, value }, idx) => (
                <div key={idx} className="flex items-start space-x-3 group">
                  <div className="flex items-center justify-center w-10 h-10 bg-muted/50 border border-border rounded-lg flex-shrink-0 group-hover:border-primary transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {label}
                    </p>
                    <p className="text-foreground text-sm leading-relaxed">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {site.restaurantName}. All rights
              reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Crafted with care by{" "}
              <Link
                href="https://quickprimetech.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-colors font-medium"
              >
                QuickPrimeTech
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
