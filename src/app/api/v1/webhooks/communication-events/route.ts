import { fetchWebhookSecret, verifyWebhook } from "@/lib/clerk-webhook";
import { NextRequest, NextResponse } from "next/server";
import { createClerkSupabaseClient } from "@/lib/supabase/server";

async function handleCommunicationEvent(data) {
    const supabaseClient = await createClerkSupabaseClient();

    const 

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = fetchWebhookSecret("communication-events");

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const { evt, body } = await verifyWebhook(WEBHOOK_SECRET, req);

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type;

  return NextResponse.json({ status: 200 });
}
