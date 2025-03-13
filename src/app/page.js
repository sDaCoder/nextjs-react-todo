"use client"
import { useState, useRef, useEffect } from "react";
import HorizontalCalendar from "@/components/HorizontalCalendar/HorizontalCalendar";
import AllTasksSection from "@/components/AllTasksSection/AllTasksSection";
import { TodoContext } from "@/TodoContext";
import { delay } from "@/actions/delay";

export default function Home() {
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
  const [currentDate, setCurrentDate] = useState(new Date())

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
      currentDate,
      setCurrentDate,
      delay
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