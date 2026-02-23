import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

export function Footer() {
  const footerLinks = {
    Platform: [
      "Home",
      "Certification",
      "Varieties",
      "Verification",
      "Resources",
    ],
    "For Producers": [
      "Register",
      "Apply for Certification",
      "Training Programs",
      "Guidelines",
      "Support",
    ],
    Resources: [
      "Documentation",
      "FAQs",
      "Video Tutorials",
      "Quality Standards",
      "News & Updates",
    ],
    Legal: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Compliance",
    ],
  };

  return (
    <footer id="contact" className="bg-brand-green text-white">
      <div className="section-px py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-brand-green" />
              </div> */}
              <div>
                <div className="font-bold text-lg">Seed Tracker NG</div>
                <div className="text-xs text-white/80">
                  Quality Seeds, Thriving Farms
                </div>
              </div>
            </div>
            <p className="text-white/80 mb-4 text-sm">
              Nigeria&apos;s premier platform for seed certification, connecting
              farmers, producers, and regulators to ensure agricultural
              excellence.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {/* {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))} */}
        </div>

        {/* Contact Info */}
        {/* <div className="border-t border-white/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Head Office</div>
                <div className="text-sm text-white/80">
                  National Agricultural Seed Council
                  <br />
                  Abuja, Nigeria
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Phone</div>
                <div className="text-sm text-white/80">
                  +234 (0) 9 123 4567
                  <br />
                  +234 (0) 9 890 1234
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Email</div>
                <div className="text-sm text-white/80">
                  info@seedtracker.ng
                  <br />
                  support@seedtracker.ng
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Bottom */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80">
          <div>© 2026 Seed Tracker NG. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
