"use client"
import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [editing, setEditing] = useState(false);
    const [todoEdit, setTodoEdit] = useState({});

    return (
        <TodoContext.Provider value={{
            todos,
            setTodos,
            editing,
            setEditing,
            todoEdit,
            setTodoEdit
        }}>
            {children}
        </TodoContext.Provider>
    )
}