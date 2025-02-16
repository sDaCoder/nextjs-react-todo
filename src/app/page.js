"use client"
import { useState, useRef, useEffect } from "react";
import TodoCard from "../components/TodoCard/TodoCard";
import TodoForm from "../components/TodoForm/TodoForm";

export default function Home() {
  const ref = useRef(0);
  useEffect(() => {
    ref.current += 1;
  })

  // const tasks = [
  //   {
  //     todo: "task 1",
  //     isDone: false,
  //     addedAt: Date('2023-01-01'),
  //     id: Date("2023-01-01")
  //   }
  // ];

  const [todos, setTodos] = useState([]);

  return (
    <>
      <h1>Rendered: {ref.current}</h1>
      <div className="flex flex-col py-6 gap-8 items-center justify-center">

        <TodoForm todos={todos} setTodos={setTodos} />

        <div className="flex items-center justify-center flex-wrap gap-4">
          {todos.map((todo, index) => (
            <TodoCard key={index} item={todo} setTodos={setTodos} />
          ))}
        </div>

      </div>
    </>
  );
}
