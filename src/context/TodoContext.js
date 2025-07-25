"use client"
import axios from "axios";
import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [editing, setEditing] = useState(false);
    const [todoEdit, setTodoEdit] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDateTodos, setSelectedDateTodos] = useState([]);

    const refreshTodos = async () => {
        try {
            const res = await axios.get("/api/todos");
            setTodos(res.data);
        } catch (error) {
            console.log("Error occurred while fetching the todos:", error);
        }
    };

    return (
        <TodoContext.Provider value={{
            todos,
            setTodos,
            refreshTodos,
            editing,
            setEditing,
            todoEdit,
            setTodoEdit,
            selectedDate,
            setSelectedDate,
            selectedDateTodos,
            setSelectedDateTodos
        }}>
            {children}
        </TodoContext.Provider>
    )
}