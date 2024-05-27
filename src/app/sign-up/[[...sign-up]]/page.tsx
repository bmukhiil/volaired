"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/supabase/actions";
import { testEmail } from "@/lib/validate";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function SignUpPage() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (!testEmail(e.target.value) || e.target.value.length === 0) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleSignup = () => {
    if (!testEmail(email) || email.length === 0) {
      setEmailError(true);
    }
    if (password.length < 8) {
      setPasswordError(true);
      return;
    } else if (emailError || passwordError) {
      return;
    }

    signup({ email, password });
  };

  return (
    <div className="flex flex-col px-6">
      <div className="bg-secondary py-20 flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the fields below to get flying
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <Button className="w-full" variant="outline">
            Continue with Google
          </Button>
          {/* <Button className="w-full" variant="outline">
            Continue with Google
          </Button> */}
        </div>
        <div className="flex items-center gap-x-2">
          <Separator className="flex shrink" />
          <span className="text-sm">or</span>
          <Separator className="flex shrink" />
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => handleEmailChange(e)}
                value={email}
                type="email"
                required
                placeholder="me@example.com"
                className={cn(
                  "focus-visible:bg-secondary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition",
                  {
                    "ring-rose-400 ring-1 focus-visible:border-border":
                      emailError,
                  }
                )}
              />
            </div>
            <AnimatePresence>
              {emailError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.1 }}
                  className="text-rose-500 text-sm font-medium"
                >
                  Email address is invalid
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Label>
                  <Link
                    href="/forgot-password"
                    className="underline text-foreground/60"
                  >
                    Forgot password?
                  </Link>
                </Label>
              </div>
              <Input
                onChange={(e) => handlePasswordChange(e)}
                value={password}
                type="password"
                required
                placeholder="Enter password"
                className={cn(
                  "focus-visible:bg-secondary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition",
                  {
                    "ring-rose-400 ring-1 focus-visible:border-border":
                      passwordError,
                  }
                )}
              />
            </div>
            <AnimatePresence>
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.1 }}
                  className="text-rose-500 text-sm font-medium"
                >
                  Password is invalid
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <Button className="w-full" onClick={handleSignup}>
            Sign Up
          </Button>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-foreground underline underline-offset-1"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
