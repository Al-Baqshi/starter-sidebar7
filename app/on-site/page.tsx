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
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, CheckCircle2, Cloud, CloudRain, Loader2, MessageSquare, Sun, Truck, Wind, Upload } from 'lucide-react'

interface Task {
  id: string
  name: string
  assignee: string
  status: "Not Started" | "In Progress" | "Completed"
  dueDate: string
}

interface Equipment {
  id: string
  name: string
  status: "Available" | "In Use" | "Maintenance"
  location: string
}

interface SafetyIncident {
  id: string
  description: string
  date: string
  severity: "Low" | "Medium" | "High"
  status: "Open" | "Under Investigation" | "Resolved"
}

interface Worker {
  id: string
  name: string
  role: string
  status: "On Site" | "Off Site"
  lastLoggedTime: string
}

interface WorkerLog {
  id: string
  workerId: string
  workerName: string
  action: "Log In" | "Log Out"
  timestamp: string
}

interface RiskHazard {
  id: string
  description: string
  reportedBy: string
  date: string
  status: "Open" | "In Progress" | "Resolved"
}

interface SafetyInspection {
  id: string
  date: string
  inspector: string
  status: "Passed" | "Failed" | "Needs Improvement"
  notes: string
}

interface JobCompletion {
  id: string
  taskName: string
  completedBy: string
  date: string
  qualityRating: "Excellent" | "Good" | "Fair" | "Poor"
  notes: string
}

const tasks: Task[] = [
  { id: "T1", name: "Pour concrete for foundation", assignee: "John Smith", status: "In Progress", dueDate: "2024-03-20" },
  { id: "T2", name: "Install electrical wiring", assignee: "Sarah Johnson", status: "Not Started", dueDate: "2024-03-25" },
  { id: "T3", name: "Paint interior walls", assignee: "Michael Chen", status: "Completed", dueDate: "2024-03-18" },
]

const equipment: Equipment[] = [
  { id: "E1", name: "Excavator", status: "In Use", location: "Site A" },
  { id: "E2", name: "Concrete Mixer", status: "Available", location: "Storage" },
  { id: "E3", name: "Crane", status: "Maintenance", location: "Maintenance Bay" },
]

const safetyIncidents: SafetyIncident[] = [
  { id: "S1", description: "Worker slipped on wet surface", date: "2024-03-17", severity: "Low", status: "Resolved" },
  { id: "S2", description: "Near miss: Falling object", date: "2024-03-19", severity: "Medium", status: "Under Investigation" },
]

const workers: Worker[] = [
  { id: "W1", name: "John Smith", role: "Foreman", status: "On Site", lastLoggedTime: "2024-03-20 08:00 AM" },
  { id: "W2", name: "Sarah Johnson", role: "Electrician", status: "On Site", lastLoggedTime: "2024-03-20 08:15 AM" },
  { id: "W3", name: "Michael Chen", role: "Painter", status: "Off Site", lastLoggedTime: "2024-03-19 05:30 PM" },
]

const workerLogs: WorkerLog[] = [
  { id: "L1", workerId: "W1", workerName: "John Smith", action: "Log In", timestamp: "2024-03-20 08:00 AM" },
  { id: "L2", workerId: "W2", workerName: "Sarah Johnson", action: "Log In", timestamp: "2024-03-20 08:15 AM" },
  { id: "L3", workerId: "W3", workerName: "Michael Chen", action: "Log Out", timestamp: "2024-03-19 05:30 PM" },
]

const riskHazards: RiskHazard[] = [
  { id: "R1", description: "Exposed electrical wires in Section B", reportedBy: "Sarah Johnson", date: "2024-03-19", status: "In Progress" },
  { id: "R2", description: "Uneven flooring near stairwell", reportedBy: "John Smith", date: "2024-03-20", status: "Open" },
]

const safetyInspections: SafetyInspection[] = [
  { id: "I1", date: "2024-03-18", inspector: "Safety Officer Thompson", status: "Passed", notes: "All safety protocols followed. Minor suggestions for improvement provided." },
  { id: "I2", date: "2024-03-19", inspector: "Safety Officer Garcia", status: "Needs Improvement", notes: "Several minor violations observed. Follow-up inspection scheduled for next week." },
]

const jobCompletions: JobCompletion[] = [
  { id: "J1", taskName: "Install windows in Block A", completedBy: "Team 1", date: "2024-03-18", qualityRating: "Excellent", notes: "All windows installed correctly and ahead of schedule." },
  { id: "J2", taskName: "Lay tiles in main lobby", completedBy: "Team 3", date: "2024-03-19", qualityRating: "Good", notes: "Tiling completed as per specifications. Minor touch-ups needed in corner areas." },
]

export default function OnSiteManagementPage() {
  const [selectedProject, setSelectedProject] = useState("Oakwood Residence")

  return (
    <div className="container space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">On-Site Management</h1>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Oakwood Residence">Oakwood Residence</SelectItem>
            <SelectItem value="Maple Grove Apartments">Maple Grove Apartments</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
            <Loader2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <Progress value={67} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">13 days ahead of schedule</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">On site now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 due today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather</CardTitle>
            <Sun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72°F</div>
            <p className="text-xs text-muted-foreground">Sunny, light breeze</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="workers">Workers</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="completion">Job Completion</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Task Management</CardTitle>
              <CardDescription>Manage and track on-site tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task Name</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>
                        <Badge variant={task.status === "Completed" ? "success" : task.status === "In Progress" ? "warning" : "secondary"}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="workers">
          <Card>
            <CardHeader>
              <CardTitle>Active Workers</CardTitle>
              <CardDescription>Current on-site personnel and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Logged Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workers.map((worker) => (
                    <TableRow key={worker.id}>
                      <TableCell>{worker.name}</TableCell>
                      <TableCell>{worker.role}</TableCell>
                      <TableCell>
                        <Badge variant={worker.status === "On Site" ? "success" : "secondary"}>
                          {worker.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{worker.lastLoggedTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Worker Logs</CardTitle>
              <CardDescription>Recent worker check-ins and check-outs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Worker Name</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workerLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.workerName}</TableCell>
                      <TableCell>
                        <Badge variant={log.action === "Log In" ? "success" : "secondary"}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="equipment">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Tracking</CardTitle>
              <CardDescription>Monitor equipment status and location</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipment.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Available" ? "success" : item.status === "In Use" ? "warning" : "destructive"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="safety">
          <Card>
            <CardHeader>
              <CardTitle>Safety Incident Reporting</CardTitle>
              <CardDescription>Track and manage safety incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {safetyIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>{incident.description}</TableCell>
                      <TableCell>{incident.date}</TableCell>
                      <TableCell>
                        <Badge variant={incident.severity === "Low" ? "secondary" : incident.severity === "Medium" ? "warning" : "destructive"}>
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{incident.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Risk Hazards</CardTitle>
              <CardDescription>Report and track potential hazards on site</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {riskHazards.map((hazard) => (
                    <TableRow key={hazard.id}>
                      <TableCell>{hazard.description}</TableCell>
                      <TableCell>{hazard.reportedBy}</TableCell>
                      <TableCell>{hazard.date}</TableCell>
                      <TableCell>
                        <Badge variant={hazard.status === "Open" ? "destructive" : hazard.status === "In Progress" ? "warning" : "success"}>
                          {hazard.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button className="mt-4">
                <Upload className="mr-2 h-4 w-4" />
                Report New Hazard
              </Button>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Daily Safety Inspections</CardTitle>
              <CardDescription>Log and review daily safety checks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {safetyInspections.map((inspection) => (
                    <TableRow key={inspection.id}>
                      <TableCell>{inspection.date}</TableCell>
                      <TableCell>{inspection.inspector}</TableCell>
                      <TableCell>
                        <Badge variant={inspection.status === "Passed" ? "success" : inspection.status === "Failed" ? "destructive" : "warning"}>
                          {inspection.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{inspection.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button className="mt-4">Log New Inspection</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="communication">
          <Card>
            <CardHeader>
              <CardTitle>Team Communication</CardTitle>
              <CardDescription>Real-time messaging and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">John Smith</p>
                      <p className="text-sm text-gray-500">Concrete pouring for section A complete.</p>
                      <p className="text-xs text-gray-400">Today at 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MessageSquare className="mt-0.5 h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Team meeting at 2 PM to discuss electrical wiring plan.</p>
                      <p className="text-xs text-gray-400">Today at 9:15 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">Michael Chen</p>
                      <p className="text-sm text-gray-500">Slight delay in material delivery. ETA updated to 3 PM.</p>
                      <p className="text-xs text-gray-400">Yesterday at 4:45 PM</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <div className="flex items-center space-x-2 mt-4">
                <Input placeholder="Type your message..." />
                <Button>Send</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completion">
          <Card>
            <CardHeader>
              <CardTitle>Job Completion Tracking</CardTitle>
              <CardDescription>Monitor and evaluate completed tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task Name</TableHead>
                    <TableHead>Completed By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Quality Rating</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobCompletions.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.taskName}</TableCell>
                      <TableCell>{job.completedBy}</TableCell>
                      <TableCell>{job.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          job.qualityRating === "Excellent" ? "success" :
                          job.qualityRating === "Good" ? "secondary" :
                          job.qualityRating === "Fair" ? "warning" : "destructive"
                        }>
                          {job.qualityRating}
                        </Badge>
                      </TableCell>
                      <TableCell>{job.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button className="mt-4">Log Completed Job</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Weather Forecast</CardTitle>
          <CardDescription>5-day weather outlook for the site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="font-medium">Mon</p>
              <Sun className="mx-auto my-2 h-6 w-6" />
              <p className="text-sm">72°F</p>
            </div>
            <div className="text-center">
              <p className="font-medium">Tue</p>
              <Cloud className="mx-auto my-2 h-6 w-6" />
              <p className="text-sm">68°F</p>
            </div>
            <div className="text-center">
              <p className="font-medium">Wed</p>
              <CloudRain className="mx-auto my-2 h-6 w-6" />
              <p className="text-sm">65°F</p>
            </div>
            <div className="text-center">
              <p className="font-medium">Thu</p>
              <Sun className="mx-auto my-2 h-6 w-6" />
              <p className="text-sm">70°F</p>
            </div>
            <div className="text-center">
              <p className="font-medium">Fri</p>
              <Wind className="mx-auto my-2 h-6 w-6" />
              <p className="text-sm">69°F</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

