import {
  Home,
  ArrowLeftRight,
  BarChart2,
  Users,
  User,
  LogIn,
  Sparkle,
  UserPlus,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const nav = {
  logo: { name: "financeApp", link: "/", icon: Sparkle },
  menu: [
    { name: "Home", link: "/", icon: Home },
    { name: "Transaction", link: "/transaction", icon: ArrowLeftRight },
    { name: "Report", link: "/report", icon: BarChart2 },
    { name: "Users", link: "/users", icon: Users },
    { name: "Profile", link: "/me", icon: User },
  ],
  auth: [
    { name: "sign in", link: "/signin", icon: LogIn },
    { name: "sign Up", link: "/signup", icon: UserPlus },
  ],
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const LogoIcon = nav.logo.icon;
  const location = useLocation();

  const { user, logout } = useAuth();
  console.log("H.user =>", user);

  return (
    <>
      <header className="root fixed top-0 left-0 w-full z-50">
        {/* Main bar */}
        <div
          className="border-b border-white/15 shadow-lg shadow-purple-900/20"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
          }}
        >
          <nav className="max-w-7xl mx-auto flex justify-between items-center gap-5 px-4 py-3 md:px-6 md:py-3.5">
            {/* Logo */}
            <Link to={nav.logo.link} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-sm group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                <LogoIcon size={16} className="text-white" />
              </div>
              <h1 className="brand capitalize text-xl font-extrabold tracking-tight text-white">
                {nav.logo.name}
              </h1>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-1">
              {nav.menu.map(({ name, link, icon: Icon }) => {
                const isActive = location.pathname === link;
                return (
                  <Link
                    key={link}
                    to={link}
                    className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/20 text-white shadow-sm"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon size={14} />
                    {name}
                    {isActive && <span className="nav-dot" />}
                  </Link>
                );
              })}
            </div>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-3">
                  <img
                    src={user?.profilePicture}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />

                  <span>{user?.name}</span>
                </div>
              ) : (
                nav.auth.map(({ name, link, icon: Icon }) => {
                  const isSignUp = name.toLowerCase() === "sign up";
                  return (
                    <Link
                      key={link}
                      to={link}
                      className={
                        isSignUp
                          ? "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-white/20 border border-white/30 hover:bg-white/30 transition-all shadow-sm"
                          : "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm capitalize font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-all"
                      }
                    >
                      <Icon size={14} />
                      {name}
                    </Link>
                  );
                })
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              {isOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            className="md:hidden mobile-in border-b border-white/15"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col px-4 pt-2 pb-3 gap-1">
              {user ? (
                <div className="flex items-center gap-3">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />

                  <span>{user.name}</span>
                </div>
              ) : (
                nav.menu.map(({ name, link, icon: Icon }) => {
                  const isActive = location.pathname === link;
                  return (
                    <Link
                      key={link}
                      to={link}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon size={15} />
                      {name}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_white]" />
                      )}
                    </Link>
                  );
                })
              )}
            </div>

            {/* Mobile auth */}
            <div className="flex gap-2 px-4 pb-4">
              {nav.auth.map(({ name, link, icon: Icon }) => {
                const isSignUp = name.toLowerCase() === "sign up";
                return (
                  <Link
                    key={link}
                    to={link}
                    onClick={() => setIsOpen(false)}
                    className={
                      isSignUp
                        ? "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/20 border border-white/30 hover:bg-white/30 transition-all"
                        : "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm capitalize font-semibold text-white/70 border border-white/15 hover:bg-white/10 hover:text-white transition-all"
                    }
                  >
                    <Icon size={14} />
                    {name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .root  { font-family: 'DM Sans', sans-serif; }
        .brand { font-family: 'Syne', sans-serif; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-in { animation: slideDown 0.25s cubic-bezier(.22,1,.36,1) both; }

        .nav-dot {
          position: absolute;
          bottom: -4px; left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 6px rgba(255,255,255,0.9);
        }
      `}</style>
    </>
  );
};
