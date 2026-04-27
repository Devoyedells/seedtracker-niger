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
      id: "01",
      icon: Factory,
      title: "Seed Producers",
      description:
        "Breeders and multiplication farms listing certified varieties across Niger State.",
      iconBg: "bg-brand-soft",
      iconColor: "text-brand-green",
      highlight: "Direct Market Access",
    },
    {
      id: "02",
      icon: Store,
      title: "Dealers & Retailers",
      description: "Agro-dealers mapping Niger inventory and selling to end-users.",
      iconBg: "bg-brand-cream",
      iconColor: "text-brand-sun-deep",
      highlight: "Expanded Network",
    },
    {
      id: "03",
      icon: Warehouse,
      title: "Input Providers",
      description: "Suppliers of essential agricultural inputs and machinery.",
      iconBg: "bg-brand-soft",
      iconColor: "text-brand-green",
      highlight: "Farmer Engagement",
    },
    {
      id: "04",
      icon: Tractor,
      title: "Aggregators",
      description: "Consolidating produce and seeds from smallholder networks.",
      iconBg: "bg-brand-cream",
      iconColor: "text-brand-sun-deep",
      highlight: "Volume Sourcing",
    },
    {
      id: "05",
      icon: Factory,
      title: "Offtakers",
      description: "Large-scale buyers and industrial consumers of outputs.",
      iconBg: "bg-brand-soft",
      iconColor: "text-brand-green",
      highlight: "Guaranteed Supply",
    },
  ];

  return (
    <section
      id="registration"
      data-testid="actor-registration"
      className="relative overflow-hidden py-24 lg:py-32"
      ref={ref}
    >
      {/* Layered backgrounds — soft green wash + subtle Niger grain */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-mist to-white" />
      <div className="absolute inset-0 niger-grain-light opacity-60 niger-grain-drift" />
      {/* Top gold rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-sun/50 to-transparent" />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-green-ink text-brand-sun-bright px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] shadow-md shadow-brand-green/20">
            <span className="w-1 h-1 rounded-full bg-brand-sun-bright niger-pulse-ring" />
            Join the Power State
          </span>
          <h2 className="mb-4 text-3xl font-black text-brand-green-ink md:text-4xl lg:text-5xl tracking-tight">
            Register as a Niger State{" "}
            <span className="relative inline-block">
              <span className="absolute -inset-x-1 -inset-y-0.5 bg-brand-sun -rotate-1 -z-10" />
              <span className="relative">Value Chain</span>
            </span>{" "}
            Actor
          </h2>
          <div className="niger-rule mx-auto mb-6" />
          <p className="text-lg text-gray-600 leading-relaxed">
            Pick your role in Niger State&apos;s seed value chain and unlock
            opportunities across the Power State and the wider 3-state network.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Steps — Niger ticket-style cards */}
          <div className="lg:col-span-7 space-y-5">
            {actorTypes.map((actor, index) => (
              <motion.div
                key={actor.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                data-testid={`actor-card-${actor.id}`}
                className="group relative niger-lift niger-lift-gold"
              >
                {/* Gold rail behind card (peek) */}
                <div className="absolute inset-y-3 -left-1 w-2 bg-gradient-to-b from-brand-sun-bright via-brand-sun to-brand-sun-deep rounded-l-full" />

                <div className="niger-ticket relative bg-white border border-brand-green/10 pl-6 pr-5 py-5 sm:pl-7 sm:pr-6 sm:py-6 shadow-[0_4px_18px_-8px_rgba(13,77,44,0.10)]">
                  {/* Top-right number ribbon */}
                  <div className="absolute top-0 right-0 px-4 py-1.5 bg-brand-green-ink text-brand-sun-bright text-[10px] font-black uppercase tracking-[0.22em] rounded-bl-2xl">
                    No. {actor.id}
                  </div>

                  <div className="flex gap-5 min-w-0">
                    {/* Icon */}
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${actor.iconBg} ${actor.iconColor} ring-1 ring-brand-green/10 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-500`}
                    >
                      <actor.icon className="h-7 w-7" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="mb-1.5 text-[17px] sm:text-[19px] font-black text-brand-green-ink break-words tracking-tight">
                        {actor.title}
                      </h3>
                      <p className="mb-3 text-gray-600 leading-relaxed break-words text-sm sm:text-[15px]">
                        {actor.description}
                      </p>
                      <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft border border-brand-green/15 px-3 py-1 text-xs font-black text-brand-green uppercase tracking-wider">
                        <ShieldCheck className="h-3.5 w-3.5 text-brand-sun-deep" />
                        {actor.highlight}
                      </div>
                    </div>
                  </div>

                  {/* Bottom dotted "perforation" */}
                  <div
                    className="mt-4 h-px"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(13,77,44,0.18) 0 4px, transparent 4px 10px)",
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-4 text-center lg:text-left"
            >
              <a
                href="/register"
                data-testid="actor-registration-cta"
                className="niger-btn-gold inline-flex items-center gap-2 rounded-full px-8 py-4 font-black text-white text-[14px] uppercase tracking-wider hover:scale-[1.02] transition-transform"
              >
                Begin Niger State Registration
                <ArrowRight className="h-5 w-5" />
              </a>
              <p className="text-gray-500 mt-4 text-sm max-w-xs mx-auto lg:mx-0">
                100% free signup · Verified Niger State actor profiles
              </p>
            </motion.div>
          </div>

          {/* Right column — Stamped pledge card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="relative rounded-[28px] overflow-hidden bg-brand-green-ink text-white shadow-2xl shadow-brand-green/30">
              {/* Subtle weave bg */}
              <div className="absolute inset-0 niger-weave opacity-90" />
              {/* Gold corner accents */}
              <span className="absolute top-4 left-4 w-6 h-[3px] bg-brand-sun rounded-r-full" />
              <span className="absolute top-4 left-4 w-[3px] h-6 bg-brand-sun rounded-b-full" />
              <span className="absolute bottom-4 right-4 w-6 h-[3px] bg-brand-sun rounded-l-full" />
              <span className="absolute bottom-4 right-4 w-[3px] h-6 bg-brand-sun rounded-t-full" />

              <div className="relative p-8 sm:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-sun text-brand-green-ink px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]">
                    ★ Niger State Pledge
                  </span>
                  <span className="text-brand-sun-bright text-[10px] font-mono font-bold tracking-widest">
                    EST · 1976
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-brand-sun-bright mb-2">
                    Open to all Power-State actors
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                    A verified profile.
                    <br />
                    <span className="text-brand-sun-bright italic font-light">
                      A trusted harvest.
                    </span>
                  </h3>
                </div>

                <div className="niger-rule-wide mb-6 max-w-[180px]" />

                <ul className="space-y-3 mb-7">
                  {[
                    "Free verified actor ID + QR code",
                    "Listed on Niger State map & directory",
                    "Direct connection with 3-state buyers",
                    "Government-grade data privacy",
                  ].map((feat, i) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 niger-slide-up"
                      style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                    >
                      <span className="mt-1 w-5 h-5 rounded-md bg-brand-sun text-brand-green-ink flex items-center justify-center text-[10px] font-black flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-[14px] text-white/85 font-medium leading-snug">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/register"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-brand-green-ink font-black text-[13px] uppercase tracking-wider hover:bg-brand-sun hover:text-brand-green-ink transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                >
                  Activate My Niger Profile
                  <ArrowRight className="h-4 w-4" />
                </a>

                {/* Tally / signature line */}
                <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-bold uppercase tracking-widest">
                  <span>Niger Seed Office</span>
                  <span className="text-brand-sun-bright">Verified ✓</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
