"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

const SHEET_SIDES = ["left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function Sidebar() {
  return (
    <div className="flex items-center p-4">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="shadow-lg bg-white text-gray-800 hover:bg-gray-100"
            >
              Groups →
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="text-left mb-4">Groups</SheetTitle>
            </SheetHeader>
            <h3 className="text-lg font-light">Pinned</h3>
            <div className="flex flex-col py-4 gap-y-6">
              <Skeleton className="h-8 w-[235px] bg-white border border-gray-200" />
              <Skeleton className="h-8 w-[235px] bg-white border border-gray-200" />
            </div>
            <h3 className="text-lg font-light">All</h3>
            <div className="flex flex-col py-4 gap-y-6">
              <Skeleton className="h-8 w-[235px] bg-white border border-gray-200" />
              <Skeleton className="h-8 w-[235px] bg-white border border-gray-200" />
            </div>
            <SheetFooter className="flex justify-start mt-4">
              <SheetClose asChild>
                <Button type="submit" className="w-[250px]">
                  + Create Group
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
