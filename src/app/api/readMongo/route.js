import { NextResponse } from "next/server";
import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";


export async function GET() {
    const URI = process.env.MONGO_URI
    const client = new MongoClient(URI)
    try {
        await client.connect()        
        const database = client.db("todos")
        const collection = database.collection("todo-01");
        const data = await collection.find({}).toArray();
        const todos = data.map(doc => ({
            id: doc.$id,
            todo: doc.todo,
            desc: doc.desc,
            isDone: doc.isDone,
            deadline: doc.deadline,
            completedAt: doc.completedAt,
            completedAt: doc.completedAt,
            editedAt: doc.editedAt,
        }))
        return NextResponse.json({
            status: 'success',
            message: 'Reading data from MongoDB',
            todos
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 'failure',
            message: 'Could not read the data from MongoDB',
            error
        })
    }
}