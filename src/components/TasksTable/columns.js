"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Task type definition
export const columns = [
  {
    accessorKey: "text",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const task = row.original
      return (
        <div className="max-w-[400px]">
          <div className="font-medium mx-4">{task.todo || 'Untitled Task'}</div>
          {task.description && (
            <div className="text-sm text-muted-foreground mt-1">
              {task.description}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const deadline = row.getValue("deadline")
      if (!deadline) return <span className="text-muted-foreground">No deadline</span>
      
      const deadlineDate = new Date(deadline)
      const today = new Date()
      const isOverdue = deadlineDate < today && !row.original.isDone
      
      return (
        <div className={`font-medium ${isOverdue ? 'text-red-500' : ''}`}>
          {deadlineDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
          {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
        </div>
      )
    },
  },
  {
    accessorKey: "isDone",
    header: "Status",
    cell: ({ row }) => {
      const completed = row.getValue("isDone")
      const deadline = row.original.deadline
      const isOverdue = deadline && new Date(deadline) < new Date() && !completed
      
      return (
        <Badge 
          variant={completed ? "default" : isOverdue ? "destructive" : "secondary"}
          className={
            completed 
              ? "bg-green-100 text-green-800 border-green-200" 
              : isOverdue 
                ? "bg-red-100 text-red-800 border-red-200"
                : "bg-yellow-100 text-yellow-800 border-yellow-200"
          }
        >
          {completed ? "Completed" : isOverdue ? "Overdue" : "Pending"}
        </Badge>
      )
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.id)}
            >
              Copy task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {task.isDone ? "Mark as pending" : "Mark as completed"}
            </DropdownMenuItem>
            <DropdownMenuItem>Edit task</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Delete task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
