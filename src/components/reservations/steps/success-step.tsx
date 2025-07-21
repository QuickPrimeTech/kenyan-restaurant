"use client";
import { CheckCircleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SuccessStepProps = {
  name: string;
  date: Date | null;
  time: string;
};

export function SuccessStep({ name, date, time }: SuccessStepProps) {
  const formattedDate =
    date?.toLocaleDateString(undefined, {
      weekday: "long", // e.g., Tuesday
      year: "numeric",
      month: "long", // e.g., July
      day: "numeric",
    }) ?? "";

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] px-4 text-center">
      <Card className="w-full max-w-md shadow-xl border-emerald-200 border">
        <CardHeader className="flex flex-col items-center space-y-2">
          <CheckCircleIcon className="text-emerald-500 h-12 w-12" />
          <CardTitle className="text-2xl font-semibold text-emerald-600">
            Reservation Confirmed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Hi <span className="font-medium text-foreground">{name}</span>, your
            table has been booked for:
          </p>

          <div className="bg-emerald-50 rounded-md p-3 border text-sm text-emerald-900">
            <div className="font-semibold">{formattedDate}</div>
            <div>{time}</div>
          </div>

          <p className="text-sm text-muted-foreground">
            We look forward to serving you!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
