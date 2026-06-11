"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import radiair_full_logo_light from "../../../public/radiair_full_logo_light.webp";
import radiair_full_logo_dark from "../../../public/radiair_full_logo_dark.webp";
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
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null); // Update type to accept both User and null
  const [isOpen, setIsOpen] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const supabase = createClient();

    async function fetchUser() {
      const { data, error } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
      } else {
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    } else {
      console.error("Error signing out:", error.message);
    }
  };

  return (
<header className="w-full bg-secondary">
  <nav className="w-full px-8 py-4 flex items-center justify-between">
    {/* Left Section (Logo and Navigation Links) */}
    <div className="flex items-center">
      {/* Logo */}
      <Link href="/" title="radiair homepage" className="flex items-center">
        <Image
          src={radiair_full_logo_light}
          className="w-28 h-auto dark:hidden"
          alt="radiair logo"
        />
        <Image
          src={radiair_full_logo_dark}
          className="w-28 h-auto hidden dark:block"
          alt="radiair logo"
        />
      </Link>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center ml-10 gap-x-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/trips" legacyBehavior passHref>
                <NavigationMenuLink className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  Trips
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-secondary hover:bg-background/60">
                Travel
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[300px] lg:w-[400px]">
                  <li>
                    <Link href="/flights" legacyBehavior passHref>
                      <NavigationMenuLink className="block select-none rounded-md p-2 text-sm font-medium leading-none hover:bg-accent hover:text-accent-foreground">
                        Flights
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/hotels" legacyBehavior passHref>
                      <NavigationMenuLink className="block select-none rounded-md p-2 text-sm font-medium leading-none hover:bg-accent hover:text-accent-foreground">
                        Hotels
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>

    {/* Right Section (User Profile / Sign In) */}
    <div className="flex items-center">
      {user ? (
        <div className="relative flex items-center">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-x-2 bg-background px-4 py-2 rounded-lg hover:bg-background/60 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full">
              {user.email?.[0]?.toUpperCase()}
            </div>
            <span className="text-sm font-light text-muted-foreground">
              {user.email}
            </span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg text-foreground z-50 border border-muted">
              <div className="p-2">
                <button
                  onClick={async () => {
                    setIsOpen(false);
                    await handleSignOut();
                  }}
                  className="w-full text-start p-2 rounded-md hover:bg-background text-red-600"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link href="/sign-in">
          <button className="px-4 py-2 bg-background text-foreground rounded-lg hover:bg-background/60 focus:outline-none focus:ring-2 focus:ring-ring">
            Sign In
          </button>
        </Link>
      )}
    </div>
  </nav>
</header>


  );
}
