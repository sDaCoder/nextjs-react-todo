import { Card, CardContent } from "../ui/card"

const StatCard = ({ title, value, icon: Icon, description, color = 'default' }) => {
    const colorClasses = {
        default: 'text-gray-500',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        danger: 'text-red-500',
        info: 'text-gray-700'
    }

    const bgClasses = {
        default: 'bg-gray-50',
        success: 'bg-green-50',
        warning: 'bg-yellow-50',
        danger: 'bg-red-50',
        info: 'bg-gray-50'
    }

    const borderClasses = {
        default: 'border-foreground',
        success: 'border-green-500',
        warning: 'border-yellow-400',
        danger: 'border-red-600',
        info: 'border-foreground'
    }

    // Different texture patterns for each card type
    const getTexturePattern = () => {
        const patterns = {
            'Total Tasks': (
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 8px,
                            #000 8px,
                            #000 10px
                        )`
                    }} />
                </div>
            ),
            'Completed': (
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 1px)`,
                        backgroundSize: '16px 16px'
                    }} />
                </div>
            ),
            'Pending': (
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 6px,
                            #000 6px,
                            #000 8px
                        )`
                    }} />
                </div>
            ),
            'Overdue': (
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `repeating-conic-gradient(
                            from 0deg at 50% 50%,
                            transparent 0deg,
                            #000 10deg,
                            transparent 20deg
                        )`
                    }} />
                </div>
            )
        }
        return patterns[title] || patterns['Total Tasks']
    }

    return (
        <Card className={`hover:shadow-lg border-l-8 ${borderClasses[color]} border-r-gray-200 border-y-gray-200 h-[35vh] md:h-[40vh] transition-all duration-300 relative overflow-hidden`}>
            {/* {getTexturePattern()} */}

            <CardContent className="p-3 sm:p-4 h-full flex flex-col relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="space-y-1 flex-1 min-w-0">
                        <p className="font-medium text-gray-700 truncate">{title}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-black">{value}</p>
                        {description && (
                            <p className="text-xs text-gray-500">{description}</p>
                        )}
                    </div>
                    <div className={`p-2 rounded-full ${bgClasses[color]} flex-shrink-0`}>
                        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colorClasses[color]}`} />
                    </div>
                </div>

                {/* Decorative Element */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="relative">
                        {/* Large decorative icon with subtle styling */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border border-gray-200">
                            <Icon className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ${colorClasses[color]} opacity-60`} />
                        </div>

                        {/* Subtle geometric decoration */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 rounded-full bg-white" />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded-full" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default StatCard