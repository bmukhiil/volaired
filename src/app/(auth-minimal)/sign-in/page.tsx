"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signin } from "@/lib/supabase/actions";
import { signinGoogle } from "@/lib/supabase/signin"
import { testEmail } from "@/lib/validate";
import Link from "next/link";
import { cn } from "@/lib/utils";
import GoogleGLogo from "../../../../public/google_g_logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function SignUpPage() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(e.target.value);

    // if (!testEmail(e.target.value) || e.target.value.length === 0) {
    //   setEmailError(true);
    // } else {
    //   setEmailError(false);
    // }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    setPassword(e.target.value);

    // if (e.target.value.length < 8) {
    //   setPasswordError(true);
    // } else {
    //   setPasswordError(false);
    // }
  };

  const handleSignin = async () => {
    setLoading(true);
    if (!testEmail(email) || email.length === 0) {
      setEmailError(true);
    }
    // if (password.length === 0) {
    //   setPasswordError(true);
    //   return;
    // } else if (emailError || passwordError) {
    //   return;
    // }

    try {
      await signin({ email });
      setLoading(false);
    } catch (error) {
      setEmailError(true);
      setPasswordError(true);
      setLoginError(true);
    }
  };

  return (
    <div className="flex flex-col px-6 lg:px-28">
      <div className="bg-secondary flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in or create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Let&apos;s get you up and flying.
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
      <Button
        onClick={signinGoogle}
        className="w-full flex items-center gap-x-3"
        variant="outline"
      >
        Continue with Google
        <Image src={GoogleGLogo} alt="Google G Logo" className="w-4 h-4" />
      </Button>
    </div>
        <div className="flex items-center gap-x-2">
          <Separator className="flex shrink" />
          <span className="text-sm font-medium">or</span>
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
                  },
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
                  className="text-rose-500 lg:text-xs text-sm font-medium"
                >
                  Email address is invalid
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          {/* <div className="flex flex-col gap-y-1">
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Label>
                  <Link
                    href="/forgot-password"
                    className="underline text-sm text-foreground/60"
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
                  },
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
                  className="text-rose-500 lg:text-xs text-sm font-medium"
                >
                  Password is invalid
                </motion.p>
              )}
            </AnimatePresence>
          </div> */}
        </div>
        <div>
          <Button disabled={loading} className="w-full" onClick={handleSignin}>
            {loading ? (
              <motion.div
                key="loading"
                className="bg-background w-6 h-6"
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
            ) : (
              "Continue"
            )}
          </Button>
        </div>
        {/* <div className="text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-foreground underline underline-offset-1"
            >
              Sign up
            </Link>
          </p>
        </div> */}
        {/* <AnimatePresence>
          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className="flex-col border border-rose-500 rounded-md shadow-sm hidden lg:flex p-4 bg-rose-300 text-sm font-medium"
            >
              <p className="text-rose-600 text-xs">
                We couldn't find an account with that email address and
                password.
              </p>
            </motion.div>
          )}
        </AnimatePresence> */}
        {/* <div className="border border-rose-500 rounded-md shadow-sm hidden lg:flex px-2 py-1 bg-rose-300">
          Password must be at least 8 characters
        </div> */}
      </div>
    </div>
  );
}
