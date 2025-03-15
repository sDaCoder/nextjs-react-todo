"use client"
import { useForm } from "react-hook-form"
import { useEffect, useState, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DateTimePicker } from "@/components/DateTimePicker/DateTimePicker"
import { TodoContext } from "@/Context/TodoContext"

const TodoForm = () => {
    
    const {
        todos,
        setTodos,
        editing,
        setEditing,
        todoEdit,
        setIsOpen,
        setIsLoading,
        showErrorToast,
        showNormalToast
    } = useContext(TodoContext)

    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: { errors },
    } = useForm()

    const [date, setDate] = useState(editing ? todoEdit.deadline : new Date());

    const onSubmit = (data) => {
        if(date <= new Date()) {
            showErrorToast(
                `Could not ${editing ? "update" : "add"} your task`,
                `Deadline cannot be in the past`
            )
            return
        }
        
        setIsLoading(true);

        setTimeout(() => {
            if (editing) {
                setTodos((prevTodos) => (
                    prevTodos.map((todo) =>
                        todo.id === todoEdit.id ? { 
                            ...todo, 
                            todo: data.todo, 
                            desc: data.desc, 
                            deadline: date, 
                            editedAt: Date.now() 
                        } : todo
                    )
                ))
                setEditing(false);
            }
            else setTodos([...todos, { 
                todo: data.todo, 
                desc: data.desc, 
                deadline: date, 
                isDone: false, 
                addedAt: Date.now(), 
                id: Date.now() 
            }]);
            reset();
            setIsLoading(false);
        }, 2000);

        showNormalToast(
            `${editing ? "Updating" : "Adding"} Your Task`,
            `Your task has been ${editing ? "updated" : "added"} successfully`,
            data.todo,
            `${editing ? "edit" : "add"}`,
            2000
        )
    }

    useEffect(() => {
        if (editing) {
            setFocus("todo");
            setTimeout(() => {
                const input = document.querySelector('input[name="todo"]');
                if (input) {
                    input.setSelectionRange(input.value.length, input.value.length); // ✅ Move cursor to end
                }
            }, 10); // Small delay to ensure input is focused first
        } else {
            document.activeElement.blur();
        }
    }, [editing, setFocus]);


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-y-4 px-6 min-h-[25vh]">
                <Input
                    type="text"
                    defaultValue={editing ? todoEdit.todo : ""}
                    {...register("todo", { required: true })}
                    className="text-slate-600 font-bold"
                    placeholder="Your Todo"
                    name="todo"
                />
                <Input
                    type="text"
                    defaultValue={editing ? todoEdit.desc : ""}
                    {...register("desc")}
                    className="text-slate-600 font-bold"
                    placeholder="Your Todo Description(optional)"
                    name="desc"
                />
                {errors.todo && <span className="text-red-500 font-bold">Your task must not be empty</span>}
                {/* <Input
                    type="time"
                    defaultValue={editing ? todoEdit.deadlineTime : "12:00"}
                    {...register("deadlineTime")}
                /> */}
                <DateTimePicker
                    date={date}
                    setDate={setDate}
                />
                <Button
                    onClick={() => setIsOpen(false)}
                    type="submit" className=" py-2 px-4 rounded" >
                    {editing ? "Edit Your Task" : "Add Your Task"}
                </Button>
            </form>
        </>
    )
}

export default TodoForm