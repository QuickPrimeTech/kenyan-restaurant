"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { H2, Paragraph } from "@/components/ui/typography";
import { useState } from "react";

export default function FAQ() {
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    {
      question: "Do you offer valet parking?",
      answer:
        "Yes, we provide complimentary valet parking for all our guests. Our valet service is available during all operating hours, and we also have a self-parking lot adjacent to the restaurant for your convenience.",
    },
    {
      question: "Can you accommodate dietary restrictions and allergies?",
      answer:
        "Our culinary team is experienced in accommodating various dietary needs including gluten-free, vegetarian, vegan, and allergen-free options. Please inform us of any restrictions when making your reservation, and our chef will be happy to create a customized dining experience for you.",
    },
    {
      question: "What is the dress code?",
      answer:
        "We maintain a smart casual dress code. While we welcome guests in comfortable attire, we ask that you avoid beachwear, flip-flops, or overly casual clothing. For dinner service, business casual or cocktail attire is preferred to maintain our elegant coastal atmosphere.",
    },
    {
      question: "Do you accept walk-ins?",
      answer:
        "While we always try to accommodate walk-in guests, we highly recommend making a reservation to guarantee your table, especially during peak hours and weekends. Our bar area is available for walk-ins on a first-come, first-served basis.",
    },
    {
      question: "Is the restaurant child-friendly?",
      answer:
        "Yes, we welcome families with children! We offer a special children's menu featuring kid-friendly options, high chairs, and booster seats. Our staff is experienced in making families feel comfortable while maintaining our refined dining atmosphere.",
    },
    {
      question: "What are your hours of operation?",
      answer:
        "We are open Monday through Thursday from 11:00 AM to 10:00 PM, Friday and Saturday from 11:00 AM to 11:00 PM, and Sunday from 10:00 AM to 9:00 PM. We also offer a special Sunday brunch menu from 10:00 AM to 3:00 PM.",
    },
    {
      question: "Do you offer private dining for special events?",
      answer:
        "Yes! We have several private dining options including our Oceanview Private Dining Room (up to 40 guests) and our Beachside Terrace for larger events. We offer customized menus, dedicated service staff, and event planning assistance. Contact our events team for more details.",
    },
    {
      question: "Is there outdoor seating available?",
      answer:
        "Yes, we have a beautiful oceanfront terrace with outdoor seating that offers stunning views of the coastline. Outdoor seating is weather-dependent and available on a first-come, first-served basis. We recommend calling ahead to check availability.",
    },
  ];

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <section className="section" id="faqs" aria-labelledby="faqs-header">
      {/* Section Header */}
      <div className="text-center mb-16">
        <H2 className="mb-4" id="faqs-header" role="heading" aria-level={2}>
          Frequently Asked Questions
        </H2>
        <Paragraph role="note" aria-label="FAQ introduction">
          Get quick answers to help plan your perfect dining experience.
        </Paragraph>
      </div>

      {/* Accordion */}
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-3"
        aria-label="FAQ Accordion"
      >
        {displayedFaqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-md max-w-4xl mx-auto shadow-sm"
          >
            <AccordionTrigger
              className="px-6"
              aria-expanded={undefined}
              aria-controls={`faq-answer-${index}`}
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent
              id={`faq-answer-${index}`}
              className="px-6 pb-6 text-muted-foreground"
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Toggle Button */}
      <div className="text-center mt-6">
        <Button
          variant="outline"
          onClick={() => setShowAll(!showAll)}
          aria-pressed={showAll}
          aria-label={showAll ? "Collapse FAQs" : "Expand all FAQs"}
        >
          {showAll ? "See less" : "See more"}
        </Button>
      </div>
    </section>
  );
}
