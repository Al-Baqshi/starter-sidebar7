/* eslint-disable react/jsx-no-undef */
"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Download, BarChart, TrendingUp, Zap, FileText, Calendar, DollarSign, AlertTriangle, Filter, Plus, Users } from 'lucide-react'
import { ChartContainer } from "@/components/ui/chart"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { BarChartComponent, LineChartComponent, PieChartComponent } from '@/components/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function ReportsAndAnalytics() {
  const [activeTab, setActiveTab] = useState('project-insights')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState(['All', 'Construction', 'Design', 'Planning'])
  const [newCategory, setNewCategory] = useState('')

  const projectInsightsData = [
    { name: 'Jan', Budget: 4000, Actual: 2400 },
    { name: 'Feb', Budget: 3000, Actual: 1398 },
    { name: 'Mar', Budget: 2000, Actual: 9800 },
    { name: 'Apr', Budget: 2780, Actual: 3908 },
    { name: 'May', Budget: 1890, Actual: 4800 },
    { name: 'Jun', Budget: 2390, Actual: 3800 },
  ]

  const taskCompletionData = [
    { name: 'Completed', value: 65, color: "#0088FE" },
    { name: 'In Progress', value: 25, color: "#00C49F" },
    { name: 'Not Started', value: 10, color: "#FFBB28" },
  ]

  const financialMetricsData = [
    { name: 'Revenue', value: 150000 },
    { name: 'Expenses', value: 100000 },
    { name: 'Profit', value: 50000 },
    { name: 'ROI', value: 33 },
  ]

  const aiRecommendations = [
    { id: 1, title: 'Optimize Resource Allocation', description: 'Based on current project progress, consider reallocating resources from Task A to Task B to improve overall efficiency.', impact: 'High', category: 'Resource Management' },
    { id: 2, title: 'Risk Mitigation', description: 'Our AI has detected a potential delay in the supply chain. Consider sourcing alternative suppliers for critical materials.', impact: 'Medium', category: 'Risk Management' },
    { id: 3, title: 'Cost Saving Opportunity', description: 'Historical data suggests bulk ordering of Material X could lead to a 15% cost reduction in the next quarter.', impact: 'High', category: 'Financial Optimization' },
    { id: 4, title: 'Schedule Optimization', description: 'Adjusting the sequence of tasks in Project Y could potentially reduce the overall timeline by 10%.', impact: 'Medium', category: 'Project Management' },
  ]

  const downloadableReports = [
    { id: 1, name: 'Monthly Project Summary', type: 'PDF', size: '2.5 MB', icon: FileText },
    { id: 2, name: 'Financial Overview Q2', type: 'XLSX', size: '1.8 MB', icon: DollarSign },
    { id: 3, name: 'Team Performance Report', type: 'PDF', size: '3.2 MB', icon: Users },
    { id: 4, name: 'Risk Assessment', type: 'PDF', size: '1.5 MB', icon: AlertTriangle },
    { id: 5, name: 'Project Timeline', type: 'PDF', size: '2.1 MB', icon: Calendar },
  ]

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      setNewCategory('')
    }
  }

  const filteredRecommendations = aiRecommendations.filter(rec => 
    (selectedCategory === 'All' || rec.category === selectedCategory) &&
    (selectedStatus === 'All' || rec.impact === selectedStatus) &&
    (rec.title.toLowerCase().includes(searchTerm.toLowerCase()) || rec.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="container space-y-8 p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="project-insights">Project Insights</TabsTrigger>
          <TabsTrigger value="financial-metrics">Financial Metrics</TabsTrigger>
          <TabsTrigger value="ai-recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="downloadable-reports">Downloadable Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="project-insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$120,000</div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <Progress value={68} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45/76</div>
                <p className="text-xs text-muted-foreground">14 tasks overdue</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+5% from last week</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Budget vs. Actual Spending</CardTitle>
              <CardDescription>Monthly comparison of budgeted vs. actual project expenses</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer>
                <LineChart width={800} height={300} data={projectInsightsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Budget" stroke="#2563eb" />
                  <Line type="monotone" dataKey="Actual" stroke="#16a34a" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task Completion Status</CardTitle>
              <CardDescription>Overview of task completion across the project</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer>
                <PieChartComponent data={taskCompletionData} />
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial-metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Key financial metrics for the current project</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer>
                <BarChartComponent data={financialMetricsData} />
              </ChartContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {financialMetricsData.map((metric) => (
              <Card key={metric.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metric.name === 'ROI' ? `${metric.value}%` : `$${metric.value.toLocaleString()}`}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Recommendations</CardTitle>
              <CardDescription>Insights and suggestions to optimize your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Select impact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex-grow relative">
                    <Input
                      placeholder="Search recommendations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                    <Filter className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>
                          Create a new category for AI recommendations.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleAddCategory}>Add Category</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                {filteredRecommendations.map((recommendation) => (
                  <div key={recommendation.id} className="bg-secondary p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{recommendation.title}</h3>
                      <Badge variant={recommendation.impact === 'High' ? 'destructive' : 'default'}>
                        {recommendation.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{recommendation.description}</p>
                    <p className="text-xs text-muted-foreground">Category: {recommendation.category}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloadable-reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Downloadable Reports</CardTitle>
              <CardDescription>Access and download detailed project reports</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border">
                <div className="space-y-4 p-4">
                  {downloadableReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary rounded-full p-2">
                          <report.icon className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{report.name}</h3>
                          <p className="text-sm text-muted-foreground">{report.type} • {report.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

