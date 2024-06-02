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
    if (step === 4) return;
    if (step === 3) {
      setLoading(true);
      // Simulate trip creation process
      setTimeout(() => {
        setLoading(false);
        setStep(4);
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

  const handleTripCreation = () => {};

  const updateDateRange = (dateRange) => {
    const { from, to } = dateRange;

    if (from && to) {
      const formattedDateRange = {
        from: new Date(from * 1000), // Convert 'from' epoch time to Date object
        to: new Date(to * 1000), // Convert 'to' epoch time to Date object
      };

      setDateRange(formattedDateRange);
    } else {
      // Handle the case when 'from' or 'to' is undefined
      console.error(
        "Invalid date range selected. Both 'from' and 'to' dates must be defined.",
      );
    }
  };

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
            <Progress value={progress} className="w-10 h-3" />
            Create a trip plan
          </DrawerTitle>
          <DrawerDescription className="mt-4">
            <p className="pb-4">
              Let&apos;s get started by creating a new trip plan. Don&apos;t
              worry, you can always edit the details later.
            </p>
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
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
                      Trip Description
                    </Label>
                    {/* max certain characters */}
                    <Input
                      value={tripDescription}
                      onChange={(e) => setTripDescription(e.target.value)}
                      placeholder="Trip description"
                    />
                  </div>
                  <div className="flex w-full flex-col justify-start items-start gap-y-1">
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
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
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
                  <Label htmlFor="trip-description" className="text-foreground">
                    Trip description
                  </Label>
                  <Input placeholder="Trip description" />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
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
                  className="flex flex-col justify-start items-start gap-y-1"
                >
                  <Label htmlFor="trip-destination" className="text-foreground">
                    Trip destination
                  </Label>
                  <Input placeholder="Trip destination" />
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
            <Button
              disabled={loading}
              onClick={handleNextStep}
              className="w-full flex items-center gap-x-2"
            >
              {step === 3 && !loading ? (
                "Create Trip"
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
              ) : step === 4 ? (
                <>
                  Check out trip
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
