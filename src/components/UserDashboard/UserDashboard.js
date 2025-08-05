"use client"
import React, { useContext, useEffect } from 'react'
import { TodoContext } from '../../context/TodoContext'
import StatsOverview from '../StatsOverview/StatsOverview'
import { DataTable } from '../TasksTable/data-table'
import { columns } from '../TasksTable/columns'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import DashboardHero from '../DashboardHero/DashboardHero'
import SuccessRate from '../SuccessRate/SuccessRate'
import TodaysFocus from '../TodaysFocus/TodaysFocus'
import UserMotivation from '../UserMotivation/UserMotivation'

const UserDashboard = () => {
    const { todos, refreshTodos, userStats } = useContext(TodoContext)

    useEffect(() => {
        refreshTodos()
    }, [])

    return (
        <div className="min-h-screen bg-white p-3 sm:p-4 lg:p-6">
            {/* Header with UserAvatar */}
            <DashboardHero />

            <section className='px-4 md:px-0 mt-8'>
                <div className="mb-4 space-y-2 animate-fade-in animation-delay-200 md:px-14">
                    <h1 className="text-3xl font-extrabold text-foreground">Stats Overview</h1>
                    <p className="text-sm">Overview of your tasks</p>
                </div>
                <StatsOverview userStats={userStats} />
            </section>

            {/* Today's Focus and Success Rate */}
            <section className='px-4 md:px-0 mt-8'>
                <div className="mb-4 space-y-2 animate-fade-in animation-delay-200 md:px-14">
                    <h1 className="text-3xl font-extrabold text-foreground">Today's Focus</h1>
                    <p className="text-sm">Taskistics</p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-4">
                    <TodaysFocus userStats={userStats} />
                    <SuccessRate userStats={userStats} />
                </div>
            </section>

            {/* Tasks Data Table */}
            <div className="md:p-12 p-6">
                <div className="mb-4 space-y-2 animate-fade-in animation-delay-200">
                    <h1 className="text-3xl font-extrabold text-foreground">Your Tasks</h1>
                    <p className="text-sm">Manage and track all your tasks in one place</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6">
                    <ScrollArea className="w-full">
                        <div className="min-w-[800px] md:min-w-0">
                            <DataTable columns={columns} data={todos || []} />
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>

            {/* Motivational Message */}
            <UserMotivation userStats={userStats} />

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes wave {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(20deg); }
                    75% { transform: rotate(-20deg); }
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                
                .animate-slide-up {
                    animation: slideUp 0.6s ease-out forwards;
                }
                
                .animate-wave {
                    animation: wave 2s ease-in-out infinite;
                    transform-origin: 70% 70%;
                }
                
                .animation-delay-200 {
                    animation-delay: 0.2s;
                    opacity: 0;
                }
                
                .animation-delay-300 {
                    animation-delay: 0.3s;
                    opacity: 0;
                }
                
                .animation-delay-500 {
                    animation-delay: 0.5s;
                    opacity: 0;
                }
            `}</style>
        </div>
    )
}

export default UserDashboard