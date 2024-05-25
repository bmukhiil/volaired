"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { testEmail } from "@/lib/validate";
import {
  HeroSection,
  ConfettiExplosionCanvas,
  FlightPriceInfo,
  GroupTripSection,
  MeetCopilot,
  FeaturesSection,
} from "@/components/pages/home";
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

export default function Home() {
  const [position, setPosition] = useState("flights");
  const [activityMenuOpen, setActivityMenuOpen] = useState(false);

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
            <div>
              <Label htmlFor="from">From</Label>
              <Input
                className="w-full focus-visible:ring-indigo-400 focus-visible:ring-offset-0"
                placeholder=""
              />
            </div>
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
            <div>
              <Label htmlFor="to">To</Label>
              <Input
                className="w-full focus-visible:ring-indigo-400 focus-visible:ring-offset-0"
                placeholder=""
              />
            </div>
            <div className="flex gap-x-2">
              <div>
                <Label htmlFor="departure-date">Departure Date</Label>
                <Input
                  className="w-full focus-visible:ring-indigo-400 focus-visible:ring-offset-0"
                  placeholder=""
                />
              </div>
              <div>
                <Label htmlFor="return-date">Return Date</Label>
                <Input
                  className="w-full focus-visible:ring-indigo-400 focus-visible:ring-offset-0"
                  placeholder=""
                />
              </div>
            </div>
            <div>
              <Label htmlFor="travelers">Travelers</Label>
              <Input
                className="w-full focus-visible:ring-indigo-400 focus-visible:ring-offset-0"
                placeholder=""
              />
            </div>
            <Button className="flex items-center gap-x-2">
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
              <Button className="w-full flex gap-x-2">
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
