"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const handleInputChange = (e: string) => {
    setEmail(e);
    setError("");
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    setIsExploding(false);
    setLoading(true);
    setSuccess(false);

    try {
      if (!isValidEmail(email)) {
        setError("Invalid email address");
        return;
      }

      const response = await fetch("/api/v1/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      setSuccess(true);
      setIsExploding(true);
    } catch (e: any) {
      if (e.response.data.message === "User already subscribed") {
        setSuccess(true);
        setIsExploding(true);
        return;
      }
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 overflow-x-hidden pt-14">
      <div className="">
        <div className="">
          <h1 className="text-4xl font-bold tracking-tight">
            Exercitation ea do magna veniam.
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            Deserunt cillum cillum ex magna sint non ad. Nisi aliqua ullamco
            enim id aliquip. Dolore excepteur laborum incididunt mollit in duis
            occaecat elit excepteur excepteur velit est.
          </p>
        </div>
        <div className="flex flex-col mt-8 gap-y-2">
          <div className="flex flex-col gap-y-1">
            <Input
              disabled={loading || success}
              onChange={(e) => handleInputChange(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className={`${
                error === "" ? "border-border" : "border-rose-500"
              }`}
            />
            <div style={{ position: "relative", minHeight: "20px" }}>
              <AnimatePresence>
                {error === "" ? (
                  <motion.p
                    key="helpText"
                    initial={{ y: -4, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -4, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-muted-foreground ml-1"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    We&apos;ll never share your email with anyone else.
                  </motion.p>
                ) : (
                  <motion.p
                    initial={{ y: -4, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -4, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    key="errorText"
                    className="text-xs text-rose-500 ml-1"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          <motion.div>
            <div className="group relative p-1 rounded-xl grid overflow-hidden h-auto shadow-[0_1000px_0_0_hsl(239_83.5%_66.7%)_inset] transition-colors duration-200">
              <span className="backdrop absolute inset-[0.5px] bg-background rounded-xl transition-colors duration-200" />
              <span className="z-10">
                <div
                  className={`p-1 ${
                    error === "" ? "border-indigo-500" : "border-rose-500"
                  } border rounded-lg border-opacity-20`}
                >
                  <div
                    className={`p-1 ${
                      error === "" ? "border-indigo-500" : "border-rose-500"
                    } border rounded-lg border-opacity-50`}
                  >
                    <Button
                      disabled={loading || success}
                      className="w-full flex items-center gap-x-2"
                      onClick={() => handleSubmit()}
                      type="submit"
                    >
                      {loading && !success && (
                        <Loader2 className="animate-spin" />
                      )}
                      {!loading && success ? (
                        <div className="flex items-center gap-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2.0"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                          <span>Success!</span>
                        </div>
                      ) : (
                        "Get notified"
                      )}
                    </Button>
                    {/* </motion.button> */}
                  </div>
                </div>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
