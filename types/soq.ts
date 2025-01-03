export interface MaterialItem {
  id: string;
  itemDescription: string;
  unit: string;
  estimatedQuantity: number;
  bidderQuantity: number;
  unitRate: number;
  totalCost: number;
  attachments: number;
  productLink: string;
}

export interface LaborItem {
  id: string;
  laborDescription: string;
  estimatedStaff: number;
  bidderStaff: number;
  estimatedHours: number;
  bidderHours: number;
  hourlyRate: number;
  totalCost: number;
  notes: number;
}

export interface Job {
  id: string;
  jobId: string;
  name: string;
  description: string;
  materials: MaterialItem[];
  labor: LaborItem[];
  status: 'draft' | 'ready';
  includedInTender: boolean;
  totalCost: number;
}

export interface Tender {
  id: string;
  name: string;
  description: string;
  jobs: string[]; // Array of job IDs
  status: 'draft' | 'submitted' | 'awarded';
}

