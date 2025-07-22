import { db } from "@/db/drizzle";
import { todoTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(request, {params}) {
    try {
        const Params = await params
        const id = Params.id
        // console.log(params.id);
        // console.log(await params);
        const deletedTodo = await db.delete(todoTable).where(eq(todoTable.id, id));
        return NextResponse.json(deletedTodo, {
            status: 200,
            message: "Todo deleted successfully"
        })
        
    } catch (error) {
        console.log("Error in deleting the todo: ", error);
        return NextResponse.json({error: (error).message || "Something went wrong"}, {status: 500})
    }
}