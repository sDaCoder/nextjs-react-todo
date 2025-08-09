import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CheckCircle2 } from 'lucide-react'
import { Progress } from '../ui/progress'
import { ArrowUpRight } from 'lucide-react'
import { ArrowDownRight } from 'lucide-react'
import { AlertTriangle } from 'lucide-react'
import { ListTodo } from 'lucide-react'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { Cell, Pie, PieChart } from 'recharts'
import { Clock } from 'lucide-react'
import useTodo from '@/hooks/useTodo'

const UserPerformance = ({ range }) => {
    const { metrics, todos } = useTodo()

    const completionRate = metrics.total > 0 ? Math.round((metrics.completed / metrics.total) * 100) : 0
    const overdueRate = metrics.total > 0 ? Math.round((metrics.overdue / metrics.total) * 100) : 0

    // Define completion pie chart data using userStats properties
    const completionPie = useMemo(() => [
        {
            name: "completed",
            label: "Completed",
            value: metrics.completed,
            fill: "hsl(var(--chart-1))"
        },
        {
            name: "remaining",
            label: "Remaining",
            value: metrics.pending - metrics.overdue,
            fill: "hsl(var(--chart-2))"
        },
        {
            name: "overdue",
            label: "Overdue",
            value: metrics.overdue,
            fill: "hsl(var(--chart-3))"
        }
    ], [metrics.completed, metrics.pending, metrics.overdue])

    // Calculate completed tasks by time periods (7, 30, 90 days)
    const categoryPie = useMemo(() => {
        if (!todos || todos.length === 0) {
            return [
                { name: "last7days", label: "Last 7 Days", value: 0 },
                { name: "last30days", label: "Last 30 Days", value: 0 },
                { name: "last90days", label: "Last 90 Days", value: 0 }
            ]
        }

        const now = new Date()
        const last7Days = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000))
        const last30Days = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))
        const last90Days = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000))

        // Count completed tasks in cumulative time periods
        const completedLast7Days = todos.filter(todo => {
            if (!todo.isDone) return false
            const completionDate = new Date(todo.completedAt)
            return completionDate >= last7Days
        }).length

        const completedLast30Days = todos.filter(todo => {
            if (!todo.isDone) return false
            const completionDate = new Date(todo.completedAt)
            return completionDate >= last30Days
        }).length

        const completedLast90Days = todos.filter(todo => {
            if (!todo.isDone) return false
            const completionDate = new Date(todo.completedAt)
            return completionDate >= last90Days
        }).length

        return [
            {
                name: "last7days",
                label: "Last 7 Days",
                value: completedLast7Days,
                fill: "hsl(var(--chart-3))"
            },
            {
                name: "last30days",
                label: "Last 30 Days",
                value: completedLast30Days,
                fill: "hsl(var(--chart-4))"
            },
            {
                name: "last90days",
                label: "Last 90 Days",
                value: completedLast90Days,
                fill: "hsl(var(--chart-5))"
            }
        ]
    }, [todos])
    return (
        <>
            <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                            Completed
                        </CardTitle>
                        <span className="text-xs text-muted-foreground">{range}D</span>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-baseline gap-2">
                            <div className="text-2xl font-bold">{metrics.completed}</div>
                            <div className="text-sm text-muted-foreground">of {metrics.total}</div>
                        </div>
                        <Progress value={completionRate} aria-label="Completion progress" />
                        <div className="flex items-center gap-2 text-xs">
                            {metrics.trendCompletedPct >= 0 ? (
                                <>
                                    <ArrowUpRight className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                                    <span className="text-emerald-700">{metrics.trendCompletedPct}%</span>
                                    <span className="text-muted-foreground">vs previous period</span>
                                </>
                            ) : (
                                <>
                                    <ArrowDownRight className="h-4 w-4 text-rose-600" aria-hidden="true" />
                                    <span className="text-rose-700">{Math.abs(metrics.trendCompletedPct)}%</span>
                                    <span className="text-muted-foreground">vs previous period</span>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-rose-600" aria-hidden="true" />
                            Overdue
                        </CardTitle>
                        <span className="text-xs text-muted-foreground">{range}D</span>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-bold">{metrics.overdue}</div>
                            <div className="text-sm text-muted-foreground">tasks</div>
                        </div>
                        <div className="text-sm">
                            <span className="font-medium">{overdueRate}%</span>{" "}
                            <span className="text-muted-foreground">of total</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            {metrics.trendOverduePct <= 0 ? (
                                <>
                                    <ArrowDownRight className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                                    <span className="text-emerald-700">{Math.abs(metrics.trendOverduePct)}%</span>
                                    <span className="text-muted-foreground">better than last period</span>
                                </>
                            ) : (
                                <>
                                    <ArrowUpRight className="h-4 w-4 text-rose-600" aria-hidden="true" />
                                    <span className="text-rose-700">{metrics.trendOverduePct}%</span>
                                    <span className="text-muted-foreground">vs previous period</span>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <ListTodo className="h-4 w-4 text-slate-700" aria-hidden="true" />
                            Completion Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                completed: { label: "Completed", color: "hsl(var(--chart-1))" },
                                remaining: { label: "Remaining", color: "hsl(var(--chart-2))" },
                                overdue: { label: "Overdue", color: "hsl(var(--chart-3))" },
                            }}
                            className="mx-auto aspect-square max-h-[180px]"
                        >
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                                <Pie
                                    data={completionPie}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={40}
                                    strokeWidth={6}
                                    paddingAngle={1}
                                    isAnimationActive
                                >
                                    <Cell name="completed" fill="var(--color-completed)" />
                                    <Cell name="remaining" fill="var(--color-remaining)" />
                                    <Cell name="overdue" fill="var(--color-overdue)" />
                                </Pie>
                                <ChartLegend content={<ChartLegendContent />} />
                            </PieChart>
                        </ChartContainer>
                        <div className="mt-3 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{completionRate}%</div>
                                <div className="text-xs text-muted-foreground">of tasks completed</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-700" aria-hidden="true" />
                            Completion Timeline
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                last7days: { label: "Last 7 Days", color: "hsl(var(--chart-3))" },
                                last30days: { label: "Last 30 Days", color: "hsl(var(--chart-4))" },
                                last90days: { label: "Last 90 Days", color: "hsl(var(--chart-5))" },
                            }}
                            className="mx-auto aspect-square max-h-[180px]"
                        >
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                                <Pie
                                    data={categoryPie}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={40}
                                    outerRadius={70}
                                    strokeWidth={6}
                                    paddingAngle={1}
                                    isAnimationActive
                                >
                                    {/* {categoryPie.map((slice) => (
                                        <Cell key={slice.name} name={slice.name} fill={`var(--color-${slice.name})`} />
                                    ))} */}
                                    <Cell name="last7days" fill="var(--color-last7days)" />
                                    <Cell name="last30days" fill="var(--color-last30days)" />
                                    <Cell name="last90days" fill="var(--color-last90days)" />
                                </Pie>
                                {/* <ChartLegend content={<ChartLegendContent nameKey="label" />} /> */}
                            </PieChart>
                        </ChartContainer>
                        <div className="mt-3 text-center text-xs text-muted-foreground">
                            Distribution of completed tasks over time periods
                        </div>
                    </CardContent>
                </Card>
            </section>
        </>
    )
}

export default UserPerformance
