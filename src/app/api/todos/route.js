import { db } from "@/db/drizzle";
import { todoTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const todos = await db.select().from(todoTable).orderBy(todoTable.deadline);
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
        const { todo, desc, deadline } = await request.json();
        const Deadline = new Date(deadline);
        const newTodo = await db.insert(todoTable).values({ 
            todo, 
            desc, 
            deadline: Deadline
        });
        return NextResponse.json(newTodo, {
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

