"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SOQJob } from "@/types/soq"

interface CreateJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: Omit<SOQJob, 'id'>) => void;
  categories: { id: string; name: string }[];
}

export function CreateJobDialog({ isOpen, onClose, onSubmit, categories }: CreateJobDialogProps) {
  const [jobNumber, setJobNumber] = useState("")
  const [jobName, setJobName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newJob: Omit<SOQJob, 'id'> = {
      number: jobNumber,
      name: jobName,
      description,
      status: 'draft',
      materials: [],
      labor: [],
      totalMaterialsCost: 0,
      totalLaborCost: 0,
      totalCost: 0
    }
    onSubmit(newJob)
    resetForm()
  }

  const resetForm = () => {
    setJobNumber("")
    setJobName("")
    setDescription("")
    setSelectedCategory("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      onClose()
      resetForm()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobNumber">Job Number</Label>
            <Input
              id="jobNumber"
              value={jobNumber}
              onChange={(e) => setJobNumber(e.target.value)}
              placeholder="Enter job number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobName">Job Name</Label>
            <Input
              id="jobName"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="Enter job name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter job description"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

