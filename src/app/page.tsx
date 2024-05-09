"use client";

import Image from "next/image";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ScrollArea } from "@/components/ui/scroll-area";
import ConfettiExplosion from "react-confetti-explosion";
import { toast } from "sonner";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [tripJoined, setTripJoined] = useState(false);
  const [tripDeclined, setTripDeclined] = useState(false);
  const [tripJoinedTriggered, setTripJoinedTriggered] = useState(false);

  const today = new Date();
  const fiveDaysFromNow = new Date(today);
  fiveDaysFromNow.setDate(today.getDate() + 5);

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

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

      const response = await fetch("/api/v1/notifications/launch", {
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
    <section className="px-6 overflow-x-hidden pt-14" id="hero">
      {isExploding && (
        <div className="flex justify-center">
          <ConfettiExplosion />
        </div>
      )}
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
      <div className="py-12 flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Planning a trip with friends?
          </h2>
          <h3 className="text-muted-foreground">
            W&apos;ve got you covered. From splitting bills to planning the
            itinerary, we&apos;ve got everything you need to make your trip a
            success.
          </h3>
        </div>
        <div>
          <Card className="border-dashed bg-zinc-100 shadow-sm">
            {/* <CardHeader>
              <CardTitle>Group trips, made easy.</CardTitle>
            </CardHeader> */}
            <CardContent className="p-6">
              <CardDescription className="bg-background rounded-lg">
                <div className="flex flex-col gap-y-2 border-border border p-4 rounded-lg shadow">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-xl tracking-tight text-foreground">
                        Trip to Vancouver
                      </h4>
                      <div className="px-2 py-1 flex text-xs rounded-2xl bg-emerald-700/90 font-medium text-emerald-300 border border-emerald-800 items-center gap-x-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-300 border border-emerald-800" />
                        active
                      </div>
                    </div>
                    <p className="text-sm font-medium">
                      {formatDate(today)} - {formatDate(fiveDaysFromNow)}
                    </p>
                  </div>
                  <div>
                    {/* <Carousel>
                      <CarouselContent>
                        <CarouselItem>
                          */}
                    <Image
                      alt="Vancouver"
                      className="rounded-lg shadow mt-2"
                      src="/vancouver.jpg"
                      width={400}
                      height={200}
                    />
                    {/* </CarouselItem>
                        <CarouselItem>...</CarouselItem>
                        <CarouselItem>...</CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel> */}
                  </div>
                  <div className="flex items-center gap-x-1 ml-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" />
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-xs tracking-tighter">
                      +2
                    </span>
                  </div>
                  <Separator className="flex shrink my-2" />
                  <div className="text-foreground flex flex-col">
                    <span className="text-2xl font-semibold tracking-tight">
                      CA $315
                    </span>
                    <span className="text-sm font-medium">CA $1,575 total</span>
                    <span className="text-xs text-muted-foreground">
                      includes taxes & fees
                    </span>
                  </div>
                  <Separator className="flex shrink my-2" />
                  <div className="flex flex-col items-center gap-y-2">
                    <h4 className="text-foreground font-semibold tracking-tight text-base text-center">
                      Andrew invited you to join this trip.
                    </h4>
                    <div className="flex items-center w-full gap-x-2 relative mt-2">
                      <Button
                        disabled={tripJoined}
                        onClick={() => {
                          if (tripDeclined) {
                            setTripDeclined(false);
                            return;
                          }
                          setTripDeclined(true);
                          toast.warning("Declined Trip Invitation", {
                            duration: 3000,
                            important: true,
                            description:
                              "You declined Andrew's trip to Vancouver.",
                            closeButton: true,
                            dismissible: true,
                            cancel: {
                              label: "Undo",
                              onClick: () => setTripDeclined(false),
                            },
                          });
                        }}
                        variant="outline"
                        className={cn("w-full flex items-center gap-x-1", {
                          "border-rose-500 text-rose-500 bg-background focus:border-rose-500 focus:text-rose-500 focus:bg-background":
                            tripDeclined,
                        })}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                        </svg>
                        {tripDeclined ? "Declined" : "Decline"}
                      </Button>

                      <div
                        className={cn(
                          "absolute right-[0.5px] top-[0.5px] transform translate-x-1/2 -translate-y-1/2",
                          {
                            hidden: tripJoinedTriggered,
                          }
                        )}
                      >
                        <div className="bg-indigo-400 w-2 h-2 rounded-full">
                          <div className="bg-indigo-400 w-2 h-2 rounded-full animate-ping"></div>
                        </div>
                      </div>
                      <Button
                        disabled={tripDeclined}
                        className="w-full flex items-center gap-x-1"
                        onClick={() => {
                          setTripJoinedTriggered(true);
                          if (tripJoined) {
                            setTripJoined(false);
                            return;
                          }
                          setTripJoined(true);
                          toast.success("Accepted Trip Invitation", {
                            duration: 3000,
                            important: true,
                            description:
                              "You joined Andrew's trip to Vancouver.",
                            closeButton: true,
                            dismissible: true,
                            cancel: {
                              label: "Undo",
                              onClick: () => setTripJoined(false),
                            },
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {tripJoined ? "Joined" : "Join"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-dashed bg-zinc-100 shadow-sm">
            {/* <CardHeader>
              <CardTitle>Group trips, made easy.</CardTitle>
            </CardHeader> */}
            <CardContent className="p-6">
              <CardDescription className="bg-background rounded-lg">
                <div className="flex flex-col gap-y-2 border-border border p-4 rounded-lg shadow">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-xl tracking-tight text-foreground">
                        Trip to Vancouver
                      </h4>
                      <div className="px-2 py-1 flex text-xs rounded-2xl bg-emerald-700/90 font-medium text-emerald-300 border border-emerald-800 items-center gap-x-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-300 border border-emerald-800" />
                        active
                      </div>
                    </div>
                    <p className="text-sm font-medium">
                      {formatDate(today)} - {formatDate(fiveDaysFromNow)}
                    </p>
                  </div>
                  <div>
                    {/* <Carousel>
                      <CarouselContent>
                        <CarouselItem>
                          */}
                    <Image
                      alt="Vancouver"
                      className="rounded-lg shadow mt-2"
                      src="/vancouver.jpg"
                      width={400}
                      height={200}
                    />
                    {/* </CarouselItem>
                        <CarouselItem>...</CarouselItem>
                        <CarouselItem>...</CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel> */}
                  </div>
                  <div className="flex items-center gap-x-1 ml-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" />
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-xs tracking-tighter">
                      +2
                    </span>
                  </div>
                  <Separator className="flex shrink my-2" />
                  <div className="text-foreground flex flex-col">
                    <span className="text-2xl font-semibold tracking-tight">
                      CA $315
                    </span>
                    <span className="text-sm font-medium">CA $1,575 total</span>
                    <span className="text-xs text-muted-foreground">
                      includes taxes & fees
                    </span>
                  </div>
                  <Separator className="flex shrink my-2" />
                  <div className="flex flex-col items-center gap-y-2">
                    <h4 className="text-foreground font-semibold tracking-tight text-base text-center">
                      Andrew invited you to join this trip.
                    </h4>
                    <div className="flex items-center w-full gap-x-2 relative mt-2">
                      <Button
                        disabled={tripJoined}
                        onClick={() => {
                          if (tripDeclined) {
                            setTripDeclined(false);
                            return;
                          }
                          setTripDeclined(true);
                          toast.warning("Declined Trip Invitation", {
                            duration: 3000,
                            important: true,
                            description:
                              "You declined Andrew's trip to Vancouver.",
                            closeButton: true,
                            dismissible: true,
                            cancel: {
                              label: "Undo",
                              onClick: () => setTripDeclined(false),
                            },
                          });
                        }}
                        variant="outline"
                        className={cn("w-full flex items-center gap-x-1", {
                          "border-rose-500 text-rose-500 bg-background focus:border-rose-500 focus:text-rose-500 focus:bg-background":
                            tripDeclined,
                        })}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                        </svg>
                        {tripDeclined ? "Declined" : "Decline"}
                      </Button>

                      <div
                        className={cn(
                          "absolute right-[0.5px] top-[0.5px] transform translate-x-1/2 -translate-y-1/2",
                          {
                            hidden: tripJoinedTriggered,
                          }
                        )}
                      >
                        <div className="bg-indigo-400 w-2 h-2 rounded-full">
                          <div className="bg-indigo-400 w-2 h-2 rounded-full animate-ping"></div>
                        </div>
                      </div>
                      <Button
                        disabled={tripDeclined}
                        className="w-full flex items-center gap-x-1"
                        onClick={() => {
                          setTripJoinedTriggered(true);
                          if (tripJoined) {
                            setTripJoined(false);
                            return;
                          }
                          setTripJoined(true);
                          toast.success("Accepted Trip Invitation", {
                            duration: 3000,
                            important: true,
                            description:
                              "You joined Andrew's trip to Vancouver.",
                            closeButton: true,
                            dismissible: true,
                            cancel: {
                              label: "Undo",
                              onClick: () => setTripJoined(false),
                            },
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {tripJoined ? "Joined" : "Join"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
