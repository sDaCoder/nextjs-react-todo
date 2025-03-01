"use client"
import { useState, useRef, useEffect } from "react";
import HorizontalCalendar from "@/components/HorizontalCalendar/HorizontalCalendar";
import TodoForm from "@/components/TodoForm/TodoForm";
import TodoCard from "@/components/TodoCard/TodoCard";
import { Button } from "@/components/ui/button";
import { CopyPlus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  const ref = useRef(0);
  useEffect(() => {
    ref.current += 1;
  })

  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [todoEdit, setTodoEdit] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <h1 className="inline absolute top-0 bg-white py-1 p-4 rounded">Rendered: {ref.current}</h1> */}

      <HorizontalCalendar />
      <div className="flex flex-col py-6 gap-8 items-center justify-center">
        

        <div className="flex items-center justify-center flex-wrap gap-4">
          {todos?.map((todo, index) => (
              <TodoCard
                key={index}
                item={todo}
                setTodos={setTodos}
                editing={editing}
                setEditing={setEditing}
                todoEdit={todoEdit}
                setTodoEdit={setTodoEdit}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 py-4">

          {/* If Todos don't exist, show the image */}
          {!todos.length && (
            <img src="/todo-man2.png" className="text-slate-500 w-1/2" />
          )}

          <Dialog open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild>
              <Button className="font-bold p-6">
                { todos.length ? `Add Another Task` : `Stop Thinking, Start Adding Your Tasks`}
                <span><CopyPlus /></span>
              </Button>
            </DialogTrigger>

            <DialogContent>
              <TodoForm 
                todos={todos} 
                setTodos={setTodos} 
                editing={editing} 
                setEditing={setEditing}
                todoEdit={todoEdit}
              />
            </DialogContent>
            
          </Dialog>


        </div>

        

      </div>
    </>
  );
}
