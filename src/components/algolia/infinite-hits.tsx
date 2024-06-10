"use client";

import React, { useRef, useEffect } from "react";
import { useInfiniteHits, Highlight, Snippet } from "react-instantsearch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { departureAirportAtom, destinationAirportAtom } from "@/lib/atoms";
import { set } from "date-fns";

export default function InfiniteHits({
  setOpen,
  type,
}: {
  setOpen: (value: boolean) => void;
  type: "departure" | "destination";
}) {
  const { hits, isLastPage, showMore } = useInfiniteHits();
  const sentinelRef = useRef(null);

  const [airport, setAirport] = useAtom(
    type === "departure" ? departureAirportAtom : destinationAirportAtom,
  );

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            showMore();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);

  const handleLocSelect = (hit) => {
    setAirport({
      iataCode: hit.iata_code,
      name: hit.name,
      city: hit.city,
      country: hit.country,
    });
    setOpen(false);
  };

  return (
    <ScrollArea className="ais-InfiniteHits overflow-y-auto h-full z-50">
      <ul className="ais-InfiniteHits-list mt-2 flex flex-col gap-y-1">
        {hits.map((hit) => (
          <li
            ref={sentinelRef}
            key={hit.objectID}
            className="ais-InfiniteHits-item"
            aria-hidden="true"
          >
            <article>
              <Button
                className="flex flex-col justify-start items-start w-full h-full text-wrap text-left"
                variant="ghost"
                onClick={() => handleLocSelect(hit)}
              >
                <h2 className="font-medium text-base text-foreground tracking-tight">
                  {hit.name} ({hit.iata_code})
                </h2>
                <p className="text-sm text-muted-foreground font-normal">
                  {hit.city}, {hit.country}
                  <Snippet attribute="description" hit={hit} />
                </p>
              </Button>
            </article>
          </li>
        ))}
        <li ref={sentinelRef} aria-hidden="true" />
      </ul>
    </ScrollArea>
  );
}
