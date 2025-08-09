import { db } from "@/db/drizzle";
import { todoTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "../../../../../lib/auth";
import { headers } from "next/headers";

export async function DELETE(request, {params}) {
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

        const Params = await params;
        const id = Params.id;
        
        // Delete todo only if it belongs to the authenticated user
        const deletedTodo = await db
            .delete(todoTable)
            .where(and(
                eq(todoTable.id, id),
                eq(todoTable.userId, session.user.id)
            ))
            .returning();

        if (deletedTodo.length === 0) {
            return NextResponse.json(
                { error: "Todo not found or you don't have permission to delete it" },
                { status: 404 }
            );
        }
        
        return NextResponse.json(deletedTodo[0], {
            status: 200,
            message: "Todo deleted successfully"
        });
        
    } catch (error) {
        console.log("Error in deleting the todo: ", error);
        return NextResponse.json({error: (error).message || "Something went wrong"}, {status: 500});
    }
}

export async function PATCH(request, {params}) {
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

        const Params = await params;
        const id = Params.id;
        const {todo, desc, deadline, isDone} = await request.json();
        
        let updatedTodo;
        if(isDone === true) {
            updatedTodo = await db.update(todoTable).set({
                isDone,
                completedAt: new Date(),
                editedAt: new Date(),
            }).where(and(
                eq(todoTable.id, id),
                eq(todoTable.userId, session.user.id)
            )).returning();
        } else if(isDone === false) {
            updatedTodo = await db.update(todoTable).set({
                isDone,
                completedAt: null,
                editedAt: new Date(),
            }).where(and(
                eq(todoTable.id, id),
                eq(todoTable.userId, session.user.id)
            )).returning();
        } else {
            updatedTodo = await db.update(todoTable).set({
                todo,
                desc,
                deadline: new Date(deadline),
                editedAt: new Date(),
            }).where(and(
                eq(todoTable.id, id),
                eq(todoTable.userId, session.user.id)
            )).returning();
        }

        if (updatedTodo.length === 0) {
            return NextResponse.json(
                { error: "Todo not found or you don't have permission to update it" },
                { status: 404 }
            );
        }
        
        return NextResponse.json({updatedTodo: updatedTodo[0]}, {
            status: 200,    
            message: "Todo updated successfully"
        });
    } catch (error) {
        console.log("Error in updating the todo: ", error);
        return NextResponse.json({error: (error).message || "Something went wrong"}, {status: 500});
    }
}