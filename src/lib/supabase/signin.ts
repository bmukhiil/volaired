"use client"; // Ensure the file is client-side

import { createClient } from "@/lib/supabase/server";


export async function signinGoogle() {
   const supabase = createClient(); // Ensures client-side usage
   try {
     const { data, error } = await supabase.auth.signInWithOAuth({
       provider: "google",
       options: {
         redirectTo: `http://localhost:3000/auth/callback`, // Ensure this matches your Supabase settings
       },
     });
 
     if (error) {
       console.error("Error signing in:", error.message);
       throw error;
     }
 


     console.log("Sign-in successful:", data);
   } catch (err) {
     console.error("Unexpected error:", err);
   }
 }