"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const metadata = {
  title: "Loading - Volaired",
  description: "Please wait while we load your content on Volaired.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Loading() {
  return (
    <div className="w-screen h-[95vh] flex flex-col gap-y-6 justify-center items-center overflow-hidden z-50">
      {/* <Loader2 className="text-indigo-500 animate-spin w-8 h-8" /> */}
      <motion.div
        className="bg-primary w-32 h-32"
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
      <span className="font-medium tracking-tight text-xl">Loading...</span>
    </div>
  );
}
