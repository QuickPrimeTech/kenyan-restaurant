"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Gift, Check, Smartphone, X } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaWhatsapp } from "react-icons/fa6";

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => {
      if (val.startsWith("254")) return /^254[17]\d{8}$/.test(val);
      if (val.startsWith("0")) return /^0[17]\d{8}$/.test(val);
      if (val.startsWith("7") || val.startsWith("1"))
        return /^[17]\d{8}$/.test(val);
      return false;
    }, "Enter a valid Kenyan phone number")
    .transform((val) => {
      if (val.startsWith("254")) return val.slice(0, 12);
      if (val.startsWith("0")) return "254" + val.slice(1, 10);
      if (val.startsWith("7") || val.startsWith("1"))
        return "254" + val.slice(0, 9);
      return val.slice(0, 12);
    }),
});

const benefits = [
  "Exclusive deals",
  "New menu items",
  "Priority support",
  "Birthday treats",
];

const moreBenefits = [
  "Weekly menu updates and specials",
  "Flash sales and limited-time offers",
  "Order status updates via WhatsApp",
  "Customer loyalty rewards program",
  "Easy reordering of favorite meals",
];

const offerCard = {
  title: "Welcome Offer!",
  highlight: "10% OFF",
  description: "On your first order when you join",
};

export function WhatsAppCampaignPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  useEffect(() => {
    const hasRegistered = localStorage.getItem("whatsapp-campaign-registered");
    if (hasRegistered) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      localStorage.setItem("whatsapp-campaign-registered", "true");
      localStorage.setItem("whatsapp-discount-code", "WHATSAPP10");
      setIsSuccess(true);
      toast.success(
        "Successfully registered! Check your WhatsApp for your discount code."
      );
      setTimeout(() => setIsOpen(false), 3000);
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("whatsapp-popup-dismissed", "true");
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[95vw] max-w-sm mx-auto max-h-[90vh] p-0">
          <ScrollArea className="max-h-[90vh]">
            <div className="text-center space-y-4 py-4 px-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Welcome! 🎉
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                You&apos;ve joined our WhatsApp family and earned 10% off!
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 text-green-800 mb-2">
                  <Gift className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    Your Discount Code
                  </span>
                </div>
                <div className="text-xl font-mono font-bold text-green-700 bg-white px-2 py-1 rounded border">
                  WHATSAPP10
                </div>
                <p className="text-xs text-green-600 mt-1">
                  10% off your next order!
                </p>
              </div>
              <p className="text-xs text-gray-500">
                We&apos;ll send exclusive deals via WhatsApp shortly.
              </p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="w-[95vw] max-w-sm mx-auto max-h-[95vh] p-0 overflow-hidden"
        showCloseButton={false}
      >
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute top-1 right-1 size-8 z-50 hover:text-white hover:bg-green-700 text-white"
          >
            <X />
          </Button>
          <div className="text-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaWhatsapp className="size-5" />
            </div>
            <h2 className="text-base font-bold mb-1">Join Our WhatsApp!</h2>
            <p className="text-xs text-green-100">
              Get exclusive deals on your phone
            </p>
          </div>
        </div>
        <ScrollArea className="h-[calc(95vh-100px)]">
          <div className="p-4 space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center shadow-sm">
              <Gift className="h-7 w-7 text-green-600 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-green-800 mb-1 tracking-tight">
                {offerCard.title}
              </h3>
              <p className="text-2xl font-extrabold text-green-700 mb-1">
                {offerCard.highlight}
              </p>
              <p className="text-sm text-green-600">{offerCard.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                What you&apos;ll get:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                More Benefits:
              </h4>
              {moreBenefits.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1 text-xs text-gray-600"
                >
                  <Check className="h-3 w-3 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Smartphone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="0712345678"
                            disabled={isSubmitting}
                            className="pl-8 text-sm h-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-10 text-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <FaWhatsapp className="size-4" />
                      Get My 10% Discount
                    </>
                  )}
                </Button>
              </form>
            </Form>
            <p className="text-xs text-gray-500 text-center">
              Unsubscribe anytime by replying &quot;STOP&quot;
            </p>
            <div className="bg-blue-50 border mb-6 border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Why Join Now?
              </h4>
              <p className="text-xs text-blue-800">
                Join over 10,000+ happy customers who save money and never miss
                out on our delicious new dishes and special promotions!
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
