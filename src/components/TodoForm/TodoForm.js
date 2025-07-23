"use client"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { DateTimePicker } from "@/components/DateTimePicker/DateTimePicker"
import useTodo from "@/hooks/useTodo"
import useStatedata from "@/hooks/useStatedata"
import axios from "axios"

const TodoForm = () => {

    const {
        todos,
        setTodos,
        refreshTodos,
        editing,
        setEditing,
        todoEdit,
    } = useTodo();
    const { setIsOpen, setIsLoading } = useStatedata();

    const delay = async (dtime) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, dtime);
        })
    }

    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        if (date <= new Date()) {
            toast.error("Deadline cannot be in the past", {
                title: <h1 className="text-red-600 font-semibold">{`Could not ${editing ? "update" : "add"} your task`}</h1>,
                description: <p className="text-black font-semibold">Deadline cannot be in the past</p>
            })
            return
        }

        setIsLoading(true);
        await delay(2000);
        if (editing) {
            try {
                setTodos((prevTodos) => (
                    prevTodos.map((todo) =>
                        todo.id === todoEdit.id ? { ...todo, todo: data.todo, desc: data.desc, deadline: date, editedAt: Date.now() } : todo
                    )
                ))
                const res = await axios.patch(`/api/todos/${todoEdit.id}`, { todo: data.todo, desc: data.desc, deadline: date });
                console.log(res.data);
                await refreshTodos();
                setEditing(false);
            } catch (error) {
                console.log("Error occurred while updating the todo:", error);
            }
        }
        else {
            try {
                // setTodos([...todos, { todo: data.todo, desc: data.desc, deadline: date, isDone: false, addedAt: Date.now(), id: Date.now() }]);
                const res = await axios.post("/api/todos", { todo: data.todo, desc: data.desc, deadline: date });
                console.log(res.data);
                await refreshTodos();
            } catch (error) {
                console.log("Error occurred while adding the todo:", error);
            }
        }
        reset();
        setIsLoading(false);

        toast.promise(delay(1000), {
            loading: `${editing ? "Updating" : "Adding"} Your Task`,
            success: ("Event has been created", {
                message: <h1 className="text-green-600 font-semibold">{`Your task has been ${editing ? "updated" : "added"} successfully`}</h1>,
                duration: 4000,
                description: <h1 className="text-black font-semibold">{data.todo}</h1>,
            }),
            error: ("Event has not been created", {
                message: <h1 className="text-red-600 font-semibold">{`Your task has not been ${editing ? "updated" : "added"}. Try Again`}</h1>,
                duration: 4000,
                description: <h1 className="text-black font-semibold">{data.todo}</h1>,
            }),
        });
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

    const [date, setDate] = useState(editing && todoEdit.deadline
        ? new Date(todoEdit.deadline)
        : new Date());

    useEffect(() => {
        if (editing && todoEdit.deadline) {
            setDate(new Date(todoEdit.deadline));
        } else {
            setDate(new Date());
        }
    }, [editing, todoEdit]);

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
                <DateTimePicker
                    date={date}
                    setDate={setDate}
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