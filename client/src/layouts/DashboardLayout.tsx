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
  Sprout,
  Megaphone,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import NotificationBell from "@/components/notifications/NotificationBell";

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
    { label: "Connections", icon: Map, path: "/dashboard/connections" },
    { label: "Broadcast", icon: Megaphone, path: "/dashboard/broadcast" },
  ];

  if (user?.role && user.role !== "user") {
    navItems.splice(3, 0, {
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
      data-testid="dashboard-shell"
      className="flex h-screen overflow-hidden bg-gradient-to-br from-brand-mist via-white to-brand-soft/40"
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
      <aside
        className={`
          flex-shrink-0 flex flex-col w-[268px] niger-weave bg-brand-green-ink
          fixed inset-y-0 left-0 z-40
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Background texture */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-brand-sun/15 rounded-full blur-3xl" />
          <div className="absolute top-24 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Top gold rule */}
        <div className="relative z-10 h-[3px] w-full bg-gradient-to-r from-brand-sun-bright via-brand-sun to-brand-sun-bright" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3 px-6 pt-6 pb-5 flex-shrink-0">
          <div className="relative w-11 h-11 rounded-xl bg-brand-sun/15 border border-brand-sun/40 flex items-center justify-center flex-shrink-0">
            <Sprout className="w-5 h-5 text-brand-sun-bright" strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-sun" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-sun-bright">
              ★ Power State
            </div>
            <div className="text-white font-black text-[15px] leading-tight tracking-tight truncate">
              Niger Seed Tracker
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
        <div className="relative z-10 px-6 mb-2 flex-shrink-0 flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-brand-sun-bright" />
          <span className="text-brand-sun-bright/80 text-[10px] font-black uppercase tracking-[0.2em]">
            Main Menu
          </span>
        </div>

        {/* Nav links */}
        <nav className="relative z-10 flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  group relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold
                  transition-all duration-300
                  ${
                    active
                      ? "bg-brand-sun text-brand-green-ink shadow-lg shadow-brand-sun/20"
                      : "text-white/65 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {/* Active gold left rail */}
                {active && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-7 rounded-r-full bg-brand-sun-bright" />
                )}
                <Icon
                  className={`w-[18px] h-[18px] flex-shrink-0 transition-all duration-300
                    ${active ? "text-brand-green-ink" : "group-hover:text-brand-sun-bright group-hover:scale-110"}`}
                />
                <span className="flex-1">{label}</span>
                {active && (
                  <ChevronRight className="w-3.5 h-3.5 text-brand-green-ink/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info + logout — pinned to bottom */}
        <div className="relative z-10 px-3 pb-6 pt-3 space-y-1 flex-shrink-0 border-t border-brand-sun/20 mt-2">
          <Link
            to="/dashboard/profile"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-brand-sun/20 border border-brand-sun/40 flex items-center justify-center text-brand-sun-bright font-black text-sm flex-shrink-0">
              {initials}
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-sun-bright ring-2 ring-brand-green-ink" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-[13px] truncate leading-none">
                {user?.fullName}
              </div>
              <div className="text-brand-sun-bright/70 text-[10px] font-black uppercase tracking-[0.18em] mt-1 truncate">
                {roleLabel}
              </div>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-white/55 hover:bg-red-500/15 hover:text-red-300 transition-all text-sm font-bold cursor-pointer"
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
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl border-b border-brand-green/10 shadow-[0_2px_18px_-12px_rgba(13,77,44,0.30)] flex-shrink-0">
          {/* Government gold ribbon */}
          <div className="bg-brand-green-ink h-[26px] flex items-center px-5 text-[10px] font-black uppercase tracking-[0.22em] text-brand-sun-bright">
            <span className="w-1 h-1 rounded-full bg-brand-sun-bright mr-2" />
            <span>Niger State · Power · Excellence · Harvest</span>
            <span className="ml-auto hidden sm:inline opacity-70">
              SeedTracker.NG / Niger
            </span>
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-sun to-transparent" />

          <div className="flex items-center gap-4 px-5 py-3.5">
            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden p-2 text-brand-green-ink hover:text-brand-green hover:bg-brand-soft transition-colors rounded-xl"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2.5">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-soft text-brand-green-ink text-[10px] font-black uppercase tracking-[0.2em]">
                <span className="w-1 h-1 rounded-full bg-brand-sun" />
                Niger
              </span>
              <span className="text-brand-sun hidden sm:inline">/</span>
              <span className="text-brand-green-ink text-sm font-black">
                {currentPage}
              </span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              {/* Notification bell */}
              <NotificationBell />

              {/* User chip */}
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-2xl hover:bg-brand-soft transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-green to-brand-green-deep flex items-center justify-center text-brand-sun-bright font-black text-xs flex-shrink-0 shadow-md shadow-brand-green/20 group-hover:scale-105 transition-transform">
                  {initials}
                </div>
                <span className="text-brand-green-ink font-bold text-sm hidden sm:block">
                  {user?.fullName?.split(" ")[0]}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
