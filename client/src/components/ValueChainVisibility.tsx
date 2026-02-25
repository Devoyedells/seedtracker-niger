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
        "Track seed movement from production to farmer’s field with live inventory data across all 3 states.",
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

      <div className="relative z-10 section-px">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white border border-white/20 backdrop-blur-md">
            Data Architecture
          </span>
          <h2 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-5xl tracking-tight">
            Complete Value Chain Visibility
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Our platform provides real-time insights into inventory levels,
            actor performance, and market dynamics across Nigeria&apos;s entire
            seed ecosystem.
          </p>
        </motion.div>

        {/* Three pillars */}
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-3 mb-24">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md p-8 sm:p-10 border border-white/20 shadow-2xl transition-all hover:-translate-y-2 hover:bg-white/15"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10 mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 shadow-inner">
                <pillar.icon className="h-7 w-7 text-brand-sun" />
              </div>
              <h3 className="relative z-10 mb-4 text-2xl font-bold text-white">
                {pillar.title}
              </h3>
              <p className="relative z-10 text-base leading-relaxed text-white/70">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-[1000px] rounded-[40px] bg-white/5 p-10 border border-white/10 backdrop-blur-sm"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {[
              { value: "8,400", suffix: "+", label: "Total Actors" },
              { value: "3", suffix: "", label: "States Connected" },
              { value: "12,500", suffix: "+", label: "Product Listings" },
              { value: "100", suffix: "%", label: "Transparency" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="mb-2 flex items-baseline justify-center gap-1 font-mono text-5xl font-black text-brand-sun tracking-tighter">
                  {stat.value}
                  <span className="text-2xl">{stat.suffix}</span>
                </div>
                <div className="text-sm font-bold uppercase tracking-widest text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
