"use client"
import { useState, useRef, useEffect } from "react";
import HorizontalCalendar from "@/components/HorizontalCalendar/HorizontalCalendar";
import TodoForm from "@/components/TodoForm/TodoForm";
import TodoCard from "@/components/TodoCard/TodoCard";
import { Button } from "@/components/ui/button";
import { CopyPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer,DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

export default function Home() {
  const ref = useRef(0);
  useEffect(() => {
    ref.current += 1;
  })

  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [todoEdit, setTodoEdit] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(isSmallScreen);

  return (
    <>
      {/* <h1 className="inline absolute top-0 bg-white py-1 p-4 rounded">Rendered: {ref.current}</h1> */}

      <HorizontalCalendar isSmallScreen={isSmallScreen} />
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

          <Button
            onClick={() => setIsOpen(true)}
            className="font-bold p-6">
            { todos.length ? `Add Another Task` : `Stop Thinking, Start Adding Your Tasks`}
            <span><CopyPlus /></span>
          </Button>

          {isSmallScreen ? (

            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerContent>

                <DrawerHeader>
                  <DrawerTitle className="text-slate-800 text-3xl font-bold">
                    {editing ? "Edit Your Task" : "Add Your Task"}
                  </DrawerTitle>
                </DrawerHeader>
                
                <TodoForm 
                  todos={todos} 
                  setTodos={setTodos} 
                  editing={editing} 
                  setEditing={setEditing}
                  todoEdit={todoEdit}
                  setIsOpen={setIsOpen}
                  isSmallScreen={isSmallScreen}
                />
              </DrawerContent>
            </Drawer>
          ) : (

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent>

                <DialogHeader>
                  <DialogTitle className="text-slate-800 text-3xl font-bold">
                      {editing ? "Edit Your Task" : "Add Your Task"}
                  </DialogTitle>
                </DialogHeader>

                <TodoForm 
                  todos={todos} 
                  setTodos={setTodos} 
                  editing={editing} 
                  setEditing={setEditing}
                  todoEdit={todoEdit}
                  setIsOpen={setIsOpen}
                  isSmallScreen={isSmallScreen}
                />
              </DialogContent>
              
            </Dialog>
          )}
        </div>

        {(isOpen && !isSmallScreen) && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
}
