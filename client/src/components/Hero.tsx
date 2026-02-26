import { motion } from "motion/react";
import { ArrowRight, Network } from "lucide-react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export function Hero() {
  const { data: stats } = useQuery({
    queryKey: ["public-hero-stats"],
    queryFn: async () => {
      const res = await api.get("/users/public-data/stats");
      localStorage.setItem("public_hero_stats_cache", JSON.stringify(res.data));
      return res.data;
    },
    initialData: () => {
      const cached = localStorage.getItem("public_hero_stats_cache");
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          /* ignore error */
        }
      }
      return {
        totalActors: 10000,
        stateCounts: [{ _id: "Ekiti" }, { _id: "Niger" }, { _id: "Anambra" }],
        actorTypeCounts: [
          { _id: "producer", count: 1240 },
          { _id: "dealer", count: 850 },
          { _id: "input_provider", count: 420 },
          { _id: "aggregator", count: 310 },
          { _id: "offtaker", count: 180 },
        ],
      };
    },
  });

  const getActorCount = (type: string, fallback: number) => {
    if (!stats || !stats.actorTypeCounts) return fallback;
    const found = stats.actorTypeCounts.find((a: any) => a._id === type);
    return found ? found.count : 0; // Use actual zero if not found in real data, but we use hardcoded mapping in UI
  };

  const calculateWidth = (count: number, max: number) => {
    return `${Math.max(5, Math.min(100, (count / max) * 100))}%`;
  };

  const producerCount = getActorCount("producer", 1240);
  const dealerCount = getActorCount("dealer", 850);
  const providerCount = getActorCount("input_provider", 420);
  const aggregatorCount = getActorCount("aggregator", 310);
  const offtakerCount = getActorCount("offtaker", 180);

  // We find the max actor count dynamically so the bars scale well
  const maxCount = Math.max(
    producerCount,
    dealerCount,
    providerCount,
    aggregatorCount,
    offtakerCount,
    1,
  );

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-green pt-24 lg:pt-32 pb-16"
    >
      {/* Grid animation keyframes injected inline */}
      <style>{`
        @keyframes heroGridScroll {
          0%   { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
        @keyframes heroRayPulse {
          0%, 100% { opacity: 0.15; transform: translateX(-50%) scaleX(1); }
          50%       { opacity: 0.35; transform: translateX(-50%) scaleX(1.8); }
        }
      `}</style>

      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated scrolling grid — moves diagonally for 3D conveyor feel */}
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            animation: "heroGridScroll 2.4s linear infinite",
          }}
        />

        {/* Perspective depth vignette — darkens edges to sell 3D depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)`,
          }}
        />

        {/* Bright centre glow — creates a "light source above" illusion */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.10) 0%, transparent 70%)`,
          }}
        />

        {/* Pulsing vertical light ray */}
        <div
          className="absolute left-1/3 top-0 h-full w-[3px] bg-gradient-to-b from-brand-sun/50 via-brand-sun/10 to-transparent blur-2xl"
          style={{
            animation: "heroRayPulse 4s ease-in-out infinite",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-[1280px]">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          {/* Left Content */}
          <div className="flex-1 w-full text-center lg:text-left z-20">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white mb-8 border border-white/20"
            >
              <Network className="w-4 h-4 text-brand-sun" />
              <span className="text-sm font-bold tracking-wide">
                Seed Information Management Platform
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 text-5xl font-extrabold leading-[1.1] text-white md:text-6xl lg:text-7xl tracking-tight"
            >
              Connecting <br className="hidden sm:block" />
              Nigeria&apos;s Seed <br className="hidden sm:block" />
              <span className="text-brand-sun">Ecosystem</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-10 max-w-2xl text-lg text-white/80 md:text-xl lg:mx-0 leading-relaxed font-medium"
            >
              Register as a value chain actor, list your products, connect with
              stakeholders, and access Nigeria&apos;s comprehensive seed
              marketplace across all 3 states.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button
                size="lg"
                className="w-full shrink-0 bg-white text-brand-green px-8 py-7 font-bold text-base hover:bg-gray-50 sm:w-auto rounded-full shadow-2xl transition-all"
              >
                Register as Actor
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full shrink-0 border-2 border-white/30 bg-transparent text-white hover:bg-white hover:text-brand-green sm:w-auto rounded-full px-8 py-7 font-bold text-base transition-all"
              >
                Explore Platform
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`/assets/images/testimonial-user-${i}.jpg`}
                    alt={`User ${i}`}
                    className="h-10 w-10 rounded-full border-2 border-brand-green bg-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-white/80">
                <span className="font-bold text-white">
                  {stats?.totalActors >= 1000
                    ? `${(stats.totalActors / 1000).toFixed(1)}k+`
                    : stats?.totalActors}
                </span>{" "}
                verified actors integrated
              </p>
            </motion.div>
          </div>

          {/* Right Content - Abstract Dashboard Visuals */}
          <div className="relative flex-1 w-full mt-12 lg:mt-0 py-10 lg:py-0">
            <div className="relative mx-auto h-[400px] sm:h-[480px] lg:h-[550px] w-full max-w-[340px] sm:max-w-[450px] lg:max-w-[500px]">
              {/* Nationwide Reach Card */}
              <motion.div
                animate={{ y: ["0px", "-15px", "0px"] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-0 sm:right-0 lg:-right-8 top-0 lg:top-4 z-20 w-[180px] sm:w-[240px] lg:w-[260px] rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-2xl border border-gray-100"
              >
                <div className="mb-3 sm:mb-4 flex flex-col gap-1">
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Total Network Reach
                  </p>
                  <h3 className="text-xl sm:text-3xl font-black text-gray-900 leading-tight">
                    {stats?.stateCounts ? stats.stateCounts.length : 3} states
                  </h3>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-black text-brand-green">
                    <span className="text-[10px]">+</span>100% Coverage
                  </div>
                </div>
                {/* Simulated Graph */}
                <div className="mt-5 flex items-end gap-1 h-12">
                  {[40, 60, 45, 80, 55, 90, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-brand-green/20 rounded-t-sm"
                      style={{ height: `${h}%` }}
                    >
                      {i === 6 && (
                        <div className="w-full h-full bg-brand-green rounded-t-sm" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Verified Actors Card */}
              <motion.div
                animate={{ y: ["0px", "15px", "0px"] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-2 sm:left-0 lg:-left-12 top-24 sm:top-28 lg:top-40 z-10 w-[200px] sm:w-[260px] lg:w-[300px] rounded-[24px] sm:rounded-[32px] bg-white p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-100"
              >
                <div className="mb-4 sm:mb-6 flex items-center justify-between">
                  <h4 className="text-lg sm:text-xl font-black text-gray-900">
                    Key Actors
                  </h4>
                  <div className="flex items-center justify-center p-2 rounded-xl bg-gray-50 text-gray-400">
                    <Network className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex justify-center items-center font-bold text-xs">
                      P
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                          Seed Producers
                        </span>
                        <span className="text-xs font-black text-gray-800">
                          {producerCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{
                            width: calculateWidth(producerCount, maxCount),
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex justify-center items-center font-bold text-xs">
                      D
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                          Dealers
                        </span>
                        <span className="text-xs font-black text-gray-800">
                          {dealerCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{
                            width: calculateWidth(dealerCount, maxCount),
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-xl bg-green-100 text-green-600 flex justify-center items-center font-bold text-xs">
                      IP
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                          Input Providers
                        </span>
                        <span className="text-xs font-black text-gray-800">
                          {providerCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: calculateWidth(providerCount, maxCount),
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex justify-center items-center font-bold text-xs">
                      A
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                          Aggregators
                        </span>
                        <span className="text-xs font-black text-gray-800">
                          {aggregatorCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{
                            width: calculateWidth(aggregatorCount, maxCount),
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex justify-center items-center font-bold text-xs">
                      O
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                          Offtakers
                        </span>
                        <span className="text-xs font-black text-gray-800">
                          {offtakerCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{
                            width: calculateWidth(offtakerCount, maxCount),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Seed Varieties Card */}
              <motion.div
                animate={{
                  x: ["0px", "6px", "0px"],
                  y: ["0px", "-8px", "0px"],
                  rotate: [-2, 0, -2],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-0 sm:-right-4 lg:-right-12 bottom-0 sm:bottom-4 lg:bottom-12 z-30 w-[170px] sm:w-[220px] lg:w-[260px] transform rounded-2xl sm:rounded-3xl bg-brand-sun p-4 sm:p-6 lg:p-8 text-brand-green shadow-2xl"
              >
                <div className="mb-3 sm:mb-4 flex items-center justify-between">
                  <span className="text-base sm:text-lg font-black tracking-tight">
                    Active Listings
                  </span>
                  <div className="flex -space-x-2">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-brand-green/20 border border-brand-sun"></div>
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white/40 border border-brand-sun"></div>
                  </div>
                </div>
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-baseline gap-2">
                    <p className="font-mono text-3xl sm:text-4xl font-black text-brand-green">
                      14.5k<span className="text-lg sm:text-xl">+</span>
                    </p>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mt-1">
                    Certified Seeds
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
