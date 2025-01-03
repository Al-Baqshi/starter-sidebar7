"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface BulkActionFormProps {
  onSubmit: (emailSubject: string, emailMessage: string, smsMessage: string, notificationMessage: string) => void
  selectedCount: number
  bulkActionType: string[]
  setBulkActionType: (types: string[]) => void
}

export function BulkActionForm({ onSubmit, selectedCount, bulkActionType, setBulkActionType }: BulkActionFormProps) {
  const [emailSubject, setEmailSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [smsMessage, setSmsMessage] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(emailSubject, emailMessage, smsMessage, notificationMessage)
  }

  const toggleActionType = (type: string) => {
    if (bulkActionType.includes(type)) {
      setBulkActionType(bulkActionType.filter(t => t !== type))
    } else {
      setBulkActionType([...bulkActionType, type])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Select Action Types</Label>
        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="email"
              checked={bulkActionType.includes('email')}
              onCheckedChange={() => toggleActionType('email')}
            />
            <Label htmlFor="email">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sms"
              checked={bulkActionType.includes('sms')}
              onCheckedChange={() => toggleActionType('sms')}
            />
            <Label htmlFor="sms">SMS</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="notification"
              checked={bulkActionType.includes('notification')}
              onCheckedChange={() => toggleActionType('notification')}
            />
            <Label htmlFor="notification">Notification</Label>
          </div>
        </div>
      </div>

      {bulkActionType.includes('email') && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="emailSubject">Email Subject</Label>
            <Input
              id="emailSubject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>
          <div>
            <Label htmlFor="emailMessage">Email Message</Label>
            <Textarea
              id="emailMessage"
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              placeholder="Enter your email message here..."
            />
          </div>
        </div>
      )}

      {bulkActionType.includes('sms') && (
        <div>
          <Label htmlFor="smsMessage">SMS Message</Label>
          <Textarea
            id="smsMessage"
            value={smsMessage}
            onChange={(e) => setSmsMessage(e.target.value)}
            placeholder="Enter your SMS message here..."
          />
        </div>
      )}

      {bulkActionType.includes('notification') && (
        <div>
          <Label htmlFor="notificationMessage">Notification Message</Label>
          <Textarea
            id="notificationMessage"
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            placeholder="Enter your notification message here..."
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>Selected users: {selectedCount}</div>
        <Button type="submit">Send Bulk Actions</Button>
      </div>
    </form>
  )
}

