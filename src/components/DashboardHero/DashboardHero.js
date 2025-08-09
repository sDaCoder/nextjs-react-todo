"use client"
import React, { useMemo } from 'react'
import UserAvatar from '../UserAvatar/UserAvatar'
import { authClient } from '../../../lib/auth-client'
import { Button } from '../ui/button'
import { Sparkles } from 'lucide-react'
import useTodo from '@/hooks/useTodo'

const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
}

const DashboardHero = ({ range, reference }) => {
    const { data: session } = authClient.useSession()
    const username = session?.user?.name || 'User'
    const { userStats } = useTodo()

    const metrics = useMemo(() => {
        if (!userStats) {
            return {
                completed: 0,
                total: 0,
                pending: 0,
                overdue: 0,
                today: 0,
                trendCompletedPct: 0
            }
        }

        // For now, we'll use a simple trend calculation
        // In a real app, you'd compare with previous period data
        const trendCompletedPct = userStats.successRate > 50 ?
            Math.floor(Math.random() * 20) + 5 : // Positive trend for good performance
            -(Math.floor(Math.random() * 15) + 2) // Negative trend for poor performance

        // Calculate overdue trend (negative is better for overdue tasks)
        const trendOverduePct = userStats.overdueTask > 0 ?
            Math.floor(Math.random() * 15) + 3 : // Positive trend (worse) when there are overdue tasks
            -(Math.floor(Math.random() * 10) + 2) // Negative trend (better) when no overdue tasks

        return {
            completed: userStats.completedTasks,
            total: userStats.totalTasks,
            pending: userStats.pendingTasks,
            overdue: userStats.overdueTask,
            today: userStats.todayTasks,
            trendCompletedPct,
            trendOverduePct
        }
    }, [userStats])

    return (
        <>
            {/* <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <div className="space-y-2 animate-fade-in flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground animate-slide-up leading-tight">
                        {getGreeting()}, {session?.user?.name || 'User'}!{" "}
                        <span className="inline-block animate-wave">👋</span>
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg animate-slide-up animation-delay-200 pr-0 sm:pr-4">
                        Welcome back to your task dashboard. Here's your progress overview.
                    </p>
                </div>
                <div className="animate-fade-in animation-delay-300 flex justify-end sm:justify-start">
                    <UserAvatar />
                </div>
            </div> */}
            <section
                aria-label="Welcome"
                className="rounded-2xl border bg-gradient-to-r from-foreground/25 via-foreground/5 to-foreground/25 p-6 shadow-sm dark:from-emerald-950/40 dark:to-amber-950/30"
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                            <p className="text-xs uppercase tracking-wider text-muted-foreground">Welcome</p>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground animate-slide-up leading-tight">
                            {getGreeting()}, {username}! <span className="inline-block animate-wave">👋</span>
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            You’ve completed <span className="font-medium text-foreground">{metrics.completed}</span> of{" "}
                            <span className="font-medium text-foreground">{metrics.total}</span> tasks in the last{" "}
                            <span className="font-medium text-foreground">{range}</span> days. Keep going!
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        {/* <Button variant="default">Add task</Button> */}
                        <UserAvatar />
                        <Button onClick={() => reference.current.scrollIntoView({ behavior: 'smooth' })}>View today</Button>
                    </div>
                </div>

                {/* Quick hero stats */}
                <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="rounded-xl border bg-background p-3">
                        <div className="text-xs text-muted-foreground">Completed</div>
                        <div className="mt-1 text-lg font-semibold">{metrics.completed}</div>
                    </div>
                    <div className="rounded-xl border bg-background p-3">
                        <div className="text-xs text-muted-foreground">Pending</div>
                        <div className="mt-1 text-lg font-semibold">{metrics.pending}</div>
                    </div>
                    <div className="rounded-xl border bg-background p-3">
                        <div className="text-xs text-muted-foreground">Overdue</div>
                        <div className="mt-1 text-lg font-semibold">{metrics.overdue}</div>
                    </div>
                </div>
            </section>
            <style jsx>
                {`
                    @keyframes wave {
                        0%, 100% { transform: rotate(0deg); }
                        25% { transform: rotate(20deg); }
                        75% { transform: rotate(-20deg); }
                    }
                    
                    .animate-wave {
                        animation: wave 2s ease-in-out infinite;
                        transform-origin: 70% 70%;
                    }
                `}
            </style>
        </>
    )
}

export default DashboardHero
