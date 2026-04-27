import { Link } from "react-router-dom";
import { Activity, Sprout, Network } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
  colorClass: string;
  animationDelay: string;
}

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
  heroTitle: React.ReactNode;
  heroDescription: string;
  statCards?: StatCardProps[];
  bottomLink?: React.ReactNode;
}

const defaultStatCards: StatCardProps[] = [
  {
    icon: <Sprout className="w-6 h-6" />,
    title: "Seed Varieties",
    value: "14.5k+",
    detail: "Active",
    colorClass: "bg-brand-sun",
    animationDelay: "0s",
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Verified Actors",
    value: "10k+",
    detail: "Integrated",
    colorClass: "bg-brand-sun",
    animationDelay: "0.2s",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Niger Coverage",
    value: "25 LGAs",
    detail: "Mapped",
    colorClass: "bg-brand-sun",
    animationDelay: "0.4s",
  },
];

function StatCard({
  icon,
  title,
  value,
  detail,
  colorClass,
  animationDelay,
}: StatCardProps) {
  return (
    <div
      className="bg-white/10 backdrop-blur-2xl border border-white/20 p-5 rounded-[2rem] flex items-start gap-4 shadow-2xl transition-all hover:scale-105 hover:bg-white/15 group mb-4 w-full max-w-[320px] animate-in fade-in slide-in-from-bottom-5"
      style={{ animationDelay }}
    >
      <div
        className={`p-3.5 rounded-2xl ${colorClass} bg-opacity-20 text-white shadow-inner`}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-white/70 font-bold text-xs mb-0.5 uppercase tracking-wider">
          {title}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-white text-xl font-black tracking-tight">
            {value}
          </span>
          <span className="text-brand-sun text-xs font-bold bg-brand-sun/10 px-2 py-0.5 rounded-full">
            {detail}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AuthLayout({
  children,
  heading,
  subheading,
  heroTitle,
  heroDescription,
  statCards = defaultStatCards,
  bottomLink,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel */}
      <div className="relative hidden w-[45%] lg:flex flex-col items-center justify-between overflow-hidden bg-brand-green p-12">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,transparent_60%)] opacity-10" />
          <div className="absolute left-1/3 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-brand-sun/30 via-brand-sun/5 to-transparent blur-xl" />
        </div>

        {/* Content Top */}
        <div className="relative z-10 w-full mb-12">
          <Link to="/" className="flex items-center gap-3 text-white mb-12 group">
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
          </Link>

          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-brand-sun/15 border border-brand-sun/40">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-sun" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-sun">
                Niger State Edition
              </span>
            </span>
            <h1 className="text-6xl font-black leading-[1.05] text-white mb-6 tracking-tight">
              {heroTitle}
            </h1>
            <p className="text-xl text-white/65 leading-relaxed font-medium">
              {heroDescription}
            </p>
          </div>
        </div>

        {/* Floating Cards Area */}
        <div className="relative z-10 w-full flex flex-col items-start gap-2 h-full justify-center">
          {statCards.map((card, i) => (
            <StatCard key={i} {...card} />
          ))}
        </div>

        {/* Footer credit */}
        <div className="relative z-10 w-full flex justify-between items-center text-white/40 text-xs font-bold mt-12">
          <span>© {new Date().getFullYear()} Niger State Seed Tracker</span>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-brand-sun transition-colors">
              Privacy
            </Link>
            <Link to="#" className="hover:text-brand-sun transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="relative flex w-full lg:w-[55%] items-center justify-center p-8 sm:p-12 overflow-y-auto bg-white"
        style={{
          backgroundImage: `radial-gradient(at 0% 0%, rgba(13, 77, 44, 0.06) 0px, transparent 50%), 
                            radial-gradient(at 100% 100%, rgba(185, 138, 46, 0.10) 0px, transparent 50%),
                            radial-gradient(at 100% 0%, rgba(13, 77, 44, 0.04) 0px, transparent 50%)`,
        }}
      >
        <div className="w-full max-w-[460px]">
          <div className="text-center lg:text-left mb-8">
            <Link
              to="/"
              className="lg:hidden inline-flex items-center gap-2 mb-8"
            >
              <span className="font-black text-xl text-brand-green">
                Niger State Seed Tracker
              </span>
            </Link>
            <div className="hidden lg:block niger-rule mb-5" />
            <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
              {heading}
            </h2>
            <p className="text-gray-500 font-medium">{subheading}</p>
          </div>

          {children}

          {bottomLink && <div className="mt-8 text-center">{bottomLink}</div>}
        </div>
      </div>
    </div>
  );
}
