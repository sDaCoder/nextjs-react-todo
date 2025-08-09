"use client"
import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import StatCard from '../StatCard/StatCard'
import Autoplay from 'embla-carousel-autoplay'
import { Target } from 'lucide-react'
import { CheckCircle } from 'lucide-react'
import { Clock } from 'lucide-react'
import { AlertTriangle } from 'lucide-react'

const StatsOverview = ({userStats}) => {
    return (
        <>
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-5xl mx-auto"> */}
            <div className='container mx-auto p-4'>
                <Carousel
                    className="w-full"
                    plugins={[
                        Autoplay({
                            delay: 4000,
                            stopOnInteraction: true,
                        })
                    ]}
                >
                    <CarouselContent>
                        <CarouselItem className="md:pl-4 basis-full sm:basis-1 md:basis-1/3 lg:basis-1/4">
                            <StatCard
                                title="Total Tasks"
                                value={userStats.totalTasks}
                                icon={Target}
                                description="All time tasks"
                                color="info"
                            />
                        </CarouselItem>
                        <CarouselItem className="md:pl-4 basis-full sm:basis-1 md:basis-1/3 lg:basis-1/4">
                            <StatCard
                                title="Completed"
                                value={userStats.completedTasks}
                                icon={CheckCircle}
                                description="Tasks finished"
                                color="success"
                            />
                        </CarouselItem>
                        <CarouselItem className="md:pl-4 basis-full sm:basis-1 md:basis-1/3 lg:basis-1/4">
                            <StatCard
                                title="Pending"
                                value={userStats.pendingTasks}
                                icon={Clock}
                                description="Tasks remaining"
                                color="warning"
                            />
                        </CarouselItem>
                        <CarouselItem className="md:pl-4 basis-full sm:basis-1 md:basis-1/3 lg:basis-1/4">
                            <StatCard
                                title="Overdue"
                                value={userStats.overdueTask}
                                icon={AlertTriangle}
                                description="Past deadline"
                                color="danger"
                            />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
            {/* </div> */}
        </>
    )
}

export default StatsOverview
