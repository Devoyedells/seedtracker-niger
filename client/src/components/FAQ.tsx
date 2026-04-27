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
      question: "Who can register on the Niger State Seed Tracker?",
      answer:
        "Any individual or organization involved in the seed value chain across Niger, Anambra and Ekiti can register, including seed producers, processors, warehouses, distributors, retailers (agro-dealers), farmers, and cooperatives. This Niger State edition specifically champions actors operating across the Power State. Registration is free and open to all participating-state stakeholders.",
    },
    {
      question: "Is there a fee for using the platform?",
      answer:
        "No, registration and creating your actor profile on the Niger State Seed Tracker are completely free.",
    },
    {
      question: "How can others verify my actor profile?",
      answer:
        "After registering, you receive a unique, scannable QR code on your dashboard. You can share this code with anyone in Niger State or beyond. When someone scans it, they are taken directly to your public verified profile, showcasing your details, organization, and confirmed actor type.",
    },
    {
      question: "How do I find other seed value chain actors?",
      answer:
        "Our platform provides a real-time geospatial map. You can use the Actor Map feature to explore and find other registered actors (such as producers, aggregators, or farmers) across Niger State and partner states, rapidly filtering by actor type or specific LGA.",
    },
    {
      question: "Which states are currently supported?",
      answer:
        "The platform supports three participating states: Niger (the focus of this edition), Anambra, and Ekiti. The Niger State edition emphasizes Power-State actors while still giving you visibility into the wider 3-state network.",
    },
    {
      question: "Is my personal data and exact location public?",
      answer:
        "No, your privacy is a high priority. On the public Actor Map, locations are slightly anonymized or approximated to protect your exact address. Sensitive contact details are only shared securely through your verified public profile, which you control via your personalized QR Code.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-white via-brand-mist to-brand-soft/30 py-20 lg:py-32"
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0d4d2c 1px, transparent 0)`,
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
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-sun/15 border border-brand-sun/30 px-4 py-2 text-sm font-black text-brand-sun-deep tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-sun" />
            Help & Guidance
          </span>
          <h2 className="mb-4 text-3xl font-black text-gray-900 md:text-4xl lg:text-5xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="niger-rule mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            Everything you need to know about Niger State&apos;s seed value
            chain platform
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
                className="overflow-hidden rounded-2xl border border-brand-green/10 bg-white shadow-[0_4px_18px_-8px_rgba(13,77,44,0.10)] transition-all duration-300 hover:shadow-[0_18px_36px_-12px_rgba(13,77,44,0.15)] hover:border-brand-sun/40"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  data-testid={`faq-toggle-${index}`}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors duration-200 hover:bg-brand-mist"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        openIndex === index
                          ? "bg-brand-green text-brand-sun shadow-md shadow-brand-green/20"
                          : "bg-brand-soft text-brand-green"
                      }`}
                    >
                      <HelpCircle className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Toggle Icon */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      openIndex === index
                        ? "bg-brand-sun text-white rotate-180 shadow-md shadow-brand-sun/30"
                        : "bg-brand-soft text-brand-green"
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
                      <div className="border-t border-brand-green/10 bg-brand-mist px-6 py-5">
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
