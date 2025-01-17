"use client"

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CarIcon as CaretSortIcon, ChevronDownIcon, ChevronUpIcon, FilePlusIcon, PlusIcon, UploadIcon, UsersIcon, PaperclipIcon, Link2, TrashIcon, MessageSquare, Pencil, Save, FileText, ChevronRight, ChevronLeft, X } from 'lucide-react'
import { SOQCategory, SOQJob, Material, Labor } from '@/types/soq'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AttachmentInput } from "@/components/AttachmentInput"
import { CategoryHeader } from "@/components/CategoryHeader"

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

interface Tender {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  jobs: string[]; // Array of job IDs
}

export default function SOQPage() {
  const [selectedProject, setSelectedProject] = useState("Oakwood Residence")
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newJobTitle, setNewJobTitle] = useState("")
  const [categories, setCategories] = useState<SOQCategory[]>([
    {
      id: "1",
      name: "Category 1",
      jobs: [
        {
          id: "J001",
          number: "J001",
          name: "Job 1",
          description: "This is job 1",
          status: "draft",
          materials: [],
          labor: [],
          totalMaterialsCost: 0,
          totalLaborCost: 0,
          totalCost: 0
        },
        {
          id: "J002",
          number: "J002",
          name: "Job 2",
          description: "This is job 2",
          status: "tender_created",
          materials: [],
          labor: [],
          totalMaterialsCost: 0,
          totalLaborCost: 0,
          totalCost: 0
        },
        {
          id: "J003",
          number: "J003",
          name: "Job 3",
          description: "This is job 3",
          status: "linked_to_tender",
          materials: [],
          labor: [],
          totalMaterialsCost: 0,
          totalLaborCost: 0,
          totalCost: 0
        }
      ]
    }
  ])
  const [tenders, setTenders] = useState<Tender[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [expandedJobs, setExpandedJobs] = useState<string[]>([])
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null)
  const [editingDescriptionId, setEditingDescriptionId] = useState<string | null>(null)
  const [editingCategoryDescription, setEditingCategoryDescription] = useState<string | null>(null);
  const [editableMaterials, setEditableMaterials] = useState<{ [key: string]: boolean }>({});
  const [editableLabor, setEditableLabor] = useState<{ [key: string]: boolean }>({});
  const [descriptionSaved, setDescriptionSaved] = useState<{ [key: string]: boolean }>({});
  const [isCreateTenderDialogOpen, setIsCreateTenderDialogOpen] = useState(false);
  const [newTenderName, setNewTenderName] = useState("");
  const [newTenderDescription, setNewTenderDescription] = useState("");
  const [newTenderStartDate, setNewTenderStartDate] = useState("");
  const [newTenderEndDate, setNewTenderEndDate] = useState("");
  const [isPublicTender, setIsPublicTender] = useState(false);
  const [selectedJobsForTender, setSelectedJobsForTender] = useState<string[]>([]);
  const [jobCreationStage, setJobCreationStage] = useState(1)
  const [newJobData, setNewJobData] = useState<{
    name: string
    description: string
    unit: string
    estimatedQuantity: string
    unitRate: string
    productLink?: string
  }>({
    name: '',
    description: '',
    unit: '',
    estimatedQuantity: '',
    unitRate: '',
  })
  const [uploadedAttachments, setUploadedAttachments] = useState<string[]>([]); // New state for attachments
  const [attachmentDialog, setAttachmentDialog] = useState<{ isOpen: boolean; materialId: string | null }>({ 
    isOpen: false, 
    materialId: null 
  });
  const [productLinkDialog, setProductLinkDialog] = useState<{ isOpen: boolean; materialId: string | null }>({ 
    isOpen: false, 
    materialId: null 
  });
  const [isJobWizardOpen, setIsJobWizardOpen] = useState(false);
  const [newLaborData, setNewLaborData] = useState({
    description: '',
    estimatedStaff: '',
    estimatedHours: '',
    hourlyRate: '',
  })
  const [isAddingLabor, setIsAddingLabor] = useState(false)

  useEffect(() => {
    const initialSavedState = {};
    categories.forEach(category => {
      category.jobs.forEach(job => {
        initialSavedState[job.id] = true;
      });
    });
    setDescriptionSaved(initialSavedState);
  }, [categories]);

  const addCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([
        ...categories,
        {
          id: Date.now().toString(),
          name: newCategoryName.trim(),
          jobs: []
        }
      ])
      setNewCategoryName("")
    }
  }

  const handleCategoryToggle = useCallback((categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }, [])

  const handleTitleChange = useCallback((categoryId: string, newTitle: string) => {
    setCategories(prev =>
      prev.map(category =>
        category.id === categoryId
          ? { ...category, name: newTitle }
          : category
      )
    )
  }, [])

  const toggleJob = (jobId: string) => {
    setExpandedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const toggleEditMode = (id: string, type: 'category' | 'job', newValue: string) => {
    setCategories(prevCategories => 
      prevCategories.map(category => 
        type === 'category' && category.id === id
          ? { ...category, name: newValue }
          : {
              ...category,
              jobs: category.jobs.map(job => 
                type === 'job' && job.id === id
                  ? { ...job, name: newValue }
                  : job
              )
            }
      )
    );
    setEditingTitleId(null);
  };

  const handleCreateTender = () => {
    if (newTenderName.trim() && selectedJobsForTender.length > 0) {
      const newTender: Tender = {
        id: Date.now().toString(),
        name: newTenderName.trim(),
        description: newTenderDescription.trim(),
        startDate: newTenderStartDate,
        endDate: newTenderEndDate,
        isPublic: isPublicTender,
        jobs: selectedJobsForTender,
      };
      setTenders([...tenders, newTender]);
      setNewTenderName("");
      setNewTenderDescription("");
      setNewTenderStartDate("");
      setNewTenderEndDate("");
      setIsPublicTender(false);
      setSelectedJobsForTender([]);
      setIsCreateTenderDialogOpen(false);
    }
  };

  const handleJobSelectionForTender = (jobId: string) => {
    setSelectedJobsForTender(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewJobData(prev => ({ ...prev, [name]: value }))
  }

  const handleUnitChange = (value: string) => {
    setNewJobData(prev => ({ ...prev, unit: value }))
  }

  const handleNextStage = () => {
    setJobCreationStage(prev => Math.min(prev + 1, 4))
  }

  const handlePreviousStage = () => {
    setJobCreationStage(prev => Math.max(prev - 1, 1))
  }

  const handleSaveJob = () => {
    const newJob: SOQJob = {
      id: Date.now().toString(),
      number: `J${categories[0].jobs.length + 1}`,
      name: newJobData.name,
      description: newJobData.description,
      status: "draft",
      materials: isAddingLabor ? [] : [{
        id: Date.now().toString(),
        description: newJobData.name,
        unit: newJobData.unit,
        estimatedQuantity: parseFloat(newJobData.estimatedQuantity),
        unitRate: parseFloat(newJobData.unitRate),
        totalCost: parseFloat(newJobData.estimatedQuantity) * parseFloat(newJobData.unitRate),
        attachments: [],
        productLink: "",
      }],
      labor: isAddingLabor ? [{
        id: Date.now().toString(),
        description: newLaborData.description,
        estimatedStaff: parseFloat(newLaborData.estimatedStaff),
        estimatedHours: parseFloat(newLaborData.estimatedHours),
        hourlyRate: parseFloat(newLaborData.hourlyRate),
        totalCost: parseFloat(newLaborData.estimatedStaff) * parseFloat(newLaborData.estimatedHours) * parseFloat(newLaborData.hourlyRate),
        notes: [],
      }] : [],
      totalMaterialsCost: isAddingLabor ? 0 : parseFloat(newJobData.estimatedQuantity) * parseFloat(newJobData.unitRate),
      totalLaborCost: isAddingLabor ? parseFloat(newLaborData.estimatedStaff) * parseFloat(newLaborData.estimatedHours) * parseFloat(newLaborData.hourlyRate) : 0,
      totalCost: isAddingLabor 
        ? parseFloat(newLaborData.estimatedStaff) * parseFloat(newLaborData.estimatedHours) * parseFloat(newLaborData.hourlyRate)
        : parseFloat(newJobData.estimatedQuantity) * parseFloat(newJobData.unitRate),
    }
    
    const updatedCategories = [...categories]
    updatedCategories[0].jobs.push(newJob)
    setCategories(updatedCategories)

    // Reset the form
    setNewJobData({
      name: '',
      description: '',
      unit: '',
      estimatedQuantity: '',
      unitRate: '',
    })
    setNewLaborData({
      description: '',
      estimatedStaff: '',
      estimatedHours: '',
      hourlyRate: '',
    })
    setIsAddingLabor(false)
    setJobCreationStage(1)
    setIsJobWizardOpen(false)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SOQ Management</h1>
        <Button onClick={() => setIsCreateTenderDialogOpen(true)}>
          <FileText className="mr-2 h-4 w-4" />
          Create Tender
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger>
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Oakwood Residence">Oakwood Residence</SelectItem>
              <SelectItem value="Project 2">Project 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Input
            placeholder="Enter new category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button onClick={addCategory}>Add Category</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tenders</h2>
        {tenders.map(tender => (
          <Card key={tender.id} className="p-4 bg-background border-border">
            <h3 className="text-lg font-semibold">{tender.name}</h3>
            <p className="text-sm text-muted-foreground">{tender.description}</p>
            <div className="mt-2">
              <h4 className="font-medium">Jobs in this tender:</h4>
              <ul className="list-disc list-inside">
                {tender.jobs.map(jobId => {
                  const job = categories.flatMap(c => c.jobs).find(j => j.id === jobId);
                  return job ? <li key={jobId}>{job.name}</li> : null;
                })}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {categories.map(category => (
          <Collapsible
            key={category.id}
            open={expandedCategories.includes(category.id)}
            onOpenChange={() => handleCategoryToggle(category.id)}
          >
            <Card className="overflow-hidden">
              <CategoryHeader
                title={category.name}
                isExpanded={expandedCategories.includes(category.id)}
                onToggle={() => handleCategoryToggle(category.id)}
                onTitleChange={(newTitle) => handleTitleChange(category.id, newTitle)}
                onInviteUsers={() => {
                  // Implement invite users logic
                }}
                onCreateJob={() => {
                  // Implement create job wizard logic
                }}
                onUploadDocuments={() => {
                  // Implement upload documents logic
                }}
              />
              <CollapsibleContent className="p-4">
                <div className="space-y-2 mt-2">
                  <span className="font-medium">Category Description:</span>
                  <div className="flex items-center gap-2">
                    {editingCategoryDescription === category.id ? (
                      <>
                        <Input
                          value={category.description || ""}
                          onChange={(e) => setCategories(prev => prev.map(c => c.id === category.id ? { ...c, description: e.target.value } : c))}
                          className="w-full"
                        />
                        <Button variant="outline" size="sm" onClick={() => setEditingCategoryDescription(null)}>Save</Button>
                      </>
                    ) : (
                      <>
                        <p className="flex-1">{category.description || "No description"}</p>
                        <Button variant="ghost" size="sm" onClick={() => setEditingCategoryDescription(category.id)}><Pencil className="h-4 w-4" /></Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 mb-4">
                  <Input
                    placeholder="Enter job title"
                    className="flex-grow"
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    value={newJobTitle}
                  />
                  <Button onClick={() => {
                    if (newJobTitle.trim()) {
                      const newJob: SOQJob = {
                        id: Date.now().toString(),
                        number: `J${category.jobs.length + 1}`,
                        name: newJobTitle.trim(),
                        description: "",
                        status: "draft",
                        materials: [],
                        labor: [],
                        totalMaterialsCost: 0,
                        totalLaborCost: 0,
                        totalCost: 0
                      };
                      category.jobs.push(newJob);
                      setCategories([...categories]);
                      setNewJobTitle("");
                    }
                  }}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create Job
                  </Button>
                  <Button variant="secondary" onClick={() => setIsJobWizardOpen(true)}>
                    <FilePlusIcon className="mr-2 h-4 w-4" />
                    Create Job Wizard
                  </Button>
                </div>
                {isJobWizardOpen && (
                  <div className="bg-background border-border p-6 rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Create New Job</h3>
                      <Button variant="ghost" size="sm" onClick={() => setIsJobWizardOpen(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {jobCreationStage === 1 && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="jobName">Job Name</Label>
                          <Input
                            id="jobName"
                            name="name"
                            value={newJobData.name}
                            onChange={handleInputChange}
                            placeholder="Enter job name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="jobDescription">Job Description</Label>
                          <Textarea
                            id="jobDescription"
                            name="description"
                            value={newJobData.description}
                            onChange={handleInputChange}
                            placeholder="Enter job description"
                            rows={4}
                          />
                        </div>
                      </div>
                    )}
                    {jobCreationStage === 2 && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold">{isAddingLabor ? 'Labor Details' : 'Material Details'}</h4>
                          <Button onClick={() => setIsAddingLabor(!isAddingLabor)}>
                            {isAddingLabor ? 'Switch to Material' : 'Switch to Labor'}
                          </Button>
                        </div>
                        {isAddingLabor ? (
                          <>
                            <div>
                              <Label htmlFor="laborDescription">Labor Description</Label>
                              <Input
                                id="laborDescription"
                                name="description"
                                value={newLaborData.description}
                                onChange={(e) => setNewLaborData({...newLaborData, description: e.target.value})}
                                placeholder="Enter labor description"
                              />
                            </div>
                            <div>
                              <Label htmlFor="estimatedStaff">Estimated Staff</Label>
                              <Input
                                id="estimatedStaff"
                                name="estimatedStaff"
                                type="number"
                                value={newLaborData.estimatedStaff}
                                onChange={(e) => setNewLaborData({...newLaborData, estimatedStaff: e.target.value})}
                                placeholder="Enter estimated staff"
                              />
                            </div>
                            <div>
                              <Label htmlFor="estimatedHours">Estimated Hours</Label>
                              <Input
                                id="estimatedHours"
                                name="estimatedHours"
                                type="number"
                                value={newLaborData.estimatedHours}
                                onChange={(e) => setNewLaborData({...newLaborData, estimatedHours: e.target.value})}
                                placeholder="Enter estimated hours"
                              />
                            </div>
                            <div>
                              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                              <Input
                                id="hourlyRate"
                                name="hourlyRate"
                                type="number"
                                value={newLaborData.hourlyRate}
                                onChange={(e) => setNewLaborData({...newLaborData, hourlyRate: e.target.value})}
                                placeholder="Enter hourly rate"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <Label htmlFor="jobUnit">Unit</Label>
                              <Select onValueChange={handleUnitChange} value={newJobData.unit}>
                                <SelectTrigger id="jobUnit">
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="m3">Volume (m³)</SelectItem>
                                  <SelectItem value="m2">Area (m²)</SelectItem>
                                  <SelectItem value="m">Length (m)</SelectItem>
                                  <SelectItem value="no">Number</SelectItem>
                                  <SelectItem value="kg">Weight (kg)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="estimatedQuantity">Estimated Quantity</Label>
                              <Input
                                id="estimatedQuantity"
                                name="estimatedQuantity"
                                value={newJobData.estimatedQuantity}
                                onChange={handleInputChange}
                                placeholder="Enter estimated quantity"
                                type="number"
                              />
                            </div>
                            <div>
                              <Label htmlFor="unitRate">Unit Rate ($)</Label>
                              <Input
                                id="unitRate"
                                name="unitRate"
                                value={newJobData.unitRate}
                                onChange={handleInputChange}
                                placeholder="Enter unit rate"
                                type="number"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    {jobCreationStage === 3 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">Job Summary</h4>
                        <p><strong>Name:</strong> {newJobData.name}</p>
                        <p><strong>Description:</strong> {newJobData.description}</p>
                        {isAddingLabor ? (
                          <>
                            <p><strong>Labor Description:</strong> {newLaborData.description}</p>
                            <p><strong>Estimated Staff:</strong> {newLaborData.estimatedStaff}</p>
                            <p><strong>Estimated Hours:</strong> {newLaborData.estimatedHours}</p>
                            <p><strong>Hourly Rate:</strong> ${newLaborData.hourlyRate}</p>
                            <p><strong>Total Labor Cost:</strong> ${(parseFloat(newLaborData.estimatedStaff) * parseFloat(newLaborData.estimatedHours) * parseFloat(newLaborData.hourlyRate)).toFixed(2)}</p>
                          </>
                        ) : (
                          <>
                            <p><strong>Unit:</strong> {newJobData.unit}</p>
                            <p><strong>Estimated Quantity:</strong> {formatNumber(newJobData.estimatedQuantity)}</p>
                            <p><strong>Unit Rate:</strong> ${formatNumber(newJobData.unitRate)}</p>
                            <p><strong>Total Material Cost:</strong> ${formatNumber((parseFloat(newJobData.estimatedQuantity) * parseFloat(newJobData.unitRate)).toFixed(2))}</p>
                          </>
                        )}
                      </div>
                    )}
                    <div className="flex justify-between mt-6">
                      {jobCreationStage > 1 && (
                        <Button onClick={handlePreviousStage} variant="outline">
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Button>
                      )}
                      {jobCreationStage < 3 ? (
                        <>
                          <Button onClick={handleNextStage} className="ml-auto">
                            Next
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                          {jobCreationStage === 2 && (
                            <Button onClick={() => handleSaveJob()} variant="secondary" className="ml-2">
                              {isAddingLabor ? 'Save Labor' : 'Save Material'}
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button onClick={handleSaveJob} className="ml-auto">
                          <Save className="mr-2 h-4 w-4" />
                          Save Job
                        </Button>
                      )}
                    </div>
                  </div>
                )}
                {category.jobs.map((job) => (
                  <Collapsible
                    key={job.id}
                    open={expandedJobs.includes(job.id)}
                    onOpenChange={() => toggleJob(job.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <div
                        className="flex w-full items-center justify-between p-2 rounded-md cursor-pointer bg-blue-700 text-white mb-4"
                        onClick={() => toggleJob(job.id)}
                      >
                        <div className="flex items-center space-x-2 text-gray-800">
                          {editingTitleId === job.id ? (
                            <Input
                              value={job.name}
                              onChange={(e) => {
                                toggleEditMode(job.id, 'job', e.target.value);
                              }}
                              onBlur={() => setEditingTitleId(null)}
                              autoFocus
                              className="text-lg font-medium"
                            />
                          ) : (
                            <h3 className="text-lg font-medium">{truncateText(job.name, 150)}</h3>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => setEditingTitleId(job.id)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                        {expandedJobs.includes(job.id) ?
                          <ChevronUpIcon className="h-4 w-4" /> :
                          <ChevronDownIcon className="h-4 w-4" />
                        }
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 pl-4">
                      <div className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Description:</span>
                            {editingDescriptionId === job.id ? (
                              <div className="flex items-center space-x-2">
                                <Input
                                  value={job.description}
                                  onChange={(e) => {
                                    const updatedCategories = categories.map(c => ({
                                      ...c,
                                      jobs: c.jobs.map(j =>
                                        j.id === job.id ? { ...j, description: e.target.value } : j
                                      )
                                    }));
                                    setCategories(updatedCategories);
                                  }}
                                  className="flex-grow"
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => {
                                    setEditingDescriptionId(null);
                                    setDescriptionSaved(prev => ({ ...prev, [job.id]: true }));
                                  }}
                                >
                                  Save
                                </Button>
                              </div>
                            ) : (
                              <>
                                <span>{truncateText(job.description, 150)}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => {
                                    setEditingDescriptionId(job.id);
                                    setDescriptionSaved(prev => ({ ...prev, [job.id]: false }));
                                  }}
                                >
                                  {descriptionSaved[job.id] ? 'Edit' : 'Save'}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Materials</h4>
                          <MaterialsTable job={job} categories={categories} setCategories={setCategories} editableMaterials={editableMaterials} setEditableMaterials={setEditableMaterials} isMaterialSaved={(materialId) => job.materials.find(m => m.id === materialId)?.saved ?? false}/>
                          <Button
                            onClick={() => {
                              const newMaterial: Material = {
                                id: Date.now().toString(),
                                description: "",
                                unit: "",
                                estimatedQuantity: 0,
                                unitRate: 0,
                                totalCost: 0,
                                attachments: [],
                                productLink: "",
                                saved: false
                              };
                              job.materials.push(newMaterial);
                              setCategories([...categories]);
                              setEditableMaterials(prev => ({ ...prev, [newMaterial.id]: true }));
                            }}
                            className="mt-2"
                          >
                            Add Material
                          </Button>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Labor</h4>
                          <LaborTable 
                            job={job} 
                            categories={categories} 
                            setCategories={setCategories} 
                            editableLabor={editableLabor} 
                            setEditableLabor={setEditableLabor}
                            isSaved={(laborId) => job.labor.find(l => l.id === laborId)?.saved ?? false}
                          />
                          <Button
                            onClick={() => {
                              const newLabor: Labor = {
                                id: Date.now().toString(),
                                description: "",
                                estimatedStaff: 0,
                                estimatedHours: 0,
                                hourlyRate: 0,
                                totalCost: 0,
                                notes: [],
                                saved: false
                              };
                              job.labor.push(newLabor);
                              setCategories([...categories]);
                              setEditableLabor(prev => ({ ...prev, [newLabor.id]: true }));
                            }}
                            className="mt-2"
                          >
                            Add Labor
                          </Button>
                        </div>
                        <div className="bg-secondary p-4 rounded-md">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium">Total Materials Cost:</p>
                              <p>${job.materials.reduce((sum, material) => sum + material.totalCost, 0).toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="font-medium">Total Labor Cost:</p>
                              <p>${job.labor.reduce((sum, labor) => sum + labor.totalCost, 0).toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="font-medium">Total Job Cost:</p>
                            <p className="text-lg">
                              ${(
                                job.materials.reduce((sum, material) => sum + material.totalCost, 0) +
                                job.labor.reduce((sum, labor) => sum + labor.totalCost, 0)
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>

      <Card className="p-4 mt-8 bg-background border-border">
        <h2 className="text-xl font-semibold mb-4">Category Summary</h2>
        <p>Total Attachments: 0 files</p>
      </Card>

      <Card className="p-4 mt-4 bg-background border-border">
        <h2 className="text-xl font-semibold mb-4">Overall Totals</h2>
        <div className="space-y-2">
          <p>Total Number of Jobs: {categories.reduce((acc, cat) => acc + cat.jobs.length, 0)}</p>
          <p>Total Cost Across All Categories: $
            {categories.reduce((acc, cat) =>
              acc + cat.jobs.reduce((jobAcc, job) => jobAcc + job.totalCost, 0)
            , 0).toFixed(2)}
          </p>
        </div>
      </Card>

      <Dialog open={isCreateTenderDialogOpen} onOpenChange={setIsCreateTenderDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Create New Tender</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tenderName">Tender Name</Label>
              <Input
                id="tenderName"
                value={newTenderName}
                onChange={(e) => setNewTenderName(e.target.value)}
                placeholder="Enter tender name"
              />
            </div>
            <div>
              <Label htmlFor="tenderDescription">Tender Description</Label>
              <Textarea
                id="tenderDescription"
                value={newTenderDescription}
                onChange={(e) => setNewTenderDescription(e.target.value)}
                placeholder="Enter tender description"
              />
            </div>
            <div>
              <Label htmlFor="startDate">StartDate</Label>
              <Input
                id="startDate"
                type="date"
                value={newTenderStartDate}
                onChange={(e) => setNewTenderStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={newTenderEndDate}
                onChange={(e) => setNewTenderEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="tenderVisibility"
                checked={isPublicTender}
                onCheckedChange={setIsPublicTender}
              />
              <Label htmlFor="tenderVisibility">Make tender public</Label>
            </div>
            <div>
              <Label>Select Jobs for Tender</Label>
              <div className="space-y-2 mt-2">
                {categories.map(category => (
                  <div key={category.id}>
                    <h4 className="font-medium">{category.name}</h4>
                    {category.jobs.map(job => (
                      <div key={job.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`job-${job.id}`}
                          checked={selectedJobsForTender.includes(job.id)}
                          onCheckedChange={() => handleJobSelectionForTender(job.id)}
                        />
                        <Label htmlFor={`job-${job.id}`}>{job.name}</Label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateTender}>Create Tender</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MaterialsTable({ job, categories, setCategories, editableMaterials, setEditableMaterials, isMaterialSaved }: { job: SOQJob; categories: SOQCategory[]; setCategories: React.Dispatch<React.SetStateAction<SOQCategory[]>>; editableMaterials: { [key: string]: boolean }; setEditableMaterials: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>; isMaterialSaved: (materialId: string) => boolean }) {
  const unitOptions = [
    { value: 'm3', label: 'Volume (m³)' },
    { value: 'm2', label: 'Area (m²)' },
    { value: 'm', label: 'Length (m)' },
    { value: 'no', label: 'Number' },
    { value: 'kg', label: 'Weight (kg)' },
  ]

  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; materialId: string | null }>({ isOpen: false, materialId: null });
  const [attachmentDialog, setAttachmentDialog] = useState<{ isOpen: boolean; materialId: string | null }>({ isOpen: false, materialId: null });
  const [productLinkDialog, setProductLinkDialog] = useState<{ isOpen: boolean; materialId: string | null }>({ isOpen: false, materialId: null });

  const saveMaterial = (material: Material) => {
    setCategories(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        jobs: category.jobs.map(j => 
          j.id === job.id 
            ? { ...j, materials: j.materials.map(m => m.id === material.id ? { ...m, saved: true } : m) }
            : j
        )
      }))
    );
    setEditableMaterials(prev => ({ ...prev, [material.id]: false }));
  };

  const toggleEditMode = (materialId: string) => {
    setEditableMaterials(prev => ({ ...prev, [materialId]: !prev[materialId] }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, material: Material, field: keyof Material) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputs = Array.from(e.currentTarget.closest('tr')!.querySelectorAll('input, select'));
      const currentIndex = inputs.indexOf(e.currentTarget);
      if (currentIndex < inputs.length - 1) {
        (inputs[currentIndex + 1] as HTMLElement).focus();
      } else {
        saveMaterial(material);
      }
    }
  };

  const handleAttachment = (materialId: string, files: FileList | null) => {
    if (!files) return;
    
    setCategories(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        jobs: category.jobs.map(j => 
          j.id === job.id 
            ? {
                ...j,
                materials: j.materials.map(m => 
                  m.id === materialId 
                    ? { ...m, attachments: [...m.attachments, ...Array.from(files).map(f => f.name)] }
                    : m
                )
              }
            : j
        )
      }))
    );
    setAttachmentDialog({ isOpen: false, materialId: null });
  };

  const handleProductLink = (materialId: string, link: string) => {
    setCategories(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        jobs: category.jobs.map(j => 
          j.id === job.id 
            ? {
                ...j,
                materials: j.materials.map(m => 
                  m.id === materialId 
                    ? { ...m, productLink: link }
                    : m
                )
              }
            : j
        )
      }))
    );
    setProductLinkDialog({ isOpen: false, materialId: null });
  };

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full border-collapse [&_td]:border-border [&_th]:border-border">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-2 text-left font-medium">Description</th>
            <th className="p-2 text-left font-medium w-[150px]">Unit</th>
            <th className="p-2 text-left font-medium w-[120px]">Quantity</th>
            <th className="p-2 text-left font-medium w-[150px]">Unit Rate ($)</th>
            <th className="p-2 text-left font-medium w-[120px]">Total Cost ($)</th>
            <th className="p-2 text-left font-medium w-[120px]">Attachments</th>
            <th className="p-2 text-left font-medium w-[120px]">Product Link</th>
            <th className="w-[80px]"></th>
          </tr>
        </thead>
        <tbody>
          {job.materials.map((material, index) => (
            <tr key={material.id} className="border-b">
              <td className="p-2">
                <div className="flex items-center gap-2">
                  {editableMaterials[material.id] ? (
                    <Input
                      value={material.description}
                      onChange={(e) => {
                        material.description = e.target.value;
                        setCategories([...categories]);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, material, 'description')}
                      className="border-0 bg-transparent focus-visible:ring-0"
                      placeholder="Enterdescription"
                    />
                  ) : (
                    <div className="text-sm">{truncateText(material.description, 150)}</div>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background border-border">
                      <DialogHeader>
                        <DialogTitle>Material Description</DialogTitle>
                      </DialogHeader>
                      <Textarea
                        value={material.description}
                        onChange={(e) => {
                          material.description = e.target.value;
                          setCategories([...categories]);
                        }}
                        className="min-h-[200px]"
                        placeholder="Enter detailed description"
                        disabled={!editableMaterials[material.id]}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </td>
              <td className="p-2">
                {editableMaterials[material.id] ? (
                  <Select
                    value={material.unit}
                    onValueChange={(value) => {
                      material.unit = value;
                      setCategories([...categories]);
                    }}
                  >
                    <SelectTrigger className="border-0 bg-transparent focus-visible:ring-0">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span>{material.unit}</span>
                )}
              </td>
              <td className="p-2">
                {editableMaterials[material.id] ? (
                  <Input
                    type="number"
                    value={material.estimatedQuantity || ''}
                    onChange={(e) => {
                      material.estimatedQuantity = Number(e.target.value);
                      material.totalCost = material.estimatedQuantity * material.unitRate;
                      setCategories([...categories]);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, material, 'estimatedQuantity')}
                    className="border-0 bg-transparent focus-visible:ring-0"
                    placeholder="0"
                  />
                ) : (
                  <span>{material.estimatedQuantity}</span>
                )}
              </td>
              <td className="p-2">
                {editableMaterials[material.id] ? (
                  <Input
                    type="number"
                    value={material.unitRate || ''}
                    onChange={(e) => {
                      material.unitRate = Number(e.target.value);
                      material.totalCost = material.estimatedQuantity * material.unitRate;
                      setCategories([...categories]);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, material, 'unitRate')}
                    className="border-0 bg-transparent focus-visible:ring-0"
                    placeholder="0"
                  />
                ) : (
                  <span>{material.unitRate}</span>
                )}
              </td>
              <td className="p-2 font-medium">${new Intl.NumberFormat('en-US').format(material.totalCost)}</td>
              <td className="p-2">
                <Dialog open={attachmentDialog.isOpen && attachmentDialog.materialId === material.id}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setAttachmentDialog({ isOpen: true, materialId: material.id })}
                    >
                      <PaperclipIcon className="h-4 w-4 mr-2" />
                      <span>{material.attachments.length || 0}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background border-border">
                    <DialogHeader>
                      <DialogTitle>Manage Attachments</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input 
                        type="file" 
                        multiple 
                        onChange={(e) => handleAttachment(material.id, e.target.files)} 
                      />
                      {material.attachments.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium">Current Attachments:</h4>
                          <div className="grid gap-2">
                            {material.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded-md">
                                <span className="text-sm">{attachment}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    const updatedAttachments = [...material.attachments];
                                    updatedAttachments.splice(index, 1);
                                    handleAttachment(material.id, null);
                                  }}
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </td>
              <td className="p-2">
                <Dialog open={productLinkDialog.isOpen && productLinkDialog.materialId === material.id}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setProductLinkDialog({ isOpen: true, materialId: material.id })}
                    >
                      <Link2 className="h-4 w-4 mr-2" />
                      {material.productLink ? 'Edit Link' : 'Add Link'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background border-border">
                    <DialogHeader>
                      <DialogTitle>Product Link</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input 
                        placeholder="Enter product URL"
                        defaultValue={material.productLink}
                        onChange={(e) => handleProductLink(material.id, e.target.value)}
                      />
                      {material.productLink && (
                        <div className="flex items-center justify-between p-2 bg-secondary rounded-md">
                          <a 
                            href={material.productLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline"
                          >
                            {material.productLink}
                          </a>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleProductLink(material.id, '')}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </td>
              <td className="p-2">
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (editableMaterials[material.id]) {
                        saveMaterial(material);
                      } else {
                        toggleEditMode(material.id);
                      }
                    }}
                  >
                    {editableMaterials[material.id] ? 'Save' : 'Edit'}
                  </Button>
                  <AlertDialog open={deleteConfirmation.isOpen} onOpenChange={(isOpen) => setDeleteConfirmation({ isOpen, materialId: null })}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteConfirmation({ isOpen: true, materialId: material.id })}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the material from the job.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                          job.materials = job.materials.filter(m => m.id !== deleteConfirmation.materialId);
                          setCategories([...categories]);
                          setDeleteConfirmation({ isOpen: false, materialId: null });
                        }}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function LaborTable({ job, categories, setCategories, editableLabor, setEditableLabor, isSaved }: { job: SOQJob; categories: SOQCategory[]; setCategories: React.Dispatch<React.SetStateAction<SOQCategory[]>>; editableLabor: { [key: string]: boolean }; setEditableLabor: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>; isSaved: (laborId: string) => boolean }) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; laborId: string | null }>({ isOpen: false, laborId: null });
  const [notesDialog, setNotesDialog] = useState<{ isOpen: boolean; laborId: string | null }>({ isOpen: false, laborId: null });

  const saveLabor = (laborItem: Labor) => {
    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        jobs: category.jobs.map(j =>
          j.id === job.id
            ? { ...j, labor: j.labor.map(l => l.id === laborItem.id ? { ...laborItem, saved: true } : l) }
            : j
        )
      }))
    );
    setEditableLabor(prev => ({ ...prev, [laborItem.id]: false }));
  };

  const toggleEditMode = (laborId: string) => {
    setEditableLabor(prev => ({ ...prev, [laborId]: !prev[laborId] }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, labor: Labor, field: keyof Labor) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputs = Array.from(e.currentTarget.closest('tr')!.querySelectorAll('input'));
      const currentIndex = inputs.indexOf(e.currentTarget);
      if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      } else {
        saveLabor(labor);
      }
    }
  };

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full border-collapse [&_td]:border-border [&_th]:border-border">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-2 text-left font-medium">Description</th>
            <th className="p-2 text-left font-medium w-[120px]">Est. Staff</th>
            <th className="p-2 text-left font-medium w-[120px]">Est. Hours</th>
            <th className="p-2 text-left font-medium w-[150px]">Hourly Rate ($)</th>
            <th className="p-2 text-left font-medium w-[120px]">Total Cost ($)</th>
            <th className="p-2 text-left font-medium w-[120px]">Notes</th>
            <th className="w-[80px]"></th>
          </tr>
        </thead>
        <tbody>
          {job.labor.map((laborItem, index) => (
            <tr key={laborItem.id} className="border-b">
              <td className="p-2">
                <div className="flex items-center gap-2">
                  {editableLabor[laborItem.id] ? (
                    <Input
                      value={laborItem.description}
                      onChange={(e) => {
                        laborItem.description = e.target.value;
                        setCategories([...categories]);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, laborItem, 'description')}
                      className="border-0 bg-transparent focus-visible:ring-0 text-sm"
                      placeholder="Enter description"
                    />
                  ) : (
                    <div className="text-sm">{truncateText(laborItem.description, 150)}</div>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background border-border">
                      <DialogHeader>
                        <DialogTitle>Labor Description</DialogTitle>
                      </DialogHeader>
                      <Textarea
                        value={laborItem.description}
                        onChange={(e) => {
                          laborItem.description = e.target.value;
                          setCategories([...categories]);
                        }}
                        className="min-h-[200px]"
                        placeholder="Enter detailed description"
                        disabled={!editableLabor[laborItem.id]}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </td>
              <td className="p-2">
                <Input
                  type="number"
                  value={laborItem.estimatedStaff || ''}
                  onChange={(e) => {
                    laborItem.estimatedStaff = Number(e.target.value);
                    laborItem.totalCost = laborItem.estimatedStaff * laborItem.estimatedHours * laborItem.hourlyRate;
                    setCategories([...categories]);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, laborItem, 'estimatedStaff')}
                  className="border-0 bg-transparent focus-visible:ring-0"
                  placeholder="0"
                  disabled={!editableLabor[laborItem.id]}
                />
              </td>
              <td className="p-2">
                <Input
                  type="number"
                  value={laborItem.estimatedHours || ''}
                  onChange={(e) => {
                    laborItem.estimatedHours = Number(e.target.value);
                    laborItem.totalCost = laborItem.estimatedStaff * laborItem.estimatedHours * laborItem.hourlyRate;
                    setCategories([...categories]);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, laborItem, 'estimatedHours')}
                  className="border-0 bg-transparent focus-visible:ring-0"
                  placeholder="0"
                  disabled={!editableLabor[laborItem.id]}
                />
              </td>
              <td className="p-2">
                <Input
                  type="number"
                  value={laborItem.hourlyRate || ''}
                  onChange={(e) => {
                    laborItem.hourlyRate = Number(e.target.value);
                    laborItem.totalCost = laborItem.estimatedStaff * laborItem.estimatedHours * laborItem.hourlyRate;
                    setCategories([...categories]);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, laborItem, 'hourlyRate')}
                  className="border-0 bg-transparent focus-visible:ring-0"
                  placeholder="0"
                  disabled={!editableLabor[laborItem.id]}
                />
              </td>
              <td className="p-2 font-medium">${new Intl.NumberFormat('en-US').format(laborItem.totalCost)}</td>
              <td className="p-2">
                <Dialog open={notesDialog.isOpen && notesDialog.laborId === laborItem.id} onOpenChange={(isOpen) => setNotesDialog({ isOpen, laborId: isOpen ? laborItem.id : null })}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {laborItem.notes.length || 0}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background border-border">
                    <DialogHeader>
                      <DialogTitle>Labor Notes</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        value={laborItem.notes.join('\n')}
                        onChange={(e) => {
                          laborItem.notes = e.target.value.split('\n');
                          setCategories([...categories]);
                        }}
                        className="min-h-[200px]"
                        placeholder="Enter notes (one per line)"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </td>
              <td className="p-2">
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (editableLabor[laborItem.id]) {
                        saveLabor(laborItem);
                      } else {
                        toggleEditMode(laborItem.id);
                      }
                    }}
                  >
                    {editableLabor[laborItem.id] ? 'Save' : 'Edit'}
                  </Button>
                  <AlertDialog open={deleteConfirmation.isOpen} onOpenChange={(isOpen) => setDeleteConfirmation({ isOpen, laborId: null })}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteConfirmation({ isOpen: true, laborId: laborItem.id })}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the labor item from the job.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                          job.labor = job.labor.filter(l => l.id !== deleteConfirmation.laborId);
                          setCategories([...categories]);
                          setDeleteConfirmation({ isOpen: false, laborId: null });
                        }}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

