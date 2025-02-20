import { env } from "@/data/env/server"
import { syncClerkMetadata } from "@/services/clerk"
import { WebhookEvent } from "@clerk/nextjs/server"
import axios from "axios"
import { headers } from "next/headers"
import { Webhook } from "svix"

export async function POST(req: Request) {
  const headerPayload = await headers()
  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(env.CLERK_WEBHOOK_KEY)
  let event: WebhookEvent

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occurred", {
      status: 400,
    })
  }

  try {
    switch (event.type) {
      case "user.created":
      case "user.updated": {
        const email = event.data.email_addresses.find(
          email => email.id === event.data.primary_email_address_id
        )?.email_address
        const firstName = event.data.first_name ?? "";
        const lastName = event.data.last_name ?? "";
        const name = `${firstName} ${lastName}`.trim();
  
        if (email == null) return new Response("No email", { status: 400 })
        if (name === "") return new Response("No name", { status: 400 })
  
        if (event.type === 'user.created') {
          const { data: user } = await axios.post('http://localhost:4000/api/v1/users', {
            clerkUserId: event.data.id,
              name,
              email,
              role: 'consumer',
              image_url: event.data.image_url,
          })
          await syncClerkMetadata(user)
        } else {
          await axios.put(`http://localhost:4000/api/v1/users${event.data.id}`, {
            email,
            name,
            image_url: event.data.image_url,
            role: event.data.public_metadata.role
          })
        }
        break
      }
      case 'user.deleted': {
        if (event.data.id != null) {
          await axios.delete(`http://localhost:4000/api/v1/users${event.data.id}`)
        }
        break
      }
    }
  } catch (error) {
    console.error("Api processing failed", error)
    return new Response("Error processing webhook", { status: 500 })
  }
  
  return new Response('', { status: 200 })
}
