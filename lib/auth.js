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
    // emailVerification: {
    //     sendVerificationEmail: async ({ user, url }) => {
                // await sendEmail({
                //     to: user.email,
                //     subject: 'Verify your email address',
                //     text: `Click the link to verify your email: ${url}`
                // })
    //         await resend.emails.send({
    //             from: 'Suprava Dutta <supravadutta.nnhs.kol.e2321+taskmachina@gmail.com>',
    //             to: user.email,
    //             subject: 'Verify your email address',
    //             react: VerifyEmail({
    //                 userEmail: user.email,
    //                 verificationLink: url,
    //                 companyName: "Task Machina"
    //             })
    //         })
    //     },
    //     sendOnSignUp: true
    // },
    emailAndPassword: {
        enabled: true,
        // requireEmailVerification: true
    },
    // socialProviders: {
    //     github: { 
    //         clientId: process.env.GITHUB_CLIENT_ID, 
    //         clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    //     },
    // },
    session: {
        expiresIn: 20 * 60 // 20 minutes
    },
    plugins: [nextCookies()]
});