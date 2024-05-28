"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";

export default function FlightsPage() {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState([]);

  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const filters = searchParams.get("filters");

  useEffect(() => {
    // fetch flights
    async function fetchFlights() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/flights?origin=${origin}&destination=${destination}&startDate=${startDate}&endDate=${endDate}&filters=${filters}`,
        ).then((res) => res.json());
        setFlights(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFlights();
  }, []);

  if (loading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-screen h-[95vh] flex flex-col gap-y-6 justify-center items-center overflow-hidden z-50"
        >
          {/* <Loader2 className="text-indigo-500 animate-spin w-8 h-8" /> */}
          <h1 className="text-4xl font-bold tracking-tight">volaired</h1>
          <motion.div
            className="bg-primary w-28 h-28"
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
          <span className="font-medium text-lg">Fetching your flights...</span>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-6 pt-6">
        <h1>Flights</h1>
      </div>
    </>
  );
}
