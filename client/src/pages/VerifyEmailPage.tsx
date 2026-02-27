import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import AuthLayout from "@/layouts/AuthLayout";

export default function VerifyEmailPage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { user, verifyEmail, resendVerification } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  // If already logged in, go to dashboard
  if (user) return <Navigate to="/dashboard" replace />;

  // If no email param, go to login
  if (!email) return <Navigate to="/login" replace />;

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Auto-submit when 6 digits entered
  const handleCodeChange = useCallback(
    async (value: string) => {
      setCode(value);
      if (value.length === 6) {
        setIsLoading(true);
        try {
          await verifyEmail(email, value);
          toast.success("Email verified! Welcome to Seed Tracker NG.");
          navigate("/dashboard");
        } catch (err) {
          if (axios.isAxiosError(err)) {
            toast.error(
              err.response?.data?.message || "Invalid verification code",
            );
          } else {
            toast.error("Something went wrong");
          }
          setCode("");
        } finally {
          setIsLoading(false);
        }
      }
    },
    [email, verifyEmail, navigate],
  );

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendVerification(email);
      toast.success("A new verification code has been sent!");
      setCountdown(60);
      setCode("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Could not resend code");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsResending(false);
    }
  };

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <AuthLayout
      heading="Verify Email"
      subheading="Enter the 6-digit code sent to your inbox."
      heroTitle={
        <>
          Almost <br /> There <span className="text-brand-sun">🎉</span>
        </>
      }
      heroDescription="We've sent a verification code to your email. Enter it below to activate your account and join Nigeria's seed value chain network."
      statCards={[
        {
          icon: <MailCheck className="w-6 h-6" />,
          title: "Email Verification",
          value: "Secure",
          detail: "6-digit code",
          colorClass: "bg-[#22c55e]",
          animationDelay: "0s",
        },
      ]}
    >
      {/* Email display */}
      <div className="mb-8">
        <div className="bg-brand-green/5 border-2 border-brand-green/15 rounded-2xl px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <MailCheck className="w-5 h-5 text-brand-green" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Code sent to
            </p>
            <p className="text-sm font-bold text-gray-900 truncate">{email}</p>
          </div>
        </div>
      </div>

      {/* PIN Input */}
      <div className="flex justify-center mb-8">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={handleCodeChange}
          disabled={isLoading}
        >
          <InputOTPGroup className="gap-2 sm:gap-3">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="!w-12 !h-14 sm:!w-14 sm:!h-16 !rounded-2xl !border-2 !border-brand-green/20 bg-gray-50 text-xl sm:text-2xl font-black text-gray-900 data-[active=true]:!border-brand-green data-[active=true]:!ring-4 data-[active=true]:!ring-brand-green/20 data-[active=true]:bg-white transition-all first:!rounded-l-2xl last:!rounded-r-2xl"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3 text-brand-green font-bold">
            <div className="w-5 h-5 border-2 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
            Verifying...
          </div>
        </div>
      )}

      {/* Countdown / Resend */}
      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-gray-500 font-medium text-sm">
            Resend code in{" "}
            <span className="font-black text-brand-green tabular-nums">
              {formatCountdown(countdown)}
            </span>
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-500 font-medium text-sm">
              Didn't receive the code?
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={handleResend}
              disabled={isResending}
              className="rounded-2xl border-2 border-brand-green/20 text-brand-green font-bold hover:bg-brand-green/5 hover:border-brand-green/40 px-8 py-5 transition-all"
            >
              {isResending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "Resend Code"
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Bottom link */}
      <div className="mt-10 text-center">
        <p className="text-gray-500 font-medium text-[15px]">
          Wrong email?&nbsp;
          <a
            href="/register"
            className="text-brand-green font-bold hover:underline transition-all underline-offset-4"
          >
            Register again
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
