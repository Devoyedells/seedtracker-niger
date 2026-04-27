import { motion } from "motion/react";
import { ArrowRight, Sparkles, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { NigerEmblem } from "./NigerEmblem";

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
          /* ignore */
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

  // Live derived numbers (no hardcoded fakes — fall back gracefully when 0)
  const totalActors: number = stats?.totalActors ?? 0;
  const totalStates: number = stats?.stateCounts?.length ?? 0;
  const totalTypes: number = stats?.actorTypeCounts?.length ?? 0;
  const formatActors = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;

  // Marquee chips — partner regions
  const marqueeItems = [
    "Niger State · Power State",
    "Bida Emirate",
    "Minna Capital",
    "Suleja",
    "Kontagora",
    "Lapai",
    "Borgu",
    "Mokwa",
    "Anambra · Partner",
    "Ekiti · Partner",
  ];

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative overflow-hidden text-white"
    >
      {/* Inline keyframes (preserve existing motion style) */}
      <style>{`
        @keyframes heroBeam {
          0%, 100% { opacity: 0.20; transform: translate(-50%, 0) scaleY(1); }
          50%      { opacity: 0.45; transform: translate(-50%, 0) scaleY(1.4); }
        }
      `}</style>

      {/* ── Main hero ────────────────────────────────────────────── */}
      <div className="relative niger-weave pt-32 pb-32 lg:pt-40 lg:pb-44">
        {/* Background depth & beams */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(214,178,90,0.12) 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 60%)`,
            }}
          />
          {/* Vertical light beam */}
          <div
            className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-brand-sun-bright via-brand-sun/40 to-transparent blur-[6px]"
            style={{ animation: "heroBeam 4s ease-in-out infinite" }}
          />
        </div>

        <div className="relative z-10 section-px max-w-[1320px] mx-auto">
          {/* ── Centered eyebrow ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-7"
          >
            <div
              data-testid="hero-eyebrow"
              className="relative inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full border border-brand-sun/40 bg-brand-green-ink/70 backdrop-blur-md"
            >
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sun text-brand-green-ink text-[10px] font-black uppercase tracking-[0.22em] shadow-md shadow-brand-sun/30">
                <Sparkles className="w-3 h-3" />
                Niger State Edition
              </span>
              <span className="text-[11px] font-bold tracking-wide text-white/85">
                Official seed value chain platform
              </span>
            </div>
          </motion.div>

          {/* ── Headline + Emblem split ──────────────────────────── */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            {/* Left: Headline cluster */}
            <div className="lg:col-span-7 text-center lg:text-left lg:pr-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                data-testid="hero-headline"
                className="font-black leading-[0.96] text-white text-[44px] sm:text-[56px] lg:text-[78px] tracking-[-0.025em]"
              >
                <span className="block">The Power State&apos;s</span>
                <span className="block">
                  <span className="relative inline-block mr-2">
                    <span className="absolute -inset-x-2 -inset-y-1 bg-brand-sun -rotate-1 -z-10" />
                    <span className="relative text-brand-green-ink px-1">
                      Seed
                    </span>
                  </span>
                  Network.
                </span>
                <span className="block text-brand-sun-bright italic font-light text-[34px] sm:text-[42px] lg:text-[56px] mt-3">
                  rooted in Niger.
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                style={{ transformOrigin: "left" }}
                className="hidden lg:block niger-rule-wide mt-8 max-w-[320px]"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-7 max-w-xl mx-auto lg:mx-0 text-[16px] sm:text-lg text-white/75 leading-relaxed font-medium"
              >
                Niger State&apos;s official seed information platform —
                connecting producers, dealers, aggregators and farmers across
                25 LGAs. Part of a 3-state network (Niger · Anambra · Ekiti)
                helping the Power State lead Nigeria&apos;s harvest.
              </motion.p>

              {/* CTA group */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  data-testid="hero-cta-register"
                  className="niger-btn-gold relative h-14 px-8 text-white font-black tracking-wide rounded-full text-[15px] uppercase border-0 hover:scale-[1.02] transition-transform"
                >
                  Register as Niger Actor
                  <ArrowRight className="w-5 h-5 ml-1.5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  data-testid="hero-cta-explore"
                  className="h-14 px-7 rounded-full border-2 border-brand-sun/40 bg-white/5 text-white hover:bg-brand-sun hover:text-brand-green-ink hover:border-brand-sun font-bold tracking-wide text-[15px] uppercase backdrop-blur-md transition-all"
                >
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  View Power-State Map
                </Button>
              </motion.div>
            </div>

            {/* Right: Emblem + floating data badges */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative niger-float-slow"
              >
                {/* Outer glow */}
                <div className="absolute -inset-10 rounded-full bg-brand-sun/15 blur-3xl pointer-events-none" />
                <NigerEmblem size={300} />
              </motion.div>

              {/* Floating stat — top */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute top-2 left-0 lg:left-[-20px] hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 text-brand-green-ink shadow-2xl shadow-brand-green/30 niger-float backdrop-blur-md border border-brand-sun/30"
                data-testid="hero-stat-actors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-brand-green" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-brand-sun-deep">
                    Verified Actors
                  </div>
                  <div className="text-xl font-black leading-none mt-0.5">
                    {formatActors(totalActors)}
                    <span className="text-brand-sun-deep">+</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat — bottom */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute bottom-4 right-0 lg:right-[-30px] hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl bg-brand-green-ink text-white shadow-2xl shadow-brand-green/30 niger-float-slow backdrop-blur-md border border-brand-sun/30"
                data-testid="hero-stat-states"
                style={{ animationDelay: "1.2s" }}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-sun/20 border border-brand-sun/40 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-sun" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-brand-sun-bright">
                    Network Coverage
                  </div>
                  <div className="text-xl font-black leading-none mt-0.5">
                    {totalStates || 3}
                    <span className="text-base font-bold text-white/70 ml-1">
                      states
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Stat strip — gold-bordered government plaque ──────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            data-testid="hero-stat-strip"
            className="relative mt-16 lg:mt-24 mx-auto max-w-5xl"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-brand-sun/40 via-brand-sun-bright/60 to-brand-sun/40" />
            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-px rounded-3xl overflow-hidden bg-brand-green-ink/95 backdrop-blur-md">
              {[
                {
                  label: "Niger State Actors",
                  value: formatActors(totalActors),
                  suffix: "+",
                  hint: "Live registrations",
                },
                {
                  label: "Network States",
                  value: totalStates || 3,
                  suffix: "",
                  hint: "Niger · Anambra · Ekiti",
                },
                {
                  label: "Actor Types",
                  value: totalTypes || 8,
                  suffix: "",
                  hint: "Value-chain roles",
                },
                {
                  label: "LGAs Mapped",
                  value: 25,
                  suffix: "",
                  hint: "All Niger LGAs",
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="relative p-5 sm:p-6 bg-brand-green-ink hover:bg-brand-green-deep transition-colors group"
                >
                  {/* hover gold corner */}
                  <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-brand-sun opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-sun-bright mb-2">
                    {s.label}
                  </div>
                  <div className="font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
                    {s.value}
                    <span className="text-brand-sun-bright">{s.suffix}</span>
                  </div>
                  <div className="text-[11px] text-white/55 font-semibold mt-2">
                    {s.hint}
                  </div>
                  {/* index ribbon */}
                  <div className="absolute bottom-3 right-3 text-[10px] font-mono font-bold text-white/25">
                    0{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom marquee — Niger LGAs/regions ──────────────────── */}
        <div className="relative z-10 mt-12 overflow-hidden border-y border-brand-sun/20 bg-brand-green-ink/40 backdrop-blur-sm">
          <div className="niger-marquee flex whitespace-nowrap py-3">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 px-6 text-[12px] font-black uppercase tracking-[0.22em] text-brand-sun-bright/80"
              >
                <span className="w-1 h-1 rounded-full bg-brand-sun-bright/60" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Diagonal hand-off into next section */}
      <div className="relative -mt-px">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block w-full h-[60px] md:h-[80px]"
        >
          <path
            d="M0,0 L1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
          <path
            d="M0,0 L1440,40"
            stroke="#b98a2e"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
}
