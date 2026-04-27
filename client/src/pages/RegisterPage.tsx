import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Eye, EyeOff, Sprout, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import AuthLayout from "@/layouts/AuthLayout";
import lgasData from "@/data/lgas.json";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const { register, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    try {
      const result = await register({
        fullName: formValues.FullName,
        email: formValues.Email,
        password: formValues.Password,
        actorType: formValues.ActorType,
        registrationState: formValues.RegistrationState,
        lga: formValues.LGA,
        address: formValues.Address,
        lat: formValues.Lat,
        lng: formValues.Lng,
      });
      toast.success("Verification code sent to your email!");
      navigate(`/verify-email?email=${encodeURIComponent(result.email)}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Registration failed");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Create Account"
      subheading="Register as an actor in the Niger State Seed Value Chain."
      heroTitle={
        <>
          Transform Niger <br /> State&apos;s Value <br />{" "}
          <span className="text-brand-sun">Chain Visibility</span>
        </>
      }
      heroDescription="Establish your presence in the Niger State seed marketplace. Join verified actors helping shape the Power State's agricultural future — part of a 3-state national network."
      statCards={[
        {
          icon: <Sprout className="w-6 h-6" />,
          title: "Seed Varieties",
          value: "14.5k+",
          detail: "Active",
          colorClass: "bg-brand-sun",
          animationDelay: "0s",
        },
        {
          icon: <Network className="w-6 h-6" />,
          title: "Verified Actors",
          value: "10k+",
          detail: "Integrated",
          colorClass: "bg-brand-sun",
          animationDelay: "0.2s",
        },
      ]}
      bottomLink={
        <p className="text-gray-500 font-medium text-[15px]">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="text-brand-green font-bold hover:underline transition-all underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      }
    >
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

          <div className="sm:col-span-2">
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
                <option value="dealer">Dealers &amp; Retailers</option>
                <option value="offtaker">Offtaker</option>
                <option value="processor">Processor &amp; Warehouse</option>
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
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full appearance-none rounded-2xl border-2 border-brand-green/20 bg-gray-50 hover:bg-gray-100 hover:border-brand-green/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 transition-all px-5 py-3.5 text-[15px] font-medium outline-none text-gray-600"
                disabled={isLoading}
                required
              >
                <option value="" disabled>
                  Select State
                </option>
                <option value="Niger">Niger State (Power State)</option>
                <option value="Anambra">Anambra</option>
                <option value="Ekiti">Ekiti</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="LGA"
              className="text-[12px] font-bold text-gray-700 mb-1.5 block uppercase tracking-wider"
            >
              Local Government Area*
            </label>
            <div className="relative">
              <select
                id="LGA"
                name="LGA"
                className="w-full appearance-none rounded-2xl border-2 border-brand-green/20 bg-gray-50 hover:bg-gray-100 hover:border-brand-green/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 transition-all px-5 py-3.5 text-[15px] font-medium outline-none text-gray-600 disabled:bg-gray-100 disabled:text-gray-400"
                disabled={isLoading || !selectedState}
                required
              >
                <option value="" disabled selected>
                  {selectedState ? "Select LGA" : "Select a State first"}
                </option>
                {selectedState &&
                  lgasData[selectedState as keyof typeof lgasData]?.map(
                    (lga) => (
                      <option key={lga} value={lga}>
                        {lga}
                      </option>
                    ),
                  )}
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
            I agree to the Terms &amp; Data Policy.
          </label>
        </div>

        <Button
          type="submit"
          data-testid="register-submit-button"
          className="w-full py-7 rounded-2xl text-lg font-black shadow-xl shadow-brand-green/20 transform active:scale-[0.98] transition-all bg-brand-green text-white hover:bg-brand-green-deep"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
