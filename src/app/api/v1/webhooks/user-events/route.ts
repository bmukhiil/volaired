import { fetchWebhookSecret, verifyWebhook } from "@/lib/clerk-webhook";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClerkSupabaseClient } from "@/lib/supabase/server";

async function handleUserCreatedEvent(data) {
  const {
    id,
    first_name: firstName,
    last_name: lastName,
    profile_image_url: profileImageUrl,
    created_at: createdAt,
    updated_at: updatedAt,
    last_sign_in_at: lastSignInAt,
    email_addresses,
    primary_email_address_id: primaryEmailId,
    two_factor_enabled: twoFactorEnabled,
    password_enabled: passwordEnabled,
  } = data;

  // Convert timestamps from milliseconds to ISO strings for PostgreSQL
  const createdAtIso = new Date(createdAt).toISOString();
  const updatedAtIso = new Date(updatedAt).toISOString();
  const lastSignInAtIso = lastSignInAt
    ? new Date(lastSignInAt).toISOString()
    : null;

  // Assume 'email_addresses' is an array and we need the first email address
  const email = email_addresses[0] ? email_addresses[0].email_address : null;

  // Prepare the record to insert
  const userRecord = {
    user_id: id,
    first_name: firstName,
    last_name: lastName,
    email,
    created_at: createdAtIso,
    updated_at: updatedAtIso,
    last_login: lastSignInAtIso,
    profile_image_url: profileImageUrl,
    primary_email_id: primaryEmailId,
    two_factor_enabled: twoFactorEnabled,
    password_enabled: passwordEnabled,
  };

  // Insert data into 'users' table
  const supabaseClient = await createClerkSupabaseClient();
  const { error } = await supabaseClient.from("users").insert([userRecord]);
  if (error) {
    console.error("Error inserting user:", error);
  } else {
    console.log("User inserted successfully");
  }
}

async function handleUserDeletedEvent(data) {
  const { id } = data;

  // Delete user from 'users' table
  const supabaseClient = await createClerkSupabaseClient();
  const { error } = await supabaseClient
    .from("users")
    .delete()
    .eq("user_id", id);
  if (error) {
    console.error("Error deleting user:", error);
  } else {
    console.log("User deleted successfully");
  }
}

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = fetchWebhookSecret("user-events");

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  const { evt, body } = await verifyWebhook(WEBHOOK_SECRET, req);
  const eventType = evt.type;

  if (eventType === "user.created") {
    // user created
    await handleUserCreatedEvent(evt.data);
  } else if (eventType === "user.updated") {
    // user updated
  } else {
    // user deleted
    await handleUserDeletedEvent(evt.data);
  }
  return NextResponse.json({ status: 200 });
}
