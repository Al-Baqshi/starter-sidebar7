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

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  category?: string;
  entity: string;
  kycStatus: 'Verified' | 'Pending' | 'Rejected';
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    entity: "Company A",
    kycStatus: "Verified"
  },
  // Add more mock users as needed
];

export const mockEntities = [
  "Company A",
  "Company B",
  "Company C"
];

export const initialRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    permissions: {
      projectManagement: true,
      userManagement: true,
      rfpManagement: true,
      financialManagement: true,
      communicationManagement: true,
      systemConfiguration: true,
      dataReporting: true
    }
  },
  // Add more roles as needed
];

export const initialCategories = [
  "Vendors",
  "Clients",
  "Partners"
]; 