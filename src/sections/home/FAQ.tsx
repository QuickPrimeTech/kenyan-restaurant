"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <section className="section bg-grey-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 text-4xl rounded-full  font-bold mb-4">
            Frequently Asked Questions
          </div>

          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about your visit? We&apos;ve compiled answers to the
            most common inquiries to help you plan the perfect dining
            experience.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-full ">
          <div className="space-y-4">
            {displayedFaqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between transition-colors duration-200"
                >
                  <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See More / See Less Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-block px-4 py-2 rounded-full font-medium underline"
            >
              {showAll ? "See less" : "See more"}
            </button>
          </div>
        </div>

        {/* Contact CTA */}
      </div>
    </section>
  );
}
