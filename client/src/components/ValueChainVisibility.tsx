import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { TrendingUp, Globe, Eye } from "lucide-react";

export function ValueChainVisibility() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    {
      icon: Eye,
      title: "Real-Time Visibility",
      description:
        "Track seed movement from production to farmer\u2019s field with live inventory data across all 36 states.",
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description:
        "Access price trends, actor performance metrics, and demand forecasts to make informed decisions.",
    },
    {
      icon: Globe,
      title: "Nationwide Reach",
      description:
        "Connect with verified actors in every geopolitical zone — from production clusters to last-mile retail.",
    },
  ];

  return (
    <section
      className="w-full bg-gradient-to-br from-brand-green to-brand-green/95 relative overflow-hidden"
      ref={ref}
    >
      {/* Full-width dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Decorative arc */}
      <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border border-white/10" />
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/5" />

      <div className="relative z-10 section-px py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Complete Value Chain Visibility
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Our platform provides real-time insights into inventory levels,
            actor performance, and market dynamics across Nigeria&apos;s entire
            seed ecosystem.
          </p>
        </motion.div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="bg-white/08 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/12 transition-all"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                <pillar.icon className="w-6 h-6 text-brand-sun" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-white/65 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "8,400+", label: "Total Actors" },
            { value: "36", label: "States Connected" },
            { value: "12,500+", label: "Product Listings" },
            { value: "100%", label: "Transparency" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-brand-sun mb-1">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
