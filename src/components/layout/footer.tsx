"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";
import { EnrichedFlightDetails } from "@/types";
import { Button } from "../ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { CustomDashedCard } from "../ui/custom-card";
import { Input } from "../ui/input";
import radiair_full_logo_light from "../../../public/radiair_full_logo_light.webp";
import Image from "next/image";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

interface Arc {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

export default function Footer() {
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState(false);

  const footer = [
    {
      name: "Company",
      links: [
        // {
        //   name: "Terms of Service",
        //   href: "/terms",
        //   title: "Read our Terms of Service"
        // },
        {
          name: "Blog",
          href: "/blog",
          title: "Read our Blog",
        },
        {
          name: "Company",
          href: "/company",
          title: "Learn more about Radiair",
        },
        {
          name: "Terms of Use",
          href: "/terms",
          title: "Read our Terms of Use",
        },
        {
          name: "Privacy Policy",
          href: "/privacy",
          title: "Read our Privacy Policy",
        },
      ],
    },
    {
      name: "Resources",
      links: [
        {
          name: "Become a Partner",
          href: "/partnerships",
          title: "Become a Partner",
        },
        {
          name: "Help & Support",
          href: "/support",
          title: "Get Help & Support",
        },
      ],
    },
  ];

  //   pointSize: 1000,
  //   globeColor: "#18181b",
  //   showAtmosphere: false,
  //   atmosphereColor: "#FFFFDC",
  //   atmosphereAltitude: 0.1,
  //   emissive: "#062056",
  //   emissiveIntensity: 0.1,
  //   shininess: 0.9,
  //   polygonColor: "rgba(255,255,255,0.7)",
  //   ambientLight: "#38bdf8",
  //   directionalLeftLight: "#ffffff",
  //   directionalTopLight: "#ffffff",
  //   pointLight: "#ffffff",
  //   arcLength: 0.9,
  //   rings: 1,
  //   maxRings: 3,
  //   initialPosition: { lat: 22.3193, lng: 114.1694 },
  //   autoRotate: true,
  //   autoRotateSpeed: 0.5,
  // };
  // const colors = ["#d9dcfc", "#818CF8", "#81c8f8"];

  // useEffect(() => {
  //   async function fetchArcs() {
  //     const controller = new AbortController();
  //     const timeoutId = setTimeout(() => controller.abort(), 15000);

  //     try {
  //       const response = await fetch(
  //         `/api/v1/flights/paths/yesterday?limit=10`,
  //         {
  //           signal: controller.signal,
  //           next: {
  //             revalidate: 43200,
  //           },
  //         }
  //       );
  //       clearTimeout(timeoutId);
  //       const data = await response.json();
  //       const newArcs = data.data.map(
  //         (flight: EnrichedFlightDetails, index: number) => {
  //           const [startLat, startLng] = flight.depAirport.coordinates
  //             .replace(/\s/g, "")
  //             .split(",");
  //           const [endLat, endLng] = flight.arrAirport.coordinates
  //             .replace(/\s/g, "")
  //             .split(",");

  //           return {
  //             order: index,
  //             startLat: parseFloat(startLat),
  //             startLng: parseFloat(startLng),
  //             endLat: parseFloat(endLat),
  //             endLng: parseFloat(endLng),
  //             arcAlt: 0.1,
  //             color: colors[Math.floor(Math.random() * (colors.length - 1))],
  //           };
  //         }
  //       );

  //       setArcs(newArcs);
  //       // setLoading(false);
  //     } catch (e: any) {
  //       // setLoading(false);
  //       setError(true);
  //       if (e.name === "AbortError") {
  //         console.error("Request timed out");
  //       } else {
  //         console.error("Error fetching arcs:", e.message);
  //       }
  //     }
  //   }

  //   fetchArcs();
  // }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  return (
    <main className="lg:px-40 lg:py-4 px-6 bg-secondary">
      {/* <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Here&apos;s a globe.
          </h2>
          <h3 className="text-muted-foreground">
            This globe shows the flight paths of some of the flights from
            yesterday at exactly this time.
          </h3>
        </div>
        <CustomDashedCard className="my-8 flex items-center justify-center">
          {loading ? (
            <div className="flex items-center justify-center flex-col">
              <motion.div
                className="bg-primary w-24 h-24"
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
              <div className="text-muted-foreground mt-4 font-medium tracking-tight flex items-center gap-x-2">
                Loading...
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-2 items-center justify-center">
              <World data={arcs} globeConfig={globeConfig} />
              {error && (
                <span className="text-rose-500 font-medium">
                  Error fetching flight paths
                </span>
              )}
            </div>
          )}
        </CustomDashedCard>
      </div>
      <Separator className="my-4 -mx-6 w-screen" /> */}
      <div className="py-14 text-center flex gap-y-6 flex-col">
        <div className="flex flex-col gap-y-4 items-center">
          <span className="text-3xl tracking-tight font-bold text-foreground duration-0">
            <span className="text-indigo-500">Explore</span> the Radiair
            Advantage
          </span>
          <p className="text-muted-foreground duration-0 lg:w-[80dvh]">
            Radiair simplifies your travel experience with intelligent flight
            recommendations, seamless group coordination, and personalized
            itineraries.
          </p>
        </div>
        <div className="flex flex-col gap-y-1">
          <Input
            value={email}
            onChange={(e) => handleEmailChange(e)}
            placeholder="Enter your email"
          />
          <Button className="border border-indigo-400 shadow-inner w-full">
            Join newsletter
          </Button>
        </div>
      </div>
      <Separator className="my-4 flex shrink" />
      <div className="mt-8">
        <Image
          src={radiair_full_logo_light}
          className="w-32 h-auto"
          alt="Radiair logo"
        />
      </div>
      <div className="mt-8 flex gap-x-20">
        {footer.map((section) => (
          <div key={section.name} className="flex flex-col gap-y-2">
            <span className="font-medium tracking-tight text-foreground duration-0">
              {section.name}
            </span>
            <ul className="mt-2 flex flex-col gap-y-2">
              {section.links.map((link) => (
                <li
                  key={link.name}
                  className="duration-0 hover:text-foreground text-muted-foreground text-sm"
                >
                  <Link href={link.href} title={link.title}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Separator className="my-4 flex shrink" />
      <div className="pb-4 flex items-center justify-between">
        <span className="duration-0 text-muted-foreground text-xs">
          © Radiair. All rights reserved.
        </span>
        <ModeToggle />
      </div>
    </main>
  );
}
