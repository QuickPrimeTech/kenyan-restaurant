"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useOrder } from "@/contexts/order-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { PickupFormValues, pickupSchema } from "@/schemas/cart/pickup-form";

interface PickupFormProps {
  onContinue: () => void;
}

export function PickupForm({ onContinue }: PickupFormProps) {
  const { setPickupInfo } = useOrder();

  const form = useForm<PickupFormValues>({
    resolver: zodResolver(pickupSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      instructions: "",
    },
  });

  // Load saved details once on mount
  useEffect(() => {
    const saved = localStorage.getItem("pickupUserDetails");
    if (saved) {
      const data = JSON.parse(saved);
      form.reset({
        ...form.getValues(), // keep current defaults
        fullName: data.fullName || "",
        email: data.email,
        phone: data.phone || "",
        instructions: data.instructions || "",
      });
    }
  }, [form]);


  // onSubmit will receive typed values (date is Date due to schema)
  const onSubmit = (values: PickupFormValues) => {
    localStorage.setItem(
      "pickupUserDetails",
      JSON.stringify({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        instructions: values.instructions,
      })
    );


    // ✅ Store all pickup details in context
    setPickupInfo({
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      instructions: values.instructions,
    });

    onContinue();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 w-full max-sm:pb-16"
    >
      {/* Location */}
      <Card className="w-full bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-50">
            <MapPin className="h-4 w-4" />
            Pickup Location
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-700 dark:text-green-200 space-y-1">
          <p>
            <strong className="mr-2">Located in: PETROCITY-Gigiri</strong>
          </p>
          <p>Address: QR74+JR2, Limuru Rd, Nairobi</p>
          <p className="pt-2">
            <strong className="mr-2">Opening Days:</strong> Tuesday – Sunday
          </p>
          <p>
            <strong className="mr-2">Hours:</strong>11:00 AM – 10:30 PM
          </p>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Schedule Pickup
          </CardTitle>
          <CardDescription>Choose your preferred date & time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label>Full Name *</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              {...form.register("fullName")}
            />
            {form.formState.errors.fullName && (
              <p className="text-xs text-red-500">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone Number *</Label>
            <Input
              type="tel"
              placeholder="0712345678 or +254712345678"
              {...form.register("phone")}
            />
            {form.formState.errors.phone && (
              <p className="text-xs text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>
          {/* Email (Optional) */}
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          {/* Instructions */}
          <div className="space-y-2">
            <Label>Special Instructions (Optional)</Label>
            <Textarea
              rows={2}
              placeholder="Any special requests"
              {...form.register("instructions")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Policy */}
      <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-700">
        <CardHeader>
          <CardTitle className="text-amber-900 dark:text-amber-50">
            Pickup Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-amber-700 dark:text-amber-200 space-y-1">
          <p>• No pickup fee</p>
          <p>• Arrive within 15 minutes of scheduled time</p>
          <p>• Bring valid ID for verification</p>
          <p>• Orders not collected within 1 hour may be cancelled</p>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full">
        Continue to Payment <ArrowRight />
      </Button>
    </form>
  );
}
