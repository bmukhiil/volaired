"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format, addDays } from "date-fns";

export function MainPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [toggle, setToggle] = useState("Flights");
  const [showTripPlanner, setShowTripPlanner] = useState(true);

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden flex justify-center items-start pt-10">
      {/* Search Form */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          {/* Toggle Buttons */}
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 text-sm font-sans border-b-2 ${
                toggle === "Flights"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-600 hover:text-purple-600"
              }`}
              onClick={() => setToggle("Flights")}
            >
              Flights
            </button>
            <button
              className={`px-4 py-2 text-sm font-sans border-b-2 ${
                toggle === "Hotels"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-600 hover:text-purple-600"
              }`}
              onClick={() => setToggle("Hotels")}
            >
              Hotels
            </button>
          </div>

          {/* Input Fields */}
          <div className="flex flex-wrap gap-4 items-start lg:items-end">
            {/* From Input */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-sans text-gray-600 mb-2 block">
                From
              </label>
              <input
                type="text"
                placeholder="Vancouver, BC (YVR)"
                className="w-full p-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            {/* To Input */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-sans text-gray-600 mb-2 block">
                To
              </label>
              <input
                type="text"
                placeholder="Toronto, ON (YYZ)"
                className="w-full p-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            {/* Dates Picker */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-sans text-gray-600 mb-2 block">
                Dates
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-sans h-[46px] text-sm bg-white"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Passengers */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-sans text-gray-600 mb-2 block">
                Passengers
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-sans h-[46px] text-sm bg-white"
                  >
                    <span>2 Adults</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="p-4">
                    <h4 className="font-sans mb-4">Passengers</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-sans">Adults</p>
                          <p className="text-xs font-sans text-muted-foreground">
                            Age 13+
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon">
                            -
                          </Button>
                          <span className="font-sans w-8 text-center">2</span>
                          <Button variant="outline" size="icon">
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <div className="flex-shrink-0 w-full lg:w-auto lg:mt-[30px]">
              <Button className="w-full lg:w-auto h-[46px] bg-[#6566F1] text-white hover:bg-[#4d4de0] transition-colors">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Trip Planner Component */}
        {showTripPlanner && (
          <div className="bg-gradient-to-br from-fuchsia-400 to-indigo-500 p-[3px] mt-4 rounded-xl flex justify-center items-center shadow-sm">
            <div className="bg-background rounded-lg w-full h-full flex items-center justify-center">
              <div className="w-full bg-gradient-to-br from-fuchsia-400/25 to-indigo-500/25 rounded-lg flex justify-center items-center">
                <div className="shadow-inner flex gap-x-2 items-start w-full p-3 rounded-lg backdrop-blur-md bg-transparent">
                  <svg
                    fill="url(#grad1)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-6"
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
                      fillRule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex flex-col gap-x-2">
                    <span className="font-sans">
                      Create a trip plan?
                    </span>
                    <p className="text-foreground/60 text-sm font-sans">
                      We&apos;ve noticed you have more than one traveller.
                    </p>
                    <div className="mt-4 flex gap-x-2 justify-between items-center">
                      <a
                        href="/trips/create"
                        className="flex items-center gap-x-2 bg-background text-foreground px-4 py-2 rounded-lg hover:bg-background/60 transition font-sans"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg>
                        Create
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
