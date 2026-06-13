import {
  Users as UsersIcon,
  Search,
  Shield,
  User,
  Mail,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  UserCheck,
  RefreshCw,
  Filter,
  ClipboardCheck,
  Edit,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../server";

export const Users = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  
  const ROLE_CONFIG = {
    admin: {
      icon: Shield,
      className: "bg-violet-400/20 text-violet-200 border border-violet-300/25",
    },
    user: {
      icon: User,
      className: "bg-sky-400/20    text-sky-200    border border-sky-300/25",
    },
    default: {
      icon: UserCheck,
      className:
        "bg-emerald-400/20 text-emerald-200 border border-emerald-300/25",
    },
  };

  const avatarColors = [
    "from-violet-400 to-purple-600",
    "from-sky-400    to-blue-600",
    "from-emerald-400 to-teal-600",
    "from-rose-400   to-pink-600",
    "from-amber-400  to-orange-600",
    "from-indigo-400 to-blue-600",
  ];

  const fields = [
    {
      icon: UsersIcon,
      label: "Total Users",
      value: users.length,
      color: "text-white",
      bg: "bg-white/15",
    },
    {
      icon: Shield,
      label: "Admins",
      value: users.filter((u) => u.role === "admin").length,
      color: "text-rose-300",
      bg: "bg-rose-400/20",
    },
    {
      icon: UserCheck,
      label: "Active",
      value: users.filter((u) => u.status === "active").length,
      color: "text-emerald-300",
      bg: "bg-emerald-400/20",
    },
  ];

  const table_fields = [
    { label: "#" },
    { label: "Name", icon: User },
    { label: "Email", icon: Mail },
    { label: "Role", icon: Shield },
    { label: "Actions", icon: ClipboardCheck },
  ];


  const fetchUser = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.role?.toLowerCase().includes(term)
    );
  });

  return (
    <>
    
      <div className="users-root min-h-screen px-4 pt-28 pb-14 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="orb  absolute -top-32 -left-32  w-80 h-80 rounded-full bg-white/8    blur-3xl" />
          <div className="orb-2 absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-300/10 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto space-y-5">
          {/* ── Header ── */}
          <div className="anim-fade-up flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="users-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
                <div className="p-2 bg-white/10 border border-white/20 rounded-xl">
                  <UsersIcon size={20} className="text-white" />
                </div>
                User Management
              </h1>
              <p className="text-sm text-white/45 mt-1 ml-[46px]">
                Manage and monitor all registered users
              </p>
            </div>
            <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-medium text-white hover:bg-white/20 transition-all backdrop-blur-sm">
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>

          {/* ── Stats ── */}
          <div className="anim-fade-up delay-1 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {fields.map(({ icon: Icon, label, value, color, bg }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/15"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className={`p-2 rounded-xl ${bg} shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-xl sm:text-2xl font-bold ${color} leading-none`}
                  >
                    {value}
                  </p>
                  <p className="text-xs text-white/45 mt-0.5 truncate">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Table Card ── */}
          <div
            className="anim-fade-up delay-2 rounded-2xl border border-white/15 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Search + filter bar */}
            <div className="px-4 sm:px-6 py-4 border-b border-white/8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
                />
                <input
                  type="text"
                  placeholder="Search By name  email  role"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field w-full pl-9 pr-4 py-2 rounded-xl border border-white/15 bg-white/8 focus:border-white/35 transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/8 border border-white/15 text-xs text-white/50 hover:text-white hover:bg-white/12 transition-all">
                  <Filter size={12} /> Filter
                </button>
                <p className="text-xs font-semibold text-white/60 px-2">
                  {filteredUsers.length} users
                </p>
              </div>
            </div>

            {/* Table header */}
            <div className="hidden sm:grid grid-cols-[28px_1fr_1fr_auto_auto_32px] gap-4 px-6 py-3 bg-white/4 border-b border-white/8">
              {table_fields.map(({ label, icon: Icon }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 text-xs font-semibold text-white/35 uppercase tracking-wider"
                >
                  {Icon && <Icon size={13} />}
                  {label}
                  {i === 1 && (
                    <ChevronUp size={12} className="text-white ml-0.5" />
                  )}
                </div>
              ))}
            </div>
            {/* Rows */}
            <div className="divide-y divide-white/5">
              {filteredUsers.map((user, idx) => {
                const roleConf = ROLE_CONFIG[user.role] || ROLE_CONFIG.default;
                const RoleIcon = roleConf.icon;

                const colorIndex =
                  user.name?.charCodeAt(0) % avatarColors.length;

                const initials = user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={user._id}
                    className="row-hover grid grid-cols-[auto_1fr] sm:grid-cols-[28px_1fr_1fr_auto_auto_60px] gap-x-4 gap-y-1 px-4 sm:px-6 py-4 items-center transition-colors group"
                  >
                    {/* Index */}
                    <span className="hidden sm:block text-xs text-white/25 font-mono">
                      {idx + 1}
                    </span>

                    {/* Name + avatar */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatarColors[colorIndex]} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md shadow-black/20`}
                      >
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {user.name}
                        </p>

                        <p className="text-xs text-white/35 truncate sm:hidden">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Email desktop */}
                    <span className="hidden sm:block text-sm text-white/50 truncate">
                      {user.email}
                    </span>

                    {/* Role badge desktop */}
                    <span
                      className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${roleConf.className}`}
                    >
                      <RoleIcon size={10} />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>

                    {/* Mobile badge */}
                    <div className="flex items-center gap-2 sm:hidden">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${roleConf.className}`}
                      >
                        <RoleIcon size={9} />
                        {user.role}
                      </span>
                    </div>

                    {/* Actions (FIXED: inside row) */}
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="cursor-pointer p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-green-500 transition">
                        <Edit size={18} />
                      </button>

                      <button className="cursor-pointer -1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition">
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/8 bg-white/3 flex items-center justify-between">
              <p className="text-xs text-white/35">
                Showing{" "}
                <span className="text-white/60 font-medium">
                  {filteredUsers.length}
                </span>{" "}
                users
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((p) => (
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

        .users-root    { font-family: 'DM Sans', sans-serif; }
        .users-heading { font-family: 'Syne', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
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

        .status-active   { background: rgba(52,211,153,0.15); color: #6ee7b7; border: 1px solid rgba(52,211,153,0.25); }
        .status-inactive { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.35); border: 1px solid rgba(255,255,255,0.12); }
      `}</style>

    </>
  );
};
