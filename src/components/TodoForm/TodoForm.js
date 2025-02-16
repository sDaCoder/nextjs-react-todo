"use client"
import { useForm } from "react-hook-form"

const TodoForm = ({todos, setTodos}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        setTodos([...todos, {todo: data.todo, isDone: false, addedAt: Date.now(), id: Date.now()}]);
        reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-2 px-10">
                <input
                    type="text"
                    {...register("todo", { required: true })}
                    className="text-slate-600 font-bold" placeholder="todo" />
                {errors.todo && <span className="text-red-500 font-bold">Your task must not be empty</span>}
                <button type="submit" className="bg-slate-600 py-2 px-4 rounded text-white" >Add Your Task</button>
            </form>
        </>
    )
}

export default TodoForm
