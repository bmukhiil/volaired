"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";

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
    globeColor: "#062056",
    showAtmosphere: true,
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
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];

  useEffect(() => {
    async function fetchArcs() {
      const response = await fetch(`/api/v1/flights/paths/yesterday?limit=800`);
      const data = await response.json();
      console.log(data.data.length);

      const newArcs = data.data.map((flight, index) => {
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
      });

      setArcs(newArcs);
      setLoading(false);
    }

    fetchArcs();
  }, []);

  return (
    <main className="w-screen px-6">
      {arcs.length > 0 && (
        <div>
          <World data={arcs} globeConfig={globeConfig} />
        </div>
      )}
      <Separator className="my-4 flex shrink" />
      <div>
        <span className="font-semibold tracking-tight text-2xl">Volaired</span>
      </div>
      <Separator className="my-4 flex shrink" />
      <div>
        <span className="text-muted-foreground text-xs">
          © Volaired. All rights reserved.
        </span>
      </div>
    </main>
  );
}
