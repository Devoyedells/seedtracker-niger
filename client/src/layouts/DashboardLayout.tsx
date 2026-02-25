import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Map,
  LogOut,
  Menu,
  X,
  ChevronRight,
  BookUser,
  QrCode,
  Sprout,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const actorTypeLabel: Record<string, string> = {
  producer: "Seed Producer",
  input_provider: "Input Provider",
  aggregator: "Aggregator",
  dealer: "Dealer & Retailer",
  offtaker: "Offtaker",
  processor: "Processor",
  farmer: "Farmer / Cooperative",
  others: "Other",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Profile", icon: User, path: "/dashboard/profile" },
    { label: "My QR Code", icon: QrCode, path: "/dashboard/qrcode" },
    { label: "Actor Map", icon: Map, path: "/dashboard/map" },
  ];

  if (user?.role && user.role !== "user") {
    navItems.push({
      label: "Directory",
      icon: BookUser,
      path: "/dashboard/actors",
    });
  }

  const currentPage =
    navItems.find((n) => n.path === location.pathname)?.label ?? "Dashboard";

  const roleLabel =
    user?.role === "admin"
      ? "Platform Administrator"
      : user?.actorType
        ? (actorTypeLabel[user.actorType] ?? user.actorType)
        : "Member";

  return (
    // Outer shell: full viewport, no overflow — all scrolling handled inside
    <div
      className="flex h-screen overflow-hidden bg-[#f5f6f8]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Mobile Backdrop ──────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      {/* On mobile: slides in as a fixed overlay (full viewport height)  */}
      {/* On desktop: static column, flex child, full h-full height        */}
      <aside
        className={`
          flex-shrink-0 flex flex-col w-[260px] bg-brand-green
          fixed inset-y-0 left-0 z-40
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Background texture */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-brand-sun/10 rounded-full blur-3xl" />
          <div className="absolute top-24 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3 px-6 pt-7 pb-6 flex-shrink-0">
          <div>
            <div className="text-white font-black text-[15px] leading-none tracking-tight">
              Seed Tracker
            </div>
            <div className="text-white/40 text-[11px] font-bold uppercase tracking-widest mt-0.5">
              NG
            </div>
          </div>
          {/* Close btn — mobile only */}
          <button
            className="ml-auto lg:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav section label */}
        <div className="relative z-10 px-6 mb-2 flex-shrink-0">
          <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
            Main Menu
          </span>
        </div>

        {/* Nav links — grows to fill available space */}
        <nav className="relative z-10 flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold
                  transition-all duration-200
                  ${
                    active
                      ? "bg-white/15 text-white shadow-inner"
                      : "text-white/55 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <Icon
                  className={`w-[18px] h-[18px] flex-shrink-0 transition-colors
                    ${active ? "text-brand-sun" : "group-hover:text-white/80"}`}
                />
                <span className="flex-1">{label}</span>
                {active && (
                  <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info + logout — pinned to bottom */}
        <div className="relative z-10 px-3 pb-6 pt-3 space-y-1 flex-shrink-0 border-t border-white/10 mt-2">
          <Link
            to="/dashboard/profile"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-sun/20 border border-brand-sun/30 flex items-center justify-center text-brand-sun font-black text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-[13px] truncate leading-none">
                {user?.fullName}
              </div>
              <div className="text-white/40 text-[11px] font-medium mt-0.5 truncate">
                {roleLabel}
              </div>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-white/50 hover:bg-red-500/15 hover:text-red-300 transition-all text-sm font-bold cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Area ────────────────────────────────────────────── */}
      {/* Takes remaining width; scrolls independently of sidebar   */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-4 px-5 py-4 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm flex-shrink-0">
          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden p-2 text-gray-500 hover:text-brand-green transition-colors rounded-xl hover:bg-brand-green/5"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm font-semibold hidden sm:inline">
              Seed Tracker NG
            </span>
            <span className="text-gray-300 hidden sm:inline">/</span>
            <span className="text-gray-900 text-sm font-black">
              {currentPage}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* User chip */}
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-2xl hover:bg-gray-100 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-green flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                {initials}
              </div>
              <span className="text-gray-800 font-bold text-sm hidden sm:block">
                {user?.fullName?.split(" ")[0]}
              </span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
