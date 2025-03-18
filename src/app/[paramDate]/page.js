"use client"
import { useState, useRef, useEffect } from "react";
import HorizontalCalendar from "@/components/HorizontalCalendar/HorizontalCalendar";
import AllTasksSection from "@/components/AllTasksSection/AllTasksSection";
import { TodoContext } from "@/Context/TodoContext";
import { delay } from "@/actions/delay";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { readTodos } from "@/actions/readTodos";

export default function Home() {
  const params = useParams();
  const paramDate = Number(params.paramDate);
  const ref = useRef(0);
  useEffect(() => {
    ref.current += 1;
  })

  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [todoEdit, setTodoEdit] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(paramDate);

  useEffect(() => {
    (async function () {
      try {
        const todoData = await readTodos();
        setTodos(todoData.filter((todo) => todo.deadline === paramDate));
        
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(todos);
  
  useEffect(() => {
    setIsClient(true);
    setIsSmallScreen(window.innerWidth < 500);
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (!isClient) return null;

  const showErrorToast = (title, description) => {
    toast.error("Deadline cannot be in the past", {
      title: <h1 className="text-red-600 font-semibold">{title}</h1>,
      description: <p className="text-black font-semibold">{description}</p>
    })
  }

  const showNormalToast = (loadMessage, message, description, action, dtime) => {
    let colour;
    if (action === 'delete') { colour = `text-yellow-500` }
    else { colour = `text-green-600` }
    toast.promise(delay(dtime), {
      loading: loadMessage,
      success: ("Event completed", {
        message: <h1 className={`${colour} font-semibold`}>{message}</h1>,
        duration: 4000,
        description: <h1 className="text-black font-semibold">{description}</h1>,
      }),
      error: ("Could not complete the action", {
        message: <h1 className="text-red-600 font-semibold">{`Could not complete the action. Try Again`}</h1>,
        duration: 4000,
      }),
    });
  }
  return (
    <TodoContext.Provider value={{
      ref,
      todos,
      setTodos,
      editing,
      setEditing,
      todoEdit,
      setTodoEdit,
      isOpen,
      setIsOpen,
      isSmallScreen,
      setIsSmallScreen,
      isLoading,
      setIsLoading,
      selectedDate,
      setSelectedDate,
      delay,
      showErrorToast,
      showNormalToast,
      paramDate
    }}>
      <HorizontalCalendar />
      <AllTasksSection />
      {(isOpen && !isSmallScreen) && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </TodoContext.Provider>
  );
}