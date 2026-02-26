import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Globe, Eye } from "lucide-react";

// Counts up from 0 to `target` over `duration`ms with easeOutExpo, delayed by `delay`ms
function useCountUp(
  target: number,
  duration: number,
  delay: number,
  active: boolean,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    let rafId: number;
    const delayTimer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(eased * target));
        if (progress < 1) rafId = requestAnimationFrame(step);
        else setCount(target);
      };
      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(rafId);
    };
  }, [target, duration, delay, active]);

  return count;
}

export function ValueChainVisibility() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Individual stat counts (staggered 150ms apart after section enters view)
  const totalActors = useCountUp(8400, 1800, 500, isInView);
  const statesCount = useCountUp(3, 1000, 650, isInView);
  const listings = useCountUp(12500, 2000, 800, isInView);
  const transparency = useCountUp(100, 1400, 950, isInView);

  const stats = [
    {
      count: totalActors,
      formatted: totalActors.toLocaleString(),
      suffix: "+",
      label: "Total Actors",
    },
    {
      count: statesCount,
      formatted: String(statesCount),
      suffix: "",
      label: "States Connected",
    },
    {
      count: listings,
      formatted: listings.toLocaleString(),
      suffix: "+",
      label: "Product Listings",
    },
    {
      count: transparency,
      formatted: String(transparency),
      suffix: "%",
      label: "Transparency",
    },
  ];

  const pillars = [
    {
      icon: Eye,
      title: "Real-Time Visibility",
      description:
        "Track seed movement from production to farmer's field with live inventory data across all 3 states.",
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
      <style>{`
        @keyframes heartbeat {
          0%   { transform: scale(1); }
          14%  { transform: scale(1.18); }
          28%  { transform: scale(1); }
          42%  { transform: scale(1.12); }
          56%  { transform: scale(1); }
          100% { transform: scale(1); }
        }
      `}</style>
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
              <div
                className="relative z-10 mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 shadow-inner"
                style={
                  isInView
                    ? {
                        animation: `heartbeat 2.2s ease-in-out ${index * 0.35}s infinite`,
                      }
                    : {}
                }
              >
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
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="mb-2 flex items-baseline justify-center gap-1 font-mono text-5xl font-black text-brand-sun tracking-tighter">
                  {stat.formatted}
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
