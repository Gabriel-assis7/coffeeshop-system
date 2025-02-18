import { UserRole } from "@/data/typeOverrides/user";
import { clerkClient } from "@clerk/nextjs/server";

const client = await clerkClient()

export async function syncClerkMetadata(user: {
    id: string;
    clerkUserId: string;
    role: typeof UserRole;
}) {
    return client.users.updateUserMetadata(user.clerkUserId, {
        publicMetadata: {
            dbId: user.id,
            role: user.role,
        }
    })
}