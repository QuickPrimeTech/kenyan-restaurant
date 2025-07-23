import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/cart-context";
import { CartButton } from "@/components/cart/cart-button";
import { OrderProvider } from "@/contexts/order-context";
import { site } from "@/config/site-config";
import { ContactButton } from "@/components/contact-button";
import { WhatsAppCampaignPopup } from "@/components/whatsapp-campaign-popup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: site.restaurantName,
  description: site.restaurantDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrderProvider>
          <CartProvider>
            <Navbar />
            {children}
            <ContactButton />
            <WhatsAppCampaignPopup />
            <Toaster richColors position="top-center" />
            <CartButton />
          </CartProvider>
        </OrderProvider>
        <Footer />
      </body>
    </html>
  );
}
