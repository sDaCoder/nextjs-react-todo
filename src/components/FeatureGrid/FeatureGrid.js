import { IconCalendarEvent } from "@tabler/icons-react"
import { IconShieldCheck } from "@tabler/icons-react"
import { IconClipboardCheck } from "@tabler/icons-react"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Skeleton } from "../ui/skeleton"
import Image from "next/image"
import { Highlighter } from "../magicui/highlighter"

const FeatureGrid = () => {
    return (
        <>
            <h2 className="text-center text-3xl md:text-5xl lg:text-7xl font-sans py-2 md:py-10 my-4 relative z-20 font-extrabold tracking-tight">
                <Highlighter padding={10} action='underline' color='#525252'>
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-200 dark:from-neutral-600 dark:to-white">
                        Our Features
                    </span>
                </Highlighter>
            </h2>
            <BentoGrid className="container max-w-4xl mx-auto px-6 mb-12">
                {gridFeatures.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </>
    )
}

export default FeatureGrid

const gridFeatures = [
    {
        title: "Smart Task Management",
        description: "Create, organize, and track your tasks with deadlines and priorities.",
        // header: <Skeleton className="h-full w-full" />,
        header: (
            <Image
                src='/feature1.jpg'
                alt='feature1'
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
                priority={false}
            /> ||
            <Skeleton className="h-full w-full" />
        ),
        icon: <IconClipboardCheck className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Deadline Tracking",
        description: "Never miss important deadlines with intelligent date management.",
        header: (
            <Image
                src='/feature2.jpg'
                alt='feature2'
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
                priority={false}
            /> ||
            <Skeleton className="h-full w-full" />
        ),
        icon: <IconCalendarEvent className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Secure User Accounts",
        description: "Your tasks are private and secure with personal user authentication.",
        header: (
            <Image
                src='/feature3.jpg'
                alt='feature3'
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
                priority={false}
            /> ||
            <Skeleton className="h-full w-full" />
        ),
        icon: <IconShieldCheck className="h-4 w-4 text-neutral-500" />,
    },
]