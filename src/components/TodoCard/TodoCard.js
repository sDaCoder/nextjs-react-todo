"use client"
import { useState } from 'react'

const TodoCard = ({item, setTodos, editing, setEditing, todoEdit, setTodoEdit, isOpen, setIsOpen}) => {


  const completeTodo = () => {
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
  }

  const handleDeleteTodo = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
  }

  const handleEditing = () => {
    setEditing(!editing);
    setTodoEdit(item);
    setIsOpen(!isOpen);
  }
    
  return (
    <div id={item?.id} className="border flex flex-col gap-2 p-4 rounded shadow-md">
      <span className={`text-slate-600 font-bold ${item.isDone ? "line-through" : ""}`}>
        {item.todo}
      </span>
      <span className="text-slate-600 font-bold">
        {new Date(item.addedAt).toLocaleTimeString()}
        <span className='italic'>{item.editedAt ? ` (edited at ${new Date(item.editedAt).toLocaleTimeString()})` : ""}</span>
        <span className='italic'>{item.completedAt ? ` (completed at ${new Date(item.completedAt).toLocaleTimeString()})` : ""}</span>
      </span>
      <div className='flex gap-2'>
          <button onClick={() => completeTodo()} className='bg-slate-800 text-slate-200 px-4 py-2 rounded'>Complete Task</button>
          <button onClick={() => handleEditing()} className='bg-slate-800 text-slate-200 px-4 py-2 rounded'>Edit Task</button>
          <button onClick={() => handleDeleteTodo()} className='bg-slate-800 text-slate-200 px-4 py-2 rounded'>Delete Task</button>
      </div>
    </div>
  )
}

export default TodoCard