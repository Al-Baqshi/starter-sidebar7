"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"

interface ChartContainerProps {
  children: React.ReactNode
}

export function ChartContainer({ children }: ChartContainerProps) {
  return (
    <Card className="p-4">
      {children}
    </Card>
  )
}

