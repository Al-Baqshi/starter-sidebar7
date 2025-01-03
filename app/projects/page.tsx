"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, DollarSign, Plus, Search, Filter } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ProjectForm } from "@/components/ProjectForm"

// Mock data for projects
const projects = [
  {
    id: "city-center-high-rise",
    name: "City Center High-Rise",
    status: "In Progress",
    location: "Auckland, New Zealand",
    completion: 65,
    budget: 15000000,
    endDate: "2024-12-31",
    image: "/placeholder.svg?height=400&width=600",
    description: "40-story mixed-use development in Auckland CBD",
    tenderCount: 8,
    soqCount: 12,
    activeIssues: 3
  },
  {
    id: "suburban-housing-complex",
    name: "Suburban Housing Complex",
    status: "Tendering Phase",
    location: "Wellington, New Zealand",
    completion: 20,
    budget: 8000000,
    endDate: "2025-06-30",
    image: "/placeholder.svg?height=400&width=600",
    description: "200-unit residential development",
    tenderCount: 5,
    soqCount: 8,
    activeIssues: 1
  },
  {
    id: "industrial-park-development",
    name: "Industrial Park Development",
    status: "On Hold",
    location: "Christchurch, New Zealand",
    completion: 45,
    budget: 22000000,
    endDate: "2026-03-31",
    image: "/placeholder.svg?height=400&width=600",
    description: "Large-scale industrial park with warehouses",
    tenderCount: 10,
    soqCount: 15,
    activeIssues: 4
  }
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("All Projects")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateProject = (data: any) => {
    console.log("New project data:", data)
    // Here you would typically send this data to your backend
    setIsDialogOpen(false)
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "All Projects" || project.status === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Projects</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto">
              <ProjectForm onSubmit={handleCreateProject} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex overflow-x-auto space-x-4 border-b pb-2">
        {["All Projects", "In Progress", "Tendering Phase", "On Hold", "Completed"].map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            className={`flex-shrink-0 ${activeTab === tab ? "border-b-2 border-primary" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video relative">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location}
                    </div>
                  </div>
                  <Badge
                    variant={
                      project.status === "In Progress" ? "default" :
                      project.status === "Completed" ? "success" :
                      project.status === "On Hold" ? "destructive" :
                      "secondary"
                    }
                    className="mt-2 sm:mt-0"
                  >
                    {project.status}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.completion}%</span>
                    </div>
                    <Progress value={project.completion} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Budget
                      </div>
                      <div className="font-medium">
                        ${(project.budget / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        End Date
                      </div>
                      <div className="font-medium">
                        {project.endDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>{project.tenderCount} Tenders</span>
                    <span>{project.soqCount} SOQs</span>
                    <span>{project.activeIssues} Active Issues</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

