import { fetchWebhookSecret, verifyWebhook } from "@/lib/clerk-webhook";
import { NextRequest, NextResponse } from "next/server";

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
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
