"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CustomSearchBox from "@/components/ui/algolia/custom-search-box";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Snippet,
  useInstantSearch,
} from "react-instantsearch";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

const Hit = ({ hit }) => {
  return (
    <div className="mt-4">
      <h2 className="font-medium">
        <Highlight attribute="name" hit={hit} /> ({hit.iata_code})
      </h2>
      <p className="text-sm text-muted-foreground">
        {hit.city}, {hit.country}
      </p>
    </div>
  );
};

const EmptyQueryBoundary = ({ children, fallback }) => {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
};

// implement search url w/ react instant search

export function DepartureSelect({ className }) {
  const [iata_code, setIata_code] = React.useState("");

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="dev_volaired"
      insights
      routing={true}
    >
      <div className={cn("grid gap-y-1", className)}>
        <Label htmlFor="departure-select">Flying from</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="departure-select"
              variant={"outline"}
              className={cn(
                "justify-start font-normal",
                !iata_code && "text-muted-foreground",
              )}
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
            </Button>
          </PopoverTrigger>
          <PopoverContent className="" align="start">
            <CustomSearchBox />
            {/* <EmptyQueryBoundary fallback={null}> */}
            <Hits hitComponent={Hit} />
            {/* </EmptyQueryBoundary> */}
          </PopoverContent>
        </Popover>
      </div>
    </InstantSearch>
  );
}
