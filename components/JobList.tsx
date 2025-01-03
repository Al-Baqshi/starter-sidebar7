import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Job, MaterialItem, LaborItem } from '@/types/soq'
import { Plus, Minus, PaperclipIcon, Link2, Trash2, CheckCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const unitOptions = [
  { value: 'm3', label: 'Volume (m³)' },
  { value: 'm2', label: 'Area (m²)' },
  { value: 'm', label: 'Length (m)' },
  { value: 'no', label: 'Number' },
  { value: 'kg', label: 'Weight (kg)' }
];

const mockJobs: Job[] = [
  {
    id: "1",
    jobId: "J001",
    name: "Foundation Work",
    description: "Excavation and concrete pouring for building foundation",
    status: "draft",
    includedInTender: false,
    totalCost: 30000,
    materials: [
      {
        id: "M1",
        itemDescription: "Concrete",
        unit: "m3",
        estimatedQuantity: 100,
        bidderQuantity: 0,
        unitRate: 150,
        totalCost: 15000,
        attachments: 2,
        productLink: "https://example.com/concrete"
      },
      {
        id: "M2",
        itemDescription: "Steel Reinforcement",
        unit: "kg",
        estimatedQuantity: 5000,
        bidderQuantity: 0,
        unitRate: 2,
        totalCost: 10000,
        attachments: 1,
        productLink: ""
      }
    ],
    labor: [
      {
        id: "L1",
        laborDescription: "Concrete Workers",
        estimatedStaff: 5,
        bidderStaff: 0,
        estimatedHours: 40,
        bidderHours: 0,
        hourlyRate: 25,
        totalCost: 5000,
        notes: 1
      }
    ]
  },
  {
    id: "2",
    jobId: "J002",
    name: "Electrical Wiring",
    description: "Installation of electrical wiring throughout the building",
    status: "ready",
    includedInTender: true,
    totalCost: 11300,
    materials: [
      {
        id: "M3",
        itemDescription: "Copper Wire",
        unit: "m",
        estimatedQuantity: 1000,
        bidderQuantity: 0,
        unitRate: 5,
        totalCost: 5000,
        attachments: 1,
        productLink: "https://example.com/copper-wire"
      }
    ],
    labor: [
      {
        id: "L2",
        laborDescription: "Electricians",
        estimatedStaff: 3,
        bidderStaff: 0,
        estimatedHours: 60,
        bidderHours: 0,
        hourlyRate: 35,
        totalCost: 6300,
        notes: 2
      }
    ]
  },
  {
    id: "3",
    jobId: "J003",
    name: "Plumbing Installation",
    description: "Installation of water supply and drainage systems",
    status: "draft",
    includedInTender: false,
    totalCost: 18000,
    materials: [
      {
        id: "M4",
        itemDescription: "PVC Pipes",
        unit: "m",
        estimatedQuantity: 500,
        bidderQuantity: 0,
        unitRate: 10,
        totalCost: 5000,
        attachments: 1,
        productLink: "https://example.com/pvc-pipes"
      }
    ],
    labor: [
      {
        id: "L3",
        laborDescription: "Plumbers",
        estimatedStaff: 4,
        bidderStaff: 0,
        estimatedHours: 80,
        bidderHours: 0,
        hourlyRate: 30,
        totalCost: 9600,
        notes: 1
      }
    ]
  }
];

interface JobListProps {
  jobs: Job[];
  updateJob: (job: Job) => void;
}

export function JobList({ jobs = mockJobs, updateJob }: JobListProps) {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState<{ isOpen: boolean; job: Job | null; labor: LaborItem | null }>({
    isOpen: false,
    job: null,
    labor: null
  });

  const calculateTotalCost = (job: Job) => {
    const materialsCost = job.materials.reduce((sum, material) =>
      sum + (material.estimatedQuantity * material.unitRate), 0);
    const laborCost = job.labor.reduce((sum, labor) =>
      sum + (labor.estimatedStaff * labor.estimatedHours * labor.hourlyRate), 0);
    return materialsCost + laborCost;
  };

  const handleAddMaterial = (job: Job) => {
    if (job.status === 'ready') return;
    const updatedJob = {
      ...job,
      materials: [
        ...job.materials,
        {
          id: Date.now().toString(),
          itemDescription: '',
          unit: '',
          estimatedQuantity: 0,
          bidderQuantity: 0,
          unitRate: 0,
          totalCost: 0,
          attachments: 0,
          productLink: '',
        }
      ]
    };
    updateJob(updatedJob);
  };

  const handleAddLabor = (job: Job) => {
    if (job.status === 'ready') return;
    const updatedJob = {
      ...job,
      labor: [
        ...job.labor,
        {
          id: Date.now().toString(),
          laborDescription: '',
          estimatedStaff: 0,
          bidderStaff: 0,
          estimatedHours: 0,
          bidderHours: 0,
          hourlyRate: 0,
          totalCost: 0,
          notes: 0,
          attachments: []
        }
      ]
    };
    updateJob(updatedJob);
  };

  const handleUpdateMaterial = (job: Job, materialId: string, field: keyof MaterialItem, value: string | number) => {
    if (job.status === 'ready') return;
    const updatedMaterials = job.materials.map(material =>
      material.id === materialId ? { ...material, [field]: value } : material
    );
    const updatedJob = { ...job, materials: updatedMaterials };
    updatedJob.totalCost = calculateTotalCost(updatedJob);
    updateJob(updatedJob);
  };

  const handleUpdateLabor = (job: Job, laborId: string, field: keyof LaborItem, value: any) => {
    if (job.status === 'ready') return;
    const updatedLabor = job.labor.map(labor =>
      labor.id === laborId ? { ...labor, [field]: value } : labor
    );
    const updatedJob = { ...job, labor: updatedLabor };
    updatedJob.totalCost = calculateTotalCost(updatedJob);
    updateJob(updatedJob);
  };

  const handleDeleteMaterial = (job: Job, materialId: string) => {
    if (job.status === 'ready') return;
    const updatedMaterials = job.materials.filter(m => m.id !== materialId);
    const updatedJob = { ...job, materials: updatedMaterials };
    updateJob(updatedJob);
  };

  const handleDeleteLabor = (job: Job, laborId: string) => {
    if (job.status === 'ready') return;
    const updatedLabor = job.labor.filter(l => l.id !== laborId);
    const updatedJob = { ...job, labor: updatedLabor };
    updateJob(updatedJob);
  };

  const handleStatusChange = (job: Job, status: 'draft' | 'ready') => {
    const updatedJob = { ...job, status };
    updateJob(updatedJob);
  };

  const handleAddToTender = (job: Job) => {
    if (job.status !== 'ready') return;
    const updatedJob = { ...job, includedInTender: true };
    updateJob(updatedJob);
  };

  const handleOpenNoteDialog = (job: Job, labor: LaborItem) => {
    if (job.status !== 'ready') {
      setDialogState({ isOpen: true, job, labor });
    }
  };

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <Card key={job.id} className={cn(
          "transition-colors duration-200",
          job.status === 'ready' ? "bg-green-50 dark:bg-green-900" : ""
        )}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span>{job.name} (ID: {job.jobId})</span>
                {job.includedInTender && (
                  <Badge variant="outline" className="ml-2">
                    In Tender
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-normal">Total: ${formatNumber(job.totalCost ?? 0)}</span>
                <Select
                  value={job.status}
                  onValueChange={(value) => handleStatusChange(job, value as 'draft' | 'ready')}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
                >
                  {expandedJobId === job.id ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </Button>
              </div>
            </CardTitle>
            <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
              <span>{job.status === 'ready' ? 'Ready - Not Editable' : 'Draft - Editable'}</span>
              <span>{job.includedInTender ? 'Included in Tender' : 'Not in Tender'}</span>
            </div>
            {job.status === 'ready' && !job.includedInTender && (
              <Badge variant="secondary" className="mt-2">
                <CheckCircle className="mr-2 h-4 w-4" />
                Ready to Tender
              </Badge>
            )}
          </CardHeader>
          {expandedJobId === job.id && (
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Total Cost</h3>
                  <span className="text-xl font-bold">${formatNumber(calculateTotalCost(job))}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Materials</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Rate ($)</TableHead>
                        <TableHead>Total Cost ($)</TableHead>
                        <TableHead>Attachments</TableHead>
                        <TableHead>Product Link</TableHead>
                        <TableHead> </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {job.materials.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell>
                            <Input
                              value={material.itemDescription}
                              onChange={(e) => handleUpdateMaterial(job, material.id, 'itemDescription', e.target.value)}
                              disabled={job.status === 'ready'}
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={material.unit}
                              onValueChange={(value) => handleUpdateMaterial(job, material.id, 'unit', value)}
                              disabled={job.status === 'ready'}
                            >
                              <SelectTrigger className="w-[130px]">
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
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={material.estimatedQuantity}
                              onChange={(e) => handleUpdateMaterial(job, material.id, 'estimatedQuantity', Number(e.target.value))}
                              className="w-24"
                              disabled={job.status === 'ready'}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={material.unitRate}
                              onChange={(e) => handleUpdateMaterial(job, material.id, 'unitRate', Number(e.target.value))}
                              disabled={job.status === 'ready'}
                            />
                          </TableCell>
                          <TableCell>${formatNumber(material.totalCost ?? 0)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" disabled={job.status === 'ready'}>
                              <PaperclipIcon className="h-4 w-4" />
                              <span className="ml-2">{material.attachments}</span>
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" disabled={job.status === 'ready'}>
                              <Link2 className="h-4 w-4" />
                              <span className="ml-2">Add Link</span>
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteMaterial(job, material.id)} disabled={job.status === 'ready'}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button onClick={() => handleAddMaterial(job)} className="mt-2" disabled={job.status === 'ready'}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Material
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Labor</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Est. Staff</TableHead>
                        <TableHead>Est. Hours</TableHead>
                        <TableHead>Hourly Rate ($)</TableHead>
                        <TableHead>Total Cost ($)</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {job.labor.map((labor) => (
                        <TableRow key={labor.id}>
                          <TableCell>
                            <Input
                              value={labor.laborDescription}
                              onChange={(e) => handleUpdateLabor(job, labor.id, 'laborDescription', e.target.value)}
                              disabled={job.status === 'ready'}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={labor.estimatedStaff}
                              onChange={(e) => handleUpdateLabor(job, labor.id, 'estimatedStaff', Number(e.target.value))}
                              disabled={job.status === 'ready'}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={labor.estimatedHours}
                              onChange={(e) => handleUpdateLabor(job, labor.id, 'estimatedHours', Number(e.target.value))}
                              disabled={job.status === 'ready'}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={labor.hourlyRate}
                              onChange={(e) => handleUpdateLabor(job, labor.id, 'hourlyRate', Number(e.target.value))}
                              disabled={job.status === 'ready'}
                            />
                          </TableCell>
                          <TableCell>${formatNumber(labor.totalCost ?? 0)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (dialogState.job && dialogState.labor) {
                                  setDialogState({
                                    isOpen: true,
                                    job: dialogState.job,
                                    labor: {
                                      ...dialogState.labor,
                                      notes: labor.notes || '',
                                      attachments: labor.attachments || []
                                    }
                                  });
                                }
                              }}
                              disabled={job.status === 'ready'}
                            >
                              <PaperclipIcon className="h-4 w-4" />
                              <span className="ml-2">
                                {labor.notes || labor.attachments?.length ? 'View/Edit' : 'Add'} Notes & Attachments
                              </span>
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteLabor(job, labor.id)} disabled={job.status === 'ready'}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button onClick={() => handleAddLabor(job)} className="mt-2" disabled={job.status === 'ready'}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Labor
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
      <div className="mt-8 text-right font-bold text-xl">
        Grand Total: ${formatNumber(jobs.reduce((sum, job) => sum + calculateTotalCost(job), 0))}
      </div>
      <Dialog open={dialogState.isOpen} onOpenChange={(isOpen) => setDialogState(prev => ({ ...prev, isOpen }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogState.labor?.notes || dialogState.labor?.attachments?.length ? 'View/Edit' : 'Add'} Notes & Attachments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter notes here..."
              value={dialogState.labor?.notes || ''}
              onChange={(e) => {
                if (dialogState.job && dialogState.labor) {
                  const updatedLabor = { ...dialogState.labor, notes: e.target.value };
                  handleUpdateLabor(dialogState.job, dialogState.labor.id, 'notes', e.target.value);
                  setDialogState(prev => ({ ...prev, labor: updatedLabor }));
                }
              }}
              rows={5}
            />
            {dialogState.labor?.attachments && dialogState.labor.attachments.length > 0 && (
              <div>
                <h4 className="mb-2 font-semibold">Attachments:</h4>
                <ul className="list-disc pl-5">
                  {dialogState.labor.attachments.map((attachment, index) => (
                    <li key={index}>{attachment}</li>
                  ))}
                </ul>
              </div>
            )}
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const newAttachment = e.target.files[0].name;
                  if (dialogState.job && dialogState.labor) {
                    const updatedAttachments = [...(dialogState.labor.attachments || []), newAttachment];
                    const updatedLabor = { ...dialogState.labor, attachments: updatedAttachments };
                    handleUpdateLabor(dialogState.job, dialogState.labor.id, 'attachments', updatedAttachments);
                    setDialogState(prev => ({ ...prev, labor: updatedLabor }));
                  }
                }
              }}
            />
            <Button onClick={() => setDialogState(prev => ({ ...prev, isOpen: false }))}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

