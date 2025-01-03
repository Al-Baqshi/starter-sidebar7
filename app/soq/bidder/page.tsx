"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Download, Link2, PaperclipIcon } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MaterialItem {
  id: string;
  no: number;
  title: string;
  description: string;
  unit: string;
  estimatedQuantity: number;
  bidderQuantity: number;
  unitRate: number;
  totalCost: number;
  attachments: number;
  productLink: string;
}

interface LaborItem {
  id: string;
  no: number;
  description: string;
  estimatedStaff: number;
  bidderStaff: number;
  estimatedHours: number;
  bidderHours: number;
  hourlyRate: number;
  totalCost: number;
  notes: number;
}

export default function SOQBidderPage() {
  const [materials, setMaterials] = useState<MaterialItem[]>([
    {
      id: '1',
      no: 1,
      title: 'Excavation',
      description: 'Excavation work for foundation',
      unit: 'Volume (m³)',
      estimatedQuantity: 60,
      bidderQuantity: 65,
      unitRate: 50,
      totalCost: 3250.00,
      attachments: 0,
      productLink: ''
    },
    {
      id: '2',
      no: 2,
      title: 'Concrete (20 MPa)',
      description: 'Concrete for foundation',
      unit: 'Volume (m³)',
      estimatedQuantity: 40,
      bidderQuantity: 42,
      unitRate: 120,
      totalCost: 5040.00,
      attachments: 0,
      productLink: ''
    }
  ]);

  const [labor, setLabor] = useState<LaborItem[]>([
    {
      id: '1',
      no: 1,
      description: 'Excavator Operator',
      estimatedStaff: 1,
      bidderStaff: 1,
      estimatedHours: 40,
      bidderHours: 42,
      hourlyRate: 25,
      totalCost: 1050.00,
      notes: 0
    },
    {
      id: '2',
      no: 2,
      description: 'Concrete Workers',
      estimatedStaff: 4,
      bidderStaff: 5,
      estimatedHours: 80,
      bidderHours: 85,
      hourlyRate: 22,
      totalCost: 9350.00,
      notes: 0
    }
  ]);

  const updateMaterial = (id: string, field: keyof MaterialItem, value: number | string) => {
    setMaterials(materials.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'bidderQuantity' || field === 'unitRate') {
          updated.totalCost = updated.bidderQuantity * updated.unitRate;
        }
        return updated;
      }
      return item;
    }));
  };

  const updateLabor = (id: string, field: keyof LaborItem, value: number) => {
    setLabor(labor.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'bidderStaff' || field === 'bidderHours' || field === 'hourlyRate') {
          updated.totalCost = updated.bidderStaff * updated.bidderHours * updated.hourlyRate;
        }
        return updated;
      }
      return item;
    }));
  };

  const handleAttachment = (id: string) => {
    // Simulating file upload
    setMaterials(materials.map(item => 
      item.id === id ? { ...item, attachments: item.attachments + 1 } : item
    ));
  };

  const handleAddLink = (id: string) => {
    const link = prompt("Enter product link:");
    if (link) {
      setMaterials(materials.map(item => 
        item.id === id ? { ...item, productLink: link } : item
      ));
    }
  };

  const calculateTotalMaterialCost = () => {
    return materials.reduce((sum, item) => sum + item.totalCost, 0);
  };

  const calculateTotalLaborCost = () => {
    return labor.reduce((sum, item) => sum + item.totalCost, 0);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">JOB: #1001 - Foundation Work (Bidder View)</h1>
          <div className="flex gap-8 mt-2 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Description:</span> Install concrete foundation for 200 sqm area
            </div>
            <div>
              <span className="font-medium">Time Frame:</span> 2023-08-01 to 2023-08-15
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Materials</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No.</TableHead>
                <TableHead>Item Description</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Estimated Quantity</TableHead>
                <TableHead>Bidder Quantity</TableHead>
                <TableHead>Unit Rate ($)</TableHead>
                <TableHead>Total Cost ($)</TableHead>
                <TableHead>Attachments</TableHead>
                <TableHead>Product Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell>
                    <div>{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.estimatedQuantity}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.bidderQuantity}
                      onChange={(e) => updateMaterial(item.id, 'bidderQuantity', parseFloat(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.unitRate}
                      onChange={(e) => updateMaterial(item.id, 'unitRate', parseFloat(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>${item.totalCost.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleAttachment(item.id)}>
                      <PaperclipIcon className="h-4 w-4" />
                      <span className="ml-2">{item.attachments}</span>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleAddLink(item.id)}>
                      <Link2 className="h-4 w-4" />
                      <span className="ml-2">{item.productLink ? 'Edit Link' : 'Add Link'}</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Labor</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No.</TableHead>
                <TableHead>Labor Description</TableHead>
                <TableHead>Estimated Staff</TableHead>
                <TableHead>Bidder Staff</TableHead>
                <TableHead>Estimated Hours</TableHead>
                <TableHead>Bidder Hours</TableHead>
                <TableHead>Hourly Rate ($)</TableHead>
                <TableHead>Total Cost ($)</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labor.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.estimatedStaff}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.bidderStaff}
                      onChange={(e) => updateLabor(item.id, 'bidderStaff', parseFloat(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>{item.estimatedHours}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.bidderHours}
                      onChange={(e) => updateLabor(item.id, 'bidderHours', parseFloat(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.hourlyRate}
                      onChange={(e) => updateLabor(item.id, 'hourlyRate', parseFloat(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>${item.totalCost.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <PaperclipIcon className="h-4 w-4" />
                      <span className="ml-2">{item.notes}</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col items-end gap-4 w-full">
          <div className="text-lg">Total Material Cost: ${calculateTotalMaterialCost().toFixed(2)}</div>
          <div className="text-lg">Total Labor Cost: ${calculateTotalLaborCost().toFixed(2)}</div>
          <div className="text-xl font-bold">
            Total Bid for Foundation Work: ${(calculateTotalMaterialCost() + calculateTotalLaborCost()).toFixed(2)}
          </div>
          <div className="w-full">
            <Label htmlFor="tenderNotes" className="text-sm font-semibold">Tender Notes</Label>
            <Textarea
              id="tenderNotes"
              placeholder="Add any additional notes or description for this tender..."
              className="mt-1 w-full"
            />
          </div>
          <div className="w-full space-y-4">
            <div>
              <Label htmlFor="startDate" className="text-sm font-semibold">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label htmlFor="endDate" className="text-sm font-semibold">End Date</Label>
              <Input
                id="endDate"
                type="date"
                className="mt-1 w-full"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Attach Supporting Documents
            </Button>
            <Button>Submit Bid for Foundation Work</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

