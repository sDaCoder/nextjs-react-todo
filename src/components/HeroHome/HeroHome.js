"use client"
import React from 'react'
import { BackgroundLines } from '../ui/background-lines'
import { ContainerTextFlip } from '../ui/container-text-flip'
import Link from 'next/link'
import { RainbowButton } from '../magicui/rainbow-button'

const HeroHome = () => {
    return (
        <>
            <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 h-auto min-h-[60vh] md:min-h-[70vh]">
                <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-200 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-extrabold md:font-bold lg:font-bold tracking-tight">
                    Welcome to TaskMachinà<br />
                    <span>
                        <ContainerTextFlip
                            words={[
                                "Schedule It",
                                // "Organize It",
                                "Track It",
                                "Complete It",
                                "Nail It"
                            ]}
                        />
                    </span>
                </h2>
                {/* <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
					The best way to manage your tasks
				</p> */}
                <RainbowButton asChild>
                    <Link href="/tasks">Get Started</Link>
                </RainbowButton>
            </BackgroundLines>
        </>
    )
}

export default HeroHome