import { motion } from "motion/react";
import { ArrowRight, Network, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-stretch overflow-hidden"
    >
      {/* LEFT — Text panel */}
      <div className="relative z-10 w-full lg:w-[52%] flex flex-col justify-center section-px pt-28 pb-20 bg-brand-green">
        {/* Subtle geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white mb-8 border border-white/20"
          >
            <Network className="w-4 h-4 text-brand-sun" />
            <span className="text-sm font-medium tracking-wide">
              Nigeria&apos;s Seed Value Chain Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
          >
            Connecting
            <br />
            Nigeria&apos;s Seed
            <br />
            <span className="text-brand-sun">Ecosystem</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed"
          >
            Register as a value chain actor, list your products, connect with
            stakeholders, and access Nigeria&apos;s comprehensive seed
            marketplace across all 36 states.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button
              size="lg"
              className="bg-white text-brand-green hover:bg-white/90 text-base px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all font-semibold"
            >
              Register as Actor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 text-base px-8 py-6 rounded-full transition-all"
            >
              Explore Platform
            </Button>
          </motion.div>

          {/* Thin divider line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="origin-left mt-14 h-px w-24 bg-white/20"
          />

          {/* Subtle bottom label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 text-sm text-white/45 tracking-widest uppercase"
          >
            Producers · Processors · Distributors · Farmers
          </motion.p>
        </div>
      </div>

      {/* RIGHT — Image panel */}
      <div className="hidden lg:block absolute right-0 top-0 w-[48%] h-full">
        <img
          src="https://images.unsplash.com/photo-1705734901042-ebdf41d24a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhJTIwc2VlZCUyMGZhcm0lMjBhZ3JpY3VsdHVyZSUyMGdyZWVuJTIwZmllbGR8ZW58MXx8fHwxNzcxNTk4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Nigerian Agriculture"
          className="w-full h-full object-cover"
        />
        {/* Dark-left gradient to blend with text panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/60 via-brand-green/10 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-green/30 to-transparent" />
      </div>

      {/* Mobile: image as background with strong overlay */}
      <div className="lg:hidden absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1705734901042-ebdf41d24a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhJTIwc2VlZCUyMGZhcm0lMjBhZ3JpY3VsdHVyZSUyMGdyZWVuJTIwZmllbGR8ZW58MXx8fHwxNzcxNTk4NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Nigerian Agriculture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-green/90" />
      </div>
    </section>
  );
}
