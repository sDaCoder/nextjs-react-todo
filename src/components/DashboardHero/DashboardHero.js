import React from 'react'
import UserAvatar from '../UserAvatar/UserAvatar'
import { authClient } from '../../../lib/auth-client'

const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
}

const DashboardHero = () => {
    const { data: session } = authClient.useSession()

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
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
            </div>
        </>
    )
}

export default DashboardHero
