"use client";

import { checkOtp } from "@/lib/supabase/actions";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = window.sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtp = async (otp: string) => {
    setOtp(otp);

    if (otp.length === 6) {
      try {
        await checkOtp({
          email,
          token: otp,
        });
      } catch (error) {
        setOtpError(true);
      }
    }
  };

  const handleResendOtp = async () => {
    if (canResend) {
      setCountdown(30);
      // setCanResend(false);
    }
  };

  return (
    <div className="flex flex-col px-6 lg:px-28">
      <div className="bg-secondary flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            We just sent you an email
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code we sent to{" "}
            <span className="text-foreground font-medium">{email}</span>. Check
            your junk mail if it&apos;s not in your inbox.
          </p>
          <div className="my-4 flex items-center gap-x-4">
            <InputOTP
              disabled={loading}
              maxLength={6}
              value={otp}
              onChange={(otp) => handleOtp(otp)}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot className="ring-indigo-500" key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {loading && (
              <motion.div
                className="bg-primary w-6 h-6"
                animate={{
                  scale: [0.9, 1.1, 1.1, 0.9, 0.9],
                  rotate: [0, 0, 180, 180, 0],
                  borderRadius: ["0%", "0%", "50%", "50%", "0%"],
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 1.2,
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm text-muted-foreground">
              Didn&apos;t receive an email? You can request another code in{" "}
              {countdown}s
            </p>
            <Button
              disabled={countdown !== 0}
              onClick={handleResendOtp}
              className="bg-background text-foreground active:bg-background/60 hover:bg-background/60"
            >
              Resend code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
