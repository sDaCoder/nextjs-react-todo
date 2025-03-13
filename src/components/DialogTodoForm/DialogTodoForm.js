import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TodoForm from "@/components/TodoForm/TodoForm";
import { useContext } from "react";
import { TodoContext } from "@/TodoContext";

const DialogTodoForm = () => {
    const {
        isOpen,
        setIsOpen,
        editing
    } = useContext(TodoContext)
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>

                    <DialogHeader>
                        <DialogTitle>
                            <p className="text-slate-800 text-3xl font-bold">
                                {editing ? "Edit Your Task" : "Add Your Task"}
                            </p>
                        </DialogTitle>
                    </DialogHeader>

                    <TodoForm />
                </DialogContent>

            </Dialog>
        </>
    )
}

export default DialogTodoForm
