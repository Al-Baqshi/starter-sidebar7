"use client"

import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { CalendarIcon, Plus, Minus } from 'lucide-react'
import { format } from "date-fns"

const unitSchema = z.object({
  unitNumber: z.string(),
  totalFloorArea: z.number().min(0),
  numberOfFloors: z.number().int().min(1),
  numberOfRooms: z.number().int().min(1),
  numberOfBathrooms: z.number().int().min(1),
  floors: z.array(z.object({
    floorNumber: z.number().int().min(1),
    floorArea: z.number().min(0),
  })),
})

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Project description must be at least 10 characters.",
  }),
  // client: z.string().min(2, {
  //   message: "Client name must be at least 2 characters.",
  // }),
  budget: z.number().min(0, {
    message: "Budget must be a positive number.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  isPublic: z.boolean(),
  type: z.enum(["commercial", "residential", "industrial"]),
  nature: z.enum(["renovation", "new_build"]),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["draft", "planning", "in_progress", "completed", "on_hold"]),
  projectManager: z.string().min(2, {
    message: "Project manager name must be at least 2 characters.",
  }),
  // contractor: z.string().min(2, {
  //   message: "Contractor name must be at least 2 characters.",
  // }),
  architectFirm: z.string().optional(),
  engineeringFirm: z.string().optional(),
  landArea: z.number().min(0, {
    message: "Land area must be a positive number.",
  }),
  totalBuildingArea: z.number().min(0, {
    message: "Total building area must be a positive number.",
  }),
  numberOfUnits: z.number().int().min(1, {
    message: "Number of units must be at least 1.",
  }),
  units: z.array(unitSchema).optional(),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().min(10, {
    message: "Contact phone must be at least 10 characters.",
  }),
})

type ProjectFormValues = z.infer<typeof formSchema>

interface ProjectFormProps {
  onSubmit: (data: FormData) => void
  initialData?: Partial<ProjectFormValues>
  clientName?: string;
}

export function ProjectForm({ onSubmit, initialData, clientName }: ProjectFormProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(initialData?.startDate)
  const [endDate, setEndDate] = useState<Date | undefined>(initialData?.endDate)
  const [projectImage, setProjectImage] = useState<File | null>(null)
  const [projectAttachments, setProjectAttachments] = useState<File[]>([])
  const [showDetailedUnits, setShowDetailedUnits] = useState(false)

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      isPublic: false,
      type: "residential",
      nature: "new_build",
      status: "draft",
      numberOfUnits: 1,
      units: [{ unitNumber: "1", totalFloorArea: 0, numberOfFloors: 1, numberOfRooms: 1, numberOfBathrooms: 1, floors: [{ floorNumber: 1, floorArea: 0 }] }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "units",
  })

  useEffect(() => {
    const savedFormData = localStorage.getItem('projectFormData')
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData)
      form.reset(parsedData)
    }
  }, [form])

  const handleSubmit = (data: ProjectFormValues) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'units') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value.toString())
        }
      }
    })
    if (projectImage) {
      formData.append('projectImage', projectImage)
    }
    projectAttachments.forEach((file, index) => {
      formData.append(`projectAttachment${index}`, file)
    })
    onSubmit(formData)
  }

  const handleSaveDraft = () => {
    const currentFormData = form.getValues()
    localStorage.setItem('projectFormData', JSON.stringify(currentFormData))
    form.setValue('status', 'draft')
  }

  const handleProjectImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setProjectImage(file)
    }
  }

  const handleProjectAttachmentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setProjectAttachments(Array.from(files))
    }
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg border-2 border-primary/10">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
        <CardDescription>Enter the details for your new construction project.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className="space-y-8 max-h-[70vh] overflow-y-auto px-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-primary mb-1">Project Name</Label>
              <Input id="name" className="border-2 border-input hover:border-primary focus:border-primary transition-colors" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-semibold text-primary mb-1">Project Description</Label>
              <Textarea id="description" className="border-2 border-input hover:border-primary focus:border-primary transition-colors" {...form.register("description")} />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="projectImage" className="text-sm font-semibold text-primary mb-1">Project Image</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="projectImage" className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <Input 
                    id="projectImage" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleProjectImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div>
              <Label htmlFor="projectAttachments" className="text-sm font-semibold text-primary mb-1">Project Attachments</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="projectAttachments" className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, DOC, XLS (MAX. 10MB)</p>
                  </div>
                  <Input 
                    id="projectAttachments" 
                    type="file" 
                    accept=".pdf,.doc,.docx,.xls,.xlsx" 
                    multiple
                    onChange={handleProjectAttachmentsChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-md mb-4">
              <p className="text-sm text-muted-foreground">Client Name: {clientName} (Automatically imported)</p>
            </div>
          </div>


          <div className="space-y-4">
            <div>
              <Label htmlFor="location" className="text-sm font-semibold text-primary mb-1">Location</Label>
              <Input id="location" className="border-2 border-input hover:border-primary focus:border-primary transition-colors" {...form.register("location")} />
              {form.formState.errors.location && (
                <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="isPublic" {...form.register("isPublic")} />
            <Label htmlFor="isPublic" className="text-sm font-semibold text-primary mb-1">Make project public</Label>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold text-primary mb-1">Project Type</Label>
              <RadioGroup defaultValue={form.getValues("type")} onValueChange={(value) => form.setValue("type", value as "commercial" | "residential" | "industrial")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="commercial" id="commercial" />
                  <Label htmlFor="commercial" className="text-sm font-semibold text-primary mb-1">Commercial</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="residential" id="residential" />
                  <Label htmlFor="residential" className="text-sm font-semibold text-primary mb-1">Residential</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="industrial" id="industrial" />
                  <Label htmlFor="industrial" className="text-sm font-semibold text-primary mb-1">Industrial</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label className="text-sm font-semibold text-primary mb-1">Project Nature</Label>
              <RadioGroup defaultValue={form.getValues("nature")} onValueChange={(value) => form.setValue("nature", value as "renovation" | "new_build")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="renovation" id="renovation" />
                  <Label htmlFor="renovation" className="text-sm font-semibold text-primary mb-1">Renovation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new_build" id="new_build" />
                  <Label htmlFor="new_build" className="text-sm font-semibold text-primary mb-1">New Build</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold text-primary mb-1">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date)
                      form.setValue("startDate", date as Date)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="status" className="text-sm font-semibold text-primary mb-1">Project Status</Label>
            <Select onValueChange={(value) => form.setValue("status", value as "draft" | "planning" | "in_progress" | "completed" | "on_hold")} defaultValue={form.getValues("status")}>
              <SelectTrigger>
                <SelectValue placeholder="Select project status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="projectManager" className="text-sm font-semibold text-primary mb-1">Project Manager</Label>
            <Input id="projectManager" className="border-2 border-input hover:border-primary focus:border-primary transition-colors" {...form.register("projectManager")} />
            {form.formState.errors.projectManager && (
              <p className="text-sm text-red-500">{form.formState.errors.projectManager.message}</p>
            )}
          </div>


          <div className="space-y-4">
            <div>
              <Label htmlFor="landArea" className="text-sm font-semibold text-primary mb-1">Land Area (sq m)</Label>
              <Input id="landArea" type="number" className="border-2 border-input hover:border-primary focus:border-primary transition-colors" {...form.register("landArea", { valueAsNumber: true })} />
              {form.formState.errors.landArea && (
                <p className="text-sm text-red-500">{form.formState.errors.landArea.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="totalBuildingArea" className="text-sm font-semibold text-primary mb-1">Total Building Area (sq m)</Label>
              <Input id="totalBuildingArea" type="number" className="border-2 border-input hover:border-primary focus:border-primary transition-colors" {...form.register("totalBuildingArea", { valueAsNumber: true })} />
              {form.formState.errors.totalBuildingArea && (
                <p className="text-sm text-red-500">{form.formState.errors.totalBuildingArea.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="numberOfUnits" className="text-sm font-semibold text-primary mb-1">Number of Units</Label>
            <Input 
              id="numberOfUnits"
              type="number"
              className="border-2 border-input hover:border-primary focus:border-primary transition-colors"
              {...form.register("numberOfUnits", { valueAsNumber: true })}
              onChange={(e) => {
                const value = parseInt(e.target.value)
                form.setValue("numberOfUnits", value)
                if (value > fields.length) {
                  for (let i = fields.length; i < value; i++) {
                    append({ unitNumber: (i + 1).toString(), totalFloorArea: 0, numberOfFloors: 1, numberOfRooms: 1, numberOfBathrooms: 1, floors: [{ floorNumber: 1, floorArea: 0 }] })
                  }
                } else if (value < fields.length) {
                  for (let i = fields.length; i > value; i--) {
                    remove(i - 1)
                  }
                }
              }}
            />
            {form.formState.errors.numberOfUnits && (
              <p className="text-sm text-red-500">{form.formState.errors.numberOfUnits.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="showDetailedUnits"
              checked={showDetailedUnits}
              onCheckedChange={setShowDetailedUnits}
            />
            <Label htmlFor="showDetailedUnits" className="text-sm font-semibold text-primary mb-1">Show detailed unit information</Label>
          </div>

          {showDetailedUnits && (
            <Accordion type="single" collapsible className="w-full">
              {fields.map((field, index) => (
                <AccordionItem value={`item-${index}`} key={field.id}>
                  <AccordionTrigger>Unit {index + 1}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`units.${index}.totalFloorArea`} className="text-sm font-semibold text-primary mb-1">Total Floor Area (sq m)</Label>
                        <Input
                          id={`units.${index}.totalFloorArea`}
                          type="number"
                          className="border-2 border-input hover:border-primary focus:border-primary transition-colors"
                          {...form.register(`units.${index}.totalFloorArea` as const, { valueAsNumber: true })}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`units.${index}.numberOfFloors`} className="text-sm font-semibold text-primary mb-1">Number of Floors</Label>
                        <Input
                          id={`units.${index}.numberOfFloors`}
                          type="number"
                          className="border-2 border-input hover:border-primary focus:border-primary transition-colors"
                          {...form.register(`units.${index}.numberOfFloors` as const, { valueAsNumber: true })}
                          onChange={(e) => {
                            const value = parseInt(e.target.value)
                            form.setValue(`units.${index}.numberOfFloors`, value)
                            const currentFloors = form.getValues(`units.${index}.floors`)
                            if (value > currentFloors.length) {
                              for (let i = currentFloors.length; i < value; i++) {
                                form.setValue(`units.${index}.floors.${i}`, { floorNumber: i + 1, floorArea: 0 })
                              }
                            } else if (value < currentFloors.length) {
                              form.setValue(`units.${index}.floors`, currentFloors.slice(0, value))
                            }
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`units.${index}.numberOfRooms`} className="text-sm font-semibold text-primary mb-1">Number of Rooms</Label>
                        <Input
                          id={`units.${index}.numberOfRooms`}
                          type="number"
                          className="border-2 border-input hover:border-primary focus:border-primary transition-colors"
                          {...form.register(`units.${index}.numberOfRooms` as const, { valueAsNumber: true })}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`units.${index}.numberOfBathrooms`} className="text-sm font-semibold text-primary mb-1">Number of Bathrooms</Label>
                        <Input
                          id={`units.${index}.numberOfBathrooms`}
                          type="number"
                          className="border-2 border-input hover:border-primary focus:border-primary transition-colors"
                          {...form.register(`units.${index}.numberOfBathrooms` as const, { valueAsNumber: true })}
                        />
                      </div>
                      {form.getValues(`units.${index}.floors`).map((floor, floorIndex) => (
                        <div key={floorIndex}>
                          <Label htmlFor={`units.${index}.floors.${floorIndex}.floorArea`} className="text-sm font-semibold text-primary mb-1">Floor {floor.floorNumber} Area (sq m)</Label>
                          <Input
                            id={`units.${index}.floors.${floorIndex}.floorArea`}
                            type="number"
                            className="border-2 border-input hover:border-primary focus:border-primary transition-colors"
                            {...form.register(`units.${index}.floors.${floorIndex}.floorArea` as const, { valueAsNumber: true })}
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <div>
            <Label htmlFor="contactName" className="text-sm font-semibold text-primary mb-1">Contact Name</Label>
            <Input id="contactName" className="border-2 border-input hover:border-primary focus:border-primary transition-colors" {...form.register("contactName")} />
            {form.formState.errors.contactName && (
              <p className="text-sm text-red-500">{form.formState.errors.contactName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contactEmail" className="text-sm font-semibold text-primary mb-1">Contact Email</Label>
            <Input id="contactEmail" type="email" className="border-2 border-input hover:border-primary focus:border-primary transition-colors" {...form.register("contactEmail")} />
            {form.formState.errors.contactEmail && (
              <p className="text-sm text-red-500">{form.formState.errors.contactEmail.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contactPhone" className="text-sm font-semibold text-primary mb-1">Contact Phone</Label>
            <Input id="contactPhone" className="border-2 border-input hover:border-primary focus:border-primary transition-colors" {...form.register("contactPhone")} />
            {form.formState.errors.contactPhone && (
              <p className="text-sm text-red-500">{form.formState.errors.contactPhone.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-6 border-t">
          <Button type="button" variant="outline" onClick={handleSaveDraft} className="hover:bg-primary/10">Save as Draft</Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Create Project</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

