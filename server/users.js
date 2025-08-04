"use server";
import { auth } from "../lib/auth"
import { authClient } from "../lib/auth-client";

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

export const signUp = async (name, email, password) => {
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