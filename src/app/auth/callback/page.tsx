"use client";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/server";
import { useRouter } from "next/navigation"; // Correct import for app directory

export default function AuthCallback() {
  const supabase = createClient();
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error retrieving session:", error.message);
      } else {
        console.log("Session retrieved:", data);
        router.push("/"); // Redirect to the main page
      }
    };

    handleAuthCallback();
  }, [router]); // Add dependencies

  return <p>Processing authentication...</p>;
}
