import type { Metadata } from "next";
import { Quicksand, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/config/site-config";
import { ContactButton } from "@/components/contact-button";
import { WhatsAppCampaignPopup } from "@/components/whatsapp-campaign-popup";
import { CartProvider } from "@/hooks/use-cart";

// Headings
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

// Body text
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: site.restaurantName,
  description: site.restaurantDescription,
  openGraph: {
    title: site.restaurantName,
    description: site.restaurantDescription,
    images: [
      {
        url: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753297391/ZiwaRestaurantOpenGraph_z2r7ly.png",
        width: 1200,
        height: 630,
        alt: `${site.restaurantName} Open Graph Image`,
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: site.restaurantName,
  },
  twitter: {
    card: "summary_large_image",
    title: site.restaurantName,
    description: site.restaurantDescription,
    images: [
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753297391/ZiwaRestaurantOpenGraph_z2r7ly.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${quicksand.variable} ${nunito.variable} antialiased font-mono`}
      >
        <CartProvider>
          <Navbar />
          {children}
          <ContactButton />
          <WhatsAppCampaignPopup />
          <Toaster richColors position="top-center" />
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
