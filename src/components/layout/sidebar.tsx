"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

const SHEET_SIDES = ["left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function Sidebar() {
  const [pinnedItems, setPinnedItems] = useState([1, 2, 3]);
  const [allItems, setAllItems] = useState([1, 2, 3]);
  const [nextId, setNextId] = useState(4);

  const handleDeletePinned = (index: number) => {
    const newPinnedItems = [...pinnedItems];
    newPinnedItems.splice(index, 1);
    setPinnedItems(newPinnedItems);
  };

  const handleDeleteAll = (index: number) => {
    const newAllItems = [...allItems];
    newAllItems.splice(index, 1);
    setAllItems(newAllItems);
  };

  const handleCreateGroup = () => {
    const newId = nextId;
    //setPinnedItems([...pinnedItems, newId]);
    setAllItems([...allItems, newId]);
    setNextId(newId + 1);
  };

  return (
    <div className="p-4">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" className="shadow-lg w-min bg-white text-gray-800 hover:bg-gray-100">
              Groups →
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="text-left text-2xl mb-4">Groups</SheetTitle>
            </SheetHeader>
            <div className="px-4">
              <h3 className="text-lg font-normal text-gray-500">Pinned</h3>
              <div className="flex flex-col py-4 gap-y-4">
                {pinnedItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-x-2 w-full">
                    <Skeleton className="h-8 flex-grow bg-white border border-gray-200" />
                    <button
                      onClick={() => handleDeletePinned(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-normal text-gray-500">All</h3>
              <div className="flex flex-col py-4 gap-y-4">
                {allItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-x-2 w-full">
                    <Skeleton className="h-8 flex-grow bg-white border border-gray-200" />
                    <button
                      onClick={() => handleDeleteAll(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4 mb-4">
              <Button
                type="button"
                onClick={handleCreateGroup}
                className="w-full max-w-xs"
              >
                + Create Group
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
