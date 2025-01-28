import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Clock, DollarSign, Users } from 'lucide-react'
import { OverviewCard } from "@/components/dashboard/OverviewCard"
import { RecentActivityList } from "@/components/dashboard/RecentActivityList"

// TODO: Implement API integration
// - Fetch dashboard data from the backend
// - Update state with fetched data
// - Handle loading and error states

export default function DashboardPage() {
// Mock data - replace with actual API call
const overviewData = [
  { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, change: "+20.1% from last month" },
  { title: "Active Projects", value: "12", icon: BarChart, change: "+2 new this month" },
  { title: "Team Members", value: "24", icon: Users, change: "+4 new hires" },
  { title: "Avg. Project Duration", value: "3.2 months", icon: Clock, change: "-2 weeks from last quarter" },
]

  return (
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Generate Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewData.map((item, index) => (
          <OverviewCard key={index} {...item} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] bg-muted" />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivityList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

