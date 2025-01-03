"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MessageSquare, FileText, CalendarIcon, Users, PlusCircle, Paperclip, Send } from 'lucide-react'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  avatar: string
}

interface Document {
  id: string
  name: string
  uploadedBy: string
  uploadDate: string
  size: string
  type: "pdf" | "doc" | "xls" | "img"
}

interface Event {
  id: string
  title: string
  date: Date
  participants: string[]
}

interface Task {
  id: string
  title: string
  assignee: string
  dueDate: string
  status: "To Do" | "In Progress" | "Completed"
}

const messages: Message[] = [
  { id: "1", sender: "John Doe", content: "Has everyone reviewed the latest blueprints?", timestamp: "10:30 AM", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", sender: "Jane Smith", content: "Yes, I've added my comments to the shared document.", timestamp: "10:35 AM", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", sender: "Mike Johnson", content: "I'll finish my review by end of day.", timestamp: "10:40 AM", avatar: "/placeholder.svg?height=40&width=40" },
]

const documents: Document[] = [
  { id: "1", name: "Site_Plan_v2.pdf", uploadedBy: "John Doe", uploadDate: "2024-03-15", size: "5.2 MB", type: "pdf" },
  { id: "2", name: "Budget_Estimate.xls", uploadedBy: "Jane Smith", uploadDate: "2024-03-16", size: "1.8 MB", type: "xls" },
  { id: "3", name: "Construction_Schedule.doc", uploadedBy: "Mike Johnson", uploadDate: "2024-03-17", size: "3.5 MB", type: "doc" },
]

const events: Event[] = [
  { id: "1", title: "Team Meeting", date: new Date(2024, 2, 20, 10, 0), participants: ["John Doe", "Jane Smith", "Mike Johnson"] },
  { id: "2", title: "Site Inspection", date: new Date(2024, 2, 22, 14, 0), participants: ["John Doe", "Mike Johnson"] },
  { id: "3", title: "Client Presentation", date: new Date(2024, 2, 25, 11, 0), participants: ["Jane Smith"] },
]

const tasks: Task[] = [
  { id: "1", title: "Review electrical plans", assignee: "Jane Smith", dueDate: "2024-03-22", status: "In Progress" },
  { id: "2", title: "Update project timeline", assignee: "Mike Johnson", dueDate: "2024-03-23", status: "To Do" },
  { id: "3", title: "Prepare safety report", assignee: "John Doe", dueDate: "2024-03-24", status: "Completed" },
]

export default function CollaborationHub() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="container space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Collaboration Hub</h1>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Team Chat</CardTitle>
              <CardDescription>Communicate with your team in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src={message.avatar} alt={message.sender} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{message.sender}</p>
                      <p className="text-sm text-gray-500">{message.content}</p>
                      <p className="text-xs text-gray-400">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center space-x-2 mt-4">
                <Input placeholder="Type your message..." className="flex-grow" />
                <Button size="icon" variant="outline">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Shared Documents</CardTitle>
              <CardDescription>Access and manage project-related files</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {doc.name}
                        </div>
                      </TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Download</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button className="mt-4">
                <PlusCircle className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Project Calendar</CardTitle>
              <CardDescription>Schedule and manage project events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="w-1/2">
                  <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    {events.map((event) => (
                      <div key={event.id} className="mb-4">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-500">
                          {event.date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                        <p className="text-sm text-gray-500">
                          Participants: {event.participants.join(", ")}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add New Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                        <DialogDescription>
                          Create a new event for the project calendar.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="event-title" className="text-right">
                            Title
                          </Label>
                          <Input id="event-title" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="event-date" className="text-right">
                            Date
                          </Label>
                          <Input id="event-date" type="date" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="event-time" className="text-right">
                            Time
                          </Label>
                          <Input id="event-time" type="time" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="event-participants" className="text-right">
                            Participants
                          </Label>
                          <Input id="event-participants" className="col-span-3" />
                        </div>
                      </div>
                      <Button type="submit">Save Event</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Task Board</CardTitle>
              <CardDescription>Manage and track project tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant={
                          task.status === "Completed" ? "success" :
                          task.status === "In Progress" ? "warning" : "secondary"
                        }>
                          {task.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button className="mt-4">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Task
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

