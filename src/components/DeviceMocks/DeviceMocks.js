"use client"
import React from 'react'
import ResponsiveSafari from './ResponsiveSafari'
import ResponsiveIphone from './ResponsiveIphone'
import { Highlighter } from '../magicui/highlighter'

const DeviceMocks = () => {
    return (
        <>
            <h2 className="text-center text-2xl md:text-5xl lg:text-7xl font-sans py-2 md:py-10 my-4 relative z-20 font-bold tracking-tight">
                <Highlighter padding={8} action='underline' color='#525252'>
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-200 dark:from-neutral-600 dark:to-white">
                        User Friendly UI
                    </span>
                </Highlighter>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center w-full px-4 gap-8">
                {/* Safari Browser Mockup - Responsive Container */}
                <ResponsiveSafari
                    url="https://task-machine-nextjs.vercel.app/tasks"
                    imageSrc={'/safari-mockup.png'}
                    maxWidth="800px"
                    className="w-full"
                />
                
                {/* iPhone Mockup - Responsive Container */}
                <ResponsiveIphone
                    src={'/iphone-mockup-2.png'}
                    maxWidth="250px"
                    className="w-full md:w-auto"
                />
            </div>
        </>
    )
}

export default DeviceMocks
