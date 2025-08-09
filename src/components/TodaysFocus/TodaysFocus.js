import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Calendar } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'

const TodaysFocus = ({ userStats }) => {
    return (
        <>
            <Card className="bg-white border-gray-200 w-full md:w-[45vw] h-[35vh]">
                <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-foreground text-lg sm:text-xl">
                        <Calendar className="h-5 w-5 text-gray-700" />
                        Today's Focus
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm sm:text-base">
                        Tasks scheduled for today
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-2xl sm:text-3xl font-bold text-foreground">{userStats.todayTasks}</span>
                        <Badge variant="outline" className="border-gray-300 text-gray-700 text-xs sm:text-sm">
                            {userStats.todayTasks === 0 ? 'No tasks' : userStats.todayTasks === 1 ? '1 task' : `${userStats.todayTasks} tasks`}
                        </Badge>
                    </div>

                    <Separator className="bg-gray-200" />

                    <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-gray-600">Overdue Tasks</span>
                            <span className={`text-xs sm:text-sm font-bold ${userStats.overdueTask > 0 ? 'text-red-500' : 'text-green-500'
                                }`}>
                                {userStats.overdueTask > 0 ? `${userStats.overdueTask} overdue` : 'All caught up!'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-gray-600">Pending Tasks</span>
                            <span className="text-xs sm:text-sm font-bold">
                                {userStats.pendingTasks} remaining
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default TodaysFocus
