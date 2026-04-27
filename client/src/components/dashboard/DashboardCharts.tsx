import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import { useAuth } from "@/context/AuthContext";
import { TrendingUp, PieChartIcon, BarChart3, MapPin } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────
interface MonthlyPoint {
  month: string;
  count: number;
}
interface CountBucket {
  _id: string;
  count: number;
}

export interface ChartStats {
  totalActors: number;
  actorTypeCounts: CountBucket[];
  stateCounts: CountBucket[];
  monthlyGrowth: MonthlyPoint[];
  lgaCounts: CountBucket[];
  verifiedCount: number;
  unverifiedCount: number;
}

// ── Palette ────────────────────────────────────────────────────────────
const DONUT_COLORS = [
  "#0d4d2c",
  "#f5a623",
  "#6b4226",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
  "#f87171",
  "#94a3b8",
];

const ACTOR_LABELS: Record<string, string> = {
  producer: "Seed Producer",
  input_provider: "Input Provider",
  aggregator: "Aggregator",
  dealer: "Dealer & Retailer",
  offtaker: "Offtaker",
  processor: "Processor",
  farmer: "Farmer / Coop",
  others: "Others",
};

// ── Glassmorphism card wrapper ─────────────────────────────────────────
function ChartCard({
  title,
  subtitle,
  icon: Icon,
  accent,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden flex flex-col h-full"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.48) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.75)",
        boxShadow:
          "0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {/* 3-D accent glow */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.12] blur-3xl pointer-events-none"
        style={{ background: accent }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full opacity-[0.07] blur-2xl pointer-events-none"
        style={{ background: accent }}
      />

      {/* Header */}
      <div className="relative px-6 pt-5 pb-4 flex items-center gap-3 border-b border-black/[0.04]">
        <div
          className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-inner"
          style={{ background: `${accent}20` }}
        >
          <Icon
            className="w-4.5 h-4.5"
            style={{ color: accent, width: 18, height: 18 }}
          />
        </div>
        <div>
          <p className="text-[13px] font-black text-gray-900 leading-tight">
            {title}
          </p>
          <p className="text-[11px] text-gray-400 font-medium">{subtitle}</p>
        </div>
      </div>

      {/* Chart area */}
      <div className="relative px-4 py-5 flex-1 min-h-0">{children}</div>
    </div>
  );
}

// ── Custom Tooltip ─────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 14,
        padding: "10px 14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
      }}
    >
      {label && (
        <p className="text-[11px] font-black text-gray-400 mb-1 uppercase tracking-wider">
          {label}
        </p>
      )}
      {payload.map((p: any, i: number) => (
        <p
          key={i}
          className="text-sm font-black"
          style={{ color: p.color ?? p.fill ?? "#0d4d2c" }}
        >
          {p.name ? `${p.name}: ` : ""}
          {p.value}
        </p>
      ))}
    </div>
  );
}

// ── 1. Monthly Growth Area Chart ───────────────────────────────────────
function MonthlyGrowthChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <ChartCard
      title="Registration Trend"
      subtitle="New members over the last 12 months"
      icon={TrendingUp}
      accent="#0d4d2c"
    >
      <ResponsiveContainer width="100%" height="100%" minHeight={220}>
        <AreaChart
          data={data}
          margin={{ top: 6, right: 8, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d4d2c" stopOpacity={0.35} />
              <stop offset="85%" stopColor="#0d4d2c" stopOpacity={0.02} />
            </linearGradient>
            <filter id="areaGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0,0,0,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v.split(" ")[0]}
          />
          <YAxis
            tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            name="New Members"
            stroke="#0d4d2c"
            strokeWidth={2.5}
            fill="url(#areaGrad)"
            dot={{ r: 3.5, fill: "#0d4d2c", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{
              r: 5.5,
              fill: "#0d4d2c",
              stroke: "#fff",
              strokeWidth: 2,
              filter: "url(#areaGlow)",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ── 2. Actor Type Donut Chart ──────────────────────────────────────────
function ActorTypeDonut({
  data,
  total,
}: {
  data: CountBucket[];
  total: number;
}) {
  const pieData = data.map((d) => ({
    name: ACTOR_LABELS[d._id] ?? d._id,
    value: d.count,
    key: d._id,
  }));

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fontWeight={800}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ChartCard
      title="Actor Type Distribution"
      subtitle="Value chain role breakdown"
      icon={PieChartIcon}
      accent="#f5a623"
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          {/* 3D shadow layer */}
          <div
            className="absolute inset-x-4 bottom-0 h-4 rounded-full blur-xl opacity-30"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,66,37,0.6) 0%, transparent 70%)",
            }}
          />
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <defs>
                {DONUT_COLORS.map((c, i) => (
                  <radialGradient
                    key={i}
                    id={`donut${i}`}
                    cx="40%"
                    cy="35%"
                    r="65%"
                  >
                    <stop offset="0%" stopColor={c} stopOpacity={1} />
                    <stop offset="100%" stopColor={c} stopOpacity={0.75} />
                  </radialGradient>
                ))}
                <filter
                  id="donutShadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="5"
                    floodColor="rgba(0,0,0,0.18)"
                  />
                </filter>
              </defs>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
                filter="url(#donutShadow)"
              >
                {pieData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={`url(#donut${i % DONUT_COLORS.length})`}
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth={1.5}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-gray-900 leading-none">
              {total}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              Members
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 w-full px-2">
          {pieData.map((item, i) => (
            <div key={item.key} className="flex items-center gap-1.5 min-w-0">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }}
              />
              <span className="text-[11px] font-semibold text-gray-600 truncate">
                {item.name}
              </span>
              <span className="text-[11px] font-black text-gray-900 ml-auto flex-shrink-0">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

// ── 3. State Distribution Bar Chart ───────────────────────────────────
function StateDistributionBar({ data }: { data: CountBucket[] }) {
  const chartData = data.map((d) => ({ state: d._id, count: d.count }));

  return (
    <ChartCard
      title="Members by State"
      subtitle="Platform-wide state distribution"
      icon={BarChart3}
      accent="#0d4d2c"
    >
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={chartData}
          margin={{ top: 14, right: 8, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d4d2c" stopOpacity={1} />
              <stop offset="100%" stopColor="#1a7a4a" stopOpacity={0.7} />
            </linearGradient>
            <filter id="barShadow">
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="4"
                floodColor="rgba(0,66,37,0.25)"
              />
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0,0,0,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="state"
            tick={{ fontSize: 11, fontWeight: 700, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0,66,37,0.04)", radius: 8 }}
          />
          <Bar
            dataKey="count"
            name="Members"
            fill="url(#barGrad)"
            radius={[10, 10, 0, 0]}
            maxBarSize={64}
            filter="url(#barShadow)"
          >
            <LabelList
              dataKey="count"
              position="top"
              style={{ fontSize: 11, fontWeight: 800, fill: "#374151" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ── 4. LGA Breakdown Horizontal Bar ───────────────────────────────────
function LgaBreakdownBar({ data }: { data: CountBucket[] }) {
  const chartData = [...data]
    .slice(0, 8)
    .map((d) => ({ lga: d._id, count: d.count }));

  return (
    <ChartCard
      title="Top LGAs"
      subtitle="Members by Local Government Area"
      icon={MapPin}
      accent="#6b4226"
    >
      <ResponsiveContainer
        width="100%"
        height={Math.max(200, chartData.length * 38)}
      >
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 4, right: 40, left: 4, bottom: 4 }}
        >
          <defs>
            <linearGradient id="lgaGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6b4226" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#a0522d" stopOpacity={0.65} />
            </linearGradient>
            <filter id="lgaShadow">
              <feDropShadow
                dx="2"
                dy="0"
                stdDeviation="3"
                floodColor="rgba(107,66,38,0.22)"
              />
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0,0,0,0.04)"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="lga"
            tick={{ fontSize: 11, fontWeight: 700, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(107,66,38,0.04)", radius: 6 }}
          />
          <Bar
            dataKey="count"
            name="Members"
            fill="url(#lgaGrad)"
            radius={[0, 8, 8, 0]}
            maxBarSize={24}
            filter="url(#lgaShadow)"
          >
            <LabelList
              dataKey="count"
              position="right"
              style={{ fontSize: 11, fontWeight: 800, fill: "#374151" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ── 5. Verification Donut ──────────────────────────────────────────────
function VerificationDonut({
  verified,
  unverified,
}: {
  verified: number;
  unverified: number;
}) {
  const total = verified + unverified;
  const data = [
    { name: "Verified", value: verified },
    { name: "Unverified", value: unverified },
  ];
  const COLORS = ["#0d4d2c", "#e5e7eb"];

  return (
    <ChartCard
      title="Email Verification"
      subtitle="Verified vs unverified accounts"
      icon={TrendingUp}
      accent="#34d399"
    >
      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <div
            className="absolute inset-x-2 bottom-0 h-3 rounded-full blur-lg opacity-25"
            style={{
              background:
                "radial-gradient(ellipse, #0d4d2c 0%, transparent 70%)",
            }}
          />
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <defs>
                <filter id="verifyShadow">
                  <feDropShadow
                    dx="0"
                    dy="3"
                    stdDeviation="4"
                    floodColor="rgba(0,66,37,0.22)"
                  />
                </filter>
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={52}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                filter="url(#verifyShadow)"
              >
                {data.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i]}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth={1.5}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm font-black text-gray-900 leading-none">
              {total > 0 ? `${Math.round((verified / total) * 100)}%` : "0%"}
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {[
            { label: "Verified", value: verified, color: "#0d4d2c" },
            { label: "Unverified", value: unverified, color: "#e5e7eb" },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: color }}
                  />
                  <span className="text-xs font-bold text-gray-600">
                    {label}
                  </span>
                </div>
                <span className="text-sm font-black text-gray-900">
                  {value}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: total > 0 ? `${(value / total) * 100}%` : "0%",
                    background: color === "#e5e7eb" ? "#d1d5db" : color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

// ── Main Export ────────────────────────────────────────────────────────
export default function DashboardCharts({ stats }: { stats: ChartStats }) {
  const { user } = useAuth();
  const isStateAdmin = user?.role !== "admin";

  const hasLgaData = stats.lgaCounts.length > 0;
  const hasMonthlyData = stats.monthlyGrowth.length > 0;
  const hasStateData = stats.stateCounts.length > 0;

  return (
    <div className="space-y-4">
      {/* Section label */}
      <div className="flex items-center gap-2 px-1">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">
          Analytics
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Row 1 — Growth trend + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        <div className="lg:col-span-2 h-full flex flex-col">
          {hasMonthlyData ? (
            <MonthlyGrowthChart data={stats.monthlyGrowth} />
          ) : (
            <ChartCard
              title="Registration Trend"
              subtitle="No data yet"
              icon={TrendingUp}
              accent="#0d4d2c"
            >
              <EmptyChart height={220} />
            </ChartCard>
          )}
        </div>
        <div>
          <ActorTypeDonut
            data={stats.actorTypeCounts}
            total={stats.totalActors}
          />
        </div>
      </div>

      {/* Row 2 — State bar (admin only) + LGA breakdown + Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {!isStateAdmin && hasStateData && (
          <div className="lg:col-span-1">
            <StateDistributionBar data={stats.stateCounts} />
          </div>
        )}
        {hasLgaData && (
          <div
            className={
              !isStateAdmin && hasStateData ? "lg:col-span-1" : "lg:col-span-2"
            }
          >
            <LgaBreakdownBar data={stats.lgaCounts} />
          </div>
        )}
        <div>
          <VerificationDonut
            verified={stats.verifiedCount}
            unverified={stats.unverifiedCount}
          />
        </div>
      </div>
    </div>
  );
}

function EmptyChart({ height }: { height: number }) {
  return (
    <div
      className="flex items-center justify-center text-gray-300 text-sm font-semibold"
      style={{ height }}
    >
      Not enough data yet
    </div>
  );
}
