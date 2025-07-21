"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Phone, Mail } from "lucide-react";
import { site } from "@/config/site-config";
import Link from "next/link";
import { H2, Paragraph } from "@/components/ui/typography";

export default function EventContact() {
  const { contact, links, hours } = site;

  return (
    <section className="section bg-gray-100" id="event-contact">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <H2 className="mb-2">Ready to Plan Your Event?</H2>
          <Paragraph>
            Our dedicated events team is here to help you create an
            unforgettable experience. Contact us today to start planning your
            special celebration.
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-lg">Schedule Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Meet with our events team to discuss your vision</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-lg">Call Direct</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Speak with our events coordinator immediately</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-lg">Email Inquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Send us details about your upcoming event</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-4" asChild>
              <Link href={links.callUrl}>Call {contact.phone}</Link>
            </Button>
          </div>
          <p className="mt-4">
            Events Team Available: Monday&ndash;Friday {hours.weekdays}
          </p>
        </div>
      </div>
    </section>
  );
}
