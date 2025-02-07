"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileIcon, FolderIcon, Grid, List, Search, Upload, Plus, MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Project {
  id: string
  name: string
}

interface File {
  id: string
  name: string
  type: "file" | "folder"
  size?: string
  lastModified?: string
  icon: React.ReactNode
  projectId: string;
}

const initialProjects: Project[] = [
  { id: "1", name: "Oakwood Residence" },
  { id: "2", name: "Maple Grove Apartments" },
  { id: "3", name: "Sunnyside Villa Renovation" },
];

const initialFiles: File[] = [
  { id: "1", name: "Project Plans", type: "folder", icon: <FolderIcon className="h-6 w-6 text-blue-500" />, projectId: "1" },
  { id: "2", name: "Contracts", type: "folder", icon: <FolderIcon className="h-6 w-6 text-blue-500" />, projectId: "1" },
  { id: "3", name: "Site Photos", type: "folder", icon: <FolderIcon className="h-6 w-6 text-blue-500" />, projectId: "2" },
  { id: "4", name: "Budget.xlsx", type: "file", size: "245 KB", lastModified: "2023-06-15", icon: <FileIcon className="h-6 w-6 text-green-500" />, projectId: "1" },
  { id: "5", name: "Timeline.pdf", type: "file", size: "1.2 MB", lastModified: "2023-06-10", icon: <FileIcon className="h-6 w-6 text-red-500" />, projectId: "2" },
  { id: "6", name: "Specifications.docx", type: "file", size: "500 KB", lastModified: "2023-06-05", icon: <FileIcon className="h-6 w-6 text-blue-500" />, projectId: "3" },
];

export default function FileManagerPage() {
  const [projects, setProjects] = useState([
    { id: "all", name: "All Projects" },
    ...initialProjects
  ]);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [files, setFiles] = useState(initialFiles);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] = useState(false);
  const [isCreateFileDialogOpen, setIsCreateFileDialogOpen] = useState(false);
  const [selectedFolderProject, setSelectedFolderProject] = useState(selectedProject.id);
  const [selectedFileProject, setSelectedFileProject] = useState(selectedProject.id);

  const filteredFiles = files.filter(file =>
    (selectedProject.id === "all" || file.projectId === selectedProject.id) &&
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateFolder = () => {
    if (newFolderName.trim() === "") return;
    const newFolder: File = {
      id: Date.now().toString(),
      name: newFolderName,
      type: "folder",
      icon: <FolderIcon className="h-6 w-6 text-blue-500" />,
      projectId: selectedFolderProject === "all" ? "1" : selectedFolderProject,
    };
    setFiles([...files, newFolder]);
    setNewFolderName("");
    setIsCreateFolderDialogOpen(false);
  };

  const handleCreateFile = () => {
    if (newFileName.trim() === "") return;
    const newFile: File = {
      id: Date.now().toString(),
      name: newFileName,
      type: "file",
      size: "0 KB",
      lastModified: new Date().toISOString().split('T')[0],
      icon: <FileIcon className="h-6 w-6 text-blue-500" />,
      projectId: selectedFileProject === "all" ? "1" : selectedFileProject,
    };
    setFiles([...files, newFile]);
    setNewFileName("");
    setIsCreateFileDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">File Manager</h1>
        <h2 className="text-xl font-semibold">{selectedProject.name}</h2>
      </div>

      <div className="flex space-x-4">
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
        <div className="flex-grow relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
        <Dialog open={isCreateFolderDialogOpen} onOpenChange={setIsCreateFolderDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FolderIcon className="mr-2 h-4 w-4" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
            />
            <Select value={selectedFolderProject} onValueChange={setSelectedFolderProject}>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button onClick={handleCreateFolder}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isCreateFileDialogOpen} onOpenChange={setIsCreateFileDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FileIcon className="mr-2 h-4 w-4" />
              New File
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
            </DialogHeader>
            <Input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Enter file name"
            />
            <Select value={selectedFileProject} onValueChange={setSelectedFileProject}>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button onClick={handleCreateFile}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{projects.find(p => p.id === selectedProject.id)?.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Documents</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="icon" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="cursor-pointer hover:bg-accent">
                <CardContent className="p-4 flex flex-col items-center">
                  {file.icon}
                  <p className="mt-2 text-sm font-medium">{file.name}</p>
                  {file.type === "file" && (
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {projects.find(p => p.id === file.projectId)?.name || 'No Project'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
                <div className="flex items-center space-x-2">
                  {file.icon}
                  <span>{file.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  {file.type === "file" && (
                    <>
                      <span className="text-sm text-muted-foreground">{file.size}</span>
                      <span className="text-sm text-muted-foreground">{file.lastModified}</span>
                    </>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Move</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

