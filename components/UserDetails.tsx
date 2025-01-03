"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Bell, FileText, DollarSign } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea";

interface UserDetailsProps {
  user: any
}

export function UserDetails({ user }: UserDetailsProps) {
  const [notes, setNotes] = useState<Array<{ text: string, timestamp: string }>>([])
  const [newNote, setNewNote] = useState('')
  return (
    <div className="space-y-6 w-full">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="related-entities">Related Entities</TabsTrigger>
          <TabsTrigger value="rts-rfps">RTs & RFPs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Basic details and actions for {user.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Email:</Label>
                    <div>{user.email}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Role:</Label>
                    <div>{user.category}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Entity:</Label>
                    <div>{user.entity}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">KYC Status:</Label>
                    <Badge variant={user.kycStatus === 'Verified' ? 'success' : 'warning'}>
                      {user.kycStatus}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Country:</Label>
                    <div>{user.country}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">City:</Label>
                    <div>{user.city}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Industry:</Label>
                    <div>{user.industry}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Category:</Label>
                    <div>{user.category}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button className="w-full" variant="default">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                  </Button>
                  <Button className="w-full" variant="default">
                    <Bell className="mr-2 h-4 w-4" />
                    Send Notification
                  </Button>
                  <Button className="w-full" variant="default">
                    <FileText className="mr-2 h-4 w-4" />
                    Send RT (Supply)
                  </Button>
                  <Button className="w-full" variant="default">
                    <FileText className="mr-2 h-4 w-4" />
                    Send RFP (Demand)
                  </Button>
                  <Button className="w-full" variant="default">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Escrow Transaction
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl">Notes</CardTitle>
              <CardDescription>Add and view user-related notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-4">
                <Textarea 
                  placeholder="Add a new note..." 
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[150px] text-lg"
                />
                <Button 
                  onClick={() => {
                    if (newNote.trim()) {
                      setNotes([
                        { 
                          text: newNote, 
                          timestamp: new Date().toLocaleString()
                        },
                        ...notes
                      ])
                      setNewNote('')
                    }
                  }}
                  className="self-end text-lg px-6 py-3"
                >
                  Add Note
                </Button>
              </div>
              
              <div className="space-y-6 mt-8">
                {notes.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8 text-lg">No notes available</p>
                ) : (
                  notes.map((note, index) => (
                    <Card key={index} className="shadow-md">
                      <CardContent className="pt-6">
                        <p className="whitespace-pre-wrap mb-4 text-lg">{note.text}</p>
                        <p className="text-sm text-muted-foreground">
                          Added on {note.timestamp}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>User activity history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No history available</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="related-entities">
          <Card>
            <CardHeader>
              <CardTitle>Related Entities</CardTitle>
              <CardDescription>Connected organizations and entities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No related entities found</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rts-rfps">
          <Card>
            <CardHeader>
              <CardTitle>RTs & RFPs</CardTitle>
              <CardDescription>Request for Tenders and Proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No RTs or RFPs available</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

