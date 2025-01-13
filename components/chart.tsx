"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart, Cell, Legend, BarChart, Bar } from "recharts"

import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"

export function ChartContainer({
  children,
}: {
  children: React.ReactElement
}) {
  const { theme: applicationTheme } = useTheme()

  return (
    <Card className="p-4">
      <ResponsiveContainer width="100%" height={350}>
        {children}
      </ResponsiveContainer>
    </Card>
  )
}

interface LineChartProps {
  data: Array<{ name: string } & Record<string, number>>
  categories: string[]
  colors?: string[]
}

interface TooltipData {
  x: number
  y: number
  value: number
  payload: Record<string, any>
}

export function LineChartComponent({ data, categories, colors = ["#2563eb", "#16a34a"] }: LineChartProps) {
  const { theme: applicationTheme } = useTheme()
  const [tooltipData, setTooltipData] = React.useState<TooltipData[]>()
  const [activeIndex, setActiveIndex] = React.useState<number>()

  return (
    <LineChart data={data}
      margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
      onMouseMove={(state) => {
        if (state.activeTooltipIndex) {
          setActiveIndex(state.activeTooltipIndex)
          setTooltipData(state.activePayload)
        } else {
          setActiveIndex(undefined)
          setTooltipData(undefined)
        }
      }}
    >
      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
      <Tooltip content={() => null} cursor={{ strokeWidth: 0 }} />
      {categories.map((category, index) => (
        <Line
          key={category}
          type="monotone"
          dataKey={category}
          stroke={colors[index % colors.length]}
          strokeWidth={2}
          dot={false}
        />
      ))}
      {tooltipData && activeIndex !== undefined && (
        <g>
          {categories.map((category, index) => (
            <circle
              key={category}
              cx={tooltipData[index].x}
              cy={tooltipData[index].y}
              r={4}
              fill={colors[index % colors.length]}
              stroke="white"
              strokeWidth={2}
            />
          ))}
          <rect
            x={tooltipData[0].x + 10}
            y={tooltipData[0].y - 50}
            width={100}
            height={70}
            fill={applicationTheme === "dark" ? "#1f2937" : "white"}
            stroke="#d1d5db"
            strokeWidth={1}
            rx={4}
          />
          <text x={tooltipData[0].x + 18} y={tooltipData[0].y - 30} fontSize={12} fill="#888888">
            {data[activeIndex].name}
          </text>
          {categories.map((category, index) => (
            <text key={category} x={tooltipData[0].x + 18} y={tooltipData[0].y - 10 + index * 20} fontSize={12} fill={colors[index % colors.length]}>
              {`${category}: $${data[activeIndex][category]}`}
            </text>
          ))}
        </g>
      )}
    </LineChart>
  )
}

interface PieChartProps {
  data: Array<{ name: string; value: number; color: string }>
}

export function PieChartComponent({ data }: PieChartProps) {
  return (
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

interface BarChartProps {
  data: Array<{ name: string; value: number }>
}

export function BarChartComponent({ data }: BarChartProps) {
  return (
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  )
}

