"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// Mock data for KYC/KYB applications
const mockApplications = [
  { id: 1, companyName: "Tech Solutions Inc.", status: "Pending", submissionDate: "2023-06-01" },
  { id: 2, companyName: "Green Energy Co.", status: "Verified", submissionDate: "2023-05-28" },
  { id: 3, companyName: "Global Logistics Ltd.", status: "Rejected", submissionDate: "2023-05-25" },
  { id: 4, companyName: "Innovative Startups LLC", status: "Pending", submissionDate: "2023-06-02" },
]

export default function KYCAdminPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [newStatus, setNewStatus] = useState<string>("")
  const [rejectionReason, setRejectionReason] = useState<string>("")

  const handleStatusChange = (id: number, newStatus: string, reason?: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ))
    setSelectedApplication(null)
    setNewStatus("")
    setRejectionReason("")
    toast({
      title: "Status Updated",
      description: `Application status has been updated to ${newStatus}.`,
    })
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>KYC/KYB Admin Dashboard</CardTitle>
          <CardDescription>Manage and verify KYC/KYB applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.companyName}</TableCell>
                  <TableCell>{application.submissionDate}</TableCell>
                  <TableCell>
                    <Badge variant={
                      application.status === "Verified" ? "success" :
                      application.status === "Rejected" ? "destructive" :
                      "default"
                    }>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedApplication(application)}>
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Review KYC/KYB Application</DialogTitle>
                          <DialogDescription>
                            Update the status of the KYC/KYB application for {selectedApplication?.companyName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                              Status
                            </Label>
                            <Select onValueChange={setNewStatus} defaultValue={selectedApplication?.status}>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select new status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Verified">Verified</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {newStatus === "Rejected" && (
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="reason" className="text-right">
                                Reason
                              </Label>
                              <Textarea
                                id="reason"
                                placeholder="Enter rejection reason"
                                className="col-span-3"
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button onClick={() => handleStatusChange(selectedApplication?.id, newStatus, rejectionReason)}>
                            Update Status
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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

