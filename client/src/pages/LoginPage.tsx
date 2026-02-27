import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Eye, EyeOff, Sprout, Network, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import AuthLayout from "@/layouts/AuthLayout";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      await login({
        email: formData.get("Email") as string,
        password: formData.get("Password") as string,
      });
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        // Handle unverified email — redirect to verify screen
        if (data?.needsVerification) {
          toast.error(data.message || "Email not verified");
          navigate(`/verify-email?email=${encodeURIComponent(data.email)}`);
          return;
        }
        toast.error(data?.message || "Invalid credentials");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Sign in"
      subheading="Welcome back! Please enter your details."
      heroTitle={
        <>
          Master Your <br /> Agri-Business <br />{" "}
          <span className="text-brand-sun">Impact</span>
        </>
      }
      heroDescription="Welcome back to the node of Nigeria's seed success. Stay visible, stay verified, and keep your business integrated with the nation's agricultural progress."
      statCards={[
        {
          icon: <Sprout className="w-6 h-6" />,
          title: "Seed Varieties",
          value: "14.5k+",
          detail: "Active",
          colorClass: "bg-[#22c55e]",
          animationDelay: "0s",
        },
        {
          icon: <Network className="w-6 h-6" />,
          title: "Verified Actors",
          value: "10k+",
          detail: "Integrated",
          colorClass: "bg-[#fbbf24]",
          animationDelay: "0.2s",
        },
        {
          icon: <Activity className="w-6 h-6" />,
          title: "Platform Reach",
          value: "3 states",
          detail: "Coverage",
          colorClass: "bg-[#3b82f6]",
          animationDelay: "0.4s",
        },
      ]}
      bottomLink={
        <p className="text-gray-500 font-medium">
          Don't have an account?&nbsp;
          <Link
            to="/register"
            className="text-brand-green font-bold hover:underline transition-all underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="Email"
            className="text-[13px] font-bold text-gray-700 mb-2 block uppercase tracking-wider"
          >
            Email address*
          </label>
          <div className="relative">
            <input
              id="Email"
              name="Email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-2xl border-2 border-brand-green/20 bg-gray-50 hover:bg-gray-100 hover:border-brand-green/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 transition-all px-6 py-4 text-base font-medium outline-none"
              disabled={isLoading}
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="Password"
              className="text-[13px] font-bold text-gray-700 block uppercase tracking-wider"
            >
              Password*
            </label>
            <Link
              to="#"
              className="text-brand-green font-bold text-xs hover:underline underline-offset-4"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="Password"
              name="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-2xl border-2 border-brand-green/20 bg-gray-50 hover:bg-gray-100 hover:border-brand-green/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 transition-all px-6 py-4 pr-12 text-base font-medium outline-none"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-green transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 py-1">
          <input
            type="checkbox"
            id="remember"
            className="w-5 h-5 border-gray-300 rounded-md text-brand-green focus:ring-brand-green transition-all cursor-pointer bg-white accent-brand-green"
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium text-gray-500 cursor-pointer select-none"
          >
            Remember me
          </label>
        </div>

        <Button
          type="submit"
          className="w-full py-7 rounded-2xl text-lg font-black shadow-xl shadow-brand-green/20 transform active:scale-[0.98] transition-all bg-brand-green text-white hover:bg-brand-green/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
