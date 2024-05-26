"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { testEmail } from "@/lib/validate";
import { format, set } from "date-fns";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
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

import {
  HeroSection,
  ConfettiExplosionCanvas,
  FlightPriceInfo,
  GroupTripSection,
  MeetCopilot,
  FeaturesSection,
} from "@/components/pages/home";
import { AirportSelect } from "@/components/airport-select";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { atom, useAtom } from "jotai";

import Script from "next/script";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://volaired.com",
  name: "Volaired",
  description:
    "Optimize your flights for cost and layovers with ease. Plan group trips and split bills seamlessly with Volaired.",
  // "publisher": {
  //   "@type": "Organization",
  //   "name": "Volaired",
  //   "logo": {
  //     "@type": "ImageObject",
  //     "url": "https://volaired.com/images/logo.png",
  //   },
  // },
};

const adultCountAtom = atom(2);
const childCountAtom = atom(0);
const infantCountAtom = atom(0);

export default function Home() {
  const [position, setPosition] = useState("flights");
  const [searchParams, setSearchParams] = useState({});
  const [loading, setLoading] = useState(false);

  const [adultCount, setAdultCount] = useAtom(adultCountAtom);
  const [childCount, setChildCount] = useAtom(childCountAtom);
  const [infantCount, setInfantCount] = useAtom(infantCountAtom);

  const [tripCreateSuggestion, setTripCreateSuggestion] = useState(true);

  const activityMenu = [
    {
      name: "Flights",
      id: "flights",
    },
    {
      name: "Hotels",
      id: "hotels",
    },
    {
      name: "Car Rentals",
      id: "car-rentals",
    },
  ];

  const handleIncrementCount = (type, increment) => {
    switch (type) {
      case "adult":
        setAdultCount((prevCount) => prevCount + increment);
        break;
      case "child":
        setChildCount((prevCount) => prevCount + increment);
        break;
      case "infant":
        setInfantCount((prevCount) => prevCount + increment);
        break;
      default:
        break;
    }
  };

  const handleDecrementCount = (type, decrement) => {
    if (type === "adult" && adultCount === 0) return;
    if (type === "child" && childCount === 0) return;
    if (type === "infant" && infantCount === 0) return;
    switch (type) {
      case "adult":
        setAdultCount((prevCount) => prevCount - decrement);
        break;
      case "child":
        setChildCount((prevCount) => prevCount - decrement);
        break;
      case "infant":
        setInfantCount((prevCount) => prevCount - decrement);
        break;
      default:
        break;
    }
  };

  const handleCountReset = () => {
    setAdultCount(0);
    setChildCount(0);
    setInfantCount(0);
  };

  const handleAirportChange = (airport, type) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [type === "departure" ? "departure" : "destination"]: airport,
    }));
  };

  const updateDateRange = (dateRange) => {
    const { from, to } = dateRange;
    const formattedDateRange = {
      from: format(from, "yyyy-MM-dd"),
      to: format(to, "yyyy-MM-dd"),
    };
    setSearchParams((prevParams) => ({
      ...prevParams,
      dateRange: formattedDateRange,
    }));
  };

  const parseDuration = (duration) => {
    const regex = /PT(\d+H)?(\d+M)?/;
    const matches = duration.match(regex);
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    return `${hours}h ${minutes}m`;
  };

  const handleSearch = async () => {
    setLoading(true);
  };

  return (
    <section className="px-6 overflow-x-hidden" id="hero">
      <Script
        id="json-ld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <motion.div className="h-full -mx-6 bg-background">
        <div className="px-6 items-center lg:px-28 flex justify-between py-4 lg:py-6 bg-secondary shadow-sm gap-x-2 lg:gap-x-0">
          <Input
            placeholder="Search"
            className="lg:max-w-48 w-full focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <ul className="hidden lg:flex items-center gap-x-10">
            <li>Flights</li>
            <li>Hotels</li>
            <li>Car Rentals</li>
          </ul>
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AnimatePresence mode="wait">
                  <Button className="w-[16dvh] flex justify-between items-center gap-x-2 focus-visible:ring-0 focus-visible:ring-offset-0 bg-background hover:bg-background/60 text-foreground">
                    {position === "flights" ? (
                      <motion.span
                        key="flights"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1 }}
                      >
                        Flights
                      </motion.span>
                    ) : position === "hotels" ? (
                      <motion.span
                        key="hotels"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1 }}
                      >
                        Hotels
                      </motion.span>
                    ) : (
                      <motion.span
                        key="car-rentals"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1 }}
                      >
                        Car Rentals
                      </motion.span>
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="size-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Button>
                </AnimatePresence>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  {activityMenu.map((item) => (
                    <DropdownMenuRadioItem
                      className={cn({
                        "bg-background": position === item.id,
                      })}
                      value={item.id}
                    >
                      {item.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mx-6 mt-6">
          {/* {/* <div className="flex lg:justify-center bg-secondary rounded-lg" */}
          <AnimatePresence>
            {position === "flights" && (
              <motion.div
                initial={{ opacity: 0, x: "120%" }}
                animate={{ opacity: 1, x: "0%" }}
                exit={{ opacity: 1, x: "120%" }}
                className="bg-secondary lg:hidden flex flex-col gap-y-2 p-5 w-full"
              >
                <AirportSelect
                  type="departure"
                  airport={searchParams.departure}
                  onAirportChange={(airport) =>
                    handleAirportChange(airport, "departure")
                  }
                />
                <div className="flex justify-center">
                  <Button className="bg-foreground rounded-xl" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="size-5 rotate-90"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.2 2.24a.75.75 0 0 0 .04 1.06l2.1 1.95H6.75a.75.75 0 0 0 0 1.5h8.59l-2.1 1.95a.75.75 0 1 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 0 0-1.06.04Zm-6.4 8a.75.75 0 0 0-1.06-.04l-3.5 3.25a.75.75 0 0 0 0 1.1l3.5 3.25a.75.75 0 1 0 1.02-1.1l-2.1-1.95h8.59a.75.75 0 0 0 0-1.5H4.66l2.1-1.95a.75.75 0 0 0 .04-1.06Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
                <AirportSelect
                  type="destination"
                  airport={searchParams.destination}
                  onAirportChange={(airport) =>
                    handleAirportChange(airport, "destination")
                  }
                />
                <DatePickerWithRange onDateChange={updateDateRange} />
                <div className="flex flex-col gap-y-1">
                  <Label htmlFor="travelers">Travelers</Label>
                  <Drawer>
                    <DrawerTrigger>
                      <div
                        className={cn(
                          "flex gap-x-2 h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="size-5"
                        >
                          <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
                        </svg>
                        <span
                          className={cn("text-muted-foreground", {
                            "text-foreground":
                              adultCount + childCount + infantCount > 0,
                          })}
                        >
                          {adultCount + childCount + infantCount > 0 ? (
                            <>
                              {adultCount + childCount + infantCount === 1 ? (
                                <>1 Traveler</>
                              ) : (
                                <>
                                  {adultCount + childCount + infantCount}{" "}
                                  Travelers
                                </>
                              )}
                            </>
                          ) : (
                            <>Select number of travellers</>
                          )}
                        </span>
                      </div>
                    </DrawerTrigger>
                    <DrawerContent className="bg-secondary">
                      <DrawerHeader>
                        <DrawerTitle>
                          How many people are travelling?
                        </DrawerTitle>
                        <DrawerDescription className="">
                          This will help us find the best deals for your group.
                          <div className="mt-6 flex flex-col items-start w-full gap-y-4 px-12">
                            <div className="font-medium text-lg text-foreground flex items-center justify-between w-full ">
                              <div className="flex flex-col items-start">
                                Adults
                                <span className="font-medium text-sm text-muted-foreground">
                                  (12+ years)
                                </span>
                              </div>
                              <div className="flex items-center justify-between gap-x-4">
                                <Button
                                  onClick={() =>
                                    handleDecrementCount("adult", 1)
                                  }
                                  disabled={adultCount === 0}
                                  size="icon"
                                  className="focus:bg-background/80 bg-background size-8 flex justify-center items-center rounded-lg"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="size-5 text-foreground"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </Button>
                                <span className="w-5 text-foreground text-xl font-semibold">
                                  {adultCount}
                                </span>
                                <Button
                                  onClick={() =>
                                    handleIncrementCount("adult", 1)
                                  }
                                  size="icon"
                                  className="focus:bg-background/80 bg-background size-8 flex justify-center items-center rounded-lg"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="size-5 text-foreground"
                                  >
                                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                  </svg>
                                </Button>
                              </div>
                            </div>
                            <div className="font-medium text-lg text-foreground flex items-center justify-between w-full ">
                              <div className="flex flex-col items-start">
                                Children
                                <span className="font-medium text-sm text-muted-foreground">
                                  (2-11 years)
                                </span>
                              </div>
                              <div className="flex items-center gap-x-4">
                                <Button
                                  onClick={() =>
                                    handleDecrementCount("child", 1)
                                  }
                                  disabled={childCount === 0}
                                  size="icon"
                                  className="bg-background focus:bg-background/80 size-8 flex justify-center items-center rounded-lg"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="size-5 text-foreground"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </Button>
                                <span className="w-5 text-foreground text-xl font-semibold">
                                  {childCount}
                                </span>
                                <Button
                                  onClick={() =>
                                    handleIncrementCount("child", 1)
                                  }
                                  size="icon"
                                  className="bg-background focus:bg-background/80 size-8 flex justify-center items-center rounded-lg"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="size-5 text-foreground"
                                  >
                                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                  </svg>
                                </Button>
                              </div>
                            </div>
                            <div className="font-medium text-lg text-foreground flex items-center justify-between w-full ">
                              <div className="flex flex-col items-start">
                                Infants
                                <span className="font-medium text-sm text-muted-foreground">
                                  (Under 2 years)
                                </span>
                              </div>
                              <div className="flex items-center gap-x-4">
                                <Button
                                  onClick={() =>
                                    handleDecrementCount("infant", 1)
                                  }
                                  disabled={infantCount === 0}
                                  size="icon"
                                  className="bg-background focus:bg-background/80 size-8 flex justify-center items-center rounded-lg"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="size-5 text-foreground"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </Button>
                                <span className="w-5 text-foreground text-xl font-semibold">
                                  {infantCount}
                                </span>
                                <Button
                                  onClick={() =>
                                    handleIncrementCount("infant", 1)
                                  }
                                  size="icon"
                                  className="focus:bg-background/80 bg-background size-8 flex justify-center items-center rounded-lg"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="size-5 text-foreground"
                                  >
                                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                  </svg>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <Button onClick={handleCountReset}>Reset</Button>
                        <DrawerClose>
                          <Button className="w-full" variant="outline">
                            Close
                          </Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
                <Button
                  disabled={loading}
                  onClick={handleSearch}
                  className="flex justify-center"
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div
                        key="fetch"
                        className="flex items-center gap-x-2"
                      >
                        <motion.div
                          className="bg-background w-4 h-4"
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
                        Fetching flights...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="search"
                        className="flex items-center gap-x-2"
                      >
                        Search
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="size-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
                <AnimatePresence>
                  {adultCount + childCount + infantCount > 1 &&
                    tripCreateSuggestion && (
                      <motion.div
                        className="bg-gradient-to-br from-fuchsia-400 to-indigo-500 p-[3px] mt-4 rounded-xl flex justify-center items-center shadow-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-background rounded-lg w-full h-full flex items-center justify-center">
                          <div className="w-full bg-gradient-to-br from-fuchsia-400/25 to-indigo-500/25 rounded-lg flex justify-center items-center">
                            <div className="shadow-inner flex gap-x-2 items-start w-full p-3 rounded-lg backdrop-blur-md bg-transparent">
                              <svg
                                fill="url(#grad1)"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                class="size-6"
                              >
                                <defs>
                                  <linearGradient
                                    id="grad1"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                  >
                                    <stop
                                      offset="0%"
                                      style={{
                                        stopColor: "#e879f9",
                                        stopOpacity: 1,
                                      }}
                                    />
                                    <stop
                                      offset="100%"
                                      style={{
                                        stopColor: "#818cf8",
                                        stopOpacity: 1,
                                      }}
                                    />
                                  </linearGradient>
                                </defs>
                                <path
                                  fill-rule="evenodd"
                                  d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <div className="flex flex-col gap-x-2">
                                <span className="font-semibold">
                                  Create a trip plan?
                                </span>
                                <p className="text-foreground/60 text-sm">
                                  We&apos;ve noticed you have more than one
                                  traveller.
                                </p>
                                <div className="mt-4 flex gap-x-2 justify-between items-center">
                                  <Button
                                    onClick={() =>
                                      setTripCreateSuggestion(false)
                                    }
                                    className="focus-visible:bg-background/60 active:bg-background/60 hover:bg-background/60 flex grow bg-background text-foreground"
                                  >
                                    Close
                                  </Button>
                                  <Link href="/trips/create">
                                    <Button className="flex items-center gap-x-2">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="size-5"
                                      >
                                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                      </svg>
                                      Create
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="lg:flex justify-center hidden">
            <div className="hidden bg-secondary lg:flex p-4 items-end gap-x-4">
              <div>
                <Label htmlFor="from">From</Label>
                <Input placeholder="" />
              </div>
              <Button className="bg-foreground rounded-xl" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="size-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M13.2 2.24a.75.75 0 0 0 .04 1.06l2.1 1.95H6.75a.75.75 0 0 0 0 1.5h8.59l-2.1 1.95a.75.75 0 1 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 0 0-1.06.04Zm-6.4 8a.75.75 0 0 0-1.06-.04l-3.5 3.25a.75.75 0 0 0 0 1.1l3.5 3.25a.75.75 0 1 0 1.02-1.1l-2.1-1.95h8.59a.75.75 0 0 0 0-1.5H4.66l2.1-1.95a.75.75 0 0 0 .04-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Button>
              <div>
                <Label htmlFor="to">To</Label>
                <Input placeholder="" />
              </div>
              <div className=" h-full">
                <Separator orientation="vertical" />
              </div>
              <div>
                <Label htmlFor="depart">Departure Date</Label>
                <Input placeholder="" />
              </div>
              <div>
                <Label htmlFor="return">Travelers</Label>
                <Input placeholder="" />
              </div>
              <div>
                <Button onClick={handleSearch} className="w-full flex gap-x-2">
                  Search
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="size-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* <div className="lg:-mx-6 lg:px-40 flex flex-col gap-y-6 py-20 md:py-24 lg:py-36">
        <GroupTripSection
          tripDeclined={tripDeclined}
          tripJoined={tripJoined}
          setTripDeclined={setTripDeclined}
          setTripJoined={setTripJoined}
          setTripJoinedTriggered={setTripJoinedTriggered}
          tripJoinedTriggered={tripJoinedTriggered}
        />
      </div>
      <div className="bg-secondary shadow-sm lg:rounded-[5dvh] rounded-[3dvh] px-6 -mx-6 lg:px-40 py-20 md:py-24 lg:pt-36 lg:pb-56 flex flex-col gap-y-6">
        <FeaturesSection />
      </div>
      <div className="shadow-sm lg:-mx-6 lg:px-40 py-20 md:pb-24 lg:pb-36 flex flex-col gap-y-6">
        <MeetCopilot />
      </div> */}
    </section>
  );
}
