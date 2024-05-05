"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DepartureSelect({ className }) {
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: today,
    to: null,
  });

  const handleDataSelect = (newDate: DateRange) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div className={cn("grid gap-y-1", className)}>
      <Label htmlFor="departure-select">Departure</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="departure-select"
            variant={"outline"}
            className={cn(
              "justify-start font-normal",
              !date && "text-muted-foreground",
            )}
          ></Button>
        </PopoverTrigger>
        <PopoverContent className="" align="center">
          select
        </PopoverContent>
      </Popover>
    </div>
  );
}
