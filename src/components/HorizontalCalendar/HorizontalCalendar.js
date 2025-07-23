"use client"
import { ChevronLeft } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addDays, format, isSameDay, startOfWeek } from "date-fns"
import { useState } from "react"
import TimeBar from "@/components/TimeBar/TimeBar"
import { useSwipeable } from "react-swipeable"
import useStatedata from "@/hooks/useStatedata"

const HorizontalCalendar = () => {
  const { isSmallScreen } = useStatedata();
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
    dates[index] = addDays(dates[index - 1], 1)
  }

  const handlers = useSwipeable({
    onSwipedLeft: handleNextWeek,
    onSwipedRight: handlePreviousWeek,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  return (
    <>
      <TimeBar currentDate={currentDate} />
      <div {...handlers} className="shadow-lg">

        <div className="flex items-center justify-center md:p-4 p-2 ">
          {!isSmallScreen &&
            <Button onClick={handlePreviousWeek} variant="outline" className="shadow-md rounded-full">
              <ChevronLeft />
            </Button>
          }

          <div className="flex flex-wrap justify-center md:gap-6 gap-2 px-3">
            {dates.map((date, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center md:w-12 w-9 md:h-16 h-12 rounded-lg cursor-pointer transition-colors py-8 px-4 
                ${isSameDay(date, new Date()) ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                <span className="text-sm">{format(date, "EEE")}</span>
                <span className="md:text-2xl text-md font-bold">{format(date, "d")}</span>
              </div>
            ))}
          </div>

          {!isSmallScreen &&
            <Button onClick={handleNextWeek} variant="outline" className="shadow-md rounded-full">
              <ChevronRight />
            </Button>
          }
        </div>
      </div>
    </>
  )
}

export default HorizontalCalendar