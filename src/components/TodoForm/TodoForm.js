"use client"
import { useForm } from "react-hook-form"

const TodoForm = ({todos, setTodos, editing, setEditing, todoEdit}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        if(editing) {
            setTodos((prevTodos) => (
                prevTodos.map((todo) => 
                    todo.id === todoEdit.id ? { ...todo, todo: data.todo, editedAt: Date.now() } : todo
                )
            ))
            setEditing(false);
        }
        else setTodos([...todos, {todo: data.todo, isDone: false, addedAt: Date.now(), id: Date.now()}]);
        reset();
    }

    return (
        <>
            <h1 className="text-slate-800 text-3xl font-bold">
                {editing ? "Edit Your Task" : "Add Your Task"}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-2 px-10">
                <input
                    type="text"
                    defaultValue={editing ? todoEdit.todo : ""}
                    {...register("todo", { required: true })}
                    className="text-slate-600 font-bold" placeholder="todo" />
                {errors.todo && <span className="text-red-500 font-bold">Your task must not be empty</span>}
                <button type="submit" className="bg-slate-600 py-2 px-4 rounded text-white" >
                    {editing ? "Edit Your Task" : "Add Your Task"}
                </button>
            </form>
        </>
    )
}

export default TodoForm
