import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Factory,
  Warehouse,
  Store,
  Tractor,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function ActorRegistration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const actorTypes = [
    {
      id: "1",
      icon: Factory,
      title: "Seed Producers",
      description:
        "Breeders and multiplication farms list certified varieties.",
      color: "bg-brand-green",
      iconColor: "text-brand-green",
      iconBg: "bg-brand-green/10",
      highlight: "Direct Market Access",
    },
    {
      id: "2",
      icon: Warehouse,
      title: "Processors & Warehouses",
      description: "Facilities managing processing, QC, and secure storage.",
      color: "bg-amber-500",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100",
      highlight: "Inventory Tracking",
    },
    {
      id: "3",
      icon: Store,
      title: "Distributors & Retailers",
      description: "Agro-dealers mapping inventory and selling to end-users.",
      color: "bg-blue-500",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      highlight: "Nationwide Network",
    },
    {
      id: "4",
      icon: Tractor,
      title: "Farmers & Cooperatives",
      description: "Buyers accessing high-yield seeds and bulk orders.",
      color: "bg-brand-sun",
      iconColor: "text-brand-sun",
      iconBg: "bg-orange-100",
      highlight: "Quality Assurance",
    },
  ];

  return (
    <section
      id="registration"
      className="relative overflow-hidden bg-white py-20 lg:py-32"
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #008751 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-brand-green/10 px-4 py-2 text-sm font-bold text-brand-green">
            Join the Ecosystem
          </span>
          <h2 className="mb-6 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl tracking-tight">
            Register as a Value Chain Actor
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of registered actors across Nigeria&apos;s seed value
            chain and unlock new opportunities immediately.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 max-w-full">
          {/* Steps Section */}
          <div className="space-y-6 w-full max-w-full min-w-0">
            {actorTypes.map((actor, index) => (
              <motion.div
                key={actor.id}
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Number Badge */}
                <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-lg font-black text-white shadow-lg">
                  {actor.id}
                </div>

                <div className="flex gap-4 sm:gap-5 min-w-0">
                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${actor.iconBg} ${actor.iconColor}`}
                  >
                    <actor.icon className="h-7 w-7" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-900 break-words">
                      {actor.title}
                    </h3>
                    <p className="mb-3 text-gray-600 leading-relaxed break-words text-sm sm:text-base">
                      {actor.description}
                    </p>
                    {/* Highlight */}
                    <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-gray-50 px-3 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 sm:rounded-full border border-gray-100">
                      <ShieldCheck className="h-4 w-4 text-brand-green" />
                      {actor.highlight}
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < actorTypes.length - 1 && (
                  <div className="absolute -bottom-6 left-7 hidden h-6 w-0.5 bg-gradient-to-b from-brand-green/30 to-brand-green/5 lg:block" />
                )}
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-6 text-center lg:text-left"
            >
              <a
                href="#register"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green hover:bg-brand-green/90 px-8 py-4 font-bold text-white transition-all duration-300 hover:shadow-lg shadow-md"
              >
                Start Registration Now
                <ArrowRight className="h-5 w-5" />
              </a>
              <p className="text-gray-500 mt-4 text-sm max-w-xs mx-auto lg:mx-0">
                100% free signup. Verified profiles.
              </p>
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-full min-w-0 hidden md:block mt-10 lg:mt-0"
          >
            {/* Decorative Background Glow */}
            <div className="absolute -inset-2 sm:-inset-4 rounded-[40px] bg-gradient-to-br from-brand-green/20 to-brand-sun/20 blur-2xl" />

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-[32px] border-4 border-white shadow-2xl w-full max-h-[600px] h-full">
              <img
                src="/assets/images/istockphoto-1441154968-612x612.jpg"
                alt="Agricultural workers"
                className="h-full w-full object-cover min-h-[500px]"
              />

              {/* Bottom Gradient Overlay for text readability if needed */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Floating Stats */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 rounded-2xl bg-white p-5 shadow-2xl border border-gray-100 animate-[bounce_4s_infinite_ease-in-out]">
                <div className="text-3xl font-black text-brand-green flex items-center gap-1">
                  10<span className="text-xl">+</span>
                </div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">
                  Value Chain
                  <br />
                  Roles Available
                </div>
              </div>

              {/* Floating Shield */}
              <div className="absolute top-8 left-8 rounded-full bg-white p-4 shadow-xl border border-gray-100 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-blue-500" />
                <span className="font-bold text-sm text-gray-900 pr-2">
                  Fully Verified
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
