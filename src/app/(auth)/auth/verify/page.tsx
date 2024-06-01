"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
export default function VerifyPage() {
  const [value, setValue] = useState("");
  const [otpError, setOtpError] = useState(true);

  return (
    <div className="flex flex-col px-6 lg:px-28">
      <div className="bg-secondary flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            We just sent you an email
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code we sent to . Check your junk mail if
            it&apos;s not in your inbox.
          </p>
          <div className="my-4 flex justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot
                    className={cn("ring-indigo-500", {
                      "ring-rose-400": otpError,
                    })}
                    key={i}
                    index={i}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive an email? You can request another code in 27s
          </p>
        </div>
      </div>
    </div>
  );
}
