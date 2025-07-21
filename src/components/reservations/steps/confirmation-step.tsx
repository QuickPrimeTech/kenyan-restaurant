"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  User,
  Mail,
  Phone,
  Heart,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { format } from "date-fns";
import type { ReservationData } from "@/types/reservations";

interface ConfirmationStepProps {
  data: ReservationData;
  onConfirm: () => void;
}

const occasionLabels = {
  casual: "Casual Dining",
  anniversary: "Anniversary",
  birthday: "Birthday",
  business: "Business Meeting",
  special: "Special Occasion",
};

export function ConfirmationStep({ data, onConfirm }: ConfirmationStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Confirm Your Reservation
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Please review your reservation details before confirming
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reservation Details */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Calendar className="h-5 w-5" />
              Reservation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-sm sm:text-base">Date</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {data.date
                    ? format(data.date, "EEEE, MMMM do, yyyy")
                    : "Not selected"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-sm sm:text-base">Time</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {data.time || "Not selected"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-sm sm:text-base">Party Size</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {data.partySize} {data.partySize === 1 ? "guest" : "guests"}
                </p>
              </div>
            </div>

            {data.occasion && (
              <div className="flex items-center gap-2 sm:gap-3">
                <Heart className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Occasion</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {
                      occasionLabels[
                        data.occasion as keyof typeof occasionLabels
                      ]
                    }
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 sm:gap-3">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-sm sm:text-base">Table</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {data.tableName} ({data.diningArea})
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-sm sm:text-base">Name</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {data.firstName} {data.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-sm sm:text-base">Email</p>
                <p className="text-xs sm:text-sm text-gray-600">{data.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-sm sm:text-base">Phone</p>
                <p className="text-xs sm:text-sm text-gray-600">{data.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Special Requests */}
      {(data.specialRequests || data.dietaryRestrictions) && (
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg">
              Special Requests & Dietary Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {data.specialRequests && (
              <div>
                <p className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                  Special Requests
                </p>
                <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-md">
                  {data.specialRequests}
                </p>
              </div>
            )}
            {data.dietaryRestrictions && (
              <div>
                <p className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                  Dietary Restrictions
                </p>
                <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-md">
                  {data.dietaryRestrictions}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* WhatsApp Confirmation Notice */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-4 sm:pt-6 p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1 sm:mb-2 text-sm sm:text-base">
                WhatsApp Confirmation
              </h3>
              <div className="text-xs sm:text-sm text-green-800 space-y-1">
                <p>
                  • You will receive a WhatsApp message within 5 minutes
                  confirming your reservation
                </p>
                <p>
                  • We&apos;ll send you a reminder 24 hours before your
                  reservation
                </p>
                <p>
                  • To modify or cancel your reservation, contact us via
                  WhatsApp at <strong>+254 700 123 456</strong>
                </p>
                <p>
                  • Please arrive 10 minutes early to ensure your table is ready
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Backup Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-4 sm:pt-6 p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">
                Email Backup
              </h3>
              <div className="text-xs sm:text-sm text-blue-800 space-y-1">
                <p>
                  • A confirmation email will also be sent to your email address
                </p>
                <p>• Keep this for your records and reference</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Button */}
      <div className="flex justify-center pt-6">
        <Button
          onClick={onConfirm}
          size="lg"
          className="w-full sm:w-auto sm:min-w-[200px] text-lg py-3 px-8"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          Confirm Reservation
        </Button>
      </div>
    </div>
  );
}
