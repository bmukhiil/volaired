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
import Script from "next/script";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
  return (
    <section className="px-6 overflow-x-hidden" id="hero">
      <Script
        id="json-ld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="h-full -mx-6">
        <div className="flex justify-between py-6 bg-secondary shadow-sm">
          <Input
            placeholder="Search"
            className="max-w-48 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <ul className="flex items-center gap-x-10">
            <li>Flights</li>
            <li>Hotels</li>
            <li>Car Rentals</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <div className="mt-6 p-4 rounded-lg bg-secondary flex items-end gap-x-4">
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
      </div>
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
