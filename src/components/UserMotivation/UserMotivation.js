import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import useTodo from '@/hooks/useTodo'
import { Trophy } from 'lucide-react'
import { Button } from '../ui/button'

function getMotivationMessage(todayCount) {
    if (todayCount <= 0) {
        return "Every streak starts with one task — you’ve got this!"
    }
    if (todayCount <= 3) {
        return "Nice start. Keep the momentum going!"
    }
    if (todayCount <= 7) {
        return "Great job — you’re on a roll."
    }
    if (todayCount <= 12) {
        return "Fantastic productivity — keep it up!"
    }
    return "Outstanding — you’re crushing your goals!"
}

const UserMotivation = ({ reference }) => {
    const { userStats } = useTodo()

    return (
        <>
            {/* <div className="max-w-full px-12 mx-auto">
                <Card className="bg-gray-50 border-gray-200 animate-fade-in animation-delay-500">
                    <CardContent className="p-4 sm:p-6">
                        <div className="text-center space-y-2 sm:space-y-3">
                            {userStats.overdueTask > 0 ? (
                                <>
                                    <h3 className="text-lg sm:text-xl font-semibold text-black animate-bounce">
                                        ⚡ Time to catch up!
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                        You have <span className="font-semibold text-red-500">{userStats.overdueTask}</span> overdue task{userStats.overdueTask > 1 ? 's' : ''}.
                                        Let's get them done and keep the momentum going!
                                    </p>
                                </>
                            ) : userStats.pendingTasks > 0 ? (
                                <>
                                    <h3 className="text-lg sm:text-xl font-semibold text-black animate-pulse">
                                        🚀 Keep up the great work!
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                        You're doing amazing! <span className="font-semibold text-yellow-500">{userStats.pendingTasks}</span> task{userStats.pendingTasks > 1 ? 's' : ''} left to complete.
                                        You've got this!
                                    </p>
                                </>
                            ) : userStats.totalTasks > 0 ? (
                                <>
                                    <h3 className="text-lg sm:text-xl font-semibold text-black animate-bounce">
                                        🎉 All tasks completed!
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                        Fantastic! You've completed all your tasks. Time to add some new goals or take a well-deserved break.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg sm:text-xl font-semibold text-black">
                                        📝 Ready to get started?
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                        Your task dashboard is ready! Start by adding your first task and begin your productivity journey.
                                    </p>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div> */}

            <section aria-label="Motivation" className="">
                <Card className="overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400" />
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-amber-600" aria-hidden="true" />
                            Today’s Wins
                        </CardTitle>
                        <span className="text-xs text-muted-foreground">Updated just now</span>
                    </CardHeader>
                    <CardContent className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="md:text-2xl text-xl font-bold">
                                You’ve completed <span className="text-emerald-600">{userStats.completedTasks}</span>{" "}
                                {userStats.completedTasks === 1 ? "task" : "tasks"} today
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{getMotivationMessage(userStats.completedTasks)}</p>
                        </div>
                        <div className="mt-2 flex gap-2 sm:mt-0">
                            <Button onClick={() => reference.current.scrollIntoView({ behavior: 'smooth' })} variant="outline">Review today</Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </>
    )
}

export default UserMotivation
