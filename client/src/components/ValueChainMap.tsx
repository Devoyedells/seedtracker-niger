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
  Sprout,
  Warehouse,
} from "lucide-react";

export function ValueChainMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const chainStages = [
    {
      icon: Sprout,
      title: "Input Provision",
      actors: "420 Suppliers",
      description: "Fertilizers, agrochemicals, and machinery.",
      color: "bg-emerald-600",
    },
    {
      icon: Factory,
      title: "Production",
      actors: "1,240 Farms",
      description: "Breeders and foundation seed farms.",
      color: "bg-brand-green",
    },
    {
      icon: Warehouse,
      title: "Aggregation",
      actors: "310 Centres",
      description: "Consolidating seeds for bulk processing.",
      color: "bg-purple-500",
    },
    {
      icon: Truck,
      title: "Dealers & Retail",
      actors: "850 Outlets",
      description: "Agro-dealers and distribution hubs.",
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: "Offtakers & End Users",
      actors: "680 Entities",
      description: "Commercial buyers and farmers.",
      color: "bg-brand-sun",
    },
  ];

  return (
    <section
      id="value-chain-map"
      className="relative overflow-hidden bg-brand-green py-24 lg:py-32"
      ref={ref}
    >
      {/* Plus Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,transparent_60%)] opacity-5" />
      </div>

      <div className="section-px relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white border border-white/20 backdrop-blur-md">
            Ecosystem Connectivity
          </span>
          <h2 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-5xl tracking-tight">
            Seed Value Chain Mapping
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-medium">
            End-to-end visibility across all stages of Nigeria&apos;s seed
            ecosystem
          </p>
        </motion.div>

        {/* Desktop View — Horizontal Flow */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between gap-3 max-w-[1280px] mx-auto px-4">
            {chainStages.map((stage, index) => (
              <div key={stage.title} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group cursor-pointer"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl transition-all duration-300 group-hover:bg-white/15 group-hover:-translate-y-2 w-48 relative overflow-hidden">
                    {/* Subtle inner glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div
                      className={`w-14 h-14 ${stage.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg relative z-10`}
                    >
                      <stage.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 relative z-10 leading-tight">
                      {stage.title}
                    </h3>
                    <p className="text-brand-sun text-sm font-bold mb-3 uppercase tracking-wide relative z-10">
                      {stage.actors}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed relative z-10">
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
                    className="mx-3 flex-shrink-0 text-white/40"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View — Vertical Stack */}
        <div className="lg:hidden space-y-4 max-w-md mx-auto">
          {chainStages.map((stage, index) => (
            <div key={stage.title}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`w-14 h-14 ${stage.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}
                  >
                    <stage.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {stage.title}
                    </h3>
                    <p className="text-brand-sun text-xs uppercase tracking-wider font-bold mb-2">
                      {stage.actors}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {index < chainStages.length - 1 && (
                <div className="flex justify-center py-3">
                  <ArrowRight className="w-6 h-6 text-white/40 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
