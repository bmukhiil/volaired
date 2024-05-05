"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { DepartureSelect } from "@/components/ui/departure/departure-select";
import { ArrivalSelect } from "@/components/ui/arrival/arrival-select";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (
      !searchParams.departure ||
      !searchParams.destination ||
      !searchParams.dateRange
    ) {
      console.log("Missing search parameters");
      return;
    }
    console.log("searching...");
    setLoading(true);
    const response = await fetch("/api/v1/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currencyCode: "CAD",
        originDestinations: [
          {
            id: "1",
            originLocationCode: searchParams.departure,
            destinationLocationCode: searchParams.destination,
            departureDateTimeRange: {
              date: format(searchParams.dateRange.from, "yyyy-MM-dd"),
            },
            arrivalDateTimeRange: {
              date: format(searchParams.dateRange.to, "yyyy-MM-dd"),
            },
          },
        ],
        travelers: [
          {
            id: "1",
            travelerType: "ADULT",
          },
        ],
        sources: ["GDS"],
        searchCriteria: {
          maxFlightOffers: 2,
        },
      }),
    }).then((res) => res.json());
    const data = await response;
    setLoading(false);
    setFlights(data);
  };

  const handleDepartureChange = (e) => {
    setSearchParams({ ...searchParams, departure: e.target.value });
  };

  const handleDestinationChange = (e) => {
    setSearchParams({ ...searchParams, destination: e.target.value });
  };

  const updateDateRange = (dateRange) => {
    setSearchParams((prevParams) => ({ ...prevParams, dateRange }));
  };

  return (
    <main className="px-6 pt-12">
      <div className="flex flex-col gap-y-4">
        <Input
          onChange={(e) => handleDepartureChange(e)}
          placeholder="Departure"
        />
        <Input
          onChange={(e) => handleDestinationChange(e)}
          placeholder="Destination"
        />
        <DepartureSelect />
        <ArrivalSelect />
        <DatePickerWithRange onDateChange={updateDateRange} />
        {loading ? (
          <Button disabled={loading} variant="secondary">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Finding your flights...
          </Button>
        ) : (
          <Button onClick={() => handleSearch()}>Find flights</Button>
        )}
      </div>
    </main>
  );
}
