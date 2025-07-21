// components/reservations/contact-info-steps.tsx

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, Utensils } from "lucide-react";
import type { ReservationData } from "@/types/reservations";

interface ContactInfoStepProps {
  data: ReservationData;
  onUpdate: (data: Partial<ReservationData>) => void;
}

export function ContactInfoStep({ data, onUpdate }: ContactInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Contact Information
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          We&apos;ll use this information to confirm your reservation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <User className="h-5 w-5" />
              Personal Details
            </CardTitle>
            <CardDescription>Your name for the reservation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={data.firstName}
                onChange={(e) => onUpdate({ firstName: e.target.value })}
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={data.lastName}
                onChange={(e) => onUpdate({ lastName: e.target.value })}
                placeholder="Enter your last name"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Phone className="h-5 w-5" />
              Contact Details
            </CardTitle>
            <CardDescription>How we can reach you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => onUpdate({ phone: e.target.value })}
                placeholder="0712345678"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dietary Restrictions */}
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Utensils className="h-5 w-5" />
            Dietary Restrictions & Allergies
          </CardTitle>
          <CardDescription>
            Please let us know about any dietary restrictions or allergies
            (Optional)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="e.g., Vegetarian, Vegan, Gluten-free, Nut allergies, etc."
            value={data.dietaryRestrictions}
            onChange={(e) => onUpdate({ dietaryRestrictions: e.target.value })}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Contact Summary */}
      {(data.firstName || data.lastName || data.email || data.phone) && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4 sm:pt-6 p-3 sm:p-4">
            <div className="text-center">
              <h3 className="font-semibold text-blue-900 mb-2">
                Contact Summary
              </h3>
              <div className="text-blue-800 space-y-1 text-sm">
                {(data.firstName || data.lastName) && (
                  <p>
                    <span className="font-medium">Name:</span> {data.firstName}{" "}
                    {data.lastName}
                  </p>
                )}
                {data.email && (
                  <p>
                    <span className="font-medium">Email:</span> {data.email}
                  </p>
                )}
                {data.phone && (
                  <p>
                    <span className="font-medium">Phone:</span> {data.phone}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
