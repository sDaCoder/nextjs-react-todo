"use client"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

const TodoForm = ({ todos, setTodos, editing, setEditing, todoEdit }) => {
    const delay = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    })

    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        if (editing) {
            setTodos((prevTodos) => (
                prevTodos.map((todo) =>
                    todo.id === todoEdit.id ? { ...todo, todo: data.todo, editedAt: Date.now() } : todo
                )
            ))
            setEditing(false);
        }
        else setTodos([...todos, { todo: data.todo, isDone: false, addedAt: Date.now(), id: Date.now() }]);
        reset();
        toast.promise(delay, {
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

    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-slate-800 text-3xl font-bold">
                    {editing ? "Edit Your Task" : "Add Your Task"}
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-2 px-10">
                <input
                    type="text"
                    defaultValue={editing ? todoEdit.todo : ""}
                    {...register("todo", { required: true })}
                    className="text-slate-600 font-bold" placeholder="todo"
                    name="todo"
                />
                {errors.todo && <span className="text-red-500 font-bold">Your task must not be empty</span>}

                <DialogClose asChild>
                    <Button type="submit" className=" py-2 px-4 rounded" >
                        {editing ? "Edit Your Task" : "Add Your Task"}
                    </Button>
                </DialogClose>
            </form>
        </>
    )
}

export default TodoForm