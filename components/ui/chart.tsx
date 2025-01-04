"use client"

import { ReactElement } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie';
  colors?: string[];
}

interface ChartContainerProps {
  config?: ChartConfig;
  children: ReactElement;
}

export function ChartContainer({ config, children }: ChartContainerProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

interface LineChartProps {
  data: any[];
  categories: string[];
  colors?: string[];
}

export function LineChartComponent({ data, categories, colors = ['#2563eb', '#16a34a'] }: LineChartProps) {
  return (
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {categories.map((category, index) => (
        <Line
          key={category}
          type="monotone"
          dataKey={category}
          stroke={colors[index]}
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  )
}

interface BarChartProps {
  data: unknown[];
}

export function BarChartComponent({ data }: BarChartProps) {
  return (
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#2563eb" />
    </BarChart>
  )
}

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
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
