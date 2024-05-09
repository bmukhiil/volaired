"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";
import { EnrichedFlightDetails } from "@/types";
import { Button } from "../ui/button";
import Link from "next/link";

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

  const globeConfig = {
    pointSize: 4,
    globeColor: "#312E81",
    showAtmosphere: false,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#818CF8", "#818CF8", "#818CF8"];

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
    <main className="w-screen px-6 mt-4">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Here's a globe.</h2>
          <h3 className="text-muted-foreground">
            This globe shows the flight paths of some of the flights from
            yesterday at exactly this time.
          </h3>
        </div>
        <div className="shadow-sm my-6 p-6 w-full h-42 rounded-lg border border-border border-dashed flex items-center justify-center bg-zinc-100">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="text-indigo-500 animate-spin w-8 h-8" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <World data={arcs} globeConfig={globeConfig} />
            </div>
          )}
        </div>
      </div>
      <Separator className="my-4 -mx-6 w-screen" />
      <div className="py-2 text-center flex gap-y-4 flex-col items-center font-medium text-muted-foreground text-3xl">
        <div className="flex flex-col tracking-tight">
          Fly simple,{" "}
          <span className="text-foreground font-medium">fly smart</span>
        </div>
        <Link href="#hero">
          <Button>Get notified</Button>
        </Link>
      </div>
      <Separator className="my-4 flex shrink" />
      <div>
        <span className="font-semibold tracking-tight text-2xl">Volaired</span>
      </div>
      <div>Footer links</div>
      <Separator className="my-4 flex shrink" />
      <div className="mb-4">
        <span className="text-muted-foreground text-xs">
          © Volaired. All rights reserved.
        </span>
      </div>
    </main>
  );
}
