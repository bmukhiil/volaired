import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Function to create a new Supabase client instance
export const createClient = () =>
  createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    // You can add custom options here (optional)
    auth: {
      persistSession: true, // Ensures sessions are persisted in the browser
      autoRefreshToken: true, // Automatically refresh tokens
    },
  });




