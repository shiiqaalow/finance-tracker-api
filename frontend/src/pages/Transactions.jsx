import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Filter,
  Wallet,
  ShoppingCart,
  Car,
  Utensils,
  Briefcase,
  Home,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from '../server'

// const transactions = [
//   { id: 1, title: "Monthly Salary",    category: "Salary",    type: "income",  amount: 5500,  date: "Jun 1, 2026",  note: "June paycheck" },
//   { id: 2, title: "Grocery Store",     category: "Food",      type: "expense", amount: 124,   date: "Jun 2, 2026",  note: "" },
//   { id: 3, title: "Freelance Project", category: "Freelance", type: "income",  amount: 1200,  date: "Jun 3, 2026",  note: "UI design contract" },
//   { id: 4, title: "Uber Ride",         category: "Transport", type: "expense", amount: 18,    date: "Jun 3, 2026",  note: "" },
//   { id: 5, title: "Amazon Order",      category: "Shopping",  type: "expense", amount: 89,    date: "Jun 4, 2026",  note: "Books" },
//   { id: 6, title: "Apartment Rent",    category: "Rent",      type: "expense", amount: 1200,  date: "Jun 5, 2026",  note: "Monthly rent" },
//   { id: 7, title: "Restaurant",        category: "Food",      type: "expense", amount: 64,    date: "Jun 5, 2026",  note: "Dinner out" },
//   { id: 8, title: "Performance Bonus", category: "Salary",    type: "income",  amount: 800,   date: "Jun 6, 2026",  note: "Q2 bonus" },
// ];

const CATEGORIES = {
  Salary:    { icon: Briefcase,    color: "text-emerald-300", bg: "bg-emerald-400/15" },
  Shopping:  { icon: ShoppingCart, color: "text-violet-300",  bg: "bg-violet-400/15" },
  Transport: { icon: Car,          color: "text-sky-300",     bg: "bg-sky-400/15" },
  Food:      { icon: Utensils,     color: "text-amber-300",   bg: "bg-amber-400/15" },
  Freelance: { icon: TrendingUp,   color: "text-teal-300",    bg: "bg-teal-400/15" },
  Rent:      { icon: Home,         color: "text-rose-300",    bg: "bg-rose-400/15" },
  Other:     { icon: Wallet,       color: "text-white/60",    bg: "bg-white/10" },
};

const fmt = (n) => `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;


export const Transaction = () => {

  const [transaction,setTransaction] = useState([])

   const fetchTrans = async () => {
      try {
        const response = await api.get("/transaction");
        setTransaction(response.data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };
  
    useEffect(() => {
      fetchTrans();
    }, []);
    {console.log('Tans=>',transaction)}


const income   = transaction.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
const expenses = transaction.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
const balance  = income - expenses;

  return (
    <>

      <div className="tx-root min-h-screen px-4 pt-28 pb-14 sm:px-6 lg:px-8 relative overflow-hidden">

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="orb  absolute -top-32 -left-32  w-80 h-80 rounded-full bg-white/8    blur-3xl" />
          <div className="orb-2 absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-300/10 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto space-y-5">

          {/* ── Header ── */}
          <div className="anim-fade-up flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="tx-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
                <div className="p-2 bg-white/10 border border-white/20 rounded-xl">
                  <Wallet size={20} className="text-white" />
                </div>
                Transactions
              </h1>
              <p className="text-sm text-white/45 mt-1 ml-[46px]">Track your income &amp; expenses</p>
            </div>
            <button
              className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-lg"
              style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", boxShadow: "0 4px 16px rgba(109,40,217,0.4)" }}
            >
              <Plus size={15} /> Add Transaction
            </button>
          </div>

          {/* ── Stats ── */}
          <div className="anim-fade-up delay-1 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: Sparkles,     label: "Balance",  value: fmt(balance),  color: "text-violet-300",  bg: "bg-violet-400/15", sub: "Net this period" },
              { icon: TrendingUp,   label: "Income",   value: fmt(income),   color: "text-emerald-300", bg: "bg-emerald-400/15", sub: `${transaction.filter(t=>t.type==="income").length} entries` },
              { icon: TrendingDown, label: "Expenses", value: fmt(expenses), color: "text-rose-300",    bg: "bg-rose-400/15",   sub: `${transaction.filter(t=>t.type==="expense").length} entries` },
            ].map(({ icon: Icon, label, value, color, bg, sub }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/15"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
              >
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">{label}</p>
                  <p className={`text-xl font-bold ${color}`}>{value}</p>
                  <p className="text-xs text-white/30 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Table Card ── */}
          <div
            className="anim-fade-up delay-2 rounded-2xl border border-white/15 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Filters */}
            <div className="px-4 sm:px-6 py-4 border-b border-white/8 flex flex-col sm:flex-row gap-3 sm:items-center">
              {/* Search */}
              <div className="relative flex-1 sm:max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
                <input
                  type="text"
                  placeholder="Search transactions…"
                  className="input-field pl-9 pr-4 py-2 rounded-xl border border-white/15 bg-white/8 focus:border-white/35 transition-all"
                />
              </div>

              {/* Type select */}
              <div className="relative">
                <Filter size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none" />
                <select className="pl-8 pr-8 py-2 text-sm rounded-xl bg-white/8 border border-white/15 text-white/70 focus:outline-none focus:border-white/35 appearance-none cursor-pointer transition-all">
                  <option className="bg-[#4c1d95]">All Types</option>
                  <option className="bg-[#4c1d95]">Income</option>
                  <option className="bg-[#4c1d95]">Expense</option>
                </select>
                <ChevronDown size={11} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none" />
              </div>

              {/* Category select */}
              <div className="relative">
                <select className="px-3 pr-8 py-2 text-sm rounded-xl bg-white/8 border border-white/15 text-white/70 focus:outline-none focus:border-white/35 appearance-none cursor-pointer transition-all">
                  <option className="bg-[#4c1d95]">All Categories</option>
                  {Object.keys(CATEGORIES).map(c => (
                    <option key={c} className="bg-[#4c1d95]">{c}</option>
                  ))}
                </select>
                <ChevronDown size={11} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none" />
              </div>

              <p className="text-xs text-white/35 sm:ml-auto shrink-0">{transaction.length} entries</p>
            </div>

            {/* Table head */}
            <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto_32px] gap-4 px-6 py-3 bg-white/4 border-b border-white/8">
              {["Type", "Details", "Category", "Date", "Amount", ""].map((h, i) => (
                <p key={i} className="text-xs font-semibold text-white/35 uppercase tracking-wider">{h}</p>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {transaction.map((t) => {
                const cat     = CATEGORIES[t.category] || CATEGORIES.Other;
                const CatIcon = cat.icon;
                const isIncome = t.type === "income";

                return (
                  <div
                    key={t.id}
                    className="row-hover grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto_auto_auto_32px] gap-x-4 gap-y-1 px-4 sm:px-6 py-4 items-center transition-colors group"
                  >
                    {/* Type icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isIncome ? "bg-emerald-400/15" : "bg-rose-400/15"}`}>
                      {isIncome
                        ? <ArrowDownLeft size={16} className="text-emerald-300" />
                        : <ArrowUpRight  size={16} className="text-rose-300" />
                      }
                    </div>

                    {/* Title + note */}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{t.title}</p>
                      {t.note
                        ? <p className="text-xs text-white/35 truncate">{t.note}</p>
                        : <p className="text-xs text-white/20 truncate capitalize">{t.type}</p>
                      }
                      {/* Mobile: category + date */}
                      <div className="flex items-center gap-2 mt-1 sm:hidden">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cat.bg} ${cat.color}`}>
                          <CatIcon size={9} />{t.category}
                        </span>
                        <span className="text-[10px] text-white/30">{t.date}</span>
                      </div>
                    </div>

                    {/* Category — desktop */}
                    <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.color}`}>
                      <CatIcon size={11} />{t.category}
                    </span>

                    {/* Date — desktop */}
                    <span className="hidden sm:block text-xs text-white/40 whitespace-nowrap">{t.date}</span>

                    {/* Amount */}
                    <span className={`hidden sm:block text-sm font-bold ${isIncome ? "text-emerald-300" : "text-rose-300"}`}>
                      {isIncome ? "+" : "-"}{fmt(t.amount)}
                    </span>

                    {/* Mobile amount */}
                    <span className={`col-start-2 sm:hidden text-sm font-bold ${isIncome ? "text-emerald-300" : "text-rose-300"}`}>
                      {isIncome ? "+" : "-"}{fmt(t.amount)}
                    </span>

                    {/* Actions */}
                    <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-all">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/8 bg-white/3 flex items-center justify-between">
              <p className="text-xs text-white/35">
                Showing <span className="text-white/60 font-medium">{transaction.length}</span> of <span className="text-white/60 font-medium">{transaction.length}</span> transactions
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map(p => (
                  <button
                    key={p}
                    className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                      p === 1
                        ? "bg-white/20 text-white border border-white/25"
                        : "text-white/35 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .tx-root    { font-family: 'DM Sans', sans-serif; }
        .tx-heading { font-family: 'Syne', sans-serif; }

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

        .anim-fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }

        .orb  { animation: float 6s ease-in-out infinite; }
        .orb-2{ animation: float 8s ease-in-out infinite reverse; animation-delay: -3s; }

        .row-hover:hover { background: rgba(255,255,255,0.05); }

        .input-field { background: transparent; color: white; font-size: 0.875rem; width: 100%; }
        .input-field:focus { outline: none; }
        .input-field::placeholder { color: rgba(255,255,255,0.28); }

        .shimmer-val {
          background: linear-gradient(90deg, #fff, #c4b5fd, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </>
  );
};