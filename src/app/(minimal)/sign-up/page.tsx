"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkOtp, signin } from "@/lib/supabase/actions";
import { testEmail } from "@/lib/validate";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import GoogleGLogo from "../../../../public/google_g_logo.svg";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function SignUpPage() {
  const [emailError, setEmailError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState(false);
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

  const handleSignup = async () => {
    setLoading(true);
    if (!testEmail(email) || email.length === 0) {
      setEmailError(true);
    }

    try {
      // sessionStorage.setItem("userEmail", email);
      await signin({ email });
      setLoading(false);
    } catch (error) {
      setSignUpError(true);
      setEmailError(true);
    }
  };

  return (
    <div className="flex flex-col px-6 lg:px-28">
      <div className="bg-secondary">
        <AnimatePresence mode="wait">
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col gap-y-6"
          >
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the fields below to get flying
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Button
                className="w-full flex items-center gap-x-3"
                variant="outline"
              >
                Continue with Google
                <Image
                  src={GoogleGLogo}
                  alt="Google G Logo"
                  className="w-4 h-4"
                />
              </Button>
              {/* <Button className="w-full" variant="outline">
            Continue with Google
          </Button> */}
            </div>
            <div className="flex items-center gap-x-2">
              <Separator className="flex shrink" />
              <span className="text-sm font-medium">or</span>
              <Separator className="flex shrink" />
            </div>
            <div className="flex flex-col gap-y-4">
              {/* <div className="flex flex-col gap-y-1">
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      onChange={(e) => handleFirstNameChange(e)}
                      value={firstName}
                      type="first-name"
                      required
                      placeholder="Enter first name"
                      className={cn(
                        "focus-visible:bg-secondary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition",
                        {
                          "ring-rose-400 ring-1 focus-visible:border-border":
                            firstNameError,
                        }
                      )}
                    />
                  </div>
                  <AnimatePresence>
                    {firstNameError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1 }}
                        className="text-rose-500 lg:text-xs text-sm font-medium"
                      >
                        First name is required
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      onChange={(e) => handleLastNameChange(e)}
                      value={lastName}
                      type="last-name"
                      required
                      placeholder="Enter last name"
                      className={cn(
                        "focus-visible:bg-secondary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition",
                        {
                          "ring-rose-400 ring-1 focus-visible:border-border":
                            lastNameError,
                        }
                      )}
                    />
                  </div>
                  <AnimatePresence>
                    {lastNameError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1 }}
                        className="text-rose-500 lg:text-xs text-sm font-medium"
                      >
                        Last name is required
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div> */}
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
                  <Label htmlFor="password">Password</Label>
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
                      className="text-rose-500 lg:text-xs text-sm font-medium"
                    >
                      Password must be at least 8 characters
                    </motion.p>
                  )}
                </AnimatePresence>
              </div> */}
            </div>
            <div>
              <Button
                disabled={loading}
                className="w-full"
                onClick={handleSignup}
              >
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
                  "Sign up"
                )}
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
