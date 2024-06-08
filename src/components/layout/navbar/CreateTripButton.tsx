"use client";

import { AnimatePresence, motion } from "framer-motion";
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
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import { dateRangeAtom } from "@/lib/atoms";

export default function CreateTripButton({ children }) {
  const [progress, setProgress] = useState(25);
  const [step, setStep] = useState(1);
  const [tripName, setTripName] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useAtom(dateRangeAtom);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [tripCreated, setTripCreated] = useState(false);
  // trip object
  const [trip, setTrip] = useState();

  const handlePrevStep = () => {
    if (step === 1) {
      setDirection("left");
    }
    setDirection("left");
    setStep((prev) => prev - 1);
    setProgress((prev) => prev - 25);
  };

  const handleNextStep = () => {
    if (step === 3) return;
    if (step === 2) {
      setLoading(true);
      // Simulate trip creation process
      setTimeout(() => {
        setLoading(false);
        setStep(3);
        setProgress(100);
        setTripCreated(true);
        // Optionally, close the drawer or show a success message here
      }, 2000); // Adjust the delay as needed
    } else {
      setDirection("right");
      setStep((prev) => prev + 1);
      setProgress((prev) => prev + 25);
    }
  };

  const resetCreateTripDetails = () => {
    setStep(1);
    setProgress(25);
    setTripName("");
    setTripDescription("");
    setTripCreated(false);
  };

  const handleTripCreation = () => {};

  return (
    <Drawer>
      <DrawerTrigger>
        {/* <motion.li className="text-sm font-medium text-muted-foreground flex items-center gap-x-2">
          <div className="bg-background p-1 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="size-5 text-foreground"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v4A1.5 1.5 0 0 0 2.5 10h6A1.5 1.5 0 0 0 10 8.5v-4A1.5 1.5 0 0 0 8.5 3h-6Zm11 2A1.5 1.5 0 0 0 12 6.5v7a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 17.5 5h-4Zm-10 7A1.5 1.5 0 0 0 2 13.5v2A1.5 1.5 0 0 0 3.5 17h6a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 9.5 12h-6Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          Create a trip
        </motion.li> */}
        {children}
      </DrawerTrigger>
      <DrawerContent className="h-[60dvh]">
        <DrawerHeader>
          <DrawerTitle className="flex flex-col items-center gap-y-2">
            {/* <Progress value={progress} className="w-10 h-3" /> */}
            Create a new trip
          </DrawerTitle>
          <DrawerDescription className="mt-4">
            <p className="pb-4">
              Let&apos;s get started by creating a new trip plan. Don&apos;t
              worry, you can always edit the details later.
            </p>
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
                  transition={{ duration: 0.15 }}
                  key="step-1"
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction === "right" ? "100%" : "-100%",
                  }}
                  animate={{ opacity: 1, x: "0%" }}
                  exit={{
                    opacity: 0,
                    x: direction === "right" ? "-100%" : "100%",
                  }}
                  className="flex flex-col gap-y-4"
                >
                  <div className="flex flex-col justify-start items-start gap-y-1">
                    <Label htmlFor="trip-name" className="text-foreground">
                      Trip Name
                    </Label>
                    <Input
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                      placeholder="Trip name"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-y-1">
                    <Label
                      htmlFor="trip-description"
                      className="text-foreground"
                    >
                      Trip Description (optional)
                    </Label>
                    {/* max certain characters */}
                    {/* <Input
                      value={tripDescription}
                      onChange={(e) => setTripDescription(e.target.value)}
                      placeholder="Trip description"
                    /> */}
                    <Textarea
                      placeholder="Trip description"
                      value={tripDescription}
                      onChange={(e) => setTripDescription(e.target.value)}
                    />
                  </div>
                  {/* <div className="flex w-full flex-col justify-start items-start gap-y-1">
                    <Label
                      htmlFor="trip-destination"
                      className="text-foreground"
                    >
                      Date Range
                    </Label>
                    <DatePickerWithRange
                      className="w-full"
                      onDateChange={updateDateRange}
                    />
                  </div> */}
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  transition={{ duration: 0.15 }}
                  key="step-2"
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction === "right" ? "100%" : "-100%",
                  }}
                  animate={{ opacity: 1, x: "0%" }}
                  exit={{
                    opacity: 0,
                    x: direction === "right" ? "-100%" : "100%",
                  }}
                  className="flex flex-col justify-start items-start gap-y-1"
                >
                  <Label htmlFor="budget-price" className="text-foreground">
                    What's your budget? (optional)
                  </Label>
                  <Input id="budget-price" placeholder="$1,000" />
                  <div className="flex gap-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="size-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span className="text-left text-xs font-medium">
                      This can be an estimate or the total amount you plan to
                      spend
                    </span>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  transition={{ duration: 0.15 }}
                  key="step-3"
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction === "right" ? "100%" : "-100%",
                  }}
                  animate={{ opacity: 1, x: "0%" }}
                  exit={{
                    opacity: 0,
                    x: direction === "right" ? "-100%" : "100%",
                  }}
                >
                  <div className="flex flex-col justify-center items-center gap-y-1 mt-10">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-24 text-primary"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-foreground text-2xl font-bold tracking-tight">
                      Trip created
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex items-center w-full gap-x-1 justify-between">
            <Button
              disabled={step === 1 || loading || tripCreated}
              onClick={handlePrevStep}
              className="w-full bg-secondary border shadow-sm text-foreground hover:bg-background/60 gap-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z"
                  clip-rule="evenodd"
                />
              </svg>
              Back
            </Button>
            {/* <Button>Create trip</Button> */}
            <Button
              disabled={loading}
              onClick={handleNextStep}
              className="w-full flex items-center gap-x-2"
            >
              {step === 2 && !loading ? (
                <div className="flex gap-x-2 items-center">
                  Create Trip
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="size-5"
                  >
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                </div>
              ) : loading ? (
                <motion.div
                  className="bg-secondary w-5 h-5"
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
              ) : step === 3 ? (
                <DrawerClose onClick={resetCreateTripDetails}>
                  Close
                </DrawerClose>
              ) : (
                <>
                  Next
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
                </>
              )}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
