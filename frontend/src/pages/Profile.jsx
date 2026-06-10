import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Camera,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Bell,
  Lock,
  LogOut,
  ChevronRight,
  Sparkles,
  Edit3,
  Star,
  Activity,
} from "lucide-react";

export const Profile = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .profile-root    { font-family: 'DM Sans', sans-serif; }
        .profile-heading { font-family: 'Syne', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .anim-fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }
        .delay-4 { animation-delay: 0.32s; }

        .shimmer-text {
          background: linear-gradient(90deg, #fff, #c4b5fd, #fff, #a5b4fc, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .orb  { animation: float 6s ease-in-out infinite; }
        .orb-2{ animation: float 8s ease-in-out infinite reverse; animation-delay: -3s; }

        .online-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #34d399;
          animation: pulse-ring 1.8s ease-out infinite;
        }

        .menu-row:hover { background: rgba(255,255,255,0.07); }
        .menu-row-danger:hover { background: rgba(248,113,113,0.10); }

        .progress-bar {
          height: 6px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.10);
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(90deg, #7c3aed, #6ee7b7);
        }
      `}</style>

      <div className="profile-root min-h-screen px-4 pt-28 pb-14 sm:px-6 lg:px-8 relative overflow-hidden">

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="orb absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/8 blur-3xl" />
          <div className="orb-2 absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-300/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto space-y-5">

          {/* Identity Card */}
          <div
            className="anim-fade-up relative rounded-3xl border border-white/20 overflow-hidden p-6 sm:p-8"
            style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(20px)" }}
          >
            <div className="h-px absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <button className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white/70 hover:bg-white/20 hover:text-white transition-all">
              <Edit3 size={12} /> Edit Profile
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">

              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-900/40 profile-heading text-3xl font-extrabold text-white">
                  JD
                </div>
                <div className="absolute -bottom-1.5 -right-1.5">
                  <div className="relative online-ring w-4 h-4 rounded-full bg-emerald-400 border-2 border-white/20" />
                </div>
                <button className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm">
                  <Camera size={12} className="text-white" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className="profile-heading text-2xl sm:text-3xl font-extrabold text-white">
                    Jane <span className="shimmer-text">Doe</span>
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-400/20 border border-violet-300/30 text-xs font-semibold text-violet-200">
                    <Star size={9} fill="currentColor" /> Pro
                  </span>
                </div>
                <p className="text-white/50 text-sm">jane@example.com</p>
                <p className="text-white/35 text-xs flex items-center justify-center sm:justify-start gap-1.5">
                  <Calendar size={11} /> Member since January 2024
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
                  {["Finance Pro", "Cape Town, ZA", "Verified"].map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full bg-white/8 border border-white/12 text-xs text-white/45">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile completion */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/40 flex items-center gap-1.5"><Activity size={11} /> Profile completion</span>
                <span className="text-white/70 font-semibold">80%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "80%" }} />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="anim-fade-up delay-1 grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: TrendingUp,   label: "Total Income",   value: "$24,500", color: "text-emerald-300", bg: "bg-emerald-400/15" },
              { icon: TrendingDown, label: "Total Expenses",  value: "$9,800",  color: "text-rose-300",    bg: "bg-rose-400/15" },
              { icon: PiggyBank,    label: "Total Savings",   value: "$14,700", color: "text-sky-300",     bg: "bg-sky-400/15" },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div
                key={label}
                className="flex flex-col gap-2 p-4 rounded-2xl border border-white/15"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
              >
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon size={16} className={color} />
                </div>
                <p className={`text-lg sm:text-xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-white/45 leading-tight">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">

            {/* Personal Info */}
            <div
              className="anim-fade-up delay-2 rounded-3xl border border-white/15 p-6"
              style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
            >
              <h2 className="profile-heading text-base font-bold text-white flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <User size={13} className="text-white/60" />
                </div>
                Personal Info
              </h2>

              <div className="space-y-1">
                {[
                  { icon: User,     label: "Full Name", value: "Jane Doe" },
                  { icon: Mail,     label: "Email",     value: "jane@example.com" },
                  { icon: Phone,    label: "Phone",     value: "+1 (555) 012-3456" },
                  { icon: MapPin,   label: "Location",  value: "Cape Town, ZA" },
                  { icon: Calendar, label: "Joined",    value: "January 2024" },
                  { icon: Shield,   label: "Role",      value: "Pro Member" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 py-3 border-b border-white/6 last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
                      <Icon size={13} className="text-white/45" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-white/35 uppercase tracking-wider font-semibold">{label}</p>
                      <p className="text-sm text-white font-medium mt-0.5 truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div
              className="anim-fade-up delay-3 rounded-3xl border border-white/15 p-6"
              style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
            >
              <h2 className="profile-heading text-base font-bold text-white flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <Sparkles size={13} className="text-white/60" />
                </div>
                Settings
              </h2>

              <div className="space-y-1">
                {[
                  { icon: Bell,   label: "Notifications",     sub: "Manage alerts & reminders" },
                  { icon: Lock,   label: "Change Password",    sub: "Update security credentials" },
                  { icon: Shield, label: "Privacy & Security", sub: "Control your data & permissions" },
                ].map(({ icon: Icon, label, sub }) => (
                  <button key={label} className="menu-row w-full flex items-center gap-3 px-3 py-3.5 rounded-xl transition-all group">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-white/55" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-white/35 mt-0.5">{sub}</p>
                    </div>
                    <ChevronRight size={14} className="text-white/20 group-hover:text-white/45 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}

                <div className="my-2 border-t border-white/8" />

                <button className="menu-row-danger w-full flex items-center gap-3 px-3 py-3.5 rounded-xl transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-red-400/15 flex items-center justify-center shrink-0">
                    <LogOut size={15} className="text-red-300" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-red-300">Sign Out</p>
                    <p className="text-xs text-white/30 mt-0.5">Log out of your account</p>
                  </div>
                  <ChevronRight size={14} className="text-red-300/30 group-hover:text-red-300/60 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              </div>

              {/* Pro card */}
              <div
                className="mt-5 rounded-2xl p-4 border border-violet-400/25 flex items-center gap-3"
                style={{ background: "rgba(124,58,237,0.15)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-violet-400/20 border border-violet-300/25 flex items-center justify-center shrink-0">
                  <Star size={16} className="text-violet-300" fill="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-violet-200">Pro Account</p>
                  <p className="text-xs text-violet-300/60 mt-0.5">All features unlocked</p>
                </div>
                <span className="text-[10px] font-bold text-violet-300 bg-violet-400/15 border border-violet-300/20 px-2 py-0.5 rounded-full shrink-0">
                  ACTIVE
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};