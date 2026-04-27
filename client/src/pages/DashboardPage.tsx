import {
  Users,
  MapPin,
  Sprout,
  BadgeCheck,
  TrendingUp,
  ArrowRight,
  Loader2,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import DashboardCharts from "@/components/dashboard/DashboardCharts";

// ── Types ──────────────────────────────────────────────────────────────
interface Stats {
  totalActors: number;
  activeStates: number;
  actorTypeCounts: { _id: string; count: number }[];
  stateCounts: { _id: string; count: number }[];
  monthlyGrowth: { month: string; count: number }[];
  lgaCounts: { _id: string; count: number }[];
  verifiedCount: number;
  unverifiedCount: number;
  recentActors: {
    _id: string;
    fullName: string;
    email: string;
    actorType?: string;
    registrationState?: string;
    lga?: string;
    createdAt?: string;
  }[];
}

// ── Helpers ────────────────────────────────────────────────────────────
const actorTypeLabel: Record<string, string> = {
  producer: "Seed Producer",
  input_provider: "Input Provider",
  aggregator: "Aggregator",
  dealer: "Dealer & Retailer",
  offtaker: "Offtaker",
  processor: "Processor",
  farmer: "Farmer / Coop",
  others: "Other",
};

const actorTypeColor: Record<string, string> = {
  producer: "bg-emerald-100 text-emerald-700",
  input_provider: "bg-blue-100 text-blue-700",
  aggregator: "bg-purple-100 text-purple-700",
  dealer: "bg-orange-100 text-orange-700",
  offtaker: "bg-rose-100 text-rose-700",
  processor: "bg-amber-100 text-amber-700",
  farmer: "bg-teal-100 text-teal-700",
  others: "bg-gray-100 text-gray-600",
};

const stateLabel: Record<string, string> = {
  ekiti: "Ekiti",
  anambra: "Anambra",
  niger: "Niger",
};

function timeAgo(dateStr?: string): string {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

// ── Stat Card ─────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accentClass: string;
  delay?: string;
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accentClass,
  delay,
}: StatCardProps) {
  return (
    <div
      data-testid={`stat-card-${label.replace(/\s+/g, "-").toLowerCase()}`}
      className="group relative bg-white rounded-3xl p-6 border border-brand-green/8 shadow-[0_4px_18px_-8px_rgba(13,77,44,0.10)] hover:shadow-[0_18px_36px_-12px_rgba(13,77,44,0.20)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      style={{ animationDelay: delay }}
    >
      {/* Gradient glow */}
      <div
        className={`absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-[0.10] blur-2xl ${accentClass}`}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-400 mb-2">
            {label}
          </p>
          <p className="text-4xl font-black text-gray-900 tracking-tight leading-none mb-1">
            {value}
          </p>
          {sub && (
            <p className="text-xs font-bold text-gray-400 mt-1.5">{sub}</p>
          )}
        </div>
        <div
          className={`p-3.5 rounded-2xl ${accentClass} bg-opacity-15 flex-shrink-0 shadow-inner`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Bottom bar accent */}
      <div
        className={`absolute bottom-0 left-0 h-[3px] w-full ${accentClass} opacity-60 group-hover:opacity-100 transition-opacity`}
      />
    </div>
  );
}

// ── Actor Breakdown Bar ────────────────────────────────────────────────
function ActorBreakdown({
  data,
  total,
}: {
  data: Stats["actorTypeCounts"];
  total: number;
}) {
  const colors = [
    "bg-brand-green",
    "bg-brand-sun",
    "bg-brand-earth",
    "bg-emerald-400",
    "bg-blue-400",
    "bg-purple-400",
    "bg-rose-400",
    "bg-gray-400",
  ];

  return (
    <div className="bg-white rounded-3xl border border-brand-green/8 shadow-[0_4px_18px_-8px_rgba(13,77,44,0.08)] p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-soft flex items-center justify-center mt-0.5">
            <TrendingUp className="w-4 h-4 text-brand-green" />
          </div>
          <div>
            <h2 className="text-base font-black text-gray-900">
              Actor Breakdown
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Niger State and partner-state actor mix
            </p>
          </div>
        </div>
      </div>

      {total === 0 ? (
        <div className="text-center py-8 text-gray-300 text-sm font-semibold">
          No actors registered yet
        </div>
      ) : (
        <>
          {/* Stacked bar */}
          <div className="flex w-full h-3 rounded-full overflow-hidden gap-0.5 mb-5">
            {data.map((item, i) => (
              <div
                key={item._id}
                className={`${colors[i % colors.length]} transition-all duration-700`}
                style={{ width: `${(item.count / total) * 100}%` }}
                title={`${actorTypeLabel[item._id] ?? item._id}: ${item.count}`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="space-y-2.5">
            {data.map((item, i) => (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${colors[i % colors.length]} flex-shrink-0`}
                  />
                  <span className="text-sm font-semibold text-gray-600">
                    {actorTypeLabel[item._id] ?? item._id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900">
                    {item.count}
                  </span>
                  <span className="text-xs text-gray-400 font-medium w-10 text-right">
                    {((item.count / total) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Recent Actors Table ────────────────────────────────────────────────
function RecentActors({ actors }: { actors: Stats["recentActors"] }) {
  return (
    <div className="bg-white rounded-3xl border border-brand-green/8 shadow-[0_4px_18px_-8px_rgba(13,77,44,0.08)] p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-black text-gray-900">
            Recent Registrations
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Latest actors who joined the network
          </p>
        </div>
        <Link
          to="/dashboard/actors"
          data-testid="view-all-actors-link"
          className="flex items-center gap-1 text-xs font-black text-brand-green hover:text-brand-sun-deep hover:underline underline-offset-4 transition-colors"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {actors.length === 0 ? (
        <div className="text-center py-10 text-gray-300 text-sm font-semibold">
          No registrations yet
        </div>
      ) : (
        <div className="space-y-3">
          {actors.map((actor) => {
            const initials = actor.fullName
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={actor._id}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green font-black text-sm flex-shrink-0">
                  {initials}
                </div>
                {/* Name / email */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {actor.fullName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {actor.email}
                  </p>
                </div>
                {/* Type badge */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  {actor.actorType && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide ${
                        actorTypeColor[actor.actorType] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {actorTypeLabel[actor.actorType] ?? actor.actorType}
                    </span>
                  )}
                  {actor.registrationState && (
                    <span className="text-[10px] text-gray-400 font-medium">
                      {actor.lga ? `${actor.lga}, ` : ""}
                      {stateLabel[actor.registrationState] ??
                        actor.registrationState}
                    </span>
                  )}
                </div>
                {/* Time */}
                <span className="text-[11px] text-gray-300 font-semibold flex-shrink-0 ml-2">
                  {timeAgo(actor.createdAt)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user } = useAuth();

  const isAdmin = user?.role && user.role !== "user";

  const { data: stats, isLoading: loading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async (): Promise<Stats> => {
      const { data } = await api.get("/users/stats");
      return data;
    },
    enabled: !!isAdmin, // Only fetch stats if the user is an admin
  });

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const firstName = user?.fullName?.split(" ")[0];

  return (
    <div
      data-testid="dashboard-page"
      className="space-y-6 animate-in fade-in duration-500"
    >
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-br from-brand-green via-brand-green to-brand-green-deep rounded-3xl p-7 overflow-hidden shadow-xl shadow-brand-green/20">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute right-0 top-0 w-64 h-full">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-sun/25 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Niger State watermark */}
        <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-sun/15 border border-brand-sun/30 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-sun" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-sun">
            Niger State Edition
          </span>
        </div>

        <div className="relative z-10">
          <p className="text-brand-sun text-sm font-bold mb-1">
            {new Date().toLocaleDateString("en-NG", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-white text-3xl font-black tracking-tight mb-2">
            {greeting}, {firstName} 👋
          </h1>
          <div className="niger-rule mb-4" />
          <p className="text-white/65 text-sm font-medium max-w-md leading-relaxed">
            Here's an overview of Niger State's seed value chain network.
            Stay updated on actor activity and registrations across the Power
            State.
          </p>

          {(user?.actorType || user?.role === "admin") && (
            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <BadgeCheck className="w-3.5 h-3.5 text-brand-sun" />
              <span className="text-white text-xs font-bold">
                {user?.role === "admin"
                  ? "Platform Administrator"
                  : `Registered as ${actorTypeLabel[user!.actorType!] ?? user!.actorType}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Normal User View ── */}
      {!isAdmin && (
        <div className="bg-white rounded-3xl border border-brand-green/10 shadow-sm p-8 text-center max-w-2xl mx-auto mt-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-sun via-brand-sun-deep to-brand-sun" />
          <div className="w-16 h-16 bg-brand-soft text-brand-green rounded-2xl flex items-center justify-center mx-auto mb-4 ring-4 ring-brand-soft/50">
            <Sprout className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-2">
            Welcome to your Niger State Dashboard
          </h2>
          <p className="text-gray-500 mb-6 text-sm leading-relaxed">
            Keep your profile information up to date to stay visible within the
            Niger State Seed Value Chain network.
          </p>
          <Link
            to="/dashboard/profile"
            data-testid="manage-profile-cta"
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-deep text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-md shadow-brand-green/20 hover:-translate-y-0.5"
          >
            <User className="w-4 h-4" />
            Manage My Profile
          </Link>
        </div>
      )}

      {/* ── Admin View (Stats) ── */}
      {isAdmin && loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-gray-100 h-36 animate-pulse"
            >
              <div className="h-3 w-24 bg-gray-100 rounded mb-4" />
              <div className="h-10 w-16 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {isAdmin && !loading && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Registered Actors"
            value={stats.totalActors}
            sub="Total on platform"
            accentClass="bg-brand-green"
            delay="0ms"
          />
          <StatCard
            icon={MapPin}
            label="Active States"
            value={stats.activeStates}
            sub="State coverage"
            accentClass="bg-brand-earth"
            delay="60ms"
          />
          <StatCard
            icon={Sprout}
            label="Actor Types"
            value={stats.actorTypeCounts.length}
            sub="Value chain roles"
            accentClass="bg-brand-sun"
            delay="120ms"
          />
          <StatCard
            icon={BadgeCheck}
            label="Verified Members"
            value={stats.verifiedCount}
            sub="Email verified"
            accentClass="bg-emerald-500"
            delay="180ms"
          />
        </div>
      )}

      {/* ── Charts ── */}
      {isAdmin && !loading && stats && <DashboardCharts stats={stats} />}

      {isAdmin && !loading && stats && (
        <RecentActors actors={stats.recentActors} />
      )}

      {isAdmin && loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-brand-green" />
        </div>
      )}
    </div>
  );
}
