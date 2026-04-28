"use client"
import { toast } from "sonner"
import { Check, CircleCheckBig, Clock3, FilePenLine, RotateCcw, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { differenceInCalendarDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import useStatedata from "@/hooks/useStatedata"
import useTodo from "@/hooks/useTodo"
import { cn } from "@/lib/utils"
import axios from "axios"

const twoLineClampStyle = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
};

const TodoCard = ({ item }) => {
  const { isOpen, setIsOpen, setIsLoading } = useStatedata();
  const {
    setTodos,
    refreshTodos,
    setEditing,
    setTodoEdit,
  } = useTodo();

  const completeTodo = async () => {
    const nextIsDone = !item.isDone;
    const nextCompletedAt = nextIsDone ? Date.now() : null;

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, isDone: nextIsDone, completedAt: nextCompletedAt }
          : todo
      )
    );

    try {
      await axios.patch(`/api/todos/${item.id}`, { isDone: nextIsDone });

      if (nextIsDone) {
        toast.success("Task completed", {
          description: item.todo,
          duration: 4000,
        });
      } else {
        toast.success("Task marked active", {
          description: item.todo,
          duration: 4000,
        });
      }
    } catch {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === item.id
            ? { ...todo, isDone: item.isDone, completedAt: item.completedAt ?? null }
            : todo
        )
      );
      toast.error("Could not update this task", {
        description: "Try again in a moment.",
        duration: 4000,
      });
    }
  }

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);

      toast.success("Task deleted", {
        description: item.todo,
        duration: 4000,
      });

      setIsLoading(true);
      await refreshTodos().finally(() => setIsLoading(false));
    } catch {
      toast.error("Could not delete this task", {
        description: "Try again in a moment.",
        duration: 4000,
      })
    }
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

    hours = hours % 12 || 12;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${amPm}`;
  };

  const getDeadlineMeta = (deadline) => {
    const diff = differenceInCalendarDays(new Date(deadline), new Date());
    const formattedTime = convertTo12HourFormat(deadline);
    const formattedDate = new Date(deadline).toLocaleDateString();

    if (diff === 0) {
      return {
        label: "Due today",
        tone: "warning",
        detail: formattedTime,
      };
    }

    if (diff === 1) {
      return {
        label: "Due tomorrow",
        tone: "upcoming",
        detail: formattedTime,
      };
    }

    if (diff < 0) {
      return {
        label: `${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} overdue`,
        tone: "overdue",
        detail: formattedTime,
      };
    }

    return {
      label: `Due ${formattedDate}`,
      tone: "upcoming",
      detail: formattedTime,
    };
  }

  const deadlineMeta = getDeadlineMeta(item.deadline);
  const statusBadge = item.isDone
    ? {
        label: "Completed",
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
      }
    : {
        label: "In progress",
        className: "border-border bg-muted/70 text-muted-foreground",
      };

  const deadlineToneClass = item.isDone
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : deadlineMeta.tone === "overdue"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : deadlineMeta.tone === "warning"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-sky-200 bg-sky-50 text-sky-700";

  return (
    <Card
      className={cn(
        "w-[90vw] border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:w-[30vw]",
        item.isDone && "border-emerald-200/80 bg-emerald-50/40"
      )}
    >
      <div
        id={item?.id}
        className="flex h-[260px] overflow-hidden p-5 sm:gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div className="flex min-w-0 flex-1 flex-col justify-between overflow-hidden">
          <div className="flex min-w-0 flex-col gap-4 overflow-hidden">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]", statusBadge.className)}>
              {statusBadge.label}
            </span>
            <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium", deadlineToneClass)}>
              {item.isDone ? <Check size={14} strokeWidth={2.25} /> : <Clock3 size={14} strokeWidth={2.25} />}
              <span>{item.isDone ? "Finished" : deadlineMeta.label}</span>
            </span>
          </div>

          <div className="space-y-2">
            <h1
              className={cn(
                "max-w-[32ch] overflow-hidden text-lg font-semibold leading-snug text-foreground sm:text-xl",
                item.isDone && "text-foreground/75 line-through decoration-2"
              )}
              style={twoLineClampStyle}
              title={item.todo}
            >
              {item.todo}
            </h1>
            {item.desc ? (
              <p
                className="max-w-[60ch] overflow-hidden text-sm leading-6 text-muted-foreground"
                style={twoLineClampStyle}
                title={item.desc}
              >
                {item.desc}
              </p>
            ) : (
              <p className="text-sm italic text-muted-foreground/80">
                No description added.
              </p>
            )}
          </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <p className="font-medium text-foreground/85">
              {item.isDone ? "Completed task" : deadlineMeta.label}
            </p>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
            <p className="text-muted-foreground">
              {item.isDone
                ? `Completed at ${convertTo12HourFormat(item.completedAt)}`
                : `${new Date(item.deadline).toLocaleDateString()} at ${deadlineMeta.detail}`}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 self-end sm:self-start">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={completeTodo}
            className={cn(
              "h-11 w-11 rounded-full border transition-colors",
              item.isDone
                ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                : "border-sky-200 text-sky-700 hover:bg-sky-50 hover:text-sky-800"
            )}
            aria-label={item.isDone ? "Mark task as active" : "Mark task as complete"}
            title={item.isDone ? "Mark task as active" : "Mark task as complete"}
          >
            {item.isDone ? <RotateCcw strokeWidth={2.25} /> : <CircleCheckBig strokeWidth={2.25} />}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleEditing}
            className="h-11 w-11 rounded-full border border-border text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Edit task"
            title="Edit task"
          >
            <FilePenLine strokeWidth={2.25} />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-full border border-rose-200 text-rose-700 transition-colors hover:bg-rose-50 hover:text-rose-800"
                aria-label="Delete task"
                title="Delete task"
              >
                <Trash2 strokeWidth={2.25} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-semibold text-foreground">
                  Delete this task?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove <span className="font-medium text-foreground">{item.todo}</span> from your list.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteTodo(item.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  )
}

export default TodoCard
