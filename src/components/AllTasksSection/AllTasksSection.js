import { useContext } from 'react'
import Loading from '@/components/Loading/Loading';
import TodoCard from '@/components/TodoCard/TodoCard';
import DrawerTodoForm from '@/components/DrawerTodoForm/DrawerTodoForm';
import DialogTodoForm from '@/components/DialogTodoForm/DialogTodoForm';
import { Button } from '@/components/ui/button';
import { CopyPlus, Loader2 } from 'lucide-react';
import { HoverCard } from '@/components/ui/hover-card';
import { TodoContext } from '@/Context/TodoContext';

const AllTasksSection = () => {

    const { 
        todos, 
        isLoading,
        isSmallScreen,
        setIsOpen,
        setEditing,
    } = useContext(TodoContext);

    return (
        <>
            <div className="flex flex-col py-6 gap-8 items-center justify-center">

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

                    {isSmallScreen ? <DrawerTodoForm /> : <DialogTodoForm />}
                </div>
            </div>
        </>
    )
}

export default AllTasksSection
