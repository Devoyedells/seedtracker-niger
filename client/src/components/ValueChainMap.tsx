import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  ArrowRight,
  Factory,
  Package,
  Truck,
  Store,
  Users,
} from "lucide-react";

export function ValueChainMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const chainStages = [
    {
      icon: Factory,
      title: "Production",
      actors: "1,240 Registered",
      description: "Seed breeders, foundation seed farms, multiplication farms",
      color: "bg-brand-green",
    },
    {
      icon: Package,
      title: "Processing",
      actors: "680 Facilities",
      description: "Cleaning, grading, treatment, packaging, quality testing",
      color: "bg-brand-earth",
    },
    {
      icon: Truck,
      title: "Distribution",
      actors: "2,100 Distributors",
      description: "Wholesalers, regional hubs, logistics providers",
      color: "bg-brand-sun",
    },
    {
      icon: Store,
      title: "Retail",
      actors: "3,850 Outlets",
      description: "Agro-dealers, seed shops, rural sales points",
      color: "bg-brand-green/80",
    },
    {
      icon: Users,
      title: "End Users",
      actors: "2,630 Groups",
      description: "Individual farmers, cooperatives, commercial farms",
      color: "bg-brand-earth/80",
    },
  ];

  return (
    <section
      className="py-24 bg-gradient-to-br from-brand-green to-brand-green/95 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="section-px relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Seed Value Chain Mapping
          </h2>
          <p className="text-xl text-white/75 max-w-3xl mx-auto">
            End-to-end visibility across all stages of Nigeria&apos;s seed
            ecosystem
          </p>
        </motion.div>

        {/* Desktop View — Horizontal Flow */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between gap-2 max-w-6xl mx-auto">
            {chainStages.map((stage, index) => (
              <div key={stage.title} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:bg-white/15 transition-all w-44">
                    <div
                      className={`w-12 h-12 ${stage.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}
                    >
                      <stage.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1 text-center">
                      {stage.title}
                    </h3>
                    <p className="text-brand-sun text-xs font-semibold text-center mb-3">
                      {stage.actors}
                    </p>
                    <p className="text-white/60 text-xs text-center leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </motion.div>

                {/* Arrow */}
                {index < chainStages.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.25 }}
                    className="mx-1 flex-shrink-0"
                  >
                    <ArrowRight className="w-6 h-6 text-white/40" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View — Vertical Stack */}
        <div className="lg:hidden space-y-4">
          {chainStages.map((stage, index) => (
            <div key={stage.title}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 ${stage.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <stage.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {stage.title}
                    </h3>
                    <p className="text-brand-sun text-sm font-semibold mb-2">
                      {stage.actors}
                    </p>
                    <p className="text-white/65 text-sm">{stage.description}</p>
                  </div>
                </div>
              </motion.div>

              {index < chainStages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="w-5 h-5 text-white/40 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
