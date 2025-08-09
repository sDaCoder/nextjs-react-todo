import { db } from "@/db/drizzle";
import { todoTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { headers } from "next/headers";

export async function GET() {
    try {
        // Get the current user session
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized - Please log in" },
                { status: 401 }
            );
        }

        // Get todos for the authenticated user only
        const todos = await db
            .select()
            .from(todoTable)
            .where(eq(todoTable.userId, session.user.id))
            .orderBy(todoTable.deadline);
            
        return NextResponse.json(todos);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: (error).message || "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        // Get the current user session
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized - Please log in" },
                { status: 401 }
            );
        }

        const { todo, desc, deadline } = await request.json();
        const Deadline = new Date(deadline);
        
        // Insert todo with the authenticated user's ID
        const newTodo = await db.insert(todoTable).values({ 
            todo, 
            desc, 
            deadline: Deadline,
            userId: session.user.id
        }).returning();
        
        return NextResponse.json(newTodo[0], {
            status: 201,
            statusText: "Added Todo to the database"
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: (error).message || "Something went wrong" },
            { status: 500 }
        );
    }
}

