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

const adultCountAtom = atom(0);
const childCountAtom = atom(0);
const infantCountAtom = atom(0);

export default function Home() {
  const [position, setPosition] = useState("flights");
  const [searchParams, setSearchParams] = useState({});
  const [loading, setLoading] = useState(false);

  const [adultCount, setAdultCount] = useAtom(adultCountAtom);
  const [childCount, setChildCount] = useAtom(childCountAtom);
  const [infantCount, setInfantCount] = useAtom(infantCountAtom);

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
        <div className="mx-6 mt-6 flex lg:justify-center bg-secondary rounded-lg">
          <div className="lg:hidden flex flex-col gap-y-2 p-5 w-full">
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
                  <Input placeholder="" />
                </DrawerTrigger>
                <DrawerContent className="bg-secondary">
                  <DrawerHeader>
                    <DrawerTitle>How many people are travelling?</DrawerTitle>
                    <DrawerDescription className="">
                      This will help us find the best deals for your group.
                      <div className="mt-6 flex flex-col items-start w-full gap-y-4">
                        <div className="font-medium text-lg text-foreground flex items-center justify-between w-full px-16">
                          Adults
                          <div className="flex items-center justify-between gap-x-4">
                            <Button
                              onClick={() => handleDecrementCount("adult", 1)}
                              disabled={adultCount === 0}
                              size="icon"
                              className="bg-background size-8 flex justify-center items-center rounded-lg"
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
                              onClick={() => handleIncrementCount("adult", 1)}
                              size="icon"
                              className="bg-background size-8 flex justify-center items-center rounded-lg"
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
                        <div className="font-medium text-lg text-foreground flex items-center justify-between w-full px-16">
                          Children
                          <div className="flex items-center gap-x-4">
                            <Button
                              onClick={() => handleDecrementCount("child", 1)}
                              disabled={childCount === 0}
                              size="icon"
                              className="bg-background size-8 flex justify-center items-center rounded-lg"
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
                              onClick={() => handleIncrementCount("child", 1)}
                              size="icon"
                              className="bg-background size-8 flex justify-center items-center rounded-lg"
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
                        <div className="font-medium text-lg text-foreground flex items-center justify-between w-full px-16">
                          Infants
                          <div className="flex items-center gap-x-4">
                            <Button
                              onClick={() => handleDecrementCount("infant", 1)}
                              disabled={infantCount === 0}
                              size="icon"
                              className="bg-background size-8 flex justify-center items-center rounded-lg"
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
                              onClick={() => handleIncrementCount("infant", 1)}
                              size="icon"
                              className="bg-background size-8 flex justify-center items-center rounded-lg"
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
                  <motion.div key="fetch" className="flex items-center gap-x-2">
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
          </div>
          <div className="hidden lg:flex p-4 items-end gap-x-4">
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
