"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileIcon, Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface JobTableItem {
  id: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
}

interface Bid {
  id: string
  bidderName: string
  bidAmount: number
  proposedDuration: string
  jobTable: JobTableItem[]
}

interface TenderDetail {
  id: string
  jobId: string
  jobName: string
  category: string
  description: string
  dueDate: string
  status: "Open" | "In Progress" | "Closed" | "Awarded"
  projectId: string
  projectName: string
  estimatedDuration: string
  specifications: string[]
  attachments: { name: string; url: string }[]
  bids: Bid[]
}

// Mock data for the tender detail
const mockTenderDetail: TenderDetail = {
  id: "T1001",
  jobId: "J1001",
  jobName: "Foundation Work",
  category: "Concrete",
  description: "Excavation and pouring of concrete foundation for Oakwood Residence",
  dueDate: "2024-08-15",
  status: "Open",
  projectId: "P1",
  projectName: "Oakwood Residence",
  estimatedDuration: "4 weeks",
  specifications: [
    "Excavate to a depth of 1.5 meters",
    "Install steel reinforcement as per provided drawings",
    "Pour 30 MPa concrete",
    "Allow for proper curing time before further construction",
  ],
  attachments: [
    { name: "Foundation Plan", url: "/placeholder.svg?height=300&width=300" },
    { name: "Soil Report", url: "/placeholder.svg?height=300&width=300" },
    { name: "Concrete Specifications", url: "/placeholder.svg?height=300&width=300" },
  ],
  bids: [
    {
      id: "B1",
      bidderName: "ABC Construction",
      bidAmount: 75000,
      proposedDuration: "3 weeks",
      jobTable: [
        { id: "J1", description: "Foundation Work", quantity: 1, unit: "lot", unitPrice: 50000, totalPrice: 50000 },
        { id: "J2", description: "Concrete Pouring", quantity: 100, unit: "m3", unitPrice: 250, totalPrice: 25000 },
      ]
    },
  ],
}

export default function TenderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [tender, setTender] = useState<TenderDetail | null>(null)

  useEffect(() => {
    setTender(mockTenderDetail)
  }, [params.id])

  const handleAward = (bidId: string) => {
    if (tender) {
      setTender({
        ...tender,
        status: "Awarded",
        bids: tender.bids.map(bid => 
          bid.id === bidId ? { ...bid, status: "Awarded" } : bid
        )
      })
    }
  }

  if (!tender) {
    return <div>Loading...</div>
  }

  return (
    <div className="container space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{tender.jobName}</h1>
          <p className="text-xl text-muted-foreground">{tender.projectName}</p>
        </div>
        <div className="flex space-x-4">
          <Badge variant={
            tender.status === 'Open' ? 'default' :
            tender.status === 'In Progress' ? 'secondary' :
            tender.status === 'Closed' ? 'destructive' :
            tender.status === 'Awarded' ? 'success' : 'outline'
          }>
            {tender.status}
          </Badge>
          <Button asChild>
            <Link href={`/tenders/${tender.id}/create-bid`}>Create Bid</Link>
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <Button variant="outline" asChild>
          <Link href={`/soq/bidder?tenderId=${tender.id}`}>View SOQ</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Description:</p>
              <p>{tender.description}</p>
            </div>
            <div>
              <p className="font-semibold">Category:</p>
              <p>{tender.category}</p>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <p>Due Date: {tender.dueDate}</p>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <p>Estimated Duration: {tender.estimatedDuration}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {tender.specifications.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attachments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tender.attachments.map((attachment, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image src={attachment.url} alt={attachment.name} width={300} height={300} className="w-full h-40 object-cover rounded-md" />
                <p className="mt-2">{attachment.name}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <FileIcon className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bids</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bidder</TableHead>
                <TableHead>Bid Amount</TableHead>
                <TableHead>Proposed Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tender.bids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell>{bid.bidderName}</TableCell>
                  <TableCell>${bid.bidAmount.toLocaleString()}</TableCell>
                  <TableCell>{bid.proposedDuration}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/tenders/${tender.id}/proposals/${bid.id}`}>
                          View Proposal
                        </Link>
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleAward(bid.id)}
                        disabled={tender.status === "Awarded"}
                      >
                        Award
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

