import { useForm } from "react-hook-form";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Tag,
  Calendar,
  FileText,
  DollarSign,
  Sparkles,
  ChevronDown,
  ShoppingCart,
  Car,
  Utensils,
  Briefcase,
  Home,
  Zap,
  Heart,
  BookOpen,
  Plane,
  MoreHorizontal,
} from "lucide-react";

const CATEGORIES = [
  { value: "salary", label: "Salary", icon: Briefcase },
  { value: "freelance", label: "Freelance", icon: Zap },
  { value: "food", label: "Food", icon: Utensils },
  { value: "transport", label: "Transport", icon: Car },
  { value: "shopping", label: "Shopping", icon: ShoppingCart },
  { value: "rent", label: "Rent", icon: Home },
  { value: "health", label: "Health", icon: Heart },
  { value: "education", label: "Education", icon: BookOpen },
  { value: "travel", label: "Travel", icon: Plane },
  { value: "other", label: "Other", icon: MoreHorizontal },
];

export const CreateTransaction = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "expense",
      category: "",
    },
  });

  const selectedType = watch("type");
  const selectedCategory = watch("category");

  return (
    <>
      <div className="ct-root min-h-screen px-4 pt-28 pb-14 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="orb  absolute -top-32 -left-32  w-80 h-80 rounded-full bg-white/8    blur-3xl" />
          <div className="orb-2 absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-300/10 blur-3xl" />
        </div>

        <div className="relative max-w-lg mx-auto">
          {/* ── Logo mark ── */}
          <div className="flex justify-center mb-7 anim-fade-up">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center shadow-lg shadow-purple-900/30 backdrop-blur-sm">
                <Sparkles size={22} className="text-white" />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-white/8 blur-md -z-10" />
            </div>
          </div>

          {/* ── Heading ── */}
          <div className="text-center mb-8 anim-fade-up delay-1">
            <h1 className="ct-heading text-2xl sm:text-3xl font-extrabold text-white">
              New <span className="shimmer-text">Transaction</span>
            </h1>
            <p className="text-sm text-white/45 mt-1.5">
              Record your income or expense below
            </p>
          </div>

          {/* ── Card ── */}
          <form
            onSubmit={handleSubmit()}
            className="anim-fade-up delay-2 relative rounded-3xl border border-white/20 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <form className="px-6 sm:px-8 pt-7 pb-8 space-y-5">
              {/* ── Type toggle ── */}
              <div className="anim-fade-up delay-2 space-y-1.5">
                <label className="block text-xs font-semibold text-white/45 uppercase tracking-widest">
                  Transaction Type
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/6 border border-white/12">
                  <label
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                      selectedType === "expense"
                        ? "bg-rose-500/30 text-rose-200 border border-rose-400/30 shadow-sm"
                        : "text-white/40 hover:text-white/65"
                    }`}
                  >
                    <input
                      type="radio"
                      value="expense"
                      {...register("type")}
                      className="sr-only"
                    />
                    <ArrowUpRight size={15} />
                    Expense
                  </label>
                  <label
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                      selectedType === "income"
                        ? "bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 shadow-sm"
                        : "text-white/40 hover:text-white/65"
                    }`}
                  >
                    <input
                      type="radio"
                      value="income"
                      {...register("type")}
                      className="sr-only"
                    />
                    <ArrowDownLeft size={15} />
                    Income
                  </label>
                </div>
              </div>

              {/* ── Title ── */}
              <div className="anim-fade-up delay-3 space-y-1.5">
                <label className="block text-xs font-semibold text-white/45 uppercase tracking-widest">
                  Title
                </label>
                <div className="input-icon-wrap">
                  <FileText size={15} className="icon-left text-white/35" />
                  <input
                    type="text"
                    placeholder="e.g. Monthly Salary"
                    {...register("title", { required: "Title is required" })}
                    className={`glass-input ${errors.title ? "error-field" : ""}`}
                  />
                </div>
                {errors.title && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* ── Amount ── */}
              <div className="anim-fade-up delay-3 space-y-1.5">
                <label className="block text-xs font-semibold text-white/45 uppercase tracking-widest">
                  Amount
                </label>
                <div className="input-icon-wrap">
                  <DollarSign size={15} className="icon-left text-white/35" />
                  <input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    {...register("amount", {
                      required: "Amount is required",
                      min: { value: 0.01, message: "Must be greater than 0" },
                    })}
                    className={`glass-input ${errors.amount ? "error-field" : ""}`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-xs text-rose-400 mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* ── Category ── */}
              <div className="anim-fade-up delay-4 space-y-1.5">
                <label className="block text-xs font-semibold text-white/45 uppercase tracking-widest">
                  Category
                </label>
                <div className="input-icon-wrap has-right">
                  <Tag size={15} className="icon-left text-white/35" />
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className={`glass-input glass-select ${errors.category ? "error-field" : ""}`}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="icon-right text-white/35" />
                </div>
                {errors.category && (
                  <p className="text-xs text-rose-400 mt-1">
                    {errors.category.message}
                  </p>
                )}

                {/* Category icon chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {CATEGORIES.map(({ value, label, icon: Icon }) => {
                    const active = selectedCategory === value;
                    return (
                      <label
                        key={value}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer border transition-all ${
                          active
                            ? "bg-violet-400/25 border-violet-300/40 text-violet-200"
                            : "bg-white/6 border-white/12 text-white/40 hover:text-white/65 hover:bg-white/10"
                        }`}
                      >
                        <input
                          type="radio"
                          value={value}
                          {...register("category")}
                          className="sr-only"
                        />
                        <Icon size={11} />
                        {label}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* ── Date ── */}
              <div className="anim-fade-up delay-4 space-y-1.5">
                <label className="block text-xs font-semibold text-white/45 uppercase tracking-widest">
                  Date
                </label>
                <div className="input-icon-wrap">
                  <Calendar size={15} className="icon-left text-white/35" />
                  <input
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    className={`glass-input ${errors.date ? "error-field" : ""}`}
                  />
                </div>
                {errors.date && (
                  <p className="text-xs text-rose-400 mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* ── Summary preview ── */}
              {(watch("title") || watch("amount")) && (
                <div className="anim-fade-up rounded-2xl border border-white/12 bg-white/5 px-4 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        selectedType === "income"
                          ? "bg-emerald-400/15"
                          : "bg-rose-400/15"
                      }`}
                    >
                      {selectedType === "income" ? (
                        <ArrowDownLeft size={14} className="text-emerald-300" />
                      ) : (
                        <ArrowUpRight size={14} className="text-rose-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {watch("title") || "Untitled"}
                      </p>
                      <p className="text-xs text-white/35 capitalize">
                        {watch("category") || "No category"} · {selectedType}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-bold shrink-0 ${
                      selectedType === "income"
                        ? "text-emerald-300"
                        : "text-rose-300"
                    }`}
                  >
                    {selectedType === "income" ? "+" : "-"}$
                    {watch("amount")
                      ? Number(watch("amount")).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              )}

              {/* ── Submit ── */}
              <div className="anim-fade-up delay-5 pt-1">
                <button
                  type="submit"
                  className="group w-full relative flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    boxShadow: "0 4px 24px rgba(109,40,217,0.45)",
                  }}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                  <Wallet size={15} />
                  Save Transaction
                </button>
              </div>
            </form>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </form>

          <p className="text-center text-[11px] text-white/20 mt-6">
            Transactions are saved to your account securely.
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .ct-root    { font-family: 'DM Sans', sans-serif; }
        .ct-heading { font-family: 'Syne', sans-serif; }

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

        .glass-input {
          width: 100%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: white;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .glass-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.11);
        }
        .glass-input::placeholder { color: rgba(255,255,255,0.25); }
        .glass-input.error-field  { border-color: rgba(248,113,113,0.6); background: rgba(248,113,113,0.05); }

        .glass-select {
          appearance: none;
          cursor: pointer;
        }
        .glass-select option { background: #4c1d95; color: white; }

        .input-icon-wrap { position: relative; }
        .input-icon-wrap .icon-left {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          pointer-events: none;
        }
        .input-icon-wrap .icon-right {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          pointer-events: none;
        }
        .input-icon-wrap .glass-input { padding-left: 2.5rem; }
        .input-icon-wrap.has-right .glass-input { padding-right: 2.5rem; }

        [type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.6);
          cursor: pointer;
        }
        [type="date"] { color-scheme: dark; }
      `}</style>
    </>
  );
};
