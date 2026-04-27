import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  Users,
  Building2,
  GraduationCap,
  CheckCircle2,
  Tractor,
  Factory,
} from "lucide-react";

export function StakeholderBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const stakeholders = [
    {
      id: "producers",
      icon: Users,
      title: "Seed Producers",
      subtitle: "Breeders, Foundation & Multiplication Farms",
      description:
        "Elevate your seed business. Reach verified buyers directly, track your production metrics in real-time, and build a nationwide reputation for quality.",
      color: "text-brand-green",
      bgColor: "bg-brand-green/10",
      cardGradient: "from-brand-green/10 to-brand-green/5",
      accentColor: "bg-brand-green",
      benefits: [
        "Direct access to buyers nationwide",
        "Real-time market price information",
        "Product listing and inventory management",
        "Build reputation and customer base",
      ],
    },
    {
      id: "dealers",
      icon: Building2,
      title: "Dealers & Retailers",
      subtitle: "Agro-dealers & Seed Shops",
      description:
        "Source verified, high-quality seeds at competitive prices. Coordinate logistics effortlessly and provide your customers with transparent origin tracking.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      cardGradient: "from-blue-500/10 to-blue-500/5",
      accentColor: "bg-blue-500",
      benefits: [
        "Connect with verified seed suppliers",
        "Access to diverse product catalog",
        "Competitive pricing transparency",
        "Logistics and delivery coordination",
      ],
    },
    {
      id: "input_aggregators",
      icon: Tractor,
      title: "Inputs & Aggregation",
      subtitle: "Input Providers & Aggregators",
      description:
        "Reach out directly to producers and farmers. Provide inputs securely and aggregate yields efficiently using our real-time visibility tools.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      cardGradient: "from-emerald-500/10 to-emerald-500/5",
      accentColor: "bg-emerald-500",
      benefits: [
        "Targeted farmer outreach",
        "Streamlined procurement",
        "Logistics planning and aggregation",
        "Quality assurance tracking",
      ],
    },
    {
      id: "offtakers",
      icon: Factory,
      title: "Offtakers",
      subtitle: "Offtakers & Industrial Buyers",
      description:
        "Secure your supply chains. Discover verified seed producers and aggregators capable of fulfilling high-volume commercial needs consistently.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      cardGradient: "from-purple-500/10 to-purple-500/5",
      accentColor: "bg-purple-500",
      benefits: [
        "Guaranteed supply chains",
        "Verified actor sourcing",
        "Bulk procurement tracking",
        "Forward contracting opportunities",
      ],
    },
    {
      id: "policymakers",
      icon: GraduationCap,
      title: "For Policy Makers",
      subtitle: "Government & Regulatory Bodies",
      description:
        "Gain unprecedented oversight of the agricultural ecosystem. Access comprehensive data to shape effective policies and ensure national food security.",
      color: "text-brand-sun",
      bgColor: "bg-brand-sun/10",
      cardGradient: "from-brand-sun/10 to-brand-sun/5",
      accentColor: "bg-brand-sun",
      benefits: [
        "Comprehensive market intelligence",
        "Data-driven policy formulation",
        "Value chain gap identification",
        "Impact measurement and reporting",
      ],
    },
  ];

  const activeData = stakeholders[activeTab];

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-white via-brand-mist to-brand-soft/30"
      ref={ref}
    >
      <div className="section-px">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-brand-sun/15 border border-brand-sun/30 text-sm font-black text-brand-sun-deep tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-sun" />
            Value Chain Sync
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Built for Every Niger State Stakeholder
          </h2>
          <div className="niger-rule mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover tailored tools and insights designed to accelerate growth
            across the entire Niger State agricultural ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
          {/* LEFT: Interactive Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-3"
          >
            {stakeholders.map((stakeholder, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={stakeholder.id}
                  onClick={() => setActiveTab(index)}
                  className={`relative text-left p-6 rounded-2xl transition-all duration-300 border ${
                    isActive
                      ? "bg-white shadow-xl border-gray-100 z-10"
                      : "bg-transparent border-transparent hover:bg-white hover:shadow-sm text-gray-500 hover:text-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isActive
                          ? stakeholder.bgColor
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <stakeholder.icon
                        className={`w-7 h-7 ${isActive ? stakeholder.color : ""}`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-bold transition-colors text-lg ${
                          isActive ? "text-gray-900" : ""
                        }`}
                      >
                        {stakeholder.title}
                      </h3>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-sm text-gray-500 mt-1"
                          >
                            {stakeholder.subtitle}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  {/* Subtle active indicator stripe */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-r-full ${stakeholder.accentColor}`}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* RIGHT: Dynamic Display Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 h-full"
          >
            <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100 overflow-hidden h-full min-h-[400px] flex flex-col justify-center">
              {/* Animated background gradient based on active tab */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 bg-gradient-to-br ${activeData.cardGradient} opacity-30`}
                />
              </AnimatePresence>

              {/* Decorative graphic (abstract circles) */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/40 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${activeData.bgColor}`}
                    >
                      <activeData.icon
                        className={`w-8 h-8 ${activeData.color}`}
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {activeData.title} Advantage
                    </h3>
                    <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                      {activeData.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-y-5 gap-x-8">
                      {activeData.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2
                            className={`w-6 h-6 flex-shrink-0 mt-0.5 ${activeData.color}`}
                          />
                          <span className="text-gray-800 font-medium leading-snug">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
