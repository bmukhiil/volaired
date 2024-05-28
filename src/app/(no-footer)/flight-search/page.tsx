"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAtomValue } from "jotai";
import { departureAirportAtom, destinationAirportAtom } from "@/lib/atoms";

export default function FlightsPage() {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState([]);

  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const filters = searchParams.get("filters");

  const departureAirport = useAtomValue(departureAirportAtom);
  const destinationAirport = useAtomValue(destinationAirportAtom);

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

  // if (loading) {
  //   return (
  //     <AnimatePresence>
  //       <motion.div
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         exit={{ opacity: 0 }}
  //         className="w-screen h-[95vh] flex flex-col gap-y-6 justify-center items-center overflow-hidden z-50"
  //       >
  //         {/* <Loader2 className="text-indigo-500 animate-spin w-8 h-8" /> */}
  //         <h1 className="text-4xl font-bold tracking-tight">volaired</h1>
  //         <motion.div
  //           className="bg-primary w-28 h-28"
  //           animate={{
  //             scale: [0.9, 1.1, 1.1, 0.9, 0.9],
  //             rotate: [0, 0, 180, 180, 0],
  //             borderRadius: ["0%", "0%", "50%", "50%", "0%"],
  //           }}
  //           transition={{
  //             duration: 1.8,
  //             ease: "easeInOut",
  //             times: [0, 0.2, 0.5, 0.8, 1],
  //             repeat: Infinity,
  //             repeatDelay: 1.2,
  //           }}
  //         />
  //         <span className="font-medium text-lg">Fetching your flights...</span>
  //       </motion.div>
  //     </AnimatePresence>
  //   );
  // }

  return (
    <>
      <Navbar />
      <div className="px-6 pt-6">
        <div>
          <span className="font-medium">
            {departureAirport.city}, {departureAirport.country} -{" "}
            {destinationAirport.city}, {destinationAirport.country}
          </span>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="bg-gradient-to-br from-fuchsia-400 to-indigo-500 p-[3px] mt-4 rounded-xl flex justify-center items-center shadow-sm">
            <div className="bg-background rounded-lg w-full h-full flex items-center justify-center">
              <div className="w-full rounded-lg flex justify-center items-center bg-secondary">
                <div className="flex gap-x-2 items-start w-full p-3 rounded-lg bg-transparent">
                  <svg
                    fill="url(#grad1)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="size-6"
                  >
                    <defs>
                      <linearGradient
                        id="grad1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style={{
                            stopColor: "#e879f9",
                            stopOpacity: 1,
                          }}
                        />
                        <stop
                          offset="100%"
                          style={{
                            stopColor: "#818cf8",
                            stopOpacity: 1,
                          }}
                        />
                      </linearGradient>
                    </defs>
                    <path
                      fill-rule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div className="flex flex-col gap-x-2">
                    <span className="font-semibold">Recommended</span>
                    <p className="text-foreground/60 text-sm">
                      We&apos;ve noticed you have more than one traveller.
                    </p>
                    <div className="mt-4 flex gap-x-2 justify-between items-center">
                      {/* <Button
                                    onClick={() =>
                                      setTripCreateSuggestion(false)
                                    }
                                    className="focus-visible:bg-background/60 active:bg-background/60 hover:bg-background/60 flex grow bg-background text-foreground"
                                  >
                                    Close
                                  </Button>
                                  <Link href="/trips/create">
                                    <Button className="flex items-center gap-x-2">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="size-5"
                                      >
                                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                      </svg>
                                      Create
                                    </Button>
                                  </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-4 shadow-sm rounded-lg border">
            <div className="w-full flex h-full">
              <div className="flex flex-col grow gap-y-1">
                <Skeleton className="w-[13dvh] h-4" />
                <Skeleton className="w-[8dvh] h-4" />
                <Skeleton className="w-5 h-5 rounded-full" />
              </div>
              <div className="flex flex-col grow gap-y-1 items-end">
                <Skeleton className="w-[13dvh] h-4" />
                <Skeleton className="w-[8dvh] h-4" />
                <Skeleton className="w-5 h-5 rounded-full" />
              </div>
            </div>
            <div>Buy</div>
          </div>
          <li className="list-none p-4 bg-background rounded-md">hi</li>
        </div>
      </div>
    </>
  );
}
