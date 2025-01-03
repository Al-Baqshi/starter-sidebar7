import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface JobTableItem {
  id: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
}

interface BidderProposalProps {
  bidderName: string
  estimatedCost: number
  estimatedDuration: string
  jobTable: JobTableItem[]
}

export function BidderProposal({ bidderName, estimatedCost, estimatedDuration, jobTable }: BidderProposalProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{bidderName} Proposal</CardTitle>
        <CardDescription>Detailed breakdown of the bid</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Estimated Cost:</p>
              <p className="text-2xl font-bold">${estimatedCost.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Estimated Duration:</p>
              <p className="text-2xl font-bold">{estimatedDuration}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Job Breakdown</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobTable.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

