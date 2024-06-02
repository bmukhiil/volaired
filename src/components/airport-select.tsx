"use client";

import { useAtom, useAtomValue } from "jotai";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CustomSearchBox from "./algolia/custom-search-box";
import EmptyQueryBoundary from "./algolia/empty-query-boundary";
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
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  useInfiniteHits,
  Hits,
  Highlight,
  Snippet,
  useInstantSearch,
} from "react-instantsearch";
import InfiniteHits from "./algolia/infinite-hits";
import { departureAirportAtom, destinationAirportAtom } from "@/lib/atoms";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

interface Airport {
  iata_code: string;
  name: string;
  city: string;
  country: string;
}

// implement search url w/ react instant search
export function AirportSelect({ type }: { type: "departure" | "destination" }) {
  const [open, setOpen] = useState(false);
  const airport = useAtomValue(
    type === "departure" ? departureAirportAtom : destinationAirportAtom,
  );

  React.useEffect(() => {
    console.log(airport);
  }, [airport]);

  return (
    <InstantSearch
      // future={
      //   preserveSharedStateOnUnmount: true,
      // }
      searchClient={searchClient}
      indexName="dev_volaired"
      //   insights
      routing={true}
    >
      <div className="grid gap-y-1">
        <Label htmlFor="airport-select">
          {type === "departure" ? "Flying from" : "Flying to"}
        </Label>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger>
            <Button
              id="airport-select"
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
              <span
                className={cn(
                  "truncate flex-none overflow-hidden text-muted-foreground",
                  airport.iataCode && "text-foreground",
                )}
              >
                {airport.iataCode ? (
                  <>
                    {airport.city}, {airport.country} ({airport.iataCode})
                  </>
                ) : (
                  "Select an airport"
                )}
              </span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Choose your {type} airport</DrawerTitle>
              <DrawerDescription className="h-96 pb-4">
                <CustomSearchBox />
                <EmptyQueryBoundary>
                  <InfiniteHits setOpen={setOpen} type={type} />
                </EmptyQueryBoundary>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </InstantSearch>
  );
}
