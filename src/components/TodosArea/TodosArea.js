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
import SortnFilterArea from '../SortnFilterArea/SortnFilterArea';
import useSortnFilter from '@/hooks/useSortnFilter';

const TodosArea = () => {

    const [isClient, setIsClient] = useState(false);
    const { setIsSmallScreen, setIsOpen, isLoading, setIsLoading } = useStatedata();
    const { todos, refreshTodos, setEditing, selectedDate, selectedDateTodos, setSelectedDateTodos } = useTodo();
    const {
        sortOption,
        filterOption
    } = useSortnFilter();

    useEffect(() => {
        setIsLoading(true);
        setIsClient(true);
        setIsSmallScreen(window.innerWidth < 500);
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 500);
        };

        refreshTodos().finally(() => setIsLoading(false));

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const getSortedTodos = async () => {
            // Filter todos whenever todos or selectedDate changes
            let filtered = todos.filter((todo) => {
                const deadlineDate = new Date(todo.deadline);
                return isSameDay(deadlineDate, selectedDate);
            });
    
            // Sort after filtering
            switch (sortOption) {
                case "task name":
                    filtered.sort((a, b) => a.todo.localeCompare(b.todo));
                    break;
                case "date added latest":
                    filtered.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
                    break;
                case "date added oldest":
                    filtered.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
                    break;
                case "deadline soonest":
                    filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
                    break;
                case "deadline latest":
                    filtered.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
                    break;
            }

            switch (filterOption) {
                case "all":
                    break;

                case "completed":
                    filtered = filtered.filter((todo) => todo.isDone);
                    break;

                case "Unaccomplished":
                    filtered = filtered.filter((todo) => !todo.isDone);
                    break;

                case "Deadline exceeded":
                    filtered = filtered.filter((todo) => {
                        const deadlineDate = new Date(todo.deadline);
                        return deadlineDate < new Date();
                    });
                    break;
            
                default:
                    break;
            }

            setSelectedDateTodos(filtered);
        }
        getSortedTodos();
    }, [todos, selectedDate, sortOption, filterOption]);

    if (!isClient) return null;

    return (
        <>
            <div className='max-w-4xl mx-auto'>
                <h1 className="md:text-2xl text-xl font-extrabold mb-2">Tasks for {format(selectedDate, "EEEE, MMMM dd, yyyy")}</h1>
            </div>
            <SortnFilterArea />
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