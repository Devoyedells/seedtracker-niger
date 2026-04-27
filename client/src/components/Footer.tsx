import {
  Sprout,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      data-testid="site-footer"
      className="relative bg-brand-green text-white overflow-hidden"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Gold rule top */}
      <div className="relative h-[3px] w-full bg-gradient-to-r from-transparent via-brand-sun to-transparent" />

      <div className="relative section-px py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-brand-sun" strokeWidth={2.5} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-sun" />
              </div>
              <div>
                <div className="font-black text-[16px] leading-none tracking-tight">
                  Niger State Seed Tracker
                </div>
                <div className="text-[10px] font-bold mt-1.5 uppercase tracking-[0.18em] text-brand-sun">
                  Power · Excellence · Harvest
                </div>
              </div>
            </div>
            <p className="text-white/75 mb-6 text-sm leading-relaxed max-w-md">
              The Niger State edition of Seed Tracker — connecting farmers,
              producers, dealers, and regulators across the Power State to
              ensure quality seeds and thriving harvests. Part of a national
              network spanning Niger, Anambra, and Ekiti.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  aria-label={label}
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-brand-sun hover:text-brand-green transition-all duration-300 border border-white/15 hover:border-brand-sun"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-sun mb-5">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-brand-sun" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-0.5">
                    Niger State Office
                  </div>
                  <div className="text-sm text-white/85 font-medium leading-snug">
                    Niger State Ministry of Agriculture
                    <br />
                    Minna, Niger State, Nigeria
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-brand-sun" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-0.5">
                    Helpline
                  </div>
                  <div className="text-sm text-white/85 font-medium">
                    +234 (0) 9 123 4567
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-brand-sun" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-0.5">
                    Email
                  </div>
                  <div className="text-sm text-white/85 font-medium">
                    niger@seedtracker.ng
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/15 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-white/70">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-sun" />
            <span className="font-semibold">
              © 2026 Niger State Seed Tracker · All rights reserved
            </span>
          </div>
          <div className="flex gap-6 text-white/60 font-semibold">
            <a href="#" className="hover:text-brand-sun transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-brand-sun transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-brand-sun transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
