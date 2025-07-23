"use client"

import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export default function useTodo() {
    const context = useContext(TodoContext);
    if(!context) {
        throw new Error("useTodo must be used within a TodoProvider")
    }
    return context
    
}