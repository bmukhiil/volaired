import { fetchWebhookSecret, verifyWebhook } from "@/lib/clerk-webhook";
import { NextRequest, NextResponse } from "next/server";
import { createClerkSupabaseClient } from "@/lib/supabase/server";

const handleSessionEvent = async (data) => {
  const supabaseClient = await createClerkSupabaseClient();

  const {
    abandon_at: abandonAt,
    client_id,
    created_at: createdAt,
    expire_at: expireAt,
    id,
    last_active_at: lastActiveAt,
    status,
    updated_at: updatedAt,
    user_id,
  } = data;

  const abandonAtIso = abandonAt ? new Date(abandonAt).toISOString() : null;
  const createdAtIso = new Date(createdAt).toISOString();
  const expireAtIso = new Date(expireAt).toISOString();
  const updatedAtIso = new Date(updatedAt).toISOString();
  const lastActiveAtIso = lastActiveAt
    ? new Date(lastActiveAt).toISOString()
    : null;

  const sessionRecord = {
    session_id: id,
    user_id,
    client_id,
    created_at: createdAtIso,
    updated_at: updatedAtIso,
    expire_at: expireAtIso,
    last_active_at: lastActiveAtIso,
    status,
    abandon_at: abandonAtIso,
  };

  const { error } = await supabaseClient
    .from("sessions")
    .upsert(sessionRecord, { onConflict: ["session_id"] });

  if (error) {
    console.error("Error upserting session:", error);
  } else {
    console.log("Session upserted successfully");
  }
};

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = fetchWebhookSecret("session-events");

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  const { evt, body } = await verifyWebhook(WEBHOOK_SECRET, req);

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type;

  await handleSessionEvent(evt.data);

  return NextResponse.json({ status: 200 });
}
