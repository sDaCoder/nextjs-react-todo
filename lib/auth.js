import { db } from "../src/db/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import * as schema from "../src/db/schema";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET, 
        },
    },
    session: {
        expiresIn: 20
    },
    plugins: [nextCookies()]
});