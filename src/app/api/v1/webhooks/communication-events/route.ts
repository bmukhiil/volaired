import { fetchWebhookSecret, verifyWebhook } from "@/lib/clerk-webhook";
import { NextRequest, NextResponse } from "next/server";
import { createClerkSupabaseClient } from "@/lib/supabase/server";

async function handleCommunicationEvent(evt) {
  const supabaseClient = await createClerkSupabaseClient();

  let from, to, message, sender_id, user_id, object, id, status, slug;
  const data = evt.data;

  if (evt.type === "email.created") {
    console.log("email created");
    to = data.to_email_address;
    console.log(to, data.to_email_address);
    message = data.subject;
    sender_id = data.email_address_id;
    ({ user_id, object, id, status, slug } = data);
  } else {
    to = data.to_phone_number;
    message = data.message;
    sender_id = data.phone_number_id;
    // Initialize other variables from data
    ({ user_id, object, id, status, slug } = data);
  }

  const communicationRecord = {
    user_id: user_id ? user_id : null, // handle null user_id gracefully
    type: object,
    status: status,
    slug: slug,
    to: to,
    content: message,
    sender_id: sender_id,
    request_id: id,
  };

  const { error } = await supabaseClient
    .from("auth_communications")
    .insert(communicationRecord);

  if (error) {
    console.error("Error inserting communication:", error);
  } else {
    console.log("Communication inserted successfully");
  }
}

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = fetchWebhookSecret("communication-events");

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  const { evt, body } = await verifyWebhook(WEBHOOK_SECRET, req);

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type;

  await handleCommunicationEvent(evt);

  return NextResponse.json({ status: 200 });
}
