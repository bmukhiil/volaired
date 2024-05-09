// Importing necessary types and functions from 'next/server' and custom libraries
import { NextRequest, NextResponse } from "next/server";
import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { testEmail } from "@/lib/validate";

/**
 * Handler function for POST requests. Validates the provided email and upserts it into a Supabase database.
 * Uses Clerk for authentication management and ensures that the email format is valid before insertion.
 *
 * @param {NextRequest} req - The incoming POST request.
 * @returns {Promise<NextResponse>} - The response to be sent back to the client.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  // Parsing the JSON body to extract the email
  const body = await req.json();
  const email: string = body.email;

  // Validate presence and format of email, returning appropriate error messages
  if (!email) {
    return NextResponse.json(
      { message: "Email is required" },
      {
        status: 400,
      },
    );
  } else if (!testEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email" },
      {
        status: 400,
      },
    );
  }

  // Creating a Supabase client instance with Clerk integration
  const supabase = await createClerkSupabaseClient();

  // Attempt to upsert the email address into the 'waitlist' table
  const { data, error } = await supabase
    .from("waitlist")
    .upsert([{ email_address: email }], { onConflict: "email_address" });

  // Handle any errors that occur during the upsert operation
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  // Successfully upserted the email, return a 200 status
  return NextResponse.json({ status: 200 });
}
