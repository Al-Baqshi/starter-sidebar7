import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, MoreHorizontal, Search, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const leads = [
  {
    stage: "New",
    ref: "L1337",
    age: "1 day old",
    client: "Jack And Jill",
    budget: "$35,000.00",
    projectType: "Renovation",
    expectedStart: "February 2023",
  },
  {
    stage: "Quoting",
    ref: "L1000",
    age: "75 days old",
    client: "Evie Nixon",
    budget: "$200,000.00",
    projectType: "New build",
    expectedStart: "June 2020",
  },
  {
    stage: "Won",
    ref: "L1026",
    age: "99 days old",
    client: "Hunter Austin",
    budget: "$50,000.00",
    projectType: "Renovation",
    expectedStart: "September 2020",
  },
  {
    stage: "Won",
    ref: "L1282",
    age: "91 days old",
    client: "Hazel Anne",
    budget: "$785,000.00",
    projectType: "New build",
    expectedStart: "May 2022",
  },
]

export default function LeadsPage() {
  return (
    <div className="container space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">LEADS (4)</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            Capture Lead
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                More actions
                <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export to CSV</DropdownMenuItem>
              <DropdownMenuItem>Print List</DropdownMenuItem>
              <DropdownMenuItem>Bulk Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>
        <Button variant="outline">
          Settings
          <MoreHorizontal className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stage</TableHead>
            <TableHead>Ref#</TableHead>
            <TableHead>Lead age</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Expected budget</TableHead>
            <TableHead>Project type</TableHead>
            <TableHead>Expected start</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.ref}>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    lead.stage === "New"
                      ? "bg-gray-100"
                      : lead.stage === "Quoting"
                      ? "bg-blue-100"
                      : "bg-emerald-100"
                  }
                >
                  {lead.stage}
                </Badge>
              </TableCell>
              <TableCell>{lead.ref}</TableCell>
              <TableCell>{lead.age}</TableCell>
              <TableCell>{lead.client}</TableCell>
              <TableCell>{lead.budget}</TableCell>
              <TableCell>{lead.projectType}</TableCell>
              <TableCell>{lead.expectedStart}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Card className="bg-blue-50">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <InfoIcon className="h-4 w-4 text-blue-500" />
          <CardTitle className="text-base">Capture and Manage your Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-blue-700">
            Leads enables you to manage your Pre-sales process: create a lead and nurture a new lead through the lead stages from qualifying to estimating, through to winning the work.
          </CardDescription>
          <div className="mt-4 flex gap-4 text-sm text-blue-600">
            <Button variant="link" className="h-auto p-0">
              Read more in our FAQ's
            </Button>
            <Button variant="link" className="h-auto p-0">
              Watch Video
            </Button>
            <Button variant="link" className="h-auto p-0">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

