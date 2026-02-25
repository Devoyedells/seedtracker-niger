import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Leaf, Activity, Sprout, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    console.log("Form Values:", formValues);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const StatCard = ({
    icon,
    title,
    value,
    detail,
    colorClass,
    animationDelay,
  }: any) => (
    <div
      className="bg-white/10 backdrop-blur-2xl border border-white/20 p-5 rounded-[2rem] flex items-start gap-4 shadow-2xl transition-all hover:scale-105 hover:bg-white/15 group mb-4 w-full max-w-[320px] animate-in fade-in slide-in-from-bottom-5"
      style={{ animationDelay }}
    >
      <div
        className={`p-3.5 rounded-2xl ${colorClass} bg-opacity-20 text-white shadow-inner`}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-white/70 font-bold text-xs mb-0.5 uppercase tracking-wider">
          {title}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-white text-xl font-black tracking-tight">
            {value}
          </span>
          <span className="text-brand-sun text-xs font-bold bg-brand-sun/10 px-2 py-0.5 rounded-full">
            {detail}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Image/Content */}
      <div className="relative hidden w-[45%] lg:flex flex-col items-center justify-between overflow-hidden bg-brand-green p-12">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,transparent_60%)] opacity-10" />
          <div className="absolute left-1/3 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-brand-sun/30 via-brand-sun/5 to-transparent blur-xl" />
        </div>

        {/* Content Top */}
        <div className="relative z-10 w-full mb-12">
          <Link to="/" className="flex items-center gap-2 text-white mb-12">
            {/* <div className="w-10 h-10 bg-brand-sun rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-brand-green" />
            </div> */}
            <div>
              <div className="font-bold text-xl">Seed Tracker NG</div>
            </div>
          </Link>

          <div className="max-w-lg">
            <h1 className="text-6xl font-black leading-[1.1] text-white mb-6 tracking-tighter">
              Transform Your <br /> Value Chain <br />{" "}
              <span className="text-brand-sun">Visibility</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed font-medium">
              Establish your presence in Nigeria&apos;s leading seed
              marketplace. Join thousands of verified actors making their mark
              on national food security.
            </p>
          </div>
        </div>

        {/* Floating Cards Area */}
        <div className="relative z-10 w-full flex flex-col items-start gap-2 h-full justify-center">
          <StatCard
            icon={<Sprout className="w-6 h-6" />}
            title="Seed Varieties"
            value="14.5k+"
            detail="Active"
            colorClass="bg-[#22c55e]"
            animationDelay="0s"
          />
          <StatCard
            icon={<Network className="w-6 h-6" />}
            title="Verified Actors"
            value="10k+"
            detail="Integrated"
            colorClass="bg-[#fbbf24]"
            animationDelay="0.2s"
          />
        </div>

        {/* Footer credit */}
        <div className="relative z-10 w-full flex justify-between items-center text-white/40 text-xs font-bold mt-12">
          <span>© {new Date().getFullYear()} Seed Tracker NG</span>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Form (Mesh Gradient) */}
      <div
        className="relative flex w-full lg:w-[55%] items-center justify-center p-8 sm:p-12 overflow-y-auto bg-white"
        style={{
          backgroundImage: `radial-gradient(at 0% 0%, rgba(0, 135, 81, 0.05) 0px, transparent 50%), 
                            radial-gradient(at 100% 100%, rgba(209, 255, 0, 0.08) 0px, transparent 50%),
                            radial-gradient(at 100% 0%, rgba(0, 135, 81, 0.03) 0px, transparent 50%)`,
        }}
      >
        <div className="w-full max-w-[460px]">
          <div className="text-center lg:text-left mb-8">
            <Link
              to="/"
              className="lg:hidden inline-flex items-center gap-2 mb-8"
            >
              {/* <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div> */}
              <span className="font-bold text-xl text-gray-900">
                Seed Tracker NG
              </span>
            </Link>
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-500 font-medium tracking-tight">
              Register as an actor in the Seed Value Chain.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="FullName"
                  className="text-[12px] font-bold text-gray-700 mb-1.5 block uppercase tracking-wider"
                >
                  Full Name / Company Name*
                </label>
                <div className="relative">
                  <input
                    id="FullName"
                    name="FullName"
                    type="text"
                    placeholder="Enter your registered name"
                    className="w-full rounded-2xl border-2 border-brand-green/20 bg-gray-50 hover:bg-gray-100 hover:border-brand-green/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 transition-all px-5 py-3.5 text-[15px] font-medium outline-none"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="Email"
                  className="text-[12px] font-bold text-gray-700 mb-1.5 block uppercase tracking-wider"
                >
                  Email address*
                </label>
                <div className="relative">
                  <input
                    id="Email"
                    name="Email"
                    type="email"
                    placeholder="Enter official email"
                    className="w-full rounded-2xl border-2 border-brand-green/20 bg-gray-50 hover:bg-gray-100 hover:border-brand-green/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 transition-all px-5 py-3.5 text-[15px] font-medium outline-none"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="ActorType"
                  className="text-[12px] font-bold text-gray-700 mb-1.5 block uppercase tracking-wider"
                >
                  Select Actor Type*
                </label>
                <div className="relative">
                  <select
                    id="ActorType"
                    name="ActorType"
                    className="w-full appearance-none rounded-2xl border-2 border-brand-green/20 bg-gray-50 hover:bg-gray-100 hover:border-brand-green/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 transition-all px-5 py-3.5 text-[15px] font-medium outline-none text-gray-600"
                    disabled={isLoading}
                    required
                  >
                    <option value="" disabled selected>
                      Choose type
                    </option>
                    <option value="producer">Seed Producer</option>
                    <option value="input_provider">Input Provider</option>
                    <option value="aggregator">Aggregator</option>
                    <option value="dealer">Dealers & Retailers</option>
                    <option value="offtaker">Offtaker</option>
                    <option value="processor">Processor & Warehouse</option>
                    <option value="farmer">Farmer or Cooperative</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="RegistrationState"
                  className="text-[12px] font-bold text-gray-700 mb-1.5 block uppercase tracking-wider"
                >
                  Location State*
                </label>
                <div className="relative">
                  <select
                    id="RegistrationState"
                    name="RegistrationState"
                    className="w-full appearance-none rounded-2xl border-2 border-brand-green/20 bg-gray-50 hover:bg-gray-100 hover:border-brand-green/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 transition-all px-5 py-3.5 text-[15px] font-medium outline-none text-gray-600"
                    disabled={isLoading}
                    required
                  >
                    <option value="" disabled selected>
                      Select State
                    </option>
                    <option value="ekiti">Ekiti</option>
                    <option value="anambra">Anambra</option>
                    <option value="niger">Niger</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <AddressAutocomplete isLoading={isLoading} />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="Password"
                  className="text-[12px] font-bold text-gray-700 mb-1.5 block uppercase tracking-wider"
                >
                  Password*
                </label>
                <div className="relative">
                  <input
                    id="Password"
                    name="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full rounded-2xl border-2 border-brand-green/20 bg-gray-50 hover:bg-gray-100 hover:border-brand-green/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 transition-all px-5 py-3.5 pr-12 text-[15px] font-medium outline-none"
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
            </div>

            <div className="flex items-center gap-3 py-1">
              <input
                type="checkbox"
                id="terms"
                className="w-5 h-5 border-gray-300 rounded-md text-brand-green focus:ring-brand-green transition-all cursor-pointer bg-white accent-brand-green"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium text-gray-500 cursor-pointer select-none"
              >
                I agree to the Terms & Data Policy.
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
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium text-[15px]">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="text-brand-green font-bold hover:underline transition-all underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
