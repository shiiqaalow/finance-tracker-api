import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  // ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  XCircle,
  Loader,
} from "lucide-react";

import api from "../server";
import { useNavigate } from "react-router";
export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        setIsLoading(false);
        return;
      }
      await api.post("/auth/signup", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("From Submission Succcess.");
      console.log("You have Successfully Created an acount.", data);
      navigate('/signin')
      reset();
    } catch (error) {
      alert("From submission failed.");
      console.log("From submission failed.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password");

  const fields = [
    {
      label: "Full Name",
      icon: User,
      input: {
        name: "name",
        type: "text",
        placeholder: "Jane Doe",
        validation: {
          required: "Full name is required",
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters",
          },
        },
      },
    },
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
      show: Eye,
      hide: EyeOff,
      input: {
        name: "password",
        type: "password",
        placeholder: "Min 4 characters",
        validation: {
          required: "Password is required",
          minLength: {
            value: 4,
            message: "Password must be at least 4 characters",
          },
        },
      },
    },
    {
      label: "Confirm Password",
      icon: Lock,
      show: Eye,
      hide: EyeOff,
      input: {
        name: "confirmPassword",
        type: "password",
        placeholder: "Repeat your password",
        validation: {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        },
      },
    },
  ];

  return (
    <>
      <div className="signup-root flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="orb absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="orb-2 absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-purple-300/15 blur-3xl" />
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
          <div className="flex flex-col items-center mb-8 anim-fade-up">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/35 flex items-center justify-center shadow-lg shadow-purple-900/30 backdrop-blur-sm">
                <Sparkles size={22} className="text-white" />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-white/10 blur-md -z-10" />
            </div>
            <h1 className="signup-heading mt-4 text-2xl font-extrabold text-white tracking-tight">
              FinanceApp
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Create your account to get started
            </p>
          </div>

          {/* Card */}
          <div className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl shadow-purple-900/40 overflow-hidden">
            <div className="from-transparent via-white/45 to-transparent" />

            <div className="px-7 pt-7 pb-8 space-y-6">
              {/* Heading */}
              <div className="anim-fade-up delay-1">
                <h2 className="signup-heading text-xl md:text-2xl font-extrabold text-white">
                  Create <span className="shimmer-text">Account</span>
                </h2>
                <p className="text-xs text-white/40 mt-1">
                  Fill in your details below
                </p>
              </div>

              {/* form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {fields.map(
                  ({ label, input, icon: Icon, show: Show, hide: Hide }) => {
                    // const [showPassword,setShowPassword ] = useState(false)
                    const isPassword = input.name === "password";
                    const isConfirm = input.name === "confirmPassword";
                    return (
                      <div key={label} className="space-y-1">
                        {/* Labels */}
                        <div className="anim-fade-up delay-2 space-y-1.5">
                          <label className="block text-xs font-semibold text-white/45 uppercase tracking-widest">
                            {label}
                          </label>
                        </div>
                        {/* Fields */}
                        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-white/18 bg-white/8 group focus-within:border-white/50 focus-within:bg-white/12 transition-all duration-200">
                          <Icon
                            size={16}
                            className="text-white/35 group-focus-within:text-white/70 transition-colors shrink-0"
                          />
                          <input
                            {...register(input.name, input.validation)}
                            type={
                              isPassword
                                ? showPassword
                                  ? "text"
                                  : "password"
                                : isConfirm
                                  ? showConfirmPassword
                                    ? "text"
                                    : "password"
                                  : input.type
                            }
                            placeholder={input.placeholder}
                            className="w-full bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none text-white text-sm"
                          />

                          {/* Password toggle */}
                          {isPassword &&
                            (showPassword ? (
                              <Hide
                                size={16}
                                className="cursor-pointer text-white/40"
                                onClick={() => setShowPassword(false)}
                              />
                            ) : (
                              <Show
                                size={16}
                                className="cursor-pointer text-white/40"
                                onClick={() => setShowPassword(true)}
                              />
                            ))}

                          {/* Confirm password toggle */}
                          {isConfirm &&
                            (showConfirmPassword ? (
                              <Hide
                                size={16}
                                className="cursor-pointer text-white/40"
                                onClick={() => setShowConfirmPassword(false)}
                              />
                            ) : (
                              <Show
                                size={16}
                                className="cursor-pointer text-white/40"
                                onClick={() => setShowConfirmPassword(true)}
                              />
                            ))}
                        </div>
                        {/* Errors Display */}
                        {errors[input.name] && (
                          <div className="flex items-center gap-2 text-red-400 text-sm">
                            <XCircle size={14} />
                            {errors[input.name]?.message}
                          </div>
                        )}
                      </div>
                    );
                  },
                )}
                {/* Submit */}
                <div className="anim-fade-up delay-6 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full relative flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                      boxShadow: "0 4px 24px rgba(109,40,217,0.45)",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />

                    {loading ? (
                      <>
                        <Loader className="animate-spin" size={16} />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Sign in link */}
              <p className="anim-fade-up delay-6 text-center text-sm text-white/35">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-white font-semibold hover:underline underline-offset-4 transition-colors"
                >
                  Sign In
                </a>
              </p>
            </div>

            <div className="from-transparent via-white/12 to-transparent" />
          </div>

          <p className="text-center text-[11px] text-white/20 mt-6">
            By creating an account, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .signup-root    { font-family: 'DM Sans', sans-serif; }
        .signup-heading { font-family: 'Syne', sans-serif; }

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

        .anim-fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }
        .delay-4 { animation-delay: 0.32s; }
        .delay-5 { animation-delay: 0.40s; }
        .delay-6 { animation-delay: 0.48s; }

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

        .input-field:focus {
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.12);
          outline: none;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>
    </>
  );
};
