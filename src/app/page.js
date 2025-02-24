"use client"
import { useState, useRef, useEffect } from "react";
import HorizontalCalendar from "@/components/HorizontalCalendar/HorizontalCalendar";
import TodoForm from "@/components/TodoForm/TodoForm";
import TodoCard from "@/components/TodoCard/TodoCard";

export default function Home() {
  const ref = useRef(0);
  useEffect(() => {
    ref.current += 1;
  })

  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [todoEdit, setTodoEdit] = useState({});

  return (
    <>
      <h1 className="inline absolute top-0 bg-white py-1 p-4 rounded">Rendered: {ref.current}</h1>

      <HorizontalCalendar />
      <div className="flex flex-col py-6 gap-8 items-center justify-center">
        <TodoForm 
          todos={todos} 
          setTodos={setTodos} 
          editing={editing} 
          setEditing={setEditing}
          todoEdit={todoEdit}
        />

        <div className="flex items-center justify-center flex-wrap gap-4">
          {todos.map((todo, index) => (
            <TodoCard 
              key={index} 
              item={todo} 
              setTodos={setTodos} 
              editing={editing} 
              setEditing={setEditing} 
              todoEdit={todoEdit}
              setTodoEdit={setTodoEdit}
            />
          ))}
        </div>

      </div>
    </>
  );
}
