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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  return (
    <main className="w-full max-w-screen overflow-x-hidden bg-secondary">
      <div className="py-14 text-center flex gap-y-6 flex-col">
        <div className="flex flex-col gap-y-4 items-center">
          <span className="text-3xl tracking-tight font-bold text-foreground duration-0">
            <span className="text-indigo-500">Explore</span> the Radiair
            Advantage
          </span>
          <p className="text-muted-foreground duration-0 lg:max-w-[80vw]">
            Radiair simplifies your travel experience with intelligent flight
            recommendations, seamless group coordination, and personalized
            itineraries.
          </p>
        </div>
        <div className="flex flex-col gap-y-1 w-full max-w-md mx-auto">
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
      <Separator className="my-4 w-full" />
      <div className="mt-8 flex justify-center">
        <Image
          src={radiair_full_logo_light}
          className="w-32 h-auto"
          alt="Radiair logo"
        />
      </div>
      <div className="mt-8 flex flex-wrap gap-x-10 lg:gap-x-20 justify-center">
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
      <Separator className="my-4 w-full" />
      <div className="pb-4 flex items-center justify-between">
        <span className="duration-0 text-muted-foreground text-xs">
          © Radiair. All rights reserved.
        </span>
        <ModeToggle />
      </div>
    </main>
  );
}
