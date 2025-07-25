"use client"
import React, { useEffect, useState } from 'react'
import { HoverCard } from '../ui/hover-card';
import TodoCard from '../TodoCard/TodoCard';
import { CopyPlus } from 'lucide-react';
import Loading from '../Loading/Loading';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import useStatedata from '@/hooks/useStatedata';
import useTodo from '@/hooks/useTodo';
import { format, isSameDay } from 'date-fns';

const TodosArea = () => {

    const [isClient, setIsClient] = useState(false);
    const { setIsSmallScreen, setIsOpen, isLoading, setIsLoading } = useStatedata();
    const { todos, refreshTodos, setEditing, selectedDate, selectedDateTodos, setSelectedDateTodos } = useTodo();

    useEffect(() => {
        setIsLoading(true);
        setIsClient(true);
        setIsSmallScreen(window.innerWidth < 500);
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 500);
        };

        // const fetchTodos = async () => {
        //     try {
        //         const res = await axios.get("/api/todos");
        //         setTodos(res.data);
        //     } catch (error) {
        //         console.log("Error occurred while fetching the todos:", error);
        //     } finally {
        //         setIsLoading(false);
        //     }
        // }
        refreshTodos().finally(() => setIsLoading(false));

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        // Filter todos whenever todos or selectedDate changes
        const daysTasks = todos.filter((todo) => {
            // Ensure todo.deadline is a Date object
            const deadlineDate = new Date(todo.deadline);
            return isSameDay(deadlineDate, selectedDate);
        });
        setSelectedDateTodos(daysTasks);
    }, [todos, selectedDate]);

    if (!isClient) return null;

    return (
        <>
            <div className='max-w-4xl mx-auto'>
                <h1 className="md:text-2xl text-xl font-extrabold mb-2">Tasks for {format(selectedDate, "EEEE, MMMM dd, yyyy")}</h1>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-4">
                {isLoading ? <Loading /> :
                    selectedDateTodos?.map((todo, index) => (
                        <HoverCard key={index}> <TodoCard item={todo} /> </HoverCard>
                    ))
                }
            </div>

            <div className="flex flex-col items-center gap-6 py-4">

                {/* If Todos don't exist and the page is not loading, show the image */}
                {!selectedDateTodos.length && !isLoading && (
                    <img src="/todo-man2.png" className="text-slate-500 w-1/2" />
                )}

                <Button
                    onClick={() => { setIsOpen(true); setEditing(false); }}
                    className="font-bold p-6"
                    disabled={isLoading}
                >
                    {isLoading ?
                        <>
                            Loading<span><Loader2 className="animate-spin" strokeWidth={2.5} /></span>
                        </>
                        :
                        <>
                            {todos.length ? `Add Another Task` : `Stop Thinking, Start Adding Your Tasks`}
                            <span><CopyPlus /></span>
                        </>
                    }
                </Button>
            </div>
        </>
    )
}

export default TodosArea