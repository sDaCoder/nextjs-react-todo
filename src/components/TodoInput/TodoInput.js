"use client"
import useStatedata from '@/app/hooks/useStatedata'
import React from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import TodoForm from '../TodoForm/TodoForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import useTodo from '@/app/hooks/useTodo';

const TodoInput = () => {

    const { isSmallScreen, isOpen, setIsOpen } = useStatedata();
    const { editing } = useTodo();

    return (
        <>
            {isSmallScreen ? (

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
            ) : (

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
            )}
        </>
    )
}

export default TodoInput