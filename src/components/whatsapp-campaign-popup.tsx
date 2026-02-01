"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Gift, Check, Smartphone, Copy } from "lucide-react";
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

const offerCard = {
  title: "Welcome Offer!",
  highlight: "10% OFF",
  description: "On your first order when you join",
};

export function WhatsAppCampaignPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("WHATSAPP10");
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Failed to copy code. Please try again.");
    }
  };

  const form = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  useEffect(() => {
    const alreadyRegistered = localStorage.getItem(
      "whatsapp-campaign-registered",
    );
    const alreadyDismissed = sessionStorage.getItem("whatsapp-popup-dismissed");
    if (alreadyRegistered || alreadyDismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
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
        "Successfully registered! Check your WhatsApp for your discount code.",
      );
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
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Welcome! 🎉</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You&apos;ve joined our WhatsApp family and earned 10% off!
              </p>
              <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="size-4" />
                  <span className="text-sm font-semibold">
                    Your Discount Code
                  </span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <p className="text-xl text-start flex-1 font-mono font-bold text-green-700 bg-white px-4 py-1 rounded-md border">
                    WHATSAPP10
                  </p>
                  <Button
                    onClick={handleCopy}
                    className="bg-green-500 hover:bg-green-600"
                    aria-label="Copy discount code"
                  >
                    {copied ? (
                      <>
                        Copied!
                        <Check />
                      </>
                    ) : (
                      <>
                        Copy code
                        <Copy />
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  10% off your next order!
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
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
      <DialogContent className="w-[95vw] max-w-sm mx-auto max-h-[95vh] gap-0 p-0 overflow-hidden">
        <DialogHeader className="relative shadow-sm">
          <DialogTitle className="sr-only">
            Signup to our whatsapp campaign
          </DialogTitle>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 relative">
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
        </DialogHeader>

        <ScrollArea className="h-[calc(75vh-100px)]">
          <div className="p-4 space-y-4">
            <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-2xl p-4 text-center shadow-sm">
              <Gift className="h-7 w-7 text-green-600 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-green-800 dark:text-green-50 mb-1 tracking-tight">
                {offerCard.title}
              </h3>
              <p className="text-2xl font-extrabold text-green-700 dark:text-green-200 mb-1">
                {offerCard.highlight}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                {offerCard.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">
                What you&apos;ll get:
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
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
                          <Smartphone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
            <p className="text-xs text-muted-foreground text-center">
              Unsubscribe anytime by replying &quot;STOP&quot;
            </p>
            <div className="bg-blue-50 dark:bg-blue-900 border mb-6 border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-50 mb-1">
                Why Join Now?
              </h4>
              <p className="text-xs text-blue-800 dark:text-blue-200">
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
