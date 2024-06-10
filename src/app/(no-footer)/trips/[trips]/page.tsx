"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleHeader,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TripSettingsButton from "@/components/ui/TripSettings";

export default function TripPage() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();
  // const { input, handleInputChange, handleSubmit, data } = useChat();

  // const messages = [
  //   {
  //     role: "user",
  //     content: "Hi",
  //   },
  // ];

  return (
    <div className="-m-4 flex flex-col gap-y-6">
      {/* <Button
        asChild
        className="w-full bg-background text-foreground flex gap-x-2"
      >
        <Link href="/trips">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="size-5"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z"
              clip-rule="evenodd"
            />
          </svg>
          Back to Trips
        </Link>
      </Button>
      <Separator /> */}
      <Tabs
        defaultValue="trip-plan"
        className="lg:hidden flex justify-center flex-col"
      >
        <TabsList className="flex gap-x-1 h-12 rounded-xl">
          <TabsTrigger value="trip-plan" className="h-full w-full rounded-lg">
            Trip Plan
          </TabsTrigger>
          <TabsTrigger
            value="copilot"
            className="opacity-30 data-[state=active]:opacity-100 h-full w-full bg-gradient-to-br from-fuchsia-400 to-indigo-500 p-[2.5px] rounded-lg flex justify-center items-center shadow-sm"
          >
            <div className="bg-background rounded-lg w-full h-full flex items-center justify-center">
              <div className="h-full w-full bg-gradient-to-br from-fuchsia-400/25 to-indigo-500/25 rounded-lg flex justify-center items-center">
                <div className="shadow-inner flex gap-x-2 items-center justify-center w-full h-full rounded-lg backdrop-blur-md bg-transparent">
                  {/* <svg
                    fill="url(#grad1)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="size-6"
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
                      fill-rule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clip-rule="evenodd"
                    />
                  </svg> */}
                  <span className="font-medium duration-0">Copilot</span>
                </div>
              </div>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="trip-plan">
          <AnimatePresence>
            <motion.div
              key="trip-plan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              <div className="bg-black relative overflow-hidden rounded-xl p-2">
                <Image
                  src="/vancouver.jpg"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 opacity-15"
                />
                <div className="relative z-10">
                  <div className="flex justify-between">
                    <Button size="icon" className="bg-background rounded-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-6"
                      >
                        <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                      </svg>
                    </Button>
                    <TripSettingsButton />
                  </div>
                  <div className="flex flex-col gap-y-4 p-5">
                    <div>
                      <h1 className="text-2xl font-bold text-secondary text-center">
                        Summer Adventure to Europe
                      </h1>
                      <p className="text-background text-center text-sm">
                        June 1, 2022 - June 15, 2022
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-background p-1 flex rounded-full gap-x-2 items-center">
                        <div className="flex items-center">
                          <Image
                            src="https://itin-dev.sfo2.cdn.digitaloceanspaces.com/profilePicture/nSFC74Naxn1NTZ4l"
                            alt=""
                            width={50}
                            height={50}
                            className="w-8 h-8 rounded-full"
                          />
                          <Image
                            src="https://itin-dev.sfo2.cdn.digitaloceanspaces.com/profilePicture/SQptUWNel3Ftc28t"
                            alt=""
                            width={50}
                            height={50}
                            className="w-8 h-8 rounded-full ring-2 ring-secondary -translate-x-1"
                          />
                        </div>
                        <div
                          onClick={() =>
                            toast("Event has been created", {
                              description:
                                "Sunday, December 03, 2023 at 9:00 AM",
                              action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                              },
                            })
                          }
                          className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="size-5"
                          >
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Collapsible open={true} className="mt-4">
                <CollapsibleHeader>Your Overview</CollapsibleHeader>
                <CollapsibleBody>
                  {" "}
                  <div className="flex flex-col gap-y-2">
                    <h3 className="font-semibold text-xl">Notes</h3>
                    <div className="w-full bg-background p-2 rounded-xl flex flex-col gap-y-1">
                      <li className="bg-secondary py-1 px-2 rounded-lg flex items-center justify-between text-sm font-medium gap-x-2">
                        Lorem ipsum dolor sit amet.
                        <Image
                          src="https://itin-dev.sfo2.cdn.digitaloceanspaces.com/profilePicture/nSFC74Naxn1NTZ4l"
                          alt=""
                          width={50}
                          height={50}
                          className="w-6 h-6 rounded-full"
                        />
                      </li>
                      <li className="bg-secondary py-1 px-2 rounded-lg flex items-center justify-between text-sm font-medium gap-x-2">
                        The quick brown fox jumps over the lazy dog.
                        <Image
                          src="https://itin-dev.sfo2.cdn.digitaloceanspaces.com/profilePicture/nSFC74Naxn1NTZ4l"
                          alt=""
                          width={50}
                          height={50}
                          className="w-6 h-6 rounded-full"
                        />
                      </li>
                      <span className="text-center text-xs text-muted-foreground">
                        +3 more
                      </span>
                      <span className="justify-center flex items-center text-sm mt-2 font-medium gap-x-1">
                        View more details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="size-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <h3 className="font-semibold text-xl">Budget</h3>
                    <div className="w-full bg-background p-2 rounded-xl flex flex-col gap-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">
                          Total Budget
                        </span>
                        <Button
                          size="icon"
                          className="w-8 h-8 bg-secondary rounded-lg hover:bg-secondary/60"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="size-4 text-foreground"
                          >
                            <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                          </svg>
                        </Button>
                      </div>
                      <div className="flex justify-between items-end">
                        <h4 className="font-semibold text-xl">$1,000.00</h4>
                        <span className="font-medium text-xs">
                          Total: $1,500.00
                        </span>
                      </div>
                      <div className="relative bg-muted-foreground/50 w-full h-2 rounded-full">
                        <span className="absolute bg-primary w-3/4 h-2 rounded-full" />
                      </div>
                      <span className="justify-center flex items-center text-sm mt-2 font-medium gap-x-1">
                        View more details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="size-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <Button className="hover:bg-background bg-secondary w-full border border-dashed justify-center px-4 py-6 rounded-xl flex gap-y-1">
                    <span className="flex items-center gap-x-2 text-sm font-medium text-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="size-5 text-foreground"
                      >
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                      </svg>
                      Create a new item
                    </span>
                  </Button>
                </CollapsibleBody>
              </Collapsible>
              <Collapsible open={true}>
                <CollapsibleHeader>Your Plan</CollapsibleHeader>
                <CollapsibleBody>
                  <div className="flex flex-col gap-y-2">
                    <h3 className="font-semibold text-xl">Itinerary</h3>
                    <div className="w-full bg-background p-2 rounded-xl flex flex-col gap-y-1">
                      <li className="bg-secondary py-1 px-2 rounded-lg flex items-center justify-between text-sm font-medium gap-x-2">
                        Lorem ipsum dolor sit amet.
                        <Image
                          src="https://itin-dev.sfo2.cdn.digitaloceanspaces.com/profilePicture/nSFC74Naxn1NTZ4l"
                          alt=""
                          width={50}
                          height={50}
                          className="w-6 h-6 rounded-full"
                        />
                      </li>
                      <li className="bg-secondary py-1 px-2 rounded-lg flex items-center justify-between text-sm font-medium gap-x-2">
                        The quick brown fox jumps over the lazy dog.
                        <Image
                          src="https://itin-dev.sfo2.cdn.digitaloceanspaces.com/profilePicture/nSFC74Naxn1NTZ4l"
                          alt=""
                          width={50}
                          height={50}
                          className="w-6 h-6 rounded-full"
                        />
                      </li>
                      <span className="text-center text-xs text-muted-foreground">
                        +3 more
                      </span>
                      <span className="justify-center flex items-center text-sm mt-2 font-medium gap-x-1">
                        View more details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="size-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <h3 className="font-semibold text-xl">Budget</h3>
                    <div className="w-full bg-background p-2 rounded-xl flex flex-col gap-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">
                          Total Budget
                        </span>
                        <Button
                          size="icon"
                          className="w-8 h-8 bg-secondary rounded-lg hover:bg-secondary/60"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="size-4 text-foreground"
                          >
                            <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                          </svg>
                        </Button>
                      </div>
                      <div className="flex justify-between items-end">
                        <h4 className="font-semibold text-xl">$1,000.00</h4>
                        <span className="font-medium text-xs">
                          Total: $1,500.00
                        </span>
                      </div>
                      <div className="relative bg-muted-foreground/50 w-full h-2 rounded-full">
                        <span className="absolute bg-primary w-3/4 h-2 rounded-full" />
                      </div>
                      <span className="justify-center flex items-center text-sm mt-2 font-medium gap-x-1">
                        View more details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="size-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </CollapsibleBody>
              </Collapsible>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
        <TabsContent value="copilot">
          <AnimatePresence>
            <motion.div
              key="copilot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-[80dvh] flex flex-col border rounded-xl p-4"
            >
              <div className="flex flex-col items-center">
                {messages.length === 0 && (
                  <>
                    <div className="flex justify-center opacity-50">
                      <div className="border rounded-xl p-1">
                        <Image
                          src="/radiair_logo_light.webp"
                          alt="Radiair Logo"
                          width={200}
                          height={200}
                          className="w-12 h-12"
                        />
                      </div>
                    </div>
                    <div className="w-5/6 flex flex-col justify-center gap-y-4">
                      <h1 className="text-2xl font-semibold tracking-tight text-center">
                        Copilot
                      </h1>
                      <p className="text-sm font-medium text-muted-foreground text-center">
                        👋 Hi, I’m Copilot. I can help you plan your trip and
                        also add them to your itinerary for for future planning.
                      </p>
                      <div className="bg-background font-medium text-sm rounded-xl px-4 py-2 border shadow-sm">
                        Can you recommend places to visit that everyone in our
                        group would enjoy?
                      </div>
                      <div className="bg-background font-medium text-sm rounded-xl px-4 py-2 border shadow-sm">
                        Are there any unique attractions that fit our group's
                        interests?
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex-1 overflow-y-auto">
                {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
                {messages.map((m) => (
                  <div key={m.id} className="mb-5">
                    {m.role === "user" ? (
                      <div className="flex justify-end">
                        <div className="ml-auto max-w-[75dvw] bg-background px-4 py-2 rounded-xl">
                          {m.content}
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-x-2">
                        <span className="rounded-full bg-background flex items-center justify-center w-8 h-8">
                          <Image
                            src="/copilot_logo.svg"
                            alt="Copilot Logo"
                            width={25}
                            height={25}
                            className="w-5 h-5"
                          />
                        </span>
                        <div className="max-w-[35dvh] mt-[1px]">
                          {m.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleSubmit}
                className="-mx-2 -mb-2 pt-1 flex items-center"
              >
                <Input
                  placeholder="Message Copilot"
                  value={input}
                  className="border-none rounded-l-xl rounded-r-none h-12"
                  onChange={handleInputChange}
                />
                <Button
                  size="icon"
                  className="bg-background rounded-l-none rounded-r-xl flex items-center justify-center h-12"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="size-5 text-foreground"
                  >
                    <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                  </svg>
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}
