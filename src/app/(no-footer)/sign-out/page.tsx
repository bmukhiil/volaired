"use client";

import { useEffect, useState } from "react";
import { signOut } from "@/lib/supabase/actions";

export default function SignOut() {
  const [error, setError] = useState(false);

  useEffect(() => {
    // sign out
    async function signOutUser() {
      try {
        await signOut();
      } catch (error) {
        setError(true);
        console.error("Error signing out:", error);
      }
    }

    signOutUser();
  }, []);
}
