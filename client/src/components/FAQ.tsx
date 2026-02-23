import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "Who can register on the platform?",
      answer:
        "Any individual or organization involved in Nigeria's seed value chain can register, including seed producers, processors, warehouses, distributors, retailers (agro-dealers), farmers, and cooperatives. Registration is free and open to all verified stakeholders.",
    },
    {
      question: "How do I list my seed products on the marketplace?",
      answer:
        'After registering as an actor, log into your dashboard and click "Add Product Listing". Fill in details about variety, quantity, price, location, and upload certification documents if applicable. Your listing goes live immediately and is visible to all platform users.',
    },
    {
      question: "Is there a fee for using the platform?",
      answer:
        "Registration and basic listing services are completely free. Premium features like featured listings, advanced analytics, and priority customer support are available through optional subscription plans starting from ₦5,000/month.",
    },
    {
      question: "How can I verify other actors on the platform?",
      answer:
        "All registered actors display a verification badge once they submit valid identification and business documentation. You can view an actor's profile to see their verification status, ratings, transaction history, and contact information.",
    },
    {
      question: "Can I track seed availability across different states?",
      answer:
        "Yes! Our platform provides real-time inventory tracking across all 36 states. Use the search and filter tools in the marketplace to find specific varieties by location, price range, and availability status.",
    },
    {
      question: "What support is available for new users?",
      answer:
        "We offer comprehensive onboarding support including video tutorials, user guides, and a dedicated helpline (+234 9 123 4567). Regional support staff are available across major agricultural zones to assist with registration and platform usage.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="section-px">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Nigeria&apos;s seed value chain
            platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl px-6 shadow-md border border-gray-100"
              >
                <AccordionTrigger className="text-left hover:text-[#008751] py-5">
                  <span className="font-medium text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
