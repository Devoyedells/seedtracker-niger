import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Factory,
  Warehouse,
  Store,
  Tractor,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";

export function ActorRegistration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const actorTypes = [
    {
      icon: Factory,
      title: "Seed Producers",
      description: "Breeders and multiplication farms",
      color: "bg-brand-green",
      iconBg: "bg-brand-green/10",
      benefits: [
        "List seed varieties & inventory",
        "Direct market access to buyers",
        "Production tracking & analytics",
      ],
    },
    {
      icon: Warehouse,
      title: "Processors & Warehouses",
      description: "Seed processing and storage facilities",
      color: "bg-brand-earth",
      iconBg: "bg-brand-earth/10",
      benefits: [
        "Inventory management tools",
        "Quality control tracking",
        "Connect with buyers & suppliers",
      ],
    },
    {
      icon: Store,
      title: "Distributors & Retailers",
      description: "Agro-dealers and seed shops",
      color: "bg-brand-sun",
      iconBg: "bg-brand-sun/10",
      benefits: [
        "Product sourcing transparency",
        "Competitive pricing access",
        "Nationwide customer network",
      ],
    },
    {
      icon: Tractor,
      title: "Farmers & Cooperatives",
      description: "Individual farmers and farmer groups",
      color: "bg-brand-green/80",
      iconBg: "bg-brand-green/10",
      benefits: [
        "Find quality certified seeds",
        "Compare suppliers & prices",
        "Bulk ordering & group access",
      ],
    },
  ];

  return (
    <section id="registration" className="py-24 bg-gray-50" ref={ref}>
      <div className="section-px">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-brand-green/10 px-4 py-2 rounded-full text-brand-green mb-4">
            <UserPlus className="w-4 h-4" />
            <span className="text-sm font-medium">Join the Network</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Register as a Value Chain Actor
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of registered actors across Nigeria&apos;s seed value
            chain and unlock new opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actorTypes.map((actor, index) => (
            <motion.div
              key={actor.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all flex flex-col"
            >
              {/* Colored accent bar */}
              <div className={`h-1.5 ${actor.color}`} />

              <div className="p-6 flex flex-col flex-grow">
                {/* Icon */}
                <div className="mb-5">
                  <div
                    className={`w-12 h-12 ${actor.color} rounded-lg flex items-center justify-center`}
                  >
                    <actor.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {actor.title}
                </h3>
                <p className="text-gray-500 text-sm mb-5">
                  {actor.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2.5 flex-grow">
                  {actor.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-1.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA — clean inline closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-4 text-base">
            Registration is free · Verified profiles · Nationwide coverage
          </p>
          <Button
            size="lg"
            className="bg-brand-green hover:bg-brand-green/90 text-white px-10 py-6 rounded-full text-base transition-all"
          >
            Register Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
