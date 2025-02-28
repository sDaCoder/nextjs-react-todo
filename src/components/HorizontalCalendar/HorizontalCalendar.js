import { ChevronLeft } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addDays, format, isSameDay, startOfWeek } from "date-fns"
import { useState } from "react"
import TimeBar from "@/components/TimeBar/TimeBar"

const HorizontalCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7))
  }

  const handlePreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7))
  }

  const dates = new Array(7)
  dates[0] = startOfWeek(currentDate, { weekStartsOn: 1 })
  for (let index = 1; index < dates.length; index++) {
    dates[index] = addDays(dates[0], index)
  }

  return (
    <>
      <TimeBar currentDate={currentDate} />
      <div className="shadow-lg">

        <div className="flex items-center justify-between md:p-4 p-2 ">
          <Button onClick={handlePreviousWeek} variant="outline" className="shadow-md rounded-full">
            <ChevronLeft />
          </Button>
          
          <div className="flex md:gap-6 gap-4">
            {dates.map((date, index) =>(
              <div
                key={index}
                className={`flex flex-col items-center justify-center md:w-12 w-6 md:h-16 h-8 rounded-lg cursor-pointer transition-colors py-6 px-4 
                ${isSameDay(date, new Date()) ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  <span className="text-sm">{format(date, "EEE")}</span>
                  <span className="md:text-2xl text-md font-bold">{format(date, "d")}</span>
              </div>
            ))}
          </div>

          <Button onClick={handleNextWeek} variant="outline" className="shadow-md rounded-full">
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  )
}

export default HorizontalCalendar
