import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Sprout,
  Phone,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Map", href: "/#map" },
    { label: "Value Chain", href: "/#value-chain-map" },
    { label: "Stakeholders", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
  ];

  // Always show the gold government ribbon at top
  const isSolidBg = isScrolled || isMobileMenuOpen || !isHome;

  return (
    <header
      data-testid="site-header"
      className="fixed top-0 left-0 right-0 mx-auto max-w-[2000px] z-50 transition-all duration-300"
    >
      {/* ── Top gold government ribbon (always visible) ───────── */}
      <div className="bg-brand-green-ink text-brand-sun-bright">
        <div className="section-px py-2 flex items-center justify-between gap-4 text-[11px] font-black uppercase tracking-[0.22em]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-sun-bright niger-pulse-ring" />
            <span>Niger State · Government Initiative</span>
          </div>
          <div className="hidden md:flex items-center gap-4 opacity-90">
            <a
              href="tel:+2349123456"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              +234 9 123 4567
            </a>
            <span className="w-px h-3 bg-brand-sun-bright/40" />
            <span>Power · Excellence · Harvest</span>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-sun to-transparent" />
      </div>

      {/* ── Main bar ───────────────────────────────────────────── */}
      <div
        className={`transition-all duration-300 ${
          isSolidBg
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_-12px_rgba(13,77,44,0.25)] border-b border-brand-green/10"
            : "bg-transparent"
        }`}
      >
        <div className="section-px py-3.5">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link
              to="/"
              data-testid="header-logo"
              className="flex items-center gap-3 group shrink-0"
            >
              <div
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                  isSolidBg
                    ? "bg-gradient-to-br from-brand-green to-brand-green-deep shadow-md shadow-brand-green/25"
                    : "bg-white/10 border border-brand-sun/30 backdrop-blur-md"
                }`}
              >
                <Sprout
                  className="w-5 h-5 text-brand-sun-bright"
                  strokeWidth={2.5}
                />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-sun ring-2 ring-white/80" />
                {/* small gold corner accent */}
                <span className="absolute top-0 left-0 w-2 h-[2px] bg-brand-sun-bright rounded-r-full" />
                <span className="absolute top-0 left-0 w-[2px] h-2 bg-brand-sun-bright rounded-b-full" />
              </div>
              <div className="leading-tight">
                <div
                  className={`font-black text-[15px] tracking-tight ${isSolidBg ? "text-brand-green-ink" : "text-white"}`}
                >
                  Niger State Seed Tracker
                </div>
                <div
                  className={`text-[10px] font-black mt-1 uppercase tracking-[0.22em] ${isSolidBg ? "text-brand-sun-deep" : "text-brand-sun-bright"}`}
                >
                  ★ Power State ★
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              data-testid="desktop-nav"
              className="hidden lg:flex items-center gap-1"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 transition-colors font-bold text-[13px] tracking-wide rounded-full group ${
                    isSolidBg
                      ? "text-brand-green-ink hover:text-brand-green hover:bg-brand-soft"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] w-0 group-hover:w-6 transition-all duration-300 rounded-full bg-brand-sun`}
                  />
                </a>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              {user ? (
                <Link to="/dashboard" data-testid="nav-dashboard">
                  <Button className="niger-btn-gold h-11 px-5 text-white font-black tracking-wide rounded-full text-[13px] uppercase border-0 hover:scale-[1.02] transition-transform">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" data-testid="nav-login">
                    <Button
                      variant="ghost"
                      className={`h-11 px-5 rounded-full font-bold text-[13px] uppercase tracking-wide ${
                        isSolidBg
                          ? "text-brand-green-ink hover:text-brand-green hover:bg-brand-soft"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register" data-testid="nav-register">
                    <Button className="niger-btn-gold h-11 px-5 text-white font-black tracking-wide rounded-full text-[13px] uppercase border-0 hover:scale-[1.02] transition-transform">
                      Register
                      <ChevronDown className="w-3 h-3 -rotate-90" />
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-toggle"
              className={`lg:hidden transition-colors p-2 rounded-xl ${
                isSolidBg
                  ? "text-brand-green-ink hover:bg-brand-soft"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Content */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-brand-green/10 h-[100vh] niger-slide-up">
              <nav className="flex flex-col gap-1 mt-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-brand-green-ink hover:text-brand-green hover:bg-brand-soft transition-colors font-bold px-4 py-3.5 rounded-xl text-[15px] flex items-center justify-between"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-sun opacity-0 group-hover:opacity-100" />
                  </a>
                ))}
                <div className="flex flex-col gap-3 mt-6 px-2">
                  {user ? (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="niger-btn-gold w-full h-14 text-base font-black uppercase tracking-wider rounded-2xl shadow-lg flex items-center justify-center gap-2 text-white border-0">
                        <LayoutDashboard className="w-5 h-5" /> Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full h-14 text-brand-green border-2 border-brand-green hover:bg-brand-soft text-base font-bold rounded-2xl uppercase tracking-wider"
                        >
                          Log In
                        </Button>
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="niger-btn-gold w-full h-14 text-base font-black uppercase tracking-wider rounded-2xl text-white border-0">
                          Register Now
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
