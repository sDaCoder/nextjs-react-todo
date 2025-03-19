import { NextResponse } from "next/server"
import fs from 'fs/promises';

export async function GET() {
    try {
        const data = await fs.readFile('./src/assets/todoData.json', 'utf-8');
        const todos = JSON.parse(data);
        return NextResponse.json({ 
            status: 200,
            todos,
            message: 'Hello World' 
        })
    } catch (error) {
        return NextResponse.json({ 
            status: 500,
            error,
            message: 'Cannot read the todos'
        })
        
    }
}