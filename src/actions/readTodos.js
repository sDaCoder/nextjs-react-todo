"use server";
import fs from 'fs/promises';

export const readTodos = async () => {
    try {
        const data = await fs.readFile('./src/assets/todoData.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
}