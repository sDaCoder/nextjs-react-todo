"use client"
import { toast } from "sonner"
import { CircleCheckBig, FilePenLine, Trash2, CircleX } from "lucide-react"
import { Card } from "../ui/card"
import { differenceInCalendarDays, startOfDay } from "date-fns"

const TodoCard = ({
  item,
  setTodos,
  editing,
  setEditing,
  todoEdit,
  setTodoEdit,
  isOpen,
  setIsOpen }) => {

  const delay = async (dtime) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, dtime);
    })
  }

  const completeTodo = async () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.isDone) {
          return todo.id === item.id ? { ...todo, isDone: !todo.isDone, completedAt: null } : todo
        }
        else {
          return todo.id === item.id ? { ...todo, isDone: !todo.isDone, completedAt: Date.now() } : todo
        }
      }
      )
    );

    // Displaying the toast when the task is not completed
    if (!item.isDone) {
      toast.promise(delay(0), {
        loading: `Completing Your Task`,
        success: ("Event completed", {
          message: <h1 className="text-green-600 font-semibold">{`Congratulations! You've completed your task.`}</h1>,
          duration: 4000,
          description: <h1 className="text-black font-semibold">{item.todo}</h1>,
        }),
        error: ("Could not complete the action", {
          message: <h1 className="text-red-600 font-semibold">{`Could not complete the action. Try Again`}</h1>,
          duration: 4000,
        }),
      });
    }
  }

  const handleDeleteTodo = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
    toast.promise(delay(0), {
      loading: `Deleting Your Task`,
      success: ("Event completed", {
        message: <h1 className="text-yellow-500 font-semibold">{`Your Task has been deleted successfully.`}</h1>,
        duration: 4000,
        description: <h1 className="text-black font-semibold">{item.todo}</h1>,
      }),
      error: ("Could not complete the action", {
        message: <h1 className="text-red-600 font-semibold">{`Could not complete the action. Try Again`}</h1>,
        duration: 4000,
      }),
    });
  }

  const handleEditing = () => {
    setEditing(!editing);
    setTodoEdit(item);
    setIsOpen(!isOpen);
  }

  const convertTo12HourFormat = (timeString) => {
    if (!timeString) return "";

    let [hours, minutes] = timeString.split(":").map(Number);
    let amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 0 to 12 for midnight case

    return `${hours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
  };

  const formattedDate = (deadline) => {
    const diff = differenceInCalendarDays(new Date(deadline), new Date());
    if (diff === 0) return "Due Today"
    if (diff === 1) return "Due Tomorrow"
    let result;
    diff < 0 ? result = `${Math.abs(diff)} days ago` : result = `Due on ${new Date(deadline).toLocaleDateString()}`;
    return result
  }
  

  return (
    <Card>
      <div id={item?.id} className="flex justify-between gap-6 p-4 md:w-[30vw] w-[90vw] min-h-[40px] rounded-lg shadow-sm">

        <div className="flex flex-col gap-y-4 justify-between">
          <div className="flex flex-col">
            <h1 className={`text-lg text-wrap font-extrabold ${item.isDone ? "line-through" : ""}`}>
              {item.todo}
            </h1>
            <p className="text-sm">
              {item.desc}
            </p>
          </div>
          <p className="font-bold flex flex-col text-sm">
            {`${formattedDate(item.deadline)}, ${convertTo12HourFormat(startOfDay(item.deadline).toLocaleTimeString())}`}
          </p>
        </div>

        <div className='flex flex-col items-center gap-3'>
          {!item.isDone ?
            <CircleCheckBig size={24} strokeWidth={2.5} onClick={() => completeTodo()} className="cursor-pointer" /> :
            <CircleX size={24} strokeWidth={2.5} onClick={() => completeTodo()} className="cursor-pointer" />
          }
          <FilePenLine size={24} strokeWidth={2.5} onClick={() => handleEditing()} className="cursor-pointer" />
          <Trash2 size={24} strokeWidth={2.5} onClick={() => handleDeleteTodo()} className="cursor-pointer" />
        </div>
      </div>
    </Card>
  )
}

export default TodoCard