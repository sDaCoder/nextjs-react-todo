"use client"
import { CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import useTodo from "@/hooks/useTodo"

const GoToTodayButton = () => {
  const { setSelectedDate } = useTodo()

  const handleGoToToday = () => {
    setSelectedDate(new Date())
  }

  return (
    <Button onClick={handleGoToToday} variant="outline" className="shadow-md rounded-full">
      Go to Today
      <CalendarDays />
    </Button>
  )
}

export default GoToTodayButton
