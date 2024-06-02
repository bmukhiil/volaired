"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAtomValue } from "jotai";
import { departureAirportAtom, destinationAirportAtom } from "@/lib/atoms";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { flightOffersAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

export default function FlightsPage() {
  const [position, setPosition] = useState("Price");
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useAtom(flightOffersAtom);

  const [sortLow, setSortLow] = useState(true);

  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const filters = searchParams.get("filters");
  const currency = searchParams.get("currency");

  const departureAirport = useAtomValue(departureAirportAtom);
  const destinationAirport = useAtomValue(destinationAirportAtom);

  // do a check if query params are null

  function convertEpochToDate(epoch: number) {
    const date = new Date(epoch * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  function formatDate(date: string) {
    const formattedDate = new Date(date);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const day = formattedDate.toLocaleDateString("en-US", options);

    // Format the time part
    const time = formattedDate.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    return { day, time };
  }

  const formatDuration = (duration: string) => {
    const time = duration.split("T")[1];
    const hours = time.split("H")[0];
    const minutes = time.split("H")[1].split("M")[0];
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    // fetch flights
    async function fetchFlights() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/flights/search?origin=${origin}&destination=${destination}&startDate=${startDate}&endDate=${endDate}&filters=${filters}&currency=USD`,
        ).then((res) => res.json());
        setFlights(response);
        // setFlights([
        //   {
        //     id: 1,
        //     outboundTotalDuration: "PT2H30M",
        //     inboundTotalDuration: "PT5H6M",
        //     flightPath: [
        //       {
        //         departureAirport: "YVR",
        //         departureTime: "2024-06-06T08:00:00",
        //         arrivalAirport: "YYZ",
        //         arrivalTime: "2024-06-06T13:30:00",
        //         airlines: "AC",
        //         duration: "PT2H30M",
        //       },
        //       {
        //         departureAirport: "YYZ",
        //         departureTime: "2024-06-13T07:15:00",
        //         arrivalAirport: "YVR",
        //         arrivalTime: "2024-06-13T09:21:00",
        //         airlines: "AC",
        //         duration: "PT5H6M",
        //       },
        //     ],
        //     price: 3105.8,
        //   },
        //   {
        //     id: 2,
        //     outboundTotalDuration: "PT2H30M",
        //     inboundTotalDuration: "PT5H6M",
        //     flightPath: [
        //       {
        //         departureAirport: "YVR",
        //         departureTime: "2024-06-06T08:00:00",
        //         arrivalAirport: "YYZ",
        //         arrivalTime: "2024-06-06T13:30:00",
        //         airlines: "AC",
        //         duration: "PT2H30M",
        //       },
        //       {
        //         departureAirport: "YYZ",
        //         departureTime: "2024-06-13T07:45:00",
        //         arrivalAirport: "YVR",
        //         arrivalTime: "2024-06-13T09:51:00",
        //         airlines: "AC",
        //         duration: "PT5H6M",
        //       },
        //     ],
        //     price: 3105.8,
        //   },
        //   {
        //     id: 3,
        //     outboundTotalDuration: "PT2H30M",
        //     inboundTotalDuration: "PT5H6M",
        //     flightPath: [
        //       {
        //         departureAirport: "YVR",
        //         departureTime: "2024-06-06T08:00:00",
        //         arrivalAirport: "YYZ",
        //         arrivalTime: "2024-06-06T13:30:00",
        //         airlines: "AC",
        //         duration: "PT2H30M",
        //       },
        //       {
        //         departureAirport: "YYZ",
        //         departureTime: "2024-06-13T10:15:00",
        //         arrivalAirport: "YVR",
        //         arrivalTime: "2024-06-13T12:21:00",
        //         airlines: "AC",
        //         duration: "PT5H6M",
        //       },
        //     ],
        //     price: 3105.8,
        //   },
        //   {
        //     id: 4,
        //     outboundTotalDuration: "PT2H30M",
        //     inboundTotalDuration: "PT5H6M",
        //     flightPath: [
        //       {
        //         departureAirport: "YVR",
        //         departureTime: "2024-06-06T08:00:00",
        //         arrivalAirport: "YYZ",
        //         arrivalTime: "2024-06-06T13:30:00",
        //         airlines: "AC",
        //         duration: "PT2H30M",
        //       },
        //       {
        //         departureAirport: "YYZ",
        //         departureTime: "2024-06-13T12:00:00",
        //         arrivalAirport: "YVR",
        //         arrivalTime: "2024-06-13T14:06:00",
        //         airlines: "AC",
        //         duration: "PT5H6M",
        //       },
        //     ],
        //     price: 3105.8,
        //   },
        // ]);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchFlights();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="w-screen h-[95vh] flex flex-col gap-y-6 justify-center items-center overflow-hidden z-50">
  //       {/* <Loader2 className="text-indigo-500 animate-spin w-8 h-8" /> */}
  //       <motion.div
  //         className="bg-primary w-28 h-28"
  //         animate={{
  //           scale: [0.9, 1.1, 1.1, 0.9, 0.9],
  //           rotate: [0, 0, 180, 180, 0],
  //           borderRadius: ["0%", "0%", "50%", "50%", "0%"],
  //         }}
  //         transition={{
  //           duration: 1.8,
  //           ease: "easeInOut",
  //           times: [0, 0.2, 0.5, 0.8, 1],
  //           repeat: Infinity,
  //           repeatDelay: 1.2,
  //         }}
  //       />
  //       <span className="font-medium tracking-tight text-xl">Loading...</span>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-background flex flex-col gap-y-3">
      <div className="p-6 border-b bg-secondary flex justify-between">
        <Drawer>
          <DrawerTrigger className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex font-medium items-center gap-x-3 ">
                {departureAirport.city} ({departureAirport.iataCode})
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="size-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                    clip-rule="evenodd"
                  />
                </svg>{" "}
                {destinationAirport.city} ({destinationAirport.iataCode})
              </div>
              <Button
                size="icon"
                className="bg-background active:bg-background/70 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="size-4 text-primary"
                >
                  <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                </svg>
              </Button>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-end">
          <Button
            onClick={() => setSortLow(!sortLow)}
            size="icon"
            className="bg-secondary active:bg-background flex items-center justify-center hover:bg-transparent"
          >
            <AnimatePresence mode="wait">
              {sortLow ? (
                <motion.svg
                  key={1}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.1 }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="size-5 text-primary"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 3.75A.75.75 0 0 1 2.75 3h11.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 7.5a.75.75 0 0 1 .75-.75h7.508a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.5ZM14 7a.75.75 0 0 1 .75.75v6.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 1 1 1.1-1.02l1.95 2.1V7.75A.75.75 0 0 1 14 7ZM2 11.25a.75.75 0 0 1 .75-.75h4.562a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                    clip-rule="evenodd"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key={2}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.1 }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="size-5 text-primary"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 3.75A.75.75 0 0 1 2.75 3h11.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 7.5a.75.75 0 0 1 .75-.75h6.365a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.5ZM14 7a.75.75 0 0 1 .55.24l3.25 3.5a.75.75 0 1 1-1.1 1.02l-1.95-2.1v6.59a.75.75 0 0 1-1.5 0V9.66l-1.95 2.1a.75.75 0 1 1-1.1-1.02l3.25-3.5A.75.75 0 0 1 14 7ZM2 11.25a.75.75 0 0 1 .75-.75H7A.75.75 0 0 1 7 12H2.75a.75.75 0 0 1-.75-.75Z"
                    clip-rule="evenodd"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-20 flex justify-center">
                {position}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="Price">
                  Price
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Duration">
                  Duration
                </DropdownMenuRadioItem>
                {/* <DropdownMenuRadioItem value="right">
                    Right
                  </DropdownMenuRadioItem> */}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="bg-gradient-to-br from-fuchsia-400 to-indigo-500 p-[3px] rounded-xl flex justify-center items-center shadow-sm">
            <div className="bg-background rounded-lg w-full h-full flex items-center justify-center">
              <div className="w-full rounded-lg flex justify-center items-center bg-secondary">
                <div className="flex gap-x-2 items-start w-full p-4 rounded-lg bg-secondary">
                  {/* <svg
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
                    </svg> */}
                  <div className="flex flex-col gap-x-2 w-full gap-y-4">
                    {/* <span className="font-semibold">Recommended</span> */}
                    <div className="w-full border-b border-dashed pb-4 flex flex-col gap-y-2 bg-secondary">
                      <span className="text-sm font-medium">
                        Tue June 11, 2024
                      </span>
                      <div className="w-full flex h-full">
                        <div className="flex flex-col grow gap-y-1">
                          <Skeleton className="w-[10dvh] h-4" />
                          <Skeleton className="w-[8dvh] h-4" />
                          <div className="flex items-center gap-x-2 mt-2">
                            <Skeleton className="w-6 h-6 rounded-full" />
                            <Skeleton className="w-[6dvh] h-4" />
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-y-1">
                          <Skeleton className="w-24 h-4" />
                          <Skeleton className="w-12 h-4" />
                        </div>
                        <div className="flex flex-col grow gap-y-1 items-end">
                          <Skeleton className="w-[10dvh] h-4" />
                          <Skeleton className="w-[8dvh] h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-y-2  bg-secondary">
                      <span className="text-sm font-medium">
                        Fri June 14, 2024
                      </span>
                      <div className="w-full flex h-full">
                        <div className="flex flex-col grow gap-y-1">
                          <Skeleton className="w-[10dvh] h-4" />
                          <Skeleton className="w-[8dvh] h-4" />
                          <div className="flex items-center gap-x-2 mt-2">
                            <Skeleton className="w-6 h-6 rounded-full" />
                            <Skeleton className="w-[6dvh] h-4" />
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-y-1">
                          <Skeleton className="w-24 h-4" />
                          <Skeleton className="w-12 h-4" />
                        </div>
                        <div className="flex flex-col grow gap-y-1 items-end">
                          <Skeleton className="w-[10dvh] h-4" />
                          <Skeleton className="w-[8dvh] h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary border-dashed border-t rounded-lg w-full flex flex-col gap-y-2 pt-4">
                      <span className="text-xl text-center font-medium">
                        CA $1,234.56
                      </span>
                      <div className="flex items-center gap-x-2">
                        <Button className="w-full">Select</Button>
                        {/* <Button
                          size="icon"
                          className="flex grow w-8/12 h-10 bg-background"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="size-5 text-primary"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </Button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <div className="w-full p-4 shadow-sm rounded-lg border border-dashed flex flex-col gap-y-2  bg-secondary">
                    <span className="text-sm font-medium">
                      <Skeleton className="h-4 w-28" />
                    </span>
                    <div className="w-full flex h-full">
                      <div className="flex flex-col grow gap-y-1">
                        <Skeleton className="w-[10dvh] h-4" />
                        <Skeleton className="w-[8dvh] h-4" />
                        <div className="flex items-center gap-x-2 mt-2">
                          <Skeleton className="w-6 h-6 rounded-full" />
                          <Skeleton className="w-[6dvh] h-4" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-y-1">
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-12 h-4" />
                      </div>
                      <div className="flex flex-col grow gap-y-1 items-end">
                        <Skeleton className="w-[10dvh] h-4" />
                        <Skeleton className="w-[8dvh] h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-4 shadow-sm rounded-lg border border-dashed border-t-0 flex flex-col gap-y-2  bg-secondary">
                    <span className="text-sm font-medium">
                      {" "}
                      <Skeleton className="h-4 w-28" />
                    </span>
                    <div className="w-full flex h-full">
                      <div className="flex flex-col grow gap-y-1">
                        <Skeleton className="w-[10dvh] h-4" />
                        <Skeleton className="w-[8dvh] h-4" />
                        <div className="flex items-center gap-x-2 mt-2">
                          <Skeleton className="w-6 h-6 rounded-full" />
                          <Skeleton className="w-[6dvh] h-4" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-y-1">
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-12 h-4" />
                      </div>
                      <div className="flex flex-col grow gap-y-1 items-end">
                        <Skeleton className="w-[10dvh] h-4" />
                        <Skeleton className="w-[8dvh] h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary border border-dashed border-t-0 rounded-lg w-full flex flex-col gap-y-2 shadow-sm">
                    <span className="text-xl flex justify-center text-center font-medium">
                      {/* {currency} $3105.8 */}
                      <Skeleton className="w-32 h-8" />
                    </span>
                    <Button className="w-full">Select</Button>
                  </div>
                </div>
              ))
            : flights.map((roundtrip, index) => {
                // assuming the first and last flight are the outbound and inbound flights ( 2 flights total itinirary)
                const { day: originDepartureDate, time: originDepartureTime } =
                  formatDate(roundtrip.flightPath[0].departureTime);
                const { day: originArrivalDate, time: originArrivalTime } =
                  formatDate(roundtrip.flightPath[0].arrivalTime);

                const {
                  day: destinationDepartureDate,
                  time: destinationDepartureTime,
                } = formatDate(roundtrip.flightPath[1].departureTime);
                const {
                  day: destinationArrivalDate,
                  time: destinationArrivalTime,
                } = formatDate(roundtrip.flightPath[1].arrivalTime);

                const numStops = roundtrip.flightPath.length - 2;
                const inboundTotalDuration = formatDuration(
                  roundtrip.inboundTotalDuration,
                );
                const outboundTotalDuration = formatDuration(
                  roundtrip.outboundTotalDuration,
                );

                return (
                  <div key={index}>
                    <div className="w-full p-4 shadow-sm rounded-lg border border-dashed flex flex-col gap-y-2  bg-secondary">
                      <span className="text-sm font-medium">
                        {originDepartureDate}
                      </span>
                      <div className="w-full flex justify-between h-full items-center">
                        <div className="flex flex-col">
                          <span className="font-medium text-lg">
                            {originDepartureTime}
                          </span>
                          <span className="font-medium text-muted-foreground text-sm">
                            {roundtrip.flightPath[0].departureAirport}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-muted-foreground text-sm">
                            {outboundTotalDuration}
                          </span>
                          <span className="font-medium text-sm bg-background px-2 py-1 rounded-2xl">
                            {numStops} stops
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium text-lg">
                            {originArrivalTime}
                          </span>
                          <span className="font-medium text-muted-foreground text-sm">
                            {roundtrip.flightPath[0].arrivalAirport}
                          </span>
                        </div>
                      </div>
                      <div>airline info</div>
                    </div>
                    <div className="w-full p-4 shadow-sm rounded-lg border border-dashed border-t-0 flex flex-col gap-y-2  bg-secondary">
                      <span className="text-sm font-medium">
                        {destinationDepartureDate}
                      </span>
                      <div className="w-full flex justify-between h-full items-center">
                        <div className="flex flex-col">
                          <span className="font-medium text-lg">
                            {destinationDepartureTime}
                          </span>
                          <span className="font-medium text-muted-foreground text-sm">
                            {roundtrip.flightPath[0].departureAirport}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-muted-foreground text-sm">
                            {inboundTotalDuration}
                          </span>
                          <span className="font-medium text-sm bg-background px-2 py-1 rounded-2xl">
                            {numStops} stops
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium text-lg">
                            {destinationArrivalTime}
                          </span>
                          <span className="font-medium text-muted-foreground text-sm">
                            {roundtrip.flightPath[0].arrivalAirport}
                          </span>
                        </div>
                      </div>
                      <div>airline info</div>
                    </div>
                    <div className="p-4 bg-secondary border border-dashed border-t-0 rounded-lg w-full flex flex-col gap-y-2 shadow-sm">
                      <span className="text-xl text-center font-medium">
                        {currency} ${roundtrip.price}
                      </span>
                      <Button className="w-full">Select</Button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
