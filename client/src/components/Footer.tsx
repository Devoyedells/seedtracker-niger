import {
  Sprout,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";
import { NigerEmblem } from "./NigerEmblem";

export function Footer() {
  const linkColumns = [
    {
      title: "Platform",
      links: [
        { label: "Home", href: "/" },
        { label: "Actor Map", href: "/#map" },
        { label: "Value Chain", href: "/#value-chain-map" },
        { label: "Stakeholders", href: "/#about" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "FAQ", href: "/#faq" },
        { label: "Register as Actor", href: "/register" },
        { label: "Sign In", href: "/login" },
        { label: "Power-State Map", href: "/#map" },
      ],
    },
    {
      title: "Niger State",
      links: [
        { label: "Ministry of Agriculture", href: "#" },
        { label: "Power · Excellence · Harvest", href: "#" },
        { label: "25 LGAs", href: "#" },
        { label: "Bida · Minna · Kontagora", href: "#" },
      ],
    },
  ];

  return (
    <footer
      id="contact"
      data-testid="site-footer"
      className="relative bg-brand-green-ink text-white overflow-hidden"
    >
      {/* Diagonal hand-off from previous section */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block w-full h-[60px] md:h-[80px]"
      >
        <path d="M0,0 L1440,80 L0,80 Z" fill="white" />
        <path d="M0,0 L1440,80" stroke="#b98a2e" strokeWidth="2" fill="none" />
      </svg>

      {/* Subtle weave + grain */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none niger-grain-drift"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0), radial-gradient(circle at 13px 13px, #d6b25a 1px, transparent 0)`,
          backgroundSize: "26px 26px, 26px 26px",
        }}
      />
      {/* Top gold double-rule */}
      <div className="relative">
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-brand-sun to-transparent" />
        <div className="h-px w-full bg-brand-sun/30 mt-1" />
      </div>

      <div className="relative section-px py-16 lg:py-20">
        {/* ── Main grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand cluster */}
          <div className="lg:col-span-5 relative">
            <div className="flex items-start gap-5">
              <div className="hidden sm:block niger-float-slow">
                <NigerEmblem size={130} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-11 h-11 rounded-xl bg-white/10 border border-brand-sun/30 flex items-center justify-center sm:hidden">
                    <Sprout className="w-5 h-5 text-brand-sun" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-sun-bright mb-1.5">
                      ★ Power State Edition
                    </div>
                    <div className="font-black text-[20px] leading-tight tracking-tight">
                      Niger State Seed Tracker
                    </div>
                  </div>
                </div>
                <div className="niger-rule mb-5" />
                <p className="text-white/70 mb-6 text-[14px] leading-relaxed max-w-md">
                  The official Niger State edition of Seed Tracker — connecting
                  farmers, producers, dealers, and regulators across Nigeria&apos;s
                  Power State to ensure quality seeds and thriving harvests. Part
                  of a 3-state network including Anambra and Ekiti.
                </p>
                <div className="flex flex-wrap gap-3">
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
                      className="group w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-sun hover:text-brand-green-ink transition-all duration-300 border border-white/10 hover:border-brand-sun hover:-translate-y-0.5"
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {linkColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-black uppercase tracking-[0.22em] text-brand-sun-bright mb-5 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-brand-sun" />
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-[13px] text-white/75 hover:text-brand-sun-bright transition-colors font-medium"
                      >
                        <span>{l.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact strip ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          {[
            {
              Icon: MapPin,
              label: "Niger State Office",
              value: "Ministry of Agriculture, Minna · Niger State",
            },
            {
              Icon: Phone,
              label: "Helpline",
              value: "+234 (0) 9 123 4567",
            },
            {
              Icon: Mail,
              label: "Email",
              value: "niger@seedtracker.ng",
            },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-brand-sun/15 border border-brand-sun/30 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-sun group-hover:text-brand-green-ink transition-colors">
                <Icon className="w-4 h-4 text-brand-sun-bright group-hover:text-brand-green-ink" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-sun-bright/80 mb-1">
                  {label}
                </div>
                <div className="text-[13px] text-white/85 font-semibold leading-snug">
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom row ────────────────────────────────────────── */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex flex-wrap items-center gap-3 text-white/65">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sun/10 border border-brand-sun/30 text-brand-sun-bright text-[11px] font-black uppercase tracking-[0.2em]">
              ★ Niger State
            </span>
            <span className="font-semibold">
              © 2026 Niger State Seed Tracker · All rights reserved
            </span>
          </div>
          <div className="flex gap-6 text-white/60 font-bold text-[12px] uppercase tracking-wider">
            <a href="#" className="hover:text-brand-sun-bright transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-brand-sun-bright transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-brand-sun-bright transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
