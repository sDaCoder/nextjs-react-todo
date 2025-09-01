import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "../../../../lib/auth";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";
import { getPublicIdFromUrl } from "@/lib/getPublicId";

export async function PATCH(request, { params }) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized - Please log in" },
                { status: 401 }
            );
        }

        const Params = await params;
        const userid = Params.userid;

        console.log(userid);
        if (!userid || userid !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const {image} = await request.json();
        console.log(image);
        const publicImageUrl = getPublicIdFromUrl(image);
        console.log(publicImageUrl);
        
        const result = await cloudinary.uploader.destroy(publicImageUrl);
        console.log(result);

        // Clear the stored image for this user
        const updated = await db
            .update(user)
            .set({ image: null, updatedAt: new Date() })
            .where(eq(user.id, userid))
            .returning({ id: user.id, image: user.image });

        return NextResponse.json(updated[0] || null, { status: 200 });
    } catch (error) {
        console.log("Error in updating the user image: ", error);
        return NextResponse.json(
            { error: error?.message || "Something went wrong" },
            { status: 500 }
        );
    }
}