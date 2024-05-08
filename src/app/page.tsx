"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { AirportSelect } from "@/components/ui/airport-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function Home() {
  const [flightData, setFlightData] = useState({ data: [], meta: {} });
  const [searchParams, setSearchParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [airlineCodes, setAirlineCodes] = useState({});

  const ongoingFetches = useRef(new Set());

  const fetchAirlineCodes = async (iataCode) => {
    // Check if already fetching or data already exists
    if (airlineCodes[iataCode] || ongoingFetches.current.has(iataCode)) {
      return;
    }
    ongoingFetches.current.add(iataCode);
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/airline-codes?iata=${iataCode}`);
      const data = await response.json();
      setAirlineCodes((prev) => ({
        ...prev,
        [iataCode]: data,
      }));
    } catch (error) {
      console.error("Failed to fetch airline codes:", error);
    } finally {
      setLoading(false);
      ongoingFetches.current.delete(iataCode);
    }
  };

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
            // originLocationCode: "YVR",
            // destinationLocationCode: "YYZ",
            // departureDateTimeRange: {
            //   date: "2024-12-01",
            // },
            originLocationCode: searchParams.departure.iata_code,
            destinationLocationCode: searchParams.destination.iata_code,
            departureDateTimeRange: {
              date: searchParams.dateRange.from,
            },
            // api does not allow for departureDateTimeRange + arrivalDateTimeRange
            // arrivalDateTimeRange: {
            //   date: searchParams.dateRange.to,
            // },
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
    });
    const data = await response.json();
    setLoading(false);
    setFlightData(data.flightData);
    console.log(data.flightData);
  };

  const handleAirportChange = (airport, type) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [type === "departure" ? "departure" : "destination"]: airport,
    }));
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toTimeString().substring(0, 5); // Returns time in HH:MM format
  };

  const getFirstDepartureAndLastArrival = (flight) => {
    const firstItinerary = flight.itineraries[0];
    const firstDepartureTime = formatTime(
      firstItinerary.segments[0].departure.at,
    );

    const lastItinerary = flight.itineraries[flight.itineraries.length - 1];
    const lastArrivalTime = formatTime(
      lastItinerary.segments[lastItinerary.segments.length - 1].arrival.at,
    );

    return [firstDepartureTime, lastArrivalTime];
  };

  const testData = {
    meta: {
      count: 2,
    },
    data: [
      {
        type: "flight-offer",
        id: "1",
        source: "GDS",
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: "2024-05-07",
        lastTicketingDateTime: "2024-05-07",
        numberOfBookableSeats: 9,
        itineraries: [
          {
            duration: "PT4H27M",
            segments: [
              {
                departure: {
                  iataCode: "YVR",
                  terminal: "M",
                  at: "2024-12-01T17:10:00",
                },
                arrival: {
                  iataCode: "YYZ",
                  terminal: "3",
                  at: "2024-12-02T00:37:00",
                },
                carrierCode: "WS",
                number: "722",
                aircraft: {
                  code: "73W",
                },
                operating: {
                  carrierCode: "WS",
                },
                duration: "PT4H27M",
                id: "1",
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
        ],
        price: {
          currency: "CAD",
          total: "361.30",
          base: "289.00",
          fees: [
            {
              amount: "0.00",
              type: "SUPPLIER",
            },
            {
              amount: "0.00",
              type: "TICKETING",
            },
          ],
          grandTotal: "361.30",
          additionalServices: [
            {
              amount: "36.80",
              type: "CHECKED_BAGS",
            },
          ],
        },
        pricingOptions: {
          fareType: ["PUBLISHED"],
          includedCheckedBagsOnly: false,
        },
        validatingAirlineCodes: ["WS"],
        travelerPricings: [
          {
            travelerId: "1",
            fareOption: "STANDARD",
            travelerType: "ADULT",
            price: {
              currency: "CAD",
              total: "361.30",
              base: "289.00",
            },
            fareDetailsBySegment: [
              {
                segmentId: "1",
                cabin: "ECONOMY",
                fareBasis: "LCVD0LBG",
                brandedFare: "BASIC",
                brandedFareLabel: "BASIC",
                class: "E",
                includedCheckedBags: {
                  quantity: 0,
                },
                amenities: [
                  {
                    description: "FIRST PAID CHECKED BAG",
                    isChargeable: true,
                    amenityType: "BAGGAGE",
                    amenityProvider: {
                      name: "BrandedFare",
                    },
                  },
                  {
                    description: "SEAT ASSIGNMENT",
                    isChargeable: true,
                    amenityType: "PRE_RESERVED_SEAT",
                    amenityProvider: {
                      name: "BrandedFare",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "flight-offer",
        id: "2",
        source: "GDS",
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: "2024-05-07",
        lastTicketingDateTime: "2024-05-07",
        numberOfBookableSeats: 9,
        itineraries: [
          {
            duration: "PT4H27M",
            segments: [
              {
                departure: {
                  iataCode: "YVR",
                  terminal: "M",
                  at: "2024-12-01T22:35:00",
                },
                arrival: {
                  iataCode: "YYZ",
                  terminal: "3",
                  at: "2024-12-02T06:02:00",
                },
                carrierCode: "WS",
                number: "724",
                aircraft: {
                  code: "73W",
                },
                operating: {
                  carrierCode: "WS",
                },
                duration: "PT4H27M",
                id: "2",
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
        ],
        price: {
          currency: "CAD",
          total: "361.30",
          base: "289.00",
          fees: [
            {
              amount: "0.00",
              type: "SUPPLIER",
            },
            {
              amount: "0.00",
              type: "TICKETING",
            },
          ],
          grandTotal: "361.30",
          additionalServices: [
            {
              amount: "36.80",
              type: "CHECKED_BAGS",
            },
          ],
        },
        pricingOptions: {
          fareType: ["PUBLISHED"],
          includedCheckedBagsOnly: false,
        },
        validatingAirlineCodes: ["WS"],
        travelerPricings: [
          {
            travelerId: "1",
            fareOption: "STANDARD",
            travelerType: "ADULT",
            price: {
              currency: "CAD",
              total: "361.30",
              base: "289.00",
            },
            fareDetailsBySegment: [
              {
                segmentId: "2",
                cabin: "ECONOMY",
                fareBasis: "LCVD0LBG",
                brandedFare: "BASIC",
                brandedFareLabel: "BASIC",
                class: "E",
                includedCheckedBags: {
                  quantity: 0,
                },
                amenities: [
                  {
                    description: "FIRST PAID CHECKED BAG",
                    isChargeable: true,
                    amenityType: "BAGGAGE",
                    amenityProvider: {
                      name: "BrandedFare",
                    },
                  },
                  {
                    description: "SEAT ASSIGNMENT",
                    isChargeable: true,
                    amenityType: "PRE_RESERVED_SEAT",
                    amenityProvider: {
                      name: "BrandedFare",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    dictionaries: {
      locations: {
        YVR: {
          cityCode: "YVR",
          countryCode: "CA",
        },
        YYZ: {
          cityCode: "YTO",
          countryCode: "CA",
        },
      },
      aircraft: {
        "73W": "BOEING 737-700 (WINGLETS)",
      },
      currencies: {
        CAD: "CANADIAN DOLLAR",
      },
      carriers: {
        WS: "WESTJET",
      },
    },
  };

  useEffect(() => {
    console.log(airlineCodes);
  }, [airlineCodes]);

  useEffect(() => {
    // setFlightData(testData);
    setSearchParams({
      departure: {
        iata_code: "YVR",
        name: "Vancouver",
        city: "Vancouver",
        country: "Canada",
      },
      destination: {
        iata_code: "YYZ",
        name: "Toronto",
        city: "Toronto",
        country: "Canada",
      },
      dateRange: { from: "2024-12-01", to: "2024-12-02" },
    });
  }, []);

  useEffect(() => {
    flightData.data.forEach((flight) => {
      const carrierCode = flight.itineraries[0].segments[0].carrierCode;
      if (carrierCode && !airlineCodes[carrierCode]) {
        fetchAirlineCodes(carrierCode);
      }
    });
    console.log(airlineCodes);
  }, [flightData.data]);

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

  const parseDuration = (duration) => {
    const regex = /PT(\d+H)?(\d+M)?/;
    const matches = duration.match(regex);
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    return `${hours}h ${minutes}m`;
  };

  return (
    <main className="p-6">
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
      <div className="my-8">
        <Separator />
      </div>
      <div className="flex flex-col gap-y-4 mb-8">
        {flightData && Array.isArray(flightData.data) ? (
          flightData.data.map((flight) => {
            const [firstDepartureTime, lastArrivalTime] =
              getFirstDepartureAndLastArrival(flight);
            const duration = parseDuration(flight.itineraries[0].duration);
            const stops = flight.itineraries[0].segments.length - 1;

            return (
              <Drawer key={flight.id} className="">
                <DrawerTrigger>
                  <Card className="flex flex-col items-center">
                    <CardHeader className="w-full">
                      <div className="flex items-center gap-x-2">
                        <div className="flex flex-col items-center">
                          <h2 className="text-xl font-semibold tracking-tight">
                            {firstDepartureTime}
                          </h2>
                          <h3 className="text-xs text-muted-foreground font-medium">
                            {
                              flight.itineraries[0].segments[0].departure
                                .iataCode
                            }
                          </h3>
                        </div>
                        <Separator className="flex shrink" />
                        <div className="flex flex-col items-center">
                          <h2 className="text-sm text-nowrap font-semibold tracking-tight">
                            {duration}
                          </h2>
                          <Badge
                            variant="secondary"
                            className="text-nowrap text-xs font-semibold"
                          >
                            {stops} stops
                          </Badge>
                        </div>
                        <Separator className="flex shrink" />
                        <div className="flex flex-col items-center">
                          <h2 className="text-xl font-semibold tracking-tight">
                            {lastArrivalTime}
                          </h2>
                          <h3 className="text-xs text-muted-foreground font-medium">
                            {
                              flight.itineraries[flight.itineraries.length - 1]
                                .segments[0].arrival.iataCode
                            }
                          </h3>
                        </div>
                      </div>
                      <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card Content</p>
                    </CardContent>
                    <Separator className="my-2 w-full" />
                    <CardFooter className="flex flex-col gap-y-2 w-full">
                      <h2 className="font-semibold text-xl tracking-tight">
                        ${flight.price.total}
                        {flight.price.currency}
                      </h2>
                      <Button className="w-full">Select</Button>
                    </CardFooter>
                  </Card>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col justify-center items-center h-[85vh]">
                  <DrawerHeader>
                    <DrawerTitle className="">Trip Details</DrawerTitle>
                    <Separator className="my-2 w-full" />
                    <DrawerDescription>
                      <ScrollArea className="w-full h-full">
                        <div>
                          <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            To {searchParams.destination?.city},{" "}
                            {searchParams.destination?.country}
                          </h2>
                          {flight.itineraries[0].segments.map((segment) => (
                            <div
                              key={segment.id}
                              className="flex items-center flex-col"
                            >
                              <div className="">
                                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                  {formatTime(segment.departure.at)}
                                </h2>
                                <span className="font-medium text-sm">
                                  {segment.departure.iataCode}
                                </span>
                              </div>
                              <div className="flex flex-col items-center gap-y-2">
                                <Separator
                                  className="w-[1px] h-[6vh]"
                                  orientation="vertical"
                                />
                                <h2>{duration}</h2>
                                <Separator
                                  className="w-[1px] h-[6vh]"
                                  orientation="vertical"
                                />
                              </div>
                              <div>
                                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                  {formatTime(segment.arrival.at)}
                                </h2>
                                <span className="font-medium text-sm">
                                  {segment.arrival.iataCode}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* <h2>
                          {
                            airlineCodes[
                              flight.itineraries[0].segments[0].carrierCode
                            ]?.airlineCode?.data[0]?.businessName
                          }
                        </h2> */}
                      </ScrollArea>
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter className="w-full flex justify-center">
                    <Separator className="my-2" />
                    <h2 className="text-center font-semibold text-xl tracking-tight">
                      ${flight.price.total}
                      {flight.price.currency}
                    </h2>
                    <Button className="w-full">Select</Button>
                    <DrawerClose>
                      <Button variant="outline" className="w-full">
                        Cancel
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            );
          })
        ) : (
          <p>No flights found</p>
        )}
      </div>
    </main>
  );
}
