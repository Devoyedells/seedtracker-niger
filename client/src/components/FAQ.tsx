import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    <section
      className="relative overflow-hidden bg-gray-50 py-20 lg:py-32"
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #008751 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-brand-green/10 px-4 py-2 text-sm font-bold text-brand-green">
            Help & Guidance
          </span>
          <h2 className="mb-6 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Nigeria&apos;s seed value chain
            platform
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors duration-200 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                      <HelpCircle className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Toggle Icon */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      openIndex === index
                        ? "bg-brand-green text-white rotate-180"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-gray-100 bg-gray-50 px-6 py-5">
                        <div className="ml-16">
                          <p className="text-gray-600 leading-relaxed text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
