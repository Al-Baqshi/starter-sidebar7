export interface Material {
  id: string;
  description: string;
  unit: string;
  estimatedQuantity: number;
  unitRate: number;
  totalCost: number;
  attachments: string[];
  productLink: string;
}

export interface Labor {
  id: string;
  description: string;
  estimatedStaff: number;
  estimatedHours: number;
  hourlyRate: number;
  totalCost: number;
  notes: string[];
}

export interface SOQJob {
  id: string;
  number: string;
  name: string;
  description: string;
  status: 'draft' | 'tender_created' | 'linked_to_tender';
  materials: Material[];
  labor: Labor[];
  totalMaterialsCost: number;
  totalLaborCost: number;
  totalCost: number;
}

export interface SOQCategory {
  id: string;
  name: string;
  jobs: SOQJob[];
}

