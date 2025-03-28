import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import Todo from "@/models/todoModel";
import mongoose from "mongoose";

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

export async function POST(request) {
    try {
        const body = await request.json()
        
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB");
            return NextResponse.json({
                status: "success",
                message: "MongoDB already connected",
            });
        }
        
        await mongoose.connect(URI, {dbName: "todos"});
        
        const newTodo = new Todo(body)
        const result = await Todo.create(newTodo)
        console.log(result);


        return NextResponse.json({
            status: 'success',
            message: 'Adding a new Todo to the database',
            body
        })   
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 'failure',
            message: 'Could not read the data from the client side',
            error: error.message
        })
    } finally {
        await mongoose.disconnect();
    }
}


export async function DELETE(request) 
{
    const body = await request.json()
    console.log(body);
    return NextResponse.json({
        status: 'success',
        message: 'Reading the data from the client side',
        body
    })
    // try {
    //     const body = await request.json()
    //     const {id} = body
    //     console.log(body, id);

    //     await client.connect()
    //     const database = client.db("todos")
    //     const collection = database.collection("todo-01");
    //     const result = await collection.deleteOne({ _id: new ObjectId(id) });

    //     return NextResponse.json({
    //         status: 'success',
    //         message: 'Reading the data from MongoDB',
    //         result
    //     })
    // } catch (error) {
    //     console.log(error);
    //     return NextResponse.json({
    //         status: 'failure',
    //         message: 'Could not delete the data',
    //         error
    //     })
    // }
}