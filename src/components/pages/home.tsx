import {
  motion,
  AnimatePresence,
  useScroll,
  useAnimation,
  useInView,
  useTransform,
} from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ConfettiExplosion from "react-confetti-explosion";
import { cn } from "@/lib/utils";
import { CustomDashedCard } from "../ui/custom-card";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  loading: boolean;
  success: boolean;
  error: string;
  email: string;
  onSubmit: () => void;
  onChange: (value: string) => void;
}

interface EmailSignUpFormProps {
  loading: boolean;
  success: boolean;
  error: string;
  onSubmit: () => void;
  onChange: (value: string) => void;
}

interface GroupTripSectionProps {
  tripJoined: boolean;
  setTripJoined: (value: boolean) => void;
  tripDeclined: boolean;
  setTripDeclined: (value: boolean) => void;
  tripJoinedTriggered: boolean;
  setTripJoinedTriggered: (value: boolean) => void;
}

interface FlightPriceInfoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  loading: boolean;
  handleSubmit: () => void;
  data: any;
}

interface PriceMetric {
  amount: string;
}

interface MetricsResult {
  Q1: number;
  Q3: number;
  min: number;
  max: number;
  widths: string[];
}

const HeroSection = (props: HeroSectionProps) => {
  return (
    <div className="md:px-12 lg:px-48">
      <h1 className="text-4xl lg:text-5xl lg:text-center font-bold tracking-tight">
        Unlock your next adventure.
      </h1>
      <p className="text-lg lg:text-center text-muted-foreground mt-4 lg:mt-5 lg:px-24">
        Effortlessly book flights, manage itineraries, and split costs—all in
        one place. Let&apos;s make your travel stress-free and filled with fun.
      </p>
      <EmailSignUpForm {...props} />
    </div>
  );
};

const EmailSignUpForm = (props: EmailSignUpFormProps) => {
  const { loading, success, error, onSubmit, onChange } = props;

  return (
    <div className="flex flex-col mt-8 lg:mt-4 gap-y-2 lg:items-center">
      <div className="flex flex-col gap-y-1 lg:gap-y-0 lg:w-[50dvh]">
        <div className="flex items-center gap-x-2">
          <Input
            disabled={loading || success}
            onChange={(e) => onChange(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className={cn({
              "border-border": error === "",
              "border-rose-500": error !== "",
            })}
          />
          <motion.div className="hidden lg:flex">
            <div className="group relative rounded-xl grid overflow-hidden h-auto transition-colors w-dull">
              <span className="backdrop absolute inset-[0.5px] bg-background rounded-xl transition-colors duration-200 w-full" />
              <span className="z-10">
                <div
                  className={`p-1 ${
                    error === "" ? "border-indigo-500" : "border-rose-500"
                  } border rounded-lg border-opacity-20`}
                >
                  <div
                    className={`p-1 ${
                      error === "" ? "border-indigo-500" : "border-rose-500"
                    } border rounded-lg border-opacity-50`}
                  >
                    <Button
                      disabled={loading || success}
                      className="border-indigo-400 border shadow-inner w-full flex items-center gap-x-2"
                      onClick={() => onSubmit()}
                      type="submit"
                    >
                      {loading && !success && (
                        <Loader2 className="animate-spin" />
                      )}
                      {!loading && success ? (
                        <div className="flex items-center gap-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2.0"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                          <span>Success!</span>
                        </div>
                      ) : (
                        "Get notified"
                      )}
                    </Button>
                  </div>
                </div>
              </span>
            </div>
          </motion.div>
        </div>
        <div style={{ position: "relative", minHeight: "20px" }}>
          <AnimatePresence>
            {error === "" ? (
              <motion.p
                key="helpText"
                initial={{ y: -4, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-muted-foreground ml-1"
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                We&apos;ll never share your email with anyone else.
              </motion.p>
            ) : (
              <motion.p
                initial={{ y: -4, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                transition={{ duration: 0.2 }}
                key="errorText"
                className="text-xs text-rose-500 ml-1"
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <motion.div className="lg:hidden">
        <div className="group relative rounded-xl grid overflow-hidden h-auto transition-colors w-dull">
          <span className="backdrop absolute inset-[0.5px] bg-background rounded-xl transition-colors duration-200 w-full" />
          <span className="z-10">
            <div
              className={`p-1 ${
                error === "" ? "border-indigo-500" : "border-rose-500"
              } border rounded-lg border-opacity-20`}
            >
              <div
                className={`p-1 ${
                  error === "" ? "border-indigo-500" : "border-rose-500"
                } border rounded-lg border-opacity-50`}
              >
                <Button
                  disabled={loading || success}
                  className="border-indigo-400 border shadow-inner w-full flex items-center gap-x-2"
                  onClick={() => onSubmit()}
                  type="submit"
                >
                  {loading && !success && <Loader2 className="animate-spin" />}
                  {!loading && success ? (
                    <div className="flex items-center gap-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2.0"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span>Success!</span>
                    </div>
                  ) : (
                    "Get notified"
                  )}
                </Button>
              </div>
            </div>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const ConfettiExplosionCanvas = () => {
  return (
    <div className={cn("flex justify-center", {})}>
      <ConfettiExplosion />
    </div>
  );
};

const GroupTripSection = (props: GroupTripSectionProps) => {
  const {
    tripJoined,
    setTripJoined,
    tripDeclined,
    setTripDeclined,
    tripJoinedTriggered,
    setTripJoinedTriggered,
  } = props;

  const today = new Date();
  const fiveDaysFromNow = new Date();

  fiveDaysFromNow.setDate(today.getDate() + 5);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-x-4">
      <div className="flex flex-col lg:gap-y-16">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Planning a trip with friends?
          </h2>
          <h3 className="text-muted-foreground">
            We&apos;ve got you covered. From splitting bills to planning the
            itinerary, we&apos;ve got everything you need to make your trip a
            success.
          </h3>
        </div>
        <div className="mt-4 hidden lg:flex">
          <CustomDashedCard className="">
            <div className="flex flex-col justify-center gap-y-4">
              <div className="flex shrink justify-center">
                <span className="bg-background rounded-lg p-2 shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                    />
                  </svg>
                </span>
              </div>
              <div>
                <h2 className="text-lg font-medium text-center">
                  Splitting costs made easy.
                </h2>
                <p className="text-muted-foreground text-sm text-center">
                  Split costs with friends and keep track of expenses.
                </p>
              </div>
            </div>
          </CustomDashedCard>
          <CustomDashedCard>
            <div className="flex flex-col justify-center gap-y-4">
              <div className="flex justify-center">
                <span className="bg-background rounded-lg p-2 shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>
                </span>
              </div>
              <div>
                <h2 className="text-lg font-medium text-center">
                  Collaborate on the itinerary.
                </h2>
                <p className="text-muted-foreground text-sm text-center">
                  Plan activities and share your travel plans.
                </p>
              </div>
            </div>
          </CustomDashedCard>
        </div>
      </div>
      <div className="lg:w-1/2 mt-6">
        <CustomDashedCard className="flex justify-center items-center">
          <div>
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-xl tracking-tight text-foreground">
                Trip to Vancouver
              </h4>
              <div className="shadow-inner px-2 py-1 flex text-xs rounded-2xl bg-emerald-700/90 font-medium text-emerald-300 border border-emerald-800 items-center gap-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-300 border border-emerald-800" />
                active
              </div>
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              {formatDate(today)} - {formatDate(fiveDaysFromNow)}
            </p>
            <div className="my-6 flex flex-col gap-y-2">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Image
                  alt="Vancouver"
                  className="rounded-lg shadow"
                  src="/vancouver.jpg"
                  width={400}
                  height={200}
                />
              </motion.div>
              <div className="flex items-center gap-x-1 ml-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <span className="font-medium text-xs tracking-tighter">+2</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="border-border border border-dashed w-8 h-8 flex justify-center items-center rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <Separator className="flex shrink" />
            <div className="my-4 text-foreground flex flex-col">
              <span className="text-2xl font-semibold tracking-tight">
                CA $315
              </span>
              <span className="text-sm font-medium">CA $1,575 total</span>
              <span className="text-xs text-muted-foreground">
                includes taxes & fees
              </span>
            </div>
            <Separator className="flex shrink my-2" />
            <div className="mt-4 flex flex-col items-center gap-y-2">
              <h4 className="text-foreground font-medium tracking-tight text-base text-center">
                Andrew invited you to join this trip.
              </h4>
              <div className="flex items-center w-full gap-x-2 relative mt-2">
                <Button
                  disabled={tripJoined}
                  onClick={() => {
                    if (tripDeclined) {
                      setTripDeclined(false);
                      return;
                    }
                    setTripDeclined(true);
                    toast.warning("Declined Trip Invitation", {
                      duration: 3000,
                      important: true,
                      description: "You declined Andrew's trip to Vancouver.",
                      closeButton: true,
                      dismissible: true,
                      cancel: {
                        label: "Undo",
                        onClick: () => setTripDeclined(false),
                      },
                      cancelButtonStyle: {
                        color: "#ffffff",
                        background: "hsl(240 4% 16%)",
                        border: "border-secondary",
                      },
                    });
                  }}
                  variant="outline"
                  className={cn(
                    "shadow-inner w-full flex items-center gap-x-1",
                    {
                      "border-rose-500 text-rose-500 bg-background focus:border-rose-500 focus:text-rose-500 focus:bg-background":
                        tripDeclined,
                    }
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>
                  {tripDeclined ? "Declined" : "Decline"}
                </Button>
                <div
                  className={cn(
                    "absolute right-[0.5px] top-[0.5px] transform translate-x-1/2 -translate-y-1/2",
                    {
                      hidden: tripJoinedTriggered,
                    }
                  )}
                >
                  <div className="bg-indigo-400 w-2 h-2 rounded-full">
                    <div className="bg-indigo-400 w-2 h-2 rounded-full animate-ping"></div>
                  </div>
                </div>
                <Button
                  disabled={tripDeclined}
                  className="border-indigo-400 border shadow-inner w-full flex items-center gap-x-1"
                  onClick={() => {
                    setTripJoinedTriggered(true);
                    if (tripJoined) {
                      setTripJoined(false);
                      return;
                    }
                    setTripJoined(true);
                    toast.success("Accepted Trip Invitation", {
                      duration: 3000,
                      important: true,
                      description: "You joined Andrew's trip to Vancouver.",
                      closeButton: true,
                      dismissible: true,
                      cancel: {
                        label: "Undo",
                        onClick: () => setTripJoined(false),
                      },
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {tripJoined ? "Joined" : "Join"}
                </Button>
              </div>
            </div>
          </div>
        </CustomDashedCard>
        <CustomDashedCard className="lg:hidden">
          <div className="flex flex-col justify-center gap-y-4">
            <div className="flex justify-center">
              <span className="bg-background rounded-lg p-2 shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
              </span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-center">
                Splitting costs made easy.
              </h2>
              <p className="text-muted-foreground text-sm text-center">
                Split costs with friends and keep track of expenses.
              </p>
            </div>
          </div>
        </CustomDashedCard>
        <CustomDashedCard className="lg:hidden">
          <div className="flex flex-col justify-center gap-y-4">
            <div className="flex justify-center">
              <span className="bg-background rounded-lg p-2 shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-center">
                Collaborate on the itinerary.
              </h2>
              <p className="text-muted-foreground text-sm text-center">
                Plan activities and share your travel plans.
              </p>
            </div>
          </div>
        </CustomDashedCard>
      </div>
    </div>
  );
};

const FlightPriceInfo = (props: FlightPriceInfoProps) => {
  const { date, setDate, loading, handleSubmit, data } = props;
  const priceMetrics: PriceMetric[] = data?.priceMetrics || [];

  const calculateWidths = (metrics: PriceMetric[]): MetricsResult => {
    if (!metrics || metrics.length < 5) {
      // Ensure there are exactly five metrics (min, Q1, median, Q3, max) to proceed
      return { Q1: 0, Q3: 0, min: 0, max: 0, widths: ["0", "0", "0"] };
    }

    // Ensure metrics are sorted if not already (typically by quartileRanking)
    const sortedMetrics = metrics.sort(
      (a: any, b: any) => parseFloat(a.amount) - parseFloat(b.amount)
    );
    const Q1 = parseFloat(sortedMetrics[1].amount);
    const Q3 = parseFloat(sortedMetrics[2].amount);
    const min = parseFloat(sortedMetrics[0].amount);
    const max = parseFloat(sortedMetrics[4].amount);
    const IQR = Q3 - Q1;

    // Calculate bounds for whiskers
    const lowerBound = Q1 - 1.5 * IQR;
    const upperBound = Q3 + 1.5 * IQR;

    const totalRange = max - min;

    if (totalRange === 0) {
      // Avoid division by zero
      return { Q1, Q3, min, max, widths: ["0", "0", "0"] };
    }

    const widths = [
      ((Q1 - lowerBound) / totalRange) * 100, // Green width
      ((Q3 - Q1) / totalRange) * 100, // Orange width
      ((upperBound - Q3) / totalRange) * 100, // Red width
    ].map((w) => w.toFixed(2)); // Formatting widths

    return { Q1, Q3, min, max, widths };
  };

  const { Q1, Q3, min, max, widths } = calculateWidths(priceMetrics);
  const Q1Q3Average = (Q1 + Q3) / 2;
  const metrics = [min, Q1Q3Average, max].map((m) => m.toFixed(2));

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Find the prime time to fly.
        </h2>
        <h3 className="text-muted-foreground">
          When searching for flights, we&apos;ll give you insight on the most
          optimal times to fly.
        </h3>
      </div>
      <CustomDashedCard>
        <Label className="text-foreground">Flying from</Label>
        <Button
          variant="outline"
          className="justify-start w-full font-normal items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mr-2 w-5 h-5 text-foreground"
          >
            <path
              fill-rule="evenodd"
              d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
              clip-rule="evenodd"
            />
          </svg>
          <span className={cn("text-foreground")}>Vancouver, Canada (YVR)</span>
        </Button>
        <Label className="text-foreground">Flying to</Label>
        <Button
          variant="outline"
          className="justify-start w-full font-normal items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mr-2 w-5 h-5 text-foreground"
          >
            <path
              fill-rule="evenodd"
              d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
              clip-rule="evenodd"
            />
          </svg>
          <span className={cn("text-foreground")}>Toronto, Canada (YYZ)</span>
        </Button>
        <Label className="text-foreground translate-y-1">Departure Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full text-foreground justify-start font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="shadow-inner border border-indigo-400 w-full mt-1"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Analyze flight prices"
          )}
        </Button>
        <Separator className="my-4 flex shrink" />
        <div className="py-4">
          {loading && !data ? (
            <Skeleton className="w-full h-10" />
          ) : (
            <div className="flex flex-col gap-y-6">
              <div className="shadow-inner dark:bg-indigo-300 dark:border-indigo-500 bg-indigo-100 border-indigo-300 border rounded-lg p-2">
                <div className="flex items-center gap-x-2 text-sm font-medium tracking-tight">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-indigo-400 dark:text-indigo-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div className="text-black">
                    Prices are currently{" "}
                    <span className="text-rose-500 font-semibold">high</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="flex shadow-sm">
                  {widths.map((width, index) => (
                    <span
                      key={index}
                      className={cn("flex-grow flex h-1", {
                        "rounded-l-full": index === 0,
                        "rounded-r-full": index === widths.length - 1,
                        "bg-emerald-400": index === 0,
                        "bg-rose-400": index === widths.length - 1,
                        "bg-orange-300":
                          index !== 0 && index !== widths.length - 1,
                      })}
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between">
                  {metrics.map((metric, index) => (
                    <span
                      key={index}
                      className={cn("tracking-tight text-xs font-medium", {
                        "text-emerald-400": index === 0,
                        "text-orange-300": index === 1,
                        "text-rose-400": index === 2,
                      })}
                    >
                      CA ${metric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CustomDashedCard>
    </>
  );
};

const MeetCopilot = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["<30 min", "30-60 min", "60-120 min", "Over 120 min/cancelled"],
    datasets: [
      {
        label: "Flight Delays",
        data: [13.336977, 42.023364, 34.671372, 9.968289],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="lg:flex">
        <div className="flex flex-col lg:justify-between">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Meet Copilot.</h2>
            <p className="text-muted-foreground">
              Your personal travel assistant that helps you plan, book, and
              manage your trips.
            </p>
          </div>
          <CustomDashedCard className="flex-col hidden lg:flex">
            <div className=" flex-col w-full bg-background rounded-lg  dark:bg-grid-zinc-500/[0.2] bg-grid-zinc-200/[0.2] relative flex items-center justify-center">
              {/* Radial gradient for the container to give a faded look */}
              <div className="rounded-lg absolute pointer-events-none inset-0 flex items-center justify-center bg-secondary [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <div className="bg-primary my-8 rounded-md px-2 py-1 border border-indigo-500 drop-shadow-md shadow-indigo-400 ring-2 ring-indigo-400 ring-offset-1 ring-offset-transparent">
                <p className="text-sm relative z-20 font-medium text-white">
                  Hey! How can I help?
                </p>
              </div>
              <div className="z-50 text-muted-foreground flex justify-between items-center h-10 w-full rounded-md border border-input bg-background pl-3 pr-1 py-2 text-sm ring-offset-background">
                Things to do in Vancouver?
                <Button
                  variant="outline"
                  className="border-primary bg-secondary text-primary font-normal h-8 drop-shadow-sm"
                >
                  Ask
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold">Chat with Copilot</h3>
              <p className="text-muted-foreground text-sm">
                Just ask Copilot anything about your trip.
              </p>
            </div>
          </CustomDashedCard>
        </div>
        <div className="lg:flex">
          <CustomDashedCard className="flex flex-col lg:justify-between lg:hidden">
            <div className=" flex-col w-full bg-background rounded-lg  dark:bg-grid-zinc-500/[0.2] bg-grid-zinc-200/[0.2] relative flex items-center justify-center">
              {/* Radial gradient for the container to give a faded look */}
              <div className="rounded-lg absolute pointer-events-none inset-0 flex items-center justify-center bg-secondary [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <div className="bg-primary my-8 rounded-md px-2 py-1 border border-indigo-500 drop-shadow-md shadow-indigo-400 ring-2 ring-indigo-400 ring-offset-1 ring-offset-transparent">
                <p className="text-sm relative z-20 font-medium text-white">
                  Hey! How can I help?
                </p>
              </div>
              <div className="z-50 text-muted-foreground flex justify-between items-center h-10 w-full rounded-md border border-input bg-background pl-3 pr-1 py-2 text-sm ring-offset-background">
                Things to do in Vancouver?
                <Button
                  variant="outline"
                  className="border-primary bg-secondary text-primary font-normal h-8 drop-shadow-sm"
                >
                  Ask
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold">Chat with Copilot</h3>
              <p className="text-muted-foreground text-sm">
                Just ask Copilot anything about your trip.
              </p>
            </div>
          </CustomDashedCard>
          <CustomDashedCard className="flex flex-col lg:justify-between">
            <div className="flex-col w-full bg-background rounded-lg  dark:bg-grid-zinc-500/[0.2] bg-grid-zinc-200/[0.2] relative flex items-center justify-center">
              {/* Radial gradient for the container to give a faded look */}
              <div className="rounded-lg absolute pointer-events-none inset-0 flex items-center justify-center bg-secondary [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <div className="bg-transparent my-8 rounded-md p-2 border border-indigo-500 drop-shadow-md shadow-indigo-400 ring-1  ring-indigo-400 ring-offset-1 ring-offset-transparent">
                <div className="flex w-[25dvh] h-[25dvh]">
                  <Pie data={data} />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold">
                Probability of Your Flight Being Delayed
              </h3>
              <p className="text-muted-foreground text-sm">
                Copilot uses machine learning to predict the probability of your
                flight being delayed.
              </p>
            </div>
          </CustomDashedCard>
        </div>
      </div>
    </>
  );
};

export {
  HeroSection,
  ConfettiExplosionCanvas,
  GroupTripSection,
  FlightPriceInfo,
  MeetCopilot,
};
