"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, Search, FilterIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

interface Tender {
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
}

const projects = [
  { id: "P1", name: "Oakwood Residence" },
  { id: "P2", name: "Maple Grove Apartments" },
  { id: "P3", name: "Sunnyside Villa Renovation" },
  { id: "P4", name: "Riverfront Townhouses" },
]

const categories = [
  "Residential Construction",
  "Commercial Construction",
  "Renovation",
  "Landscaping",
  "Interior Design",
]

export default function TendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([
    {
      id: "T1001",
      jobId: "J1001",
      jobName: "Foundation Work",
      category: "Concrete",
      description: "Excavation and pouring of concrete foundation for Oakwood Residence",
      dueDate: "2024-08-15",
      status: "Open",
      projectId: "P1",
      projectName: "Oakwood Residence",
      estimatedDuration: "4 weeks"
    },
    {
      id: "T1002",
      jobId: "J1002",
      jobName: "Kitchen Remodeling",
      category: "Interior",
      description: "Complete kitchen renovation for Maple Grove Apartments",
      dueDate: "2024-09-30",
      status: "In Progress",
      projectId: "P2",
      projectName: "Maple Grove Apartments",
      estimatedDuration: "6 weeks"
    },
    {
      id: "T1003",
      jobId: "J1003",
      jobName: "Electrical Wiring",
      category: "Electrical",
      description: "Installation of electrical systems for Sunnyside Villa",
      dueDate: "2024-07-01",
      status: "Closed",
      projectId: "P3",
      projectName: "Sunnyside Villa Renovation",
      estimatedDuration: "3 weeks"
    },
    {
      id: "T1004",
      jobId: "J1004",
      jobName: "Landscaping",
      category: "Exterior",
      description: "Garden design and implementation for Riverfront Townhouses",
      dueDate: "2024-10-15",
      status: "Open",
      projectId: "P4",
      projectName: "Riverfront Townhouses",
      estimatedDuration: "5 weeks"
    },
  ])

  const [newTender, setNewTender] = useState<Omit<Tender, "id">>({
    jobId: "",
    jobName: "",
    category: "",
    description: "",
    dueDate: "",
    status: "Open",
    projectId: "",
    projectName: "",
    estimatedDuration: ""
  })

  const [selectedProject, setSelectedProject] = useState("All Projects")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const handleCreateTender = () => {
    const id = `T${1000 + tenders.length + 1}`
    setTenders([...tenders, { ...newTender, id }])
    setNewTender({ 
      jobId: "",
      jobName: "",
      category: "",
      description: "", 
      dueDate: "", 
      status: "Open", 
      projectId: "",
      projectName: "",
      estimatedDuration: ""
    })
  }

  const filteredTenders = selectedProject === "All Projects" 
  ? tenders 
  : tenders.filter(tender => tender.projectId === selectedProject)

  return (
    <div className="container space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Tenders</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Tender
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create New Tender</DialogTitle>
              <DialogDescription>
                Fill in the details for the new tender. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jobId" className="text-right">
                  Job ID
                </Label>
                <Input
                  id="jobId"
                  value={newTender.jobId}
                  onChange={(e) => setNewTender({ ...newTender, jobId: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jobName" className="text-right">
                  Job Name
                </Label>
                <Input
                  id="jobName"
                  value={newTender.jobName}
                  onChange={(e) => setNewTender({ ...newTender, jobName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  value={newTender.category}
                  onChange={(e) => setNewTender({ ...newTender, category: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newTender.description}
                  onChange={(e) => setNewTender({ ...newTender, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  Due Date
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTender.dueDate}
                  onChange={(e) => setNewTender({ ...newTender, dueDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">
                  Project
                </Label>
                <Select
                  value={newTender.projectId}
                  onValueChange={(value) => {
                    const selectedProject = projects.find(p => p.id === value);
                    setNewTender({ 
                      ...newTender, 
                      projectId: value, 
                      projectName: selectedProject ? selectedProject.name : ''
                    });
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="estimatedDuration" className="text-right">
                  Estimated Duration
                </Label>
                <Input
                  id="estimatedDuration"
                  value={newTender.estimatedDuration}
                  onChange={(e) => setNewTender({ ...newTender, estimatedDuration: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateTender}>Create Tender</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tenders" className="pl-8 w-full" />
        </div>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Projects">All Projects</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Categories">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTenders.map((tender) => (
          <Card key={tender.id}>
            <CardHeader>
              <CardTitle>{tender.jobName}</CardTitle>
              <CardDescription>{tender.projectName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <Badge variant={
                    tender.status === 'Open' ? 'default' :
                    tender.status === 'In Progress' ? 'secondary' :
                    tender.status === 'Closed' ? 'destructive' : 'outline'
                  }>
                    {tender.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Category:</span>
                  <span>{tender.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Due Date:</span>
                  <span>{tender.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Duration:</span>
                  <span>{tender.estimatedDuration}</span>
                </div>
                <div>
                  <span className="font-semibold">Description:</span>
                  <p className="text-sm text-muted-foreground">{tender.description}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/tenders/${tender.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

