"use client"
import { toast } from "sonner"
import { CircleCheckBig, FilePenLine, Trash2, CircleX } from "lucide-react"
import { Card } from "../ui/card"
import { format, startOfDay } from "date-fns"

const TodoCard = ({
  item, 
  setTodos, 
  editing, 
  setEditing, 
  todoEdit, 
  setTodoEdit, 
  isOpen, 
  setIsOpen}) => {
  
  const delay = async (dtime) => {
    await new Promise((resolve) => {
     setTimeout(() => {
         resolve();
     }, dtime);
   })
  }

  const completeTodo = async () => {
    setTodos((prevTodos) => 
      prevTodos.map((todo) => 
        {
          if(todo.isDone) {
            return todo.id === item.id ? { ...todo, isDone: !todo.isDone, completedAt: null } : todo
          }
          else{
            return todo.id === item.id ? { ...todo, isDone: !todo.isDone, completedAt: Date.now() } : todo
          }
        }
      )
    );

    // Displaying the toast when the task is not completed
    if(!item.isDone) {
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
    
  return (
    <Card>
      <div id={item?.id} className="flex justify-between gap-6 p-4 md:w-[30vw] w-[90vw] min-h-[20vh] rounded-lg shadow-sm">

        <div className="flex flex-col gap-y-4 justify-between">
          <div className="flex flex-col">
            <h1 className={`text-lg text-wrap font-extrabold ${item.isDone ? "line-through" : ""}`}>
              {item.todo}
            </h1>
            <p className="text-sm">
              {item.desc}
            </p>
          </div>
          <span className="font-bold flex flex-col">
            {`Deadline: ${format(startOfDay(new Date(item.addedAt)), "dd-MM-yyyy")}`}
            {/* <span className='italic'>{item.editedAt ? ` (edited at ${new Date(item.editedAt).toLocaleTimeString()})` : ""}</span>
            <span className='italic'>{item.completedAt ? ` (completed at ${new Date(item.completedAt).toLocaleTimeString()})` : ""}</span> */}
          </span>
        </div>

        <div className='flex flex-col items-center gap-3'>
          {!item.isDone ? 
            <CircleCheckBig size={24} strokeWidth={2.5} onClick={() => completeTodo()} className="cursor-pointer"/> :
            <CircleX size={24} strokeWidth={2.5} onClick={() => completeTodo()} className="cursor-pointer"/>
          }
          <FilePenLine size={24} strokeWidth={2.5} onClick={() => handleEditing()} className="cursor-pointer"/>
          <Trash2 size={24} strokeWidth={2.5} onClick={() => handleDeleteTodo()} className="cursor-pointer"/>
        </div>
      </div>
    </Card>
  )
}

export default TodoCard