import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShoppingCart,
  Car,
  Utensils,
  Briefcase,
  Home as HomeIcon,
  Sparkles,
  Bell,
  BarChart2,
  ArrowRight,
  Star,
  Activity,
} from "lucide-react";

const stats = [
  { label: "Total Balance", value: "$14,700", change: "+8.2%", up: true,  icon: Wallet,       color: "text-violet-300",  bg: "bg-violet-400/15" },
  { label: "Total Income",  value: "$6,500",  change: "+12%",  up: true,  icon: TrendingUp,   color: "text-emerald-300", bg: "bg-emerald-400/15" },
  { label: "Total Expenses",value: "$3,800",  change: "-5%",   up: false, icon: TrendingDown, color: "text-rose-300",    bg: "bg-rose-400/15" },
  { label: "Savings Rate",  value: "41%",     change: "+3%",   up: true,  icon: PiggyBank,    color: "text-sky-300",     bg: "bg-sky-400/15" },
];

const transactions = [
  { title: "Monthly Salary",    category: "Salary",    type: "income",  amount: 5500,  date: "Jun 1",  icon: Briefcase,    color: "text-emerald-300", bg: "bg-emerald-400/15" },
  { title: "Apartment Rent",    category: "Rent",      type: "expense", amount: 1200,  date: "Jun 5",  icon: HomeIcon,     color: "text-rose-300",    bg: "bg-rose-400/15" },
  { title: "Grocery Store",     category: "Food",      type: "expense", amount: 124,   date: "Jun 2",  icon: Utensils,     color: "text-amber-300",   bg: "bg-amber-400/15" },
  { title: "Freelance Project", category: "Freelance", type: "income",  amount: 1200,  date: "Jun 3",  icon: TrendingUp,   color: "text-teal-300",    bg: "bg-teal-400/15" },
  { title: "Amazon Order",      category: "Shopping",  type: "expense", amount: 89,    date: "Jun 4",  icon: ShoppingCart, color: "text-violet-300",  bg: "bg-violet-400/15" },
  { title: "Uber Ride",         category: "Transport", type: "expense", amount: 18,    date: "Jun 3",  icon: Car,          color: "text-sky-300",     bg: "bg-sky-400/15" },
];

const budgets = [
  { label: "Food",      spent: 640,  total: 800,  color: "#fbbf24", pct: 80 },
  { label: "Shopping",  spent: 420,  total: 600,  color: "#a78bfa", pct: 70 },
  { label: "Transport", spent: 290,  total: 400,  color: "#38bdf8", pct: 73 },
  { label: "Rent",      spent: 1200, total: 1200, color: "#f87171", pct: 100 },
];

const barData = [
  { month: "Jan", income: 52, expense: 31 },
  { month: "Feb", income: 48, expense: 29 },
  { month: "Mar", income: 61, expense: 34 },
  { month: "Apr", income: 55, expense: 32 },
  { month: "May", income: 72, expense: 41 },
  { month: "Jun", income: 65, expense: 38 },
];

const fmt = (n) => `$${Number(n).toLocaleString("en-US")}`;

export const Home = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .home-root    { font-family: 'DM Sans', sans-serif; }
        .home-heading { font-family: 'Syne', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
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
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        .anim-fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }
        .delay-4 { animation-delay: 0.32s; }
        .delay-5 { animation-delay: 0.40s; }

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

        .bar-anim { transform-origin: bottom; animation: growUp 0.9s cubic-bezier(.22,1,.36,1) both; }
        .b1{animation-delay:0.05s} .b2{animation-delay:0.10s} .b3{animation-delay:0.15s}
        .b4{animation-delay:0.20s} .b5{animation-delay:0.25s} .b6{animation-delay:0.30s}

        .live-dot { animation: pulse-dot 2s ease-in-out infinite; }
        .row-hover:hover { background: rgba(255,255,255,0.05); }
      `}</style>

      <div className="home-root min-h-screen px-4 pt-28 pb-14 sm:px-6 lg:px-8 relative overflow-hidden">

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="orb  absolute -top-32 -left-32  w-80 h-80 rounded-full bg-white/8    blur-3xl" />
          <div className="orb-2 absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-300/10 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto space-y-5">

          {/* ── Welcome banner ── */}
          <div
            className="anim-fade-up relative rounded-3xl border border-white/20 overflow-hidden p-6 sm:p-8"
            style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(20px)" }}
          >
            <div className="h-px absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {/* notification bell */}
            <button className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors relative">
              <Bell size={15} className="text-white/70" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-400 live-dot" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xl font-extrabold home-heading shadow-lg shadow-purple-900/40 shrink-0">
                JD
              </div>
              <div>
                <p className="text-white/50 text-sm">Good morning 👋</p>
                <h1 className="home-heading text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                  Welcome back, <span className="shimmer-text">Jane</span>
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="live-dot w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  <p className="text-xs text-white/45">Your finances are on track this month</p>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-400/20 border border-violet-300/25 text-[10px] font-semibold text-violet-200">
                    <Star size={8} fill="currentColor" /> Pro
                  </span>
                </div>
              </div>
            </div>

            {/* Quick summary strip */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "This month",  value: "$6,500",  sub: "income",   color: "text-emerald-300" },
                { label: "Spent so far",value: "$3,800",  sub: "expenses", color: "text-rose-300" },
                { label: "Net saved",   value: "$2,700",  sub: "balance",  color: "text-sky-300" },
              ].map(({ label, value, sub, color }) => (
                <div key={label} className="text-center p-3 rounded-2xl bg-white/6 border border-white/10">
                  <p className="text-[10px] text-white/35 uppercase tracking-wider">{label}</p>
                  <p className={`text-lg font-bold home-heading mt-0.5 ${color}`}>{value}</p>
                  <p className="text-[10px] text-white/30">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Stat Cards ── */}
          <div className="anim-fade-up delay-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map(({ label, value, change, up, icon: Icon, color, bg }) => (
              <div
                key={label}
                className="p-4 rounded-2xl border border-white/15 space-y-3"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon size={15} className={color} />
                  </div>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${
                    up ? "bg-emerald-400/15 text-emerald-300" : "bg-rose-400/15 text-rose-300"
                  }`}>
                    {up ? <ArrowUpRight size={9} /> : <ArrowDownLeft size={9} />}
                    {change}
                  </span>
                </div>
                <div>
                  <p className={`text-xl font-bold home-heading ${color}`}>{value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Chart + Budget ── */}
          <div className="anim-fade-up delay-2 grid sm:grid-cols-5 gap-5">

            {/* Bar chart */}
            <div
              className="sm:col-span-3 rounded-3xl border border-white/15 p-6"
              style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="home-heading text-sm font-bold text-white flex items-center gap-2">
                    <Activity size={14} className="text-white/50" /> Cash Flow
                  </h2>
                  <p className="text-xs text-white/35 mt-0.5">Jan – Jun 2026</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-white/40">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-400/70 inline-block" />Income</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-rose-400/70 inline-block" />Expenses</span>
                </div>
              </div>

              <div className="flex items-end justify-between gap-2 h-36">
                {barData.map((d, i) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full flex items-end justify-center gap-0.5 h-28">
                      <div className="flex-1 flex flex-col justify-end h-full">
                        <div
                          className={`bar-anim b${i+1} w-full rounded-t-md`}
                          style={{ height: `${d.income}%`, background: "linear-gradient(180deg,#34d399,#059669)", opacity: 0.8 }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-end h-full">
                        <div
                          className={`bar-anim b${i+1} w-full rounded-t-md`}
                          style={{ height: `${d.expense}%`, background: "linear-gradient(180deg,#f87171,#dc2626)", opacity: 0.7 }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-white/30">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget tracker */}
            <div
              className="sm:col-span-2 rounded-3xl border border-white/15 p-6"
              style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="home-heading text-sm font-bold text-white flex items-center gap-2">
                  <BarChart2 size={14} className="text-white/50" /> Budget
                </h2>
                <span className="text-[10px] text-white/35">Jun 2026</span>
              </div>

              <div className="space-y-4">
                {budgets.map(({ label, spent, total, color, pct }) => (
                  <div key={label} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/60 font-medium">{label}</span>
                      <span className="text-white/40">{fmt(spent)} <span className="text-white/25">/ {fmt(total)}</span></span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: pct >= 100 ? "#f87171" : color, opacity: 0.8 }}
                      />
                    </div>
                    <p className="text-[10px] text-right" style={{ color: pct >= 100 ? "#f87171" : "rgba(255,255,255,0.25)" }}>
                      {pct >= 100 ? "Budget reached" : `${100 - pct}% remaining`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Recent Transactions ── */}
          <div
            className="anim-fade-up delay-3 rounded-2xl border border-white/15 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
              <h2 className="home-heading text-sm font-bold text-white flex items-center gap-2">
                <Sparkles size={14} className="text-white/50" /> Recent Transactions
              </h2>
              <button className="flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors">
                View all <ArrowRight size={12} />
              </button>
            </div>

            <div className="divide-y divide-white/5">
              {transactions.map((t) => {
                const isIncome = t.type === "income";
                const Icon = t.icon;
                return (
                  <div key={t.title} className="row-hover flex items-center gap-4 px-5 py-3.5 transition-colors group">
                    <div className={`w-9 h-9 rounded-xl ${t.bg} flex items-center justify-center shrink-0`}>
                      <Icon size={15} className={t.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{t.title}</p>
                      <p className="text-xs text-white/35">{t.category} · {t.date}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isIncome
                        ? <ArrowDownLeft size={13} className="text-emerald-300" />
                        : <ArrowUpRight  size={13} className="text-rose-300" />
                      }
                      <span className={`text-sm font-bold ${isIncome ? "text-emerald-300" : "text-rose-300"}`}>
                        {isIncome ? "+" : "-"}{fmt(t.amount)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-5 py-3 border-t border-white/8 bg-white/3 flex items-center justify-between">
              <p className="text-xs text-white/30">Showing 6 of 24 transactions</p>
              <button className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1">
                See all <ArrowRight size={11} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};