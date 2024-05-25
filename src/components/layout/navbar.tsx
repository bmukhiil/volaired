"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

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
  const [bookingOpen, setBookingOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

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
      setBookingOpen(false);
      setCompanyOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  const handleDropdownClick = (dropdown: string) => {
    if (dropdown === "booking") {
      setBookingOpen(!bookingOpen);
      setCompanyOpen(false);
    } else if (dropdown === "company") {
      setCompanyOpen(!companyOpen);
      setBookingOpen(false);
    }
  };

  return (
    <header className="w-screen sticky inset-0 shadow-sm z-50">
      <nav className="bg-secondary border-b border-dashed px-6 lg:px-28 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight text-2xl text-foreground"
          title="Volaired homepage"
        >
          volaired
        </Link>
        <div>
          <div className="hidden lg:flex items-center gap-x-20">
            <Link href="/trips" className="text-muted-foreground font-medium">
              Trips
            </Link>
            <Link href="/" className="text-muted-foreground font-medium">
              Booking
            </Link>
            <Link href="/deals" className="text-muted-foreground font-medium">
              Deals & Offers
            </Link>
            <Link
              href="/partnerships"
              className="text-muted-foreground font-medium"
            >
              Partnerships
            </Link>
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
            {/* Sign in */}
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
            <motion.div className="" variants={itemVariants}>
              <Link href="/" className="text-muted-foreground font-medium">
                Trips
              </Link>
            </motion.div>
            <motion.div
              className={cn(
                "flex gap-x-3 items-center text-muted-foreground font-medium transition",
                {
                  "text-foreground": bookingOpen,
                },
              )}
              variants={itemVariants}
              onClick={() => handleDropdownClick("booking")}
            >
              Booking{" "}
              {/* <AnimatePresence mode="wait">
                {bookingOpen ? ( */}
              <motion.svg
                variants={chevronVariants}
                initial="closed"
                animate={bookingOpen ? "open" : "closed"}
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
                },
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
              <Link href="/sign-in">
                <Button className="w-full">Sign in</Button>
              </Link>
              <div className="flex items-center gap-x-3">
                <Separator className="flex shrink" />
                <span className="font-medium text-muted-foreground">OR</span>
                <Separator className="flex shrink" />
              </div>
              <Link href="/sign-up">
                <Button className="w-full bg-background text-foreground hover:bg-background/60">
                  Sign up
                </Button>
              </Link>
            </motion.div>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
