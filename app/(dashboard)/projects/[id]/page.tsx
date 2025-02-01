"use client";

import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import {
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  FileText,
  Users,
  Building,
  CheckCircle,
  Upload,
  Download,
  Image,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Mock data for a comprehensive project view
const projectData = {
  "city-center-high-rise": {
    id: "city-center-high-rise",
    name: "City Center High-Rise",
    status: "In Progress",
    location: "Auckland, New Zealand",
    completion: 65,
    budget: 15000000,
    endDate: "2024-12-31",
    description:
      "A 40-story mixed-use development in Auckland CBD featuring residential apartments, office spaces, and retail areas.",
    projectManager: "Sarah Johnson",
    contractor: "BuildMaster Construction Co.",
    startDate: "2023-01-15",
    totalArea: "45,000 sqm",
    tenders: [
      {
        id: "T001",
        name: "Foundation Work",
        status: "Completed",
        value: 2500000,
        contractor: "DeepDig Foundations",
        completionDate: "2023-05-20",
      },
      {
        id: "T002",
        name: "Structural Steel",
        status: "In Progress",
        value: 4500000,
        contractor: "SteelPro Industries",
        completionDate: "2024-03-15",
      },
      {
        id: "T003",
        name: "MEP Systems",
        status: "Pending",
        value: 3500000,
        contractor: "TBD",
        completionDate: "2024-08-30",
      },
    ],
    soq: {
      materials: [
        { category: "Concrete", estimated: 2500000, actual: 2650000 },
        { category: "Steel", estimated: 4000000, actual: 3900000 },
        { category: "Glass", estimated: 1500000, actual: 1600000 },
        { category: "MEP", estimated: 3000000, actual: 3200000 },
      ],
      labor: [
        {
          category: "Construction Workers",
          estimated: 1200000,
          actual: 1250000,
        },
        { category: "Specialists", estimated: 800000, actual: 850000 },
        { category: "Management", estimated: 500000, actual: 500000 },
      ],
    },
    timeline: [
      { month: "Jan 2023", planned: 1000000, actual: 950000 },
      { month: "Apr 2023", planned: 2500000, actual: 2600000 },
      { month: "Jul 2023", planned: 4000000, actual: 3800000 },
      { month: "Oct 2023", planned: 5500000, actual: 5700000 },
      { month: "Jan 2024", planned: 7000000, actual: 7200000 },
      { month: "Apr 2024", planned: 8500000, actual: 8400000 },
    ],
    risks: [
      {
        type: "Weather Delays",
        impact: "Medium",
        mitigation: "Additional resources on standby",
      },
      {
        type: "Supply Chain",
        impact: "High",
        mitigation: "Multiple supplier agreements",
      },
      {
        type: "Cost Overrun",
        impact: "Low",
        mitigation: "Contingency budget allocated",
      },
    ],
  },
};

// export function LineChartComponent({ data, categories, colors }:any) {
//   return (
//     <LineChart width={500} height={300} data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="month" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       {categories.map((category:any, index:number) => (
//         <Line type="monotone" dataKey={category} stroke={colors[index]} key={category} />
//       ))}
//     </LineChart>
//   );
// }

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projectData[projectId as keyof typeof projectData];

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-4 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{project.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="h-4 w-4" />
            <span className="text-muted-foreground">{project.location}</span>
          </div>
        </div>
        <Badge
          variant={
            project.status === "In Progress"
              ? "default"
              : project.status === "Completed"
              ? "success"
              : "secondary"
          }
          className="text-sm md:text-base"
        >
          {project.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.completion}%</div>
            <Progress value={project.completion} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(project.budget / 1000000).toFixed(1)}M
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">End Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.endDate}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Area</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.totalArea}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex overflow-x-auto space-x-2 pb-2">
          <TabsTrigger value="overview" className="flex-shrink-0">
            Overview
          </TabsTrigger>
          <TabsTrigger value="tenders" className="flex-shrink-0">
            Tenders
          </TabsTrigger>
          <TabsTrigger value="soq" className="flex-shrink-0">
            SOQ Analysis
          </TabsTrigger>
          <TabsTrigger value="financials" className="flex-shrink-0">
            Financials
          </TabsTrigger>
          <TabsTrigger value="risks" className="flex-shrink-0">
            Risks
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex-shrink-0">
            Documents
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex-shrink-0">
            Gallery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Project Manager</p>
                    <p className="text-sm text-muted-foreground">
                      {project.projectManager}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Main Contractor</p>
                    <p className="text-sm text-muted-foreground">
                      {project.contractor}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">
                      {project.startDate}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">
                      {project.endDate}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Timeline</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] md:h-[400px]">
                {/* <ChartContainer>
                  <LineChartComponent
                    data={project.timeline.map(item => ({
                      name: item.month,
                      planned: item.planned,
                      actual: item.actual
                    }))}
                    categories={["planned", "actual"]}
                    colors={["#2563eb", "#16a34a"]}
                  />
                </ChartContainer> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tenders">
          <Card>
            <CardHeader>
              <CardTitle>Tender Status</CardTitle>
              <CardDescription>Overview of all project tenders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tender ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Contractor</TableHead>
                    <TableHead>Completion Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.tenders.map((tender) => (
                    <TableRow key={tender.id}>
                      <TableCell>{tender.id}</TableCell>
                      <TableCell>{tender.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tender.status === "Completed"
                              ? "success"
                              : tender.status === "In Progress"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {tender.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        ${(tender.value / 1000000).toFixed(2)}M
                      </TableCell>
                      <TableCell>{tender.contractor}</TableCell>
                      <TableCell>{tender.completionDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="soq">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Materials SOQ</CardTitle>
                <CardDescription>Estimated vs Actual Costs</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Estimated ($)</TableHead>
                      <TableHead>Actual ($)</TableHead>
                      <TableHead>Variance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {project.soq.materials.map((item) => (
                      <TableRow key={item.category}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          ${(item.estimated / 1000000).toFixed(2)}M
                        </TableCell>
                        <TableCell>
                          ${(item.actual / 1000000).toFixed(2)}M
                        </TableCell>
                        <TableCell
                          className={
                            item.actual > item.estimated
                              ? "text-red-500"
                              : item.actual < item.estimated
                              ? "text-green-500"
                              : ""
                          }
                        >
                          {(
                            ((item.actual - item.estimated) / item.estimated) *
                            100
                          ).toFixed(1)}
                          %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Labor SOQ</CardTitle>
                <CardDescription>Estimated vs Actual Costs</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Estimated ($)</TableHead>
                      <TableHead>Actual ($)</TableHead>
                      <TableHead>Variance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {project.soq.labor.map((item) => (
                      <TableRow key={item.category}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          ${(item.estimated / 1000000).toFixed(2)}M
                        </TableCell>
                        <TableCell>
                          ${(item.actual / 1000000).toFixed(2)}M
                        </TableCell>
                        <TableCell
                          className={
                            item.actual > item.estimated
                              ? "text-red-500"
                              : item.actual < item.estimated
                              ? "text-green-500"
                              : ""
                          }
                        >
                          {(
                            ((item.actual - item.estimated) / item.estimated) *
                            100
                          ).toFixed(1)}
                          %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financials">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Budget vs Actual Spending</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] md:h-[400px]">
              {/* <ChartContainer>
                <LineChartComponent
                  data={project.timeline.map(item => ({
                    name: item.month,
                    planned: item.planned,
                    actual: item.actual
                  }))}
                  categories={["planned", "actual"]}
                  colors={["#2563eb", "#16a34a"]}
                />
              </ChartContainer> */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                Current project risks and mitigation strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Risk Type</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Mitigation Strategy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.risks.map((risk) => (
                    <TableRow key={risk.type}>
                      <TableCell>{risk.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            risk.impact === "High"
                              ? "destructive"
                              : risk.impact === "Medium"
                              ? "warning"
                              : "default"
                          }
                        >
                          {risk.impact}
                        </Badge>
                      </TableCell>
                      <TableCell>{risk.mitigation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Project Documents</CardTitle>
              <CardDescription>
                Upload and manage project-related documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Uploaded Documents</h3>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date Uploaded</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Project Blueprint</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell>2023-06-15</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Contract Draft</TableCell>
                      <TableCell>DOCX</TableCell>
                      <TableCell>2023-06-10</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Project Gallery</CardTitle>
              <CardDescription>View and manage project photos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Project Photos</h3>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Photo
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((photo) => (
                    <div key={photo} className="relative aspect-square">
                      <img
                        src={`/placeholder.svg?height=300&width=300&text=Photo ${photo}`}
                        alt={`Project photo ${photo}`}
                        className="object-cover rounded-md"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                      >
                        Update
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
