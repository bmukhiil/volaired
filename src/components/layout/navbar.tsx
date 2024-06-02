"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import radiair_full_logo_light from "../../../public/radiair_full_logo_light.webp";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const itemVariants: Variants = {
  open: {
    opacity: 1,
  },
  closed: { opacity: 0, transition: { duration: 0.2 } },
};

const chevronVariants: Variants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tripOpen, settripOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      // const supabase = createClient();
      // const { data } = await supabase.auth.getUser();
      // if (data) {
      //   setUser(data.user);
      //   console.log(data.user);
      // }
    }
    checkUser();
  }, []);

  const links = [
    {
      name: "volaired",
      href: "/",
      title: "Go to Volaired homepage",
    },
    {
      name: "About",
      href: "/about",
      title: "Learn more about Volaired",
    },
    {
      name: "Contact",
      href: "/contact",
      title: "Contact Volaired",
    },
  ];

  const handleMenuClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
      settripOpen(false);
      setCompanyOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  const handleDropdownClick = (dropdown: string) => {
    if (dropdown === "booking") {
      settripOpen(!tripOpen);
      setCompanyOpen(false);
    } else if (dropdown === "company") {
      setCompanyOpen(!companyOpen);
      settripOpen(false);
    }
  };

  const handleSignOut = async () => {};

  return (
    <header className="w-screen sticky inset-0 z-50">
      <nav className="bg-secondary border-b border-dashed px-6 lg:px-28 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold tracking-tight text-2xl text-foreground"
          title="radiair homepage"
        >
          <Image
            src={radiair_full_logo_light}
            className="w-28 h-auto"
            alt="radiair logo"
          />
        </Link>
        <div>
          <div className="hidden lg:flex items-center gap-x-20">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-secondary hover:bg-background/60">
                    Trips
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              class="size-5"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v4A1.5 1.5 0 0 0 2.5 10h6A1.5 1.5 0 0 0 10 8.5v-4A1.5 1.5 0 0 0 8.5 3h-6Zm11 2A1.5 1.5 0 0 0 12 6.5v7a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 17.5 5h-4Zm-10 7A1.5 1.5 0 0 0 2 13.5v2A1.5 1.5 0 0 0 3.5 17h6a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 9.5 12h-6Z"
                                clip-rule="evenodd"
                              />
                            </svg>

                            <div className="mb-2 mt-4 text-lg font-medium">
                              Create a trip
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed components that you can copy
                              and paste into your apps. Accessible.
                              Customizable. Open Source.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/docs" title="Introduction">
                        Re-usable components built using Radix UI and Tailwind
                        CSS.
                      </ListItem>
                      <ListItem href="/docs/installation" title="Installation">
                        How to install dependencies and structure your app.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Typography"
                      >
                        Styles for headings, paragraphs, lists...etc
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-secondary hover:bg-background/60">
                    Deals & Offers
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/partnerships" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Partnerships
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link href="/sign-in">
              <Button className="bg-background text-foreground hover:bg-background/60 hidden lg:flex gap-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="size-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Sign in
              </Button>
            </Link>
          </div>
          <Button
            size="icon"
            onClick={handleMenuClick}
            className="lg:hidden bg-background hover:bg-background/60 flex items-center gap-x-2"
          >
            {
              <AnimatePresence>
                {menuOpen ? (
                  <motion.svg
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    exit={{ rotate: 0 }}
                    transition={{ duration: 0.4 }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="size-5 text-foreground duration-0"
                  >
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="size-5 text-foreground duration-0"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                      clip-rule="evenodd"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            }
          </Button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                opacity: 1,
                height: 375,
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.6,
                  delayChildren: 0.2,
                  staggerChildren: 0.05,
                },
              },
              closed: {
                opacity: 0,
                height: 0,
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.6,
                },
              },
            }}
            className="gap-y-4 flex flex-col px-6 py-4 absolute bg-secondary w-full shadow-xl rounded-b-2xl"
          >
            <motion.div
              className={cn(
                "flex gap-x-3 items-center text-muted-foreground font-medium transition",
                {
                  "text-foreground": tripOpen,
                }
              )}
              variants={itemVariants}
              onClick={() => handleDropdownClick("booking")}
            >
              Trips
              <motion.svg
                variants={chevronVariants}
                initial="closed"
                animate={tripOpen ? "open" : "closed"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </motion.svg>
            </motion.div>
            <AnimatePresence>
              {tripOpen && (
                <motion.ul className="ml-2 flex flex-col gap-y-2">
                  <motion.li className="text-sm font-medium text-muted-foreground flex items-center gap-x-2">
                    <div className="bg-background p-1 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="size-5 text-foreground"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2.5 3A1.5 1.5 0 0 0 1 4.5v4A1.5 1.5 0 0 0 2.5 10h6A1.5 1.5 0 0 0 10 8.5v-4A1.5 1.5 0 0 0 8.5 3h-6Zm11 2A1.5 1.5 0 0 0 12 6.5v7a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 17.5 5h-4Zm-10 7A1.5 1.5 0 0 0 2 13.5v2A1.5 1.5 0 0 0 3.5 17h6a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 9.5 12h-6Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    Create a trip
                  </motion.li>
                  <motion.li className="text-sm font-medium text-muted-foreground flex items-center gap-x-2">
                    <div className="bg-background p-1 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="size-5 text-foreground"
                      >
                        <path d="M14 17h2.75A2.25 2.25 0 0 0 19 14.75v-9.5A2.25 2.25 0 0 0 16.75 3H14v14ZM12.5 3h-5v14h5V3ZM3.25 3H6v14H3.25A2.25 2.25 0 0 1 1 14.75v-9.5A2.25 2.25 0 0 1 3.25 3Z" />
                      </svg>
                    </div>
                    View your trips
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
            <motion.div
              className="text-muted-foreground font-medium"
              variants={itemVariants}
            >
              Deals & Offers
            </motion.div>
            <motion.div className="" variants={itemVariants}>
              <Link
                href="/contact"
                className="text-muted-foreground font-medium"
              >
                Partnerships
              </Link>
            </motion.div>
            <motion.div
              className={cn(
                "flex items-center gap-x-3 text-muted-foreground font-medium",
                {
                  "text-foreground": companyOpen,
                }
              )}
              onClick={() => handleDropdownClick("company")}
              variants={itemVariants}
            >
              Company{" "}
              <motion.svg
                variants={chevronVariants}
                initial="closed"
                animate={companyOpen ? "open" : "closed"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </motion.svg>
            </motion.div>
            <motion.div
              className="flex flex-col gap-y-2 mt-4"
              variants={itemVariants}
            >
              {user ? (
                <>
                  <Link href="/profile/settings" className="w-full">
                    <Button className="flex item-center gap-x-2 w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="size-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Settings
                    </Button>
                  </Link>
                  <Link href="/sign-out" className="w-full">
                    <Button className="flex items-center gap-x-2 w-full bg-background text-foreground hover:bg-background/60">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="size-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Sign out
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button className="w-full">Sign in</Button>
                  </Link>
                  <div className="flex items-center gap-x-3">
                    <Separator className="flex shrink" />
                    <span className="font-medium text-foreground">or</span>
                    <Separator className="flex shrink" />
                  </div>
                  <Link href="/sign-up">
                    <Button className="w-full bg-background text-foreground hover:bg-background/60">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
