import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  LogIn,
  XCircle,
  Loader,
} from "lucide-react";

import api from "../server";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await api.post("/auth/signin", data);

      console.log(response.data);

      login(response.data.token, response.data.user);

      alert("You have Successfully Signed In.");

      navigate("/");

      reset();
    } catch (error) {
      alert("Invalid Email or Password");
      console.log("Sign in failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fields = [
    {
      label: "Email Address",
      icon: Mail,
      input: {
        name: "email",
        type: "email",
        placeholder: "jane@example.com",
        validation: {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          },
        },
      },
    },
    {
      label: "Password",
      icon: Lock,
      input: {
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        validation: {
          required: "Password is required",
          minLength: {
            value: 4,
            message: "Password must be at least 4 characters",
          },
        },
      },
    },
  ];

  return (
    <>
      <div className="signin-root min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="orb absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="orb-2 absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-purple-300/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-400/10 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative w-full max-w-md anim-fade-up">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/35 flex items-center justify-center shadow-lg shadow-purple-900/30 backdrop-blur-sm">
                <Sparkles size={22} className="text-white" />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-white/10 blur-md -z-10" />
            </div>
            <h1 className="signin-heading mt-4 text-2xl font-extrabold text-white tracking-tight">
              FinanceApp
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="live-dot" />
              <p className="text-sm text-white/50">Secure sign in portal</p>
            </div>
          </div>

          {/* Card */}
          <div className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl shadow-purple-900/40 overflow-hidden">
            <div className="h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />

            <div className="px-7 pt-7 pb-8 space-y-6">
              {/* Heading */}
              <div className="anim-fade-up delay-1">
                <h2 className="signin-heading text-xl md:text-2xl font-extrabold text-white">
                  Welcome <span className="shimmer-text">back</span>
                </h2>
                <p className="text-xs text-white/40 mt-1">
                  Sign in to continue managing your finances
                </p>
              </div>

              {/* Fields */}
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {fields.map(({ label, icon: Icon, input }) => {
                  const isPassword = input.name === "password";

                  return (
                    <div key={input.name} className="space-y-2">
                      <label className="text-white/60 text-xs uppercase tracking-wider">
                        {label}
                      </label>

                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus-within:border-white/50">
                        <Icon size={16} className="text-white/40" />

                        <input
                          {...register(input.name, input.validation)}
                          type={
                            isPassword
                              ? showPassword
                                ? "text"
                                : "password"
                              : input.type
                          }
                          placeholder={input.placeholder}
                          className="w-full bg-transparent outline-none text-white text-sm"
                        />

                        {/* Password toggle */}
                        {isPassword &&
                          (showPassword ? (
                            <EyeOff
                              size={16}
                              className="cursor-pointer text-white/40"
                              onClick={() => setShowPassword(false)}
                            />
                          ) : (
                            <Eye
                              size={16}
                              className="cursor-pointer text-white/40"
                              onClick={() => setShowPassword(true)}
                            />
                          ))}
                      </div>

                      {/* Errors */}
                      {errors[input.name] && (
                        <div className="flex items-center gap-2 text-red-400 text-sm">
                          <XCircle size={14} />
                          {errors[input.name]?.message}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Remember me + Forgot */}
                <div className="anim-fade-up delay-3 flex items-center justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="custom-checkbox" />
                    <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors select-none">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-xs text-white/70 hover:text-white transition-colors hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <div className="anim-fade-up delay-4 pt-1">
                  <button
                    type="submit"
                    className="group w-full relative flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                      boxShadow: "0 4px 24px rgba(109,40,217,0.45)",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                    {loading ? (
                      <>
                        <Loader className="animate-spin" size={16} />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <LogIn size={15} />
                        Sign In
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Register link */}
              <p className="anim-fade-up delay-5 text-center text-sm text-white/35">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-white font-semibold hover:underline underline-offset-4 transition-colors"
                >
                  Create one
                </a>
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          </div>

          <p className="text-center text-[11px] text-white/20 mt-6">
            Protected by industry-standard encryption.
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .signin-root    { font-family: 'DM Sans', sans-serif; }
        .signin-heading { font-family: 'Syne', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #34d399; }
          50%       { opacity: 0.5; box-shadow: 0 0 2px #34d399; }
        }

        .anim-fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }
        .delay-4 { animation-delay: 0.32s; }
        .delay-5 { animation-delay: 0.40s; }

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

        .input-field { background: transparent; color: white; font-size: 0.875rem; width: 100%; }
        .input-field:focus { outline: none; }
        .input-field::placeholder { color: rgba(255,255,255,0.25); }

        .input-wrap:focus-within {
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.12);
        }

        .custom-checkbox {
          appearance: none;
          width: 16px; height: 16px;
          border-radius: 5px;
          border: 1.5px solid rgba(255,255,255,0.20);
          background: rgba(255,255,255,0.06);
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
          position: relative;
        }
        .custom-checkbox:checked {
          background: #7c3aed;
          border-color: #7c3aed;
        }
        .custom-checkbox:checked::after {
          content: '';
          position: absolute;
          left: 4px; top: 1.5px;
          width: 5px; height: 9px;
          border: 2px solid #fff;
          border-top: none; border-left: none;
          transform: rotate(45deg);
        }

        .live-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #34d399;
          animation: pulse-dot 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};
