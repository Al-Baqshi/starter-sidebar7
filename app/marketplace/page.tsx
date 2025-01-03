"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, DollarSign, Package, PenToolIcon as Tool } from 'lucide-react'

// Simulated data for gigs
const gigs = [
  { id: 1, title: "Experienced Carpenter for Custom Cabinetry", provider: "John Doe", rating: 4.8, price: 45, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, title: "Certified Electrician for Residential Wiring", provider: "Jane Smith", rating: 4.9, price: 55, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, title: "Skilled Plumber for Bathroom Renovation", provider: "Mike Johnson", rating: 4.7, price: 50, image: "/placeholder.svg?height=100&width=100" },
]

// Simulated data for products
const products = [
  { id: 1, name: "Premium Hardwood Planks", supplier: "WoodCraft Co.", price: 25, unit: "per sq ft", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, title: "High-Grade Steel Beams", supplier: "SteelWorks Inc.", price: 500, unit: "per beam", image: "/placeholder.svg?height=100&width=100" },
  { id: 3, title: "Eco-Friendly Insulation Rolls", supplier: "GreenBuild Supplies", price: 35, unit: "per roll", image: "/placeholder.svg?height=100&width=100" },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Construction Marketplace</h1>
      
      <div className="flex space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search gigs or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="carpentry">Carpentry</SelectItem>
            <SelectItem value="electrical">Electrical</SelectItem>
            <SelectItem value="plumbing">Plumbing</SelectItem>
            <SelectItem value="materials">Materials</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="gigs">
        <TabsList>
          <TabsTrigger value="gigs">Gigs</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="gigs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <Card key={gig.id}>
                <CardHeader>
                  <CardTitle>{gig.title}</CardTitle>
                  <CardDescription>Provided by {gig.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={gig.image} alt={gig.provider} />
                      <AvatarFallback>{gig.provider[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{gig.provider}</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 stroke-yellow-400" />
                        {gig.rating}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="secondary">
                    <Tool className="mr-1 h-4 w-4" />
                    Gig
                  </Badge>
                  <p className="font-bold">${gig.price}/hr</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>Supplied by {product.supplier}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover rounded-md"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="secondary">
                    <Package className="mr-1 h-4 w-4" />
                    Product
                  </Badge>
                  <p className="font-bold">${product.price} {product.unit}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

