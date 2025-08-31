"use server";
import { auth } from "../lib/auth"
import { authClient } from "../lib/auth-client";
import { db } from "../src/db/drizzle";
import { user as userTable } from "../src/db/schema";
import { eq } from "drizzle-orm";

export const signIn = async (email, password) => {
    try {
        await auth.api.signInEmail({
            body: {
                // email: "user@email.com",
                // password: "password",
                email,
                password
            }
        })
        return {
            success: true,
            message: "Signed in successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const signUp = async (name, email, password, imageUrl) => {
    try {
        await auth.api.signUpEmail({
            body: {
                // email: "user@email.com",
                // password: "password",
                // name: "User",
                email,
                password,
                name
            }
        })
        // If an image URL is provided, store it on the user record.
        if (imageUrl) {
            await db.update(userTable)
                .set({ image: imageUrl })
                .where(eq(userTable.email, email));
        }
        return {
            success: true,
            message: "Signed up successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}

// export const signInGithub = async () => {
//     try {
//         await authClient.signIn.social({
//             provider: "github",
//             callbackURL: "http://localhost:3000/dashboard"
//         })
//         console.log("Signed in with Github");
//     } catch (error) {
//         console.log(error);
//     }
    
// }