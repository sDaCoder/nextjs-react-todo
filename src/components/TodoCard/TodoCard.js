"use client"
import { CircleCheckBig, FilePenLine, Trash2, CircleX } from "lucide-react"
import { Card } from "@/components/ui/card"
import { differenceInCalendarDays } from "date-fns"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { TodoContext } from "@/Context/TodoContext"
import { useContext } from "react"
import { showNormalToast } from "@/actions/showToast"

const TodoCard = ({ item }) => {

  const {
    setTodos,
    setEditing,
    setTodoEdit,
    isOpen,
    setIsOpen,
  } = useContext(TodoContext)

  const completeTodo = async () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.isDone) {
          return todo.id === item.id ? { 
            ...todo, 
            isDone: !todo.isDone, 
            completedAt: null 
          } : todo
        }
        else {
          return todo.id === item.id ? { 
            ...todo, 
            isDone: !todo.isDone, 
            completedAt: Date.now() 
          } : todo
        }
      }
      )
    );

    // Displaying the toast when the task is not completed
    if (!item.isDone) {
      showNormalToast(
        `Completing Your Task`,
        `Congratulations! You've completed your task.`,
        item.todo,
        'completing',
        0
      )
    }
  }

  const handleDeleteTodo = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
    (async () => {
      try {
        const res = await fetch(`/api/readMongo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        })
        const data = await res.json()
        console.log(data)
      } catch(err)
      {
        console.log(err)
      }
    })()

    showNormalToast(
      `Deleting Your Task`,
      `Your Task has been deleted successfully.`,
      `${item.todo}`,
      'delete',
      0
    )
  }

  const handleEditing = () => {
    setEditing(true);
    setTodoEdit(item);
    setIsOpen(!isOpen);
  }

  const convertTo12HourFormat = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 0 to 12 for midnight case
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`;
  };

  const formattedDate = (deadline) => {
    const diff = differenceInCalendarDays(new Date(deadline), new Date());
    if (diff === 0) return "Due Today"
    if (diff === 1) return "Due Tomorrow"
    if (diff === -1) return "Yesterday"
    let result;
    diff < 0 ? result = `${Math.abs(diff)} days ago` : result = `Due on ${new Date(deadline).toLocaleDateString()}`;
    return result
  }


  return (
    <Card>
      <div id={item?.id} className="flex justify-between gap-6 p-4 md:w-[30vw] w-[90vw] min-h-[40px] rounded-lg shadow-sm">

        <HoverCardTrigger asChild>
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
              {`${formattedDate(item.deadline)}, ${convertTo12HourFormat(item.deadline)}`}
            </p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <h1 className="text-primary font-bold">{item.todo}</h1>
          <div className="flex flex-col gap-[2px] mt-4">
            <p className="text-primary text-sm">Added at: {convertTo12HourFormat(new Date(item.addedAt))}</p>
            {item.editedAt &&
              <p className="text-primary text-sm">Updated at: {convertTo12HourFormat(new Date(item.editedAt))}</p>
            }
            {item.completedAt &&
              <p className="text-primary text-sm">Completed at: {convertTo12HourFormat(new Date(item.completedAt))}</p>
            }
          </div>
        </HoverCardContent>

        <div className='flex flex-col items-center gap-3'>
          {!item.isDone ?
            <CircleCheckBig size={24} strokeWidth={2.5} onClick={() => completeTodo()} className="cursor-pointer" /> :
            <CircleX size={24} strokeWidth={2.5} onClick={() => completeTodo()} className="cursor-pointer" />
          }
          <FilePenLine size={24} strokeWidth={2.5} onClick={() => handleEditing()} className="cursor-pointer" />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Trash2 size={24} strokeWidth={2.5} className="cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <p className="text-slate-800 text-3xl font-bold">Delete Your Task</p>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action will delete your task permanently!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteTodo()}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      </div>
    </Card>
  )
}

export default TodoCard