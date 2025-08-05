import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { TrendingUp } from 'lucide-react'

const ProgressBar = ({ percentage, color = 'bg-blue-500' }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
        <div
            className={`${color} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
        ></div>
    </div>
)

const SuccessRate = ({userStats}) => {
    return (
        <>
            <Card className="bg-white border-gray-200 w-full md:w-[44vw] h-[35vh]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                        <TrendingUp className="h-5 w-5 text-gray-700" />
                        Success Rate
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Your task completion performance
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-foreground">{userStats.successRate}%</span>
                        <Badge
                            variant={userStats.successRate >= 80 ? 'default' : 'secondary'}
                            className={`${userStats.successRate >= 80 ? 'bg-green-100 text-green-800 border-green-200' :
                                userStats.successRate >= 60 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                    'bg-red-100 text-red-800 border-red-200'
                                }`}
                        >
                            {userStats.successRate >= 80 ? 'Excellent' : userStats.successRate >= 60 ? 'Good' : 'Needs Improvement'}
                        </Badge>
                    </div>
                    <ProgressBar
                        percentage={userStats.successRate}
                        color={userStats.successRate >= 80 ? 'bg-green-500' : userStats.successRate >= 60 ? 'bg-yellow-500' : 'bg-red-600'}
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>{userStats.completedTasks} completed</span>
                        <span>{userStats.totalTasks} total</span>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default SuccessRate
