"use client";

import { checkOtp } from "@/lib/supabase/actions";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { redirect } from "next/navigation";

export default function ProfileSetup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const handleFirstNameChange = (e) => {
    setFirstNameError(false);
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastNameError(false);
    setLastName(e.target.value);
  };

  const handleSubmit = async () => {
    if (firstName.length === 0) {
      setFirstNameError(true);
    }

    if (lastName.length === 0) {
      setLastNameError(true);
    }

    if (firstNameError || lastNameError) {
      return;
    }

    setLoading(true);
    try {
      await createUserProfile({
        firstName,
        lastName,
        date,
      });
    } catch (error) {
      setFirstNameError(true);
      setLastNameError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-6 lg:px-28">
      <div className="bg-secondary flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Just a few more details
          </h1>
          <p className="text-sm text-muted-foreground">
            We need your travel ID details to complete your profile setup.
          </p>
          <div className="my-4 flex items-center gap-x-4">
            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    onChange={(e) => handleFirstNameChange(e)}
                    value={firstName}
                    required
                    placeholder="Enter your first name"
                    className={cn(
                      "w-full focus-visible:bg-secondary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition",
                      {
                        "ring-rose-400 ring-1 focus-visible:border-border":
                          firstNameError,
                      },
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
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    onChange={(e) => handleLastNameChange(e)}
                    value={lastName}
                    required
                    placeholder="Enter your last name"
                    className={cn(
                      "focus-visible:bg-secondary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition",
                      {
                        "ring-rose-400 ring-1 focus-visible:border-border":
                          lastNameError,
                      },
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
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="birth-date">Date of Birth</Label>
                  something
                </div>
              </div>
              <Button disabled={loading} onClick={handleSubmit}>
                Finish setup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
