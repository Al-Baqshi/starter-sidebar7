"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileIcon, FolderIcon, UploadIcon, Search } from 'lucide-react'

interface Drawing {
  id: string
  name: string
  category: string
  dateUploaded: string
  uploadedBy: string
  fileType: string
}

interface Project {
  id: string
  name: string
  drawings: Drawing[]
}

const projects: Project[] = [
  {
    id: "P1",
    name: "Oakwood Residence",
    drawings: [
      { id: "D1", name: "Foundation Plan", category: "Concrete", dateUploaded: "2024-03-15", uploadedBy: "John Smith", fileType: "PDF" },
      { id: "D2", name: "Electrical Layout", category: "Electrical", dateUploaded: "2024-03-16", uploadedBy: "Sarah Johnson", fileType: "DWG" },
      { id: "D3", name: "Window Schedule", category: "Windows & Doors", dateUploaded: "2024-03-17", uploadedBy: "Michael Chen", fileType: "PDF" },
    ]
  },
  {
    id: "P2",
    name: "Maple Grove Apartments",
    drawings: [
      { id: "D4", name: "Site Plan", category: "General", dateUploaded: "2024-03-18", uploadedBy: "Emily Davis", fileType: "PDF" },
      { id: "D5", name: "Plumbing Diagram", category: "Plumbing", dateUploaded: "2024-03-19", uploadedBy: "John Smith", fileType: "DWG" },
      { id: "D6", name: "Door Details", category: "Windows & Doors", dateUploaded: "2024-03-20", uploadedBy: "Sarah Johnson", fileType: "PDF" },
    ]
  },
]

const categories = [
  "All Categories",
  "General",
  "Concrete",
  "Electrical",
  "Plumbing",
  "Windows & Doors",
  "HVAC",
  "Structural",
  "Architectural"
]

export default function DrawingsPage() {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0])
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDrawings = selectedProject.drawings.filter(drawing => {
    const matchesCategory = selectedCategory === "All Categories" || drawing.category === selectedCategory
    const matchesSearch = drawing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drawing.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drawing.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Drawings & Analysis</h1>
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Drawing
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Select value={selectedProject.id} onValueChange={(value) => setSelectedProject(projects.find(p => p.id === value) || projects[0])}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search drawings..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDrawings.map((drawing) => (
              <Card key={drawing.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileIcon className="h-4 w-4" />
                    {drawing.name}
                  </CardTitle>
                  <CardDescription>{drawing.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Uploaded on {drawing.dateUploaded}</p>
                  <p className="text-sm text-muted-foreground">By {drawing.uploadedBy}</p>
                  <Badge variant="secondary" className="mt-2">{drawing.fileType}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list">
          <ScrollArea className="h-[600px] w-full rounded-md border">
            <div className="p-4">
              {filteredDrawings.map((drawing) => (
                <div key={drawing.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <FileIcon className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">{drawing.name}</p>
                      <p className="text-sm text-muted-foreground">{drawing.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{drawing.fileType}</Badge>
                    <p className="text-sm text-muted-foreground">{drawing.dateUploaded}</p>
                    <p className="text-sm text-muted-foreground">{drawing.uploadedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

