import { motion } from "motion/react";
import { ArrowRight, Network } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-green pt-24 lg:pt-32 pb-16"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,transparent_60%)] opacity-10" />
        {/* Animated Light Ray */}
        <div className="absolute left-1/3 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-brand-sun/30 via-brand-sun/5 to-transparent blur-xl" />
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
                Nigeria&apos;s Seed Value Chain Platform
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
                <span className="font-bold text-white">10k+</span> verified
                actors integrated
              </p>
            </motion.div>
          </div>

          {/* Right Content - Abstract Dashboard Visuals */}
          <div className="relative flex-1 w-full mt-8 lg:mt-0 py-10 lg:py-0">
            <div className="relative mx-auto h-[380px] sm:h-[480px] lg:h-[550px] w-full max-w-[340px] sm:max-w-[450px] lg:max-w-[500px]">
              {/* Nationwide Reach Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-0 sm:right-4 lg:-right-4 top-0 lg:top-4 z-20 w-[180px] sm:w-[240px] lg:w-[280px] rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-2xl border border-gray-100"
              >
                <div className="mb-3 sm:mb-4 flex flex-col gap-1">
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Total Network Reach
                  </p>
                  <h3 className="text-xl sm:text-3xl font-black text-gray-900 leading-tight">
                    3 states
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
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute left-0 top-20 sm:top-28 lg:top-36 z-10 w-[190px] sm:w-[260px] lg:w-[320px] rounded-[24px] sm:rounded-[32px] bg-white p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-100"
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
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex justify-center items-center font-bold text-sm">
                      P
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                          Producers
                        </span>
                        <span className="text-xs font-black text-gray-800">
                          1,240
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full w-[70%]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex justify-center items-center font-bold text-sm">
                      D
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                          Distributors
                        </span>
                        <span className="text-xs font-black text-gray-800">
                          850
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full w-[45%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Seed Varieties Card */}
              <motion.div
                animate={{ x: [0, 5, 0], y: [0, -5, 0], rotate: [-1, 0, -1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute right-0 sm:-right-4 lg:-right-8 bottom-0 sm:bottom-4 lg:bottom-12 z-30 w-[170px] sm:w-[220px] lg:w-[260px] transform rounded-2xl sm:rounded-3xl bg-brand-sun p-4 sm:p-6 lg:p-8 text-brand-green shadow-2xl"
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
