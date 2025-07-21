// @/config/site-config.ts
import { Instagram, Facebook } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

const contact = {
  phone: "+254717448835",
  whatsapp: "+254717448835",
  email: "orders@ziwa.co.ke",
  address: "Ngong Road, Nairobi, Kenya",
};

export const site = {
  restaurantName: "Ziwa Restaurant",
  restaurantDescription:
    "Karibu Ziwa – where great Kenyan flavors meet warm hospitality. Whether you're craving a hearty meal, a quick bite, or a cozy spot to unwind, we’ve got something delicious waiting for you.",
  contact,
  links: {
    whatsappUrl: `https://wa.me/${contact.whatsapp.replace("+", "")}`,
    callUrl: `tel:${contact.phone}`,
    googleMapsUrl: "https://maps.google.com/?q=Ziwa+Restaurant+Ngong+Road",
  },
  hours: {
    weekdays: "10:00 AM – 10:00 PM",
    weekends: "9:00 AM – 11:00 PM",
    closedOn: "Public Holidays",
  },
  socials: [
    {
      icon: Instagram,
      href: "https://www.instagram.com/quickprimetech/",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/quickprimetech/",
    },
    {
      icon: FaXTwitter,
      href: "https://twitter.com/quickprimetech/",
    },
  ],
  footerLinks: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "About Us", href: "/about" },
    { label: "Private Events", href: "/private-events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Reserve Table", href: "/reserve" },
  ],
};
