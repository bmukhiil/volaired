"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { DepartureSelect } from "@/components/ui/departure/departure-select";
import { ArrivalSelect } from "@/components/ui/arrival/arrival-select";
import { AirportSelect } from "@/components/ui/airport-select";

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
    console.log(searchParams);
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
            originLocationCode: searchParams.departure.iata_code,
            destinationLocationCode: searchParams.destination.iata_code,
            departureDateTimeRange: {
              date: searchParams.dateRange.from,
            },
            arrivalDateTimeRange: {
              date: searchParams.dateRange.to,
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

  const handleAirportChange = (airport, type) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [type === "departure" ? "departure" : "destination"]: airport,
    }));
  };

  const updateDateRange = (dateRange) => {
    const { from, to } = dateRange;
    const formattedDateRange = {
      from: format(from, "yyyy-MM-dd"),
      to: format(to, "yyyy-MM-dd"),
    };
    setSearchParams((prevParams) => ({
      ...prevParams,
      dateRange: formattedDateRange,
    }));
  };

  return (
    <main className="px-6 pt-12">
      <div className="flex flex-col gap-y-4">
        <AirportSelect
          type="departure"
          airport={searchParams.departure}
          onAirportChange={(airport) =>
            handleAirportChange(airport, "departure")
          }
        />
        <AirportSelect
          type="destination"
          airport={searchParams.destination}
          onAirportChange={(airport) =>
            handleAirportChange(airport, "destination")
          }
        />
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
