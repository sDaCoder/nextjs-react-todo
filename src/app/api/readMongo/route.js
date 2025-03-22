import { NextResponse } from "next/server";
import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
export async function GET() {
    try {
        await client.connect()        
        const database = client.db("todos")
        const collection = database.collection("todo-01");
        const data = await collection.find({}).toArray();
        const todos = data.map(doc => ({
            id: doc._id.toString(),
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
    } finally {
        await client.close()
    }
}

export async function POST(request) 
{
    try {
        const body = await request.json()
        const {id} = body
        console.log(body, id);

        await client.connect()
        const database = client.db("todos")
        const collection = database.collection("todo-01");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({
            status: 'success',
            message: 'Reading the data from MongoDB',
            result
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 'failure',
            message: 'Could not delete the data',
            error
        })
    }
}