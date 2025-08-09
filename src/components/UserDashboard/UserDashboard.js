"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TodoContext } from '../../context/TodoContext'
import { DataTable } from '../TasksTable/data-table'
import { columns } from '../TasksTable/columns'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import DashboardHero from '../DashboardHero/DashboardHero'
import UserMotivation from '../UserMotivation/UserMotivation'
import { Separator } from '../ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import UserPerformance from '../UserPerformance/UserPerformance'

const UserDashboard = () => {
    const { todos, refreshTodos } = useContext(TodoContext)
    const [range, setRange] = useState(30)
    const ref = useRef(null)

    useEffect(() => {
        refreshTodos()
    }, [])

    return (
        <main className="min-h-screen bg-white w-full p-4 md:p-6 lg:p-8">
            {/* Header with UserAvatar */}
            <DashboardHero reference={ref} range={range} />

            <div ref={ref} className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col md:space-y-2 animate-fade-in animation-delay-200">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Task Performance</h1>
                    <p className="text-sm text-muted-foreground">A quick overview of your productivity and task health.</p>
                </div>
                <div className="flex items-center gap-2 animate-fade-in animation-delay-300">
                    <Select value={range} defaultValue={range} onValueChange={(v) => setRange(Number(v))}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={7}>Last 7 days</SelectItem>
                            <SelectItem value={30}>Last 30 days</SelectItem>
                            <SelectItem value={90}>Last 90 days</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="hidden sm:inline-flex bg-transparent" onClick={() => setRange(30)}>
                        Reset
                    </Button>
                </div>
            </div>
            <Separator className="my-4" />

            <UserPerformance range={range} />

            {/* <section className='px-4 md:px-0 mt-8'>
                <div className="mb-4 space-y-2 animate-fade-in animation-delay-200 md:px-14">
                    <h1 className="text-3xl font-extrabold text-foreground">Today's Focus</h1>
                    <p className="text-sm">Taskistics</p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-4">
                    <TodaysFocus userStats={userStats} />
                    <SuccessRate userStats={userStats} />
                </div>
            </section> */}            

            {/* Tasks Data Table */}
            <div className="py-6">
                <div className="mb-4 md:space-y-2 animate-fade-in animation-delay-200">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">Your Tasks</h1>
                    <p className="text-sm">Manage and track all your tasks in one place</p>
                </div>
                <Separator className="my-4" />
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
            <UserMotivation reference={ref} />

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
                
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                
                .animate-slide-up {
                    animation: slideUp 0.6s ease-out forwards;
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
        </main>
    )
}

export default UserDashboard