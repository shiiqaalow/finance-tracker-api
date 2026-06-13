import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ShoppingCart,
  Car,
  Utensils,
  Briefcase,
  Home,
  Wallet,
} from "lucide-react";

const monthlyData = [
  { month: "Jan", income: 5200, expenses: 3100 },
  { month: "Feb", income: 4800, expenses: 2900 },
  { month: "Mar", income: 6100, expenses: 3400 },
  { month: "Apr", income: 5500, expenses: 3200 },
  { month: "May", income: 7200, expenses: 4100 },
  { month: "Jun", income: 6500, expenses: 3800 },
];

const categoryData = [
  { label: "Rent",      icon: Home,         amount: 1200, pct: 38, color: "#f87171", bg: "bg-rose-400/15",    text: "text-rose-300" },
  { label: "Food",      icon: Utensils,     amount: 640,  pct: 20, color: "#fbbf24", bg: "bg-amber-400/15",  text: "text-amber-300" },
  { label: "Shopping",  icon: ShoppingCart, amount: 420,  pct: 13, color: "#a78bfa", bg: "bg-violet-400/15", text: "text-violet-300" },
  { label: "Transport", icon: Car,          amount: 290,  pct: 9,  color: "#38bdf8", bg: "bg-sky-400/15",    text: "text-sky-300" },
  { label: "Salary",    icon: Briefcase,    amount: 6700, pct: 12, color: "#34d399", bg: "bg-emerald-400/15","text": "text-emerald-300" },
  { label: "Other",     icon: Wallet,       amount: 250,  pct: 8,  color: "#c084fc", bg: "bg-purple-400/15", text: "text-purple-300" },
];

const recentActivity = [
  { label: "Income up",     value: "+12%", icon: TrendingUp,   positive: true,  sub: "vs last month" },
  { label: "Expenses down", value: "-5%",  icon: TrendingDown, positive: true,  sub: "vs last month" },
  { label: "Savings rate",  value: "41%",  icon: PiggyBank,    positive: true,  sub: "of total income" },
  { label: "Avg daily spend",value: "$126", icon: Wallet,      positive: false, sub: "per day" },
];

const maxVal = Math.max(...monthlyData.map(d => Math.max(d.income, d.expenses)));
const fmt = (n) => `$${Number(n).toLocaleString("en-US")}`;

export const Report = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .report-root    { font-family: 'DM Sans', sans-serif; }
        .report-heading { font-family: 'Syne', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes growUp {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }

        .anim-fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }
        .delay-4 { animation-delay: 0.32s; }

        .orb  { animation: float 6s ease-in-out infinite; }
        .orb-2{ animation: float 8s ease-in-out infinite reverse; animation-delay: -3s; }

        .shimmer-text {
          background: linear-gradient(90deg, #fff, #c4b5fd, #fff, #a5b4fc, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .bar-wrap { transform-origin: bottom; animation: growUp 0.8s cubic-bezier(.22,1,.36,1) both; }
        .bar-1 { animation-delay: 0.05s; }
        .bar-2 { animation-delay: 0.10s; }
        .bar-3 { animation-delay: 0.15s; }
        .bar-4 { animation-delay: 0.20s; }
        .bar-5 { animation-delay: 0.25s; }
        .bar-6 { animation-delay: 0.30s; }

        .donut-ring {
          fill: none;
          stroke-width: 18;
          stroke-linecap: round;
          transform-origin: center;
          transform: rotate(-90deg);
        }
      `}</style>

      <div className="report-root min-h-screen px-4 pt-28 pb-14 sm:px-6 lg:px-8 relative overflow-hidden">

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="orb  absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/8    blur-3xl" />
          <div className="orb-2 absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-300/10 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto space-y-5">

          {/* ── Header ── */}
          <div className="anim-fade-up flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="report-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
                <div className="p-2 bg-white/10 border border-white/20 rounded-xl">
                  <BarChart2 size={20} className="text-white" />
                </div>
                Financial <span className="shimmer-text ml-2">Reports</span>
              </h1>
              <p className="text-sm text-white/45 mt-1 ml-[46px]">Overview of your financial performance</p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-medium text-white/70 hover:bg-white/20 hover:text-white transition-all">
                <Calendar size={13} /> Jun 2026
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-medium text-white/70 hover:bg-white/20 hover:text-white transition-all">
                <Download size={13} /> Export
              </button>
            </div>
          </div>

          {/* ── KPI Cards ── */}
          <div className="anim-fade-up delay-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recentActivity.map(({ label, value, icon: Icon, positive, sub }) => (
              <div
                key={label}
                className="p-4 rounded-2xl border border-white/15 space-y-2"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/40 font-medium">{label}</p>
                  <Icon size={13} className={positive ? "text-emerald-300" : "text-rose-300"} />
                </div>
                <p className={`text-xl font-bold report-heading ${positive ? "text-emerald-300" : "text-rose-300"}`}>{value}</p>
                <p className="text-[10px] text-white/30">{sub}</p>
              </div>
            ))}
          </div>

          {/* ── Bar Chart + Donut ── */}
          <div className="anim-fade-up delay-2 grid sm:grid-cols-5 gap-5">

            {/* Bar Chart */}
            <div
              className="sm:col-span-3 rounded-3xl border border-white/15 p-6"
              style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="report-heading text-base font-bold text-white">Monthly Overview</h2>
                  <p className="text-xs text-white/40 mt-0.5">Income vs Expenses — 2026</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/45">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400/70 inline-block" />Income</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-400/70 inline-block" />Expenses</span>
                </div>
              </div>

              {/* Bars */}
              <div className="flex items-end justify-between gap-2 h-44">
                {monthlyData.map((d, i) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full flex items-end justify-center gap-1 h-36">
                      {/* Income bar */}
                      <div className="flex-1 flex flex-col justify-end h-full">
                        <div
                          className={`bar-wrap bar-${i+1} w-full rounded-t-lg`}
                          style={{
                            height: `${(d.income / maxVal) * 100}%`,
                            background: "linear-gradient(180deg, #34d399, #059669)",
                            opacity: 0.8,
                          }}
                        />
                      </div>
                      {/* Expense bar */}
                      <div className="flex-1 flex flex-col justify-end h-full">
                        <div
                          className={`bar-wrap bar-${i+1} w-full rounded-t-lg`}
                          style={{
                            height: `${(d.expenses / maxVal) * 100}%`,
                            background: "linear-gradient(180deg, #f87171, #dc2626)",
                            opacity: 0.7,
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-white/35 font-medium">{d.month}</span>
                  </div>
                ))}
              </div>

              {/* Y-axis labels */}
              <div className="flex justify-between mt-3 text-[10px] text-white/25">
                <span>{fmt(monthlyData.reduce((s,d)=>s+d.income,0))} total income</span>
                <span>{fmt(monthlyData.reduce((s,d)=>s+d.expenses,0))} total expenses</span>
              </div>
            </div>

            {/* Donut Chart */}
            <div
              className="sm:col-span-2 rounded-3xl border border-white/15 p-6 flex flex-col"
              style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
            >
              <h2 className="report-heading text-base font-bold text-white mb-1">Spending Breakdown</h2>
              <p className="text-xs text-white/40 mb-5">By category this month</p>

              {/* SVG Donut */}
              <div className="flex justify-center mb-5">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="18" />
                    {(() => {
                      const colors = ["#f87171","#fbbf24","#a78bfa","#38bdf8","#34d399","#c084fc"];
                      const total  = categoryData.reduce((s,c)=>s+c.pct,0);
                      const circ   = 2 * Math.PI * 35;
                      let offset   = 0;
                      return categoryData.map((cat, i) => {
                        const dash = (cat.pct / total) * circ;
                        const gap  = circ - dash;
                        const el   = (
                          <circle
                            key={cat.label}
                            className="donut-ring"
                            cx="50" cy="50" r="35"
                            stroke={colors[i]}
                            strokeDasharray={`${dash} ${gap}`}
                            strokeDashoffset={-offset}
                            style={{ opacity: 0.85 }}
                          />
                        );
                        offset += dash;
                        return el;
                      });
                    })()}
                  </svg>
                  {/* Center label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-lg font-bold text-white report-heading">$3,800</p>
                    <p className="text-[9px] text-white/40">total spend</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 flex-1">
                {categoryData.map(({ label, icon: Icon, amount, pct, bg, text }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                      <Icon size={11} className={text} />
                    </div>
                    <span className="text-xs text-white/60 flex-1 truncate">{label}</span>
                    <span className="text-xs text-white/40">{pct}%</span>
                    <span className={`text-xs font-semibold ${text} w-14 text-right`}>{fmt(amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Monthly Summary Table ── */}
          <div
            className="anim-fade-up delay-3 rounded-2xl border border-white/15 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
              <h2 className="report-heading text-sm font-bold text-white flex items-center gap-2">
                <Sparkles size={14} className="text-white/50" /> Monthly Breakdown
              </h2>
              <span className="text-xs text-white/35">Jan – Jun 2026</span>
            </div>

            {/* Table head */}
            <div className="grid grid-cols-5 gap-4 px-5 py-2.5 bg-white/4 border-b border-white/8 text-xs font-semibold text-white/35 uppercase tracking-wider">
              {["Month", "Income", "Expenses", "Savings", "Rate"].map(h => <span key={h}>{h}</span>)}
            </div>

            <div className="divide-y divide-white/5">
              {monthlyData.map((d, i) => {
                const savings = d.income - d.expenses;
                const rate    = Math.round((savings / d.income) * 100);
                const isLast  = i === monthlyData.length - 1;
                return (
                  <div
                    key={d.month}
                    className={`grid grid-cols-5 gap-4 px-5 py-3.5 text-sm transition-colors hover:bg-white/5 ${isLast ? "bg-white/4" : ""}`}
                  >
                    <span className={`font-semibold ${isLast ? "text-white" : "text-white/60"}`}>
                      {d.month} {isLast && <span className="text-[10px] text-violet-300 ml-1">Current</span>}
                    </span>
                    <span className="text-emerald-300 font-medium">{fmt(d.income)}</span>
                    <span className="text-rose-300 font-medium">{fmt(d.expenses)}</span>
                    <span className="text-sky-300 font-medium">{fmt(savings)}</span>
                    <span className="flex items-center gap-1 text-white/60">
                      {rate >= 40
                        ? <ArrowUpRight size={13} className="text-emerald-400" />
                        : <ArrowDownRight size={13} className="text-rose-400" />
                      }
                      {rate}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer totals */}
            <div className="grid grid-cols-5 gap-4 px-5 py-3.5 border-t border-white/10 bg-white/5 text-sm">
              <span className="text-xs text-white/35 uppercase tracking-wider font-semibold self-center">Total</span>
              <span className="text-emerald-300 font-bold">{fmt(monthlyData.reduce((s,d)=>s+d.income,0))}</span>
              <span className="text-rose-300 font-bold">{fmt(monthlyData.reduce((s,d)=>s+d.expenses,0))}</span>
              <span className="text-sky-300 font-bold">{fmt(monthlyData.reduce((s,d)=>s+(d.income-d.expenses),0))}</span>
              <span className="text-white/50 font-bold">
                {Math.round(
                  (monthlyData.reduce((s,d)=>s+(d.income-d.expenses),0) /
                   monthlyData.reduce((s,d)=>s+d.income,0)) * 100
                )}% avg
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};