"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", orders: 120 },
    { month: "February", orders: 180 },
    { month: "March", orders: 240 },
    { month: "April", orders: 150 },
    { month: "May", orders: 310 },
    { month: "June", orders: 275 },
]


const chartConfig = {
    orders: {
        label: "Orders",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartAreaGradient() {
    return (
        <Card className="bg-background border shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Monthly Orders Overview</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                    Track total product orders in the past 6 months.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        data={chartData}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `${val}`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillorders" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-orders)" stopOpacity={0.7} />
                                <stop offset="95%" stopColor="var(--color-orders)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="orders"
                            stroke="var(--color-orders)"
                            fill="url(#fillorders)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}