const contact = {
  phone: "+254712345678", // for tel:
  whatsapp: "+254712345678", // for wa.me
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
};
