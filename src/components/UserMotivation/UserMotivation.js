import React from 'react'
import { Card, CardContent } from '../ui/card'

const UserMotivation = ({ userStats }) => {
    return (
        <>
            <div className="max-w-full px-12 mx-auto">
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
            </div>
        </>
    )
}

export default UserMotivation
