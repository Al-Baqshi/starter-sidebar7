export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  entity: string;
  kycStatus: "Verified" | "Pending";
  industry: string;
  category: string;
  role?: string; // Added role property
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    city: "New York",
    entity: "TechCorp",
    kycStatus: "Verified",
    industry: "Technology",
    category: "Supplier",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+44 20 7123 4567",
    country: "United Kingdom",
    city: "London",
    entity: "BuildCo",
    kycStatus: "Pending",
    industry: "Construction",
    category: "Buyer",
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+971 50 123 4567",
    country: "United Arab Emirates",
    city: "Dubai",
    entity: "Desert Oasis",
    kycStatus: "Verified",
    industry: "Real Estate",
    category: "Investor",
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+34 91 123 45 67",
    country: "Spain",
    city: "Madrid",
    entity: "GreenEnergy",
    kycStatus: "Verified",
    industry: "Renewable Energy",
    category: "Supplier",
  },
  {
    id: "5",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@example.com",
    phone: "+81 3-1234-5678",
    country: "Japan",
    city: "Tokyo",
    entity: "NanoTech",
    kycStatus: "Pending",
    industry: "Nanotechnology",
    category: "Researcher",
  },
  {
    id: "6",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 987-6543",
    country: "United States",
    city: "San Francisco",
    entity: "TechCorp",
    kycStatus: "Verified",
    industry: "Technology",
    role: "Project Manager",
    category: "Researcher",
  },
];

export const mockEntities = [
  { id: 1, name: "TechCorp", industry: "Technology" },
  { id: 2, name: "BuildCo", industry: "Construction" },
  { id: 3, name: "Desert Oasis", industry: "Real Estate" },
  { id: 4, name: "GreenEnergy", industry: "Renewable Energy" },
  { id: 5, name: "NanoTech", industry: "Nanotechnology" },
];

export const mockRoles = [
  "Supplier",
  "Buyer",
  "Investor",
  "Researcher",
  "Admin",
];

export const initialCategories = [
  "Supplier",
  "Buyer",
  "Investor",
  "Researcher",
];

export const countries = [
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Spain",
  "Japan",
];

export const cities = [
  "New York",
  "London",
  "Dubai",
  "Madrid",
  "Tokyo",
  "San Francisco",
]; // Added San Francisco

export const industries = [
  "Technology",
  "Construction",
  "Real Estate",
  "Renewable Energy",
  "Nanotechnology",
];

export interface Role {
  id: string;
  name: string;
  permissions: {
    projectManagement: boolean;
    userManagement: boolean;
    rfpManagement: boolean;
    financialManagement: boolean;
    communicationManagement: boolean;
    systemConfiguration: boolean;
    dataReporting: boolean;
  };
}

export const initialRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    permissions: {
      projectManagement: true,
      userManagement: true,
      rfpManagement: true,
      financialManagement: true,
      communicationManagement: true,
      systemConfiguration: true,
      dataReporting: true,
    },
  },
  {
    id: "2",
    name: "Project Manager",
    permissions: {
      projectManagement: true,
      userManagement: false,
      rfpManagement: true,
      financialManagement: false,
      communicationManagement: true,
      systemConfiguration: false,
      dataReporting: true,
    },
  },
];
