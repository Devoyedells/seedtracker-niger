import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, Sprout } from "lucide-react";
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Map", href: "/#map" },
    { label: "Contact", href: "#" },
  ];

  // The header should be solid if scrolled OR if the mobile menu is open
  const isSolidBg = isScrolled || isMobileMenuOpen;

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 mx-auto max-w-[2000px] z-50 transition-all duration-300 ${
        isSolidBg
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_18px_-6px_rgba(13,77,44,0.15)] border-b border-brand-green/10"
          : isHome
            ? "bg-transparent"
            : "bg-brand-green"
      }`}
    >
      <div className="section-px py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            data-testid="header-logo"
            className="flex items-center gap-3 group"
          >
            <div
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isSolidBg
                  ? "bg-brand-green shadow-md shadow-brand-green/20"
                  : "bg-white/15 backdrop-blur-md border border-white/25"
              }`}
            >
              <Sprout
                className={`w-5 h-5 ${isSolidBg ? "text-brand-sun" : "text-brand-sun"}`}
                strokeWidth={2.5}
              />
              {/* gold corner pip */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-sun ring-2 ring-white/80" />
            </div>
            <div>
              <div
                className={`font-black text-[15px] leading-none tracking-tight ${isSolidBg ? "text-brand-green" : "text-white"}`}
              >
                Niger State Seed Tracker
              </div>
              <div
                className={`text-[10px] font-bold mt-1 uppercase tracking-[0.18em] ${isSolidBg ? "text-brand-sun-deep" : "text-brand-sun"}`}
              >
                Power · Excellence · Harvest
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            data-testid="desktop-nav"
            className="hidden lg:flex items-center gap-7"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative transition-colors font-semibold text-[14px] tracking-wide group ${
                  isSolidBg
                    ? "text-gray-700 hover:text-brand-green"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full ${
                    isSolidBg ? "bg-brand-sun" : "bg-brand-sun"
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Link to="/dashboard" data-testid="nav-dashboard">
                <Button className="bg-brand-sun hover:bg-brand-sun-deep text-white font-bold transition-all shadow-md shadow-brand-sun/30 flex items-center gap-2 rounded-full px-5">
                  <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" data-testid="nav-login">
                  <Button
                    variant="ghost"
                    className={`rounded-full font-semibold ${
                      isSolidBg
                        ? "text-brand-green hover:text-brand-green-deep hover:bg-brand-soft"
                        : "text-white hover:text-white hover:bg-white/15"
                    }`}
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/register" data-testid="nav-register">
                  <Button className="bg-brand-sun hover:bg-brand-sun-deep text-white font-bold transition-all shadow-md shadow-brand-sun/30 rounded-full px-5">
                    Get Started
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
                ? "text-brand-green hover:bg-brand-soft"
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
          <div className="lg:hidden mt-4 pt-2 pb-6 border-t border-brand-green/10 h-[100vh]">
            <nav className="flex flex-col gap-1 mt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-800 hover:text-brand-green hover:bg-brand-soft transition-colors font-semibold px-4 py-4 rounded-xl text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-4 mt-6 px-4">
                {user ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-brand-sun hover:bg-brand-sun-deep text-white h-14 text-lg font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2">
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
                        className="w-full text-brand-green border-2 border-brand-green hover:bg-brand-soft h-14 text-lg font-semibold rounded-2xl"
                      >
                        Log In
                      </Button>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-brand-sun hover:bg-brand-sun-deep text-white h-14 text-lg font-bold rounded-2xl shadow-md transition-all">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
