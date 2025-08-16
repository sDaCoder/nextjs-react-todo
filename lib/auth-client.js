import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000"
    baseURL: typeof window !== "undefined" ? window.location.origin : undefined
})
