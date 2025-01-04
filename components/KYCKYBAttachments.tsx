"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileIcon, Download } from 'lucide-react'

interface Attachment {
  id: string
  fileName: string
  fileType: string
  uploadDate: string
  fileSize: string
}

interface KYCKYBSubmission {
  id: string
  type: 'KYC' | 'KYB'
  status: 'Pending' | 'Approved' | 'Rejected'
  submissionDate: string
  attachments: Attachment[]
}

// Mock data - replace with actual API call in production
const mockSubmissions: KYCKYBSubmission[] = [
  {
    id: '1',
    type: 'KYC',
    status: 'Pending',
    submissionDate: '2023-06-01',
    attachments: [
      { id: '1', fileName: 'passport.pdf', fileType: 'PDF', uploadDate: '2023-06-01', fileSize: '2.5 MB' },
      { id: '2', fileName: 'utility_bill.jpg', fileType: 'Image', uploadDate: '2023-06-01', fileSize: '1.8 MB' },
    ]
  },
  {
    id: '2',
    type: 'KYB',
    status: 'Approved',
    submissionDate: '2023-05-15',
    attachments: [
      { id: '3', fileName: 'business_registration.pdf', fileType: 'PDF', uploadDate: '2023-05-15', fileSize: '3.2 MB' },
      { id: '4', fileName: 'tax_certificate.pdf', fileType: 'PDF', uploadDate: '2023-05-15', fileSize: '1.5 MB' },
    ]
  },
]

export function KYCKYBAttachments() {
  const [submissions, setSubmissions] = useState<KYCKYBSubmission[]>([])

  useEffect(() => {
    // Replace this with an actual API call in production
    setSubmissions(mockSubmissions)
  }, [])

  return (
    <></>
  )
}

function SubmissionCard({ submission }: { submission: KYCKYBSubmission }) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{submission.type} Submission - {submission.submissionDate}</CardTitle>
          <Badge variant={
            submission.status === 'Approved' ? 'success' :
            submission.status === 'Rejected' ? 'destructive' : 'default'
          }>
            {submission.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="text-sm font-semibold mb-2">Attachments:</h4>
        <ul className="space-y-2">
          {submission.attachments.map(attachment => (
            <li key={attachment.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon className="mr-2 h-4 w-4" />
                <span>{attachment.fileName}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">{attachment.fileSize}</span>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

