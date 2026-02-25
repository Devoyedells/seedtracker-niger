import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, LayoutDashboard } from "lucide-react";
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
      className={`fixed top-0 left-0 right-0 mx-auto max-w-[2000px] z-50 transition-all duration-300 ${
        isSolidBg
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : isHome
            ? "bg-transparent"
            : "bg-[#004225]"
      }`}
    >
      <div className="section-px py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div> */}
            <div>
              <div
                className={`font-bold text-lg ${isSolidBg ? "text-gray-900" : "text-white"}`}
              >
                Seed Tracker NG
              </div>
              <div
                className={`text-xs ${isSolidBg ? "text-gray-500" : "text-white/70"}`}
              >
                Quality Seeds, Thriving Farms
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`transition-colors font-medium ${
                  isSolidBg
                    ? "text-gray-700 hover:text-brand-green"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-brand-sun hover:bg-white text-brand-green font-bold transition-all shadow-sm flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className={
                      isSolidBg
                        ? "text-gray-700 hover:text-brand-green hover:bg-brand-green/5"
                        : "text-white hover:text-white hover:bg-white/20"
                    }
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-brand-sun hover:bg-white text-brand-green font-bold transition-all shadow-sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden transition-colors ${
              isSolidBg
                ? "text-gray-700 hover:text-brand-green"
                : "text-white hover:text-white/80"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-2 pb-6 border-t border-gray-100 h-[100vh]">
            <nav className="flex flex-col gap-1 mt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-800 hover:text-brand-green hover:bg-brand-green/5 transition-colors font-medium px-4 py-4 rounded-xl text-lg"
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
                    <Button className="w-full bg-brand-sun hover:bg-white text-brand-green h-14 text-lg font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
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
                        className="w-full text-brand-green border-brand-green hover:bg-brand-green/5 h-14 text-lg font-semibold rounded-xl"
                      >
                        Log In
                      </Button>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-brand-sun hover:bg-white text-brand-green h-14 text-lg font-bold rounded-xl shadow-md transition-all">
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
