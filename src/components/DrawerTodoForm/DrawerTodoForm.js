import { Drawer,DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import TodoForm from "@/components/TodoForm/TodoForm";
import { useContext } from "react";
import { TodoContext } from "@/TodoContext";

const DrawerTodoForm = () => {
    const {
        isOpen,
        setIsOpen,
        editing
    } = useContext(TodoContext)
    return (
        <>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            <p className="text-slate-800 text-3xl font-bold">
                                {editing ? "Edit Your Task" : "Add Your Task"}
                            </p>
                        </DrawerTitle>
                    </DrawerHeader>

                    <TodoForm />
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DrawerTodoForm
