"use client"
import { useState, useRef, useEffect, lazy, Suspense } from "react";
import HorizontalCalendar from "@/components/HorizontalCalendar/HorizontalCalendar";
import { TodoContext } from "@/Context/TodoContext";
import { delay } from "@/actions/delay";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import NavigateProgress from "@/components/NavigateProgress/NavigateProgress";
import Loading from "@/components/Loading/Loading";
import { startOfDay } from "date-fns";
const AllTasksSection = lazy(() => import('@/components/AllTasksSection/AllTasksSection'));

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
  const [selectedDate, setSelectedDate] = useState(new Date(paramDate));

  const delayTime = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    (async function apiCall() {
      const url = '/api/readMongo';
      try {
        const res = await fetch(url);
        const data = await res.json();
        setTodos(data.todos.filter((todo) => todo.deadline >= paramDate && todo.deadline <= paramDate + 86400000));
      } catch (error) {
        console.log(error);
      }
    })();

    console.log("Calculating screen size");
    setIsClient(true);
    setIsSmallScreen(window.innerWidth < 500);
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 500);
    };
    handleResize();
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
      <NavigateProgress />
      <HorizontalCalendar />
      <Suspense fallback={
        <div className="flex flex-col py-6 gap-8 items-center justify-center">
          <Loading />
        </div>
      } >
        <AllTasksSection />
      </Suspense>
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