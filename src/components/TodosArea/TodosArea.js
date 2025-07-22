"use client"
import React, { useEffect, useState } from 'react'
import { HoverCard } from '../ui/hover-card';
import TodoCard from '../TodoCard/TodoCard';
import { CopyPlus } from 'lucide-react';
import Loading from '../Loading/Loading';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import useStatedata from '@/app/hooks/useStatedata';
import useTodo from '@/app/hooks/useTodo';

const TodosArea = () => {

    const [isClient, setIsClient] = useState(false);
    const { setIsSmallScreen, setIsOpen, isLoading } = useStatedata();
    const { todos, setEditing } = useTodo();

    useEffect(() => {
        setIsClient(true);
        setIsSmallScreen(window.innerWidth < 500);
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 500);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    if (!isClient) return null;


    return (
        <>
            <div className="flex items-center justify-center flex-wrap gap-4">
                {isLoading ? <Loading /> :
                    todos?.map((todo, index) => (
                        <HoverCard key={index}> <TodoCard item={todo} /> </HoverCard>
                    ))
                }
            </div>

            <div className="flex flex-col items-center gap-6 py-4">

                {/* If Todos don't exist and the page is not loading, show the image */}
                {!todos.length && !isLoading && (
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