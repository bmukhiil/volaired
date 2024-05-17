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

  const footer = [
    {
      name: "Company",
      links: [
        // {
        //   name: "Terms of Service",
        //   href: "/terms",
        // },
        {
          name: "Blog",
          href: "#hero",
        },
        {
          name: "Privacy Policy",
          href: "#hero",
        },
      ],
    },
    {
      name: "Resources",
      links: [
        {
          name: "Help & Support",
          href: "#hero",
        },
      ],
    },
  ];

  const globeConfig = {
    pointSize: 1000,
    globeColor: "#18181b",
    showAtmosphere: false,
    atmosphereColor: "#FFFFDC",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#d9dcfc", "#818CF8", "#81c8f8"];

  useEffect(() => {
    async function fetchArcs() {
      const response = await fetch(
        `/api/v1/flights/paths/yesterday?limit=400`,
        {
          next: {
            revalidate: 43200,
          },
        },
      );
      const data = await response.json();

      const newArcs = data.data.map(
        (flight: EnrichedFlightDetails, index: number) => {
          const [startLat, startLng] = flight.depAirport.coordinates
            .replace(/\s/g, "")
            .split(",");
          const [endLat, endLng] = flight.arrAirport.coordinates
            .replace(/\s/g, "")
            .split(",");

          return {
            order: index,
            startLat: parseFloat(startLat),
            startLng: parseFloat(startLng),
            endLat: parseFloat(endLat),
            endLng: parseFloat(endLng),
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
          };
        },
      );

      setArcs(newArcs);
      setLoading(false);
    }

    fetchArcs();
  }, []);

  return (
    <main className="lg:px-40 lg:py-4 w-screen px-6">
      <div className="flex flex-col justify-center items-center">
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
            <div className="flex items-center justify-center">
              <Loader2 className="text-indigo-500 animate-spin w-8 h-8" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <World data={arcs} globeConfig={globeConfig} />
            </div>
          )}
        </CustomDashedCard>
      </div>
      <Separator className="my-4 -mx-6 w-screen" />
      <div className="py-14 text-center flex gap-y-10 flex-col items-center font-bold text-3xl">
        <span className="tracking-tight">
          <span className="text-indigo-500">Kickstart</span> your next
          adventure.
        </span>
        <Link href="#hero">
          <Button className="border border-indigo-400 shadow-inner">
            Get notified
          </Button>
        </Link>
      </div>
      <Separator className="my-4 flex shrink" />
      <div className="mt-14">
        <span className="font-semibold tracking-tight text-2xl">Volaired</span>
      </div>
      <div className="mt-8 flex gap-x-20">
        {footer.map((section) => (
          <ul key={section.name} className="flex flex-col gap-y-2">
            <span className="font-medium tracking-tight">{section.name}</span>
            <div className="mt-2 flex flex-col gap-y-2">
              {section.links.map((link) => (
                <li
                  key={link.name}
                  className="hover:text-foreground text-muted-foreground text-sm"
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </div>
          </ul>
        ))}
      </div>
      <Separator className="my-4 flex shrink" />
      <div className="mb-4 flex items-center justify-between">
        <span className="text-muted-foreground text-xs">
          © Volaired. All rights reserved.
        </span>
        <ModeToggle />
      </div>
    </main>
  );
}
