"use client"
import axios from "axios";
import { createContext, useMemo, useState } from "react";

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

    const userStats = useMemo(() => {
        if (!todos || todos.length === 0) {
            return {
                totalTasks: 0,
                completedTasks: 0,
                pendingTasks: 0,
                overdueTask: 0,
                successRate: 0,
                todayTasks: 0,
                chartData: []
            }
        }

        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        const totalTasks = todos.length
        const completedTasks = todos.filter(todo => todo.isDone).length
        const pendingTasks = todos.filter(todo => !todo.isDone).length

        // Count overdue tasks (pending tasks with deadline before today)
        const overdueTask = todos.filter(todo => {
            if (todo.isDone || !todo.deadline) return false
            const taskDeadline = new Date(todo.deadline)
            return taskDeadline < today
        }).length

        // Count today's tasks
        const todayTasks = todos.filter(todo => {
            if (!todo.deadline) return false
            const taskDeadline = new Date(todo.deadline)
            return taskDeadline.toDateString() === today.toDateString()
        }).length

        const successRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
        return {
            totalTasks,
            completedTasks,
            pendingTasks,
            overdueTask,
            successRate,
            todayTasks
        }
    }, [todos])

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
            setSelectedDateTodos,
            userStats
        }}>
            {children}
        </TodoContext.Provider>
    )
}