import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export function fetchWebhookSecret(type: string) {
  if (type === "user-events") {
    return process.env.USER_EVENTS_WEBHOOK_SECRET;
  } else if (type === "communication-events") {
    return process.env.COMMUNICATION_EVENTS_WEBHOOK_SECRET;
  } else {
    return process.env.SESSION_EVENTS_WEBHOOK_SECRET;
  }
}

function getSvixHeaders() {
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Error("Error occurred -- no svix headers");
  }
  return { svix_id, svix_timestamp, svix_signature };
}

async function getWebhookBody(req: Request) {
  const payload = await req.json();
  return JSON.stringify(payload);
}

export async function verifyWebhook(WEBHOOK_SECRET: string, req: Request) {
  const { svix_id, svix_timestamp, svix_signature } = getSvixHeaders();
  const body = await getWebhookBody(req);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    throw new Error("Error occurred");
  }

  return { evt: evt, body: body };
}
