"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Star, DollarSign, Package, PenToolIcon as Tool, Heart, ShoppingCart, MessageSquare, MapPin } from 'lucide-react'
import Link from 'next/link'

// Simulated data for gigs
const gigs = [
  { id: 1, title: "Experienced Carpenter for Custom Cabinetry", provider: { id: "P1", name: "John Doe", rating: 4.8 }, price: 45, image: "/placeholder.svg?height=200&width=200", description: "Specializing in high-quality custom cabinetry for kitchens and bathrooms.", quantity: 5, location: "New York, NY", experience: 10 },
  { id: 2, title: "Certified Electrician for Residential Wiring", provider: { id: "P2", name: "Jane Smith", rating: 4.9 }, price: 55, image: "/placeholder.svg?height=200&width=200", description: "Expert in residential electrical systems, including new installations and repairs.", quantity: 3, location: "Los Angeles, CA", experience: 15 },
  { id: 3, title: "Skilled Plumber for Bathroom Renovation", provider: { id: "P3", name: "Mike Johnson", rating: 4.7 }, price: 50, image: "/placeholder.svg?height=200&width=200", description: "Experienced in complete bathroom renovations, including fixture installation and plumbing.", quantity: 4, location: "Chicago, IL", experience: 8 },
  { id: 4, title: "Professional Painter for Interior and Exterior", provider: { id: "P4", name: "Sarah Brown", rating: 4.6 }, price: 40, image: "/placeholder.svg?height=200&width=200", description: "Skilled painter offering both interior and exterior painting services for residential and commercial properties.", quantity: 6, location: "Houston, TX", experience: 12 },
  { id: 5, "title": "HVAC Technician for Installation and Repair", provider: { id: "P5", name: "David Lee", rating: 4.8 }, price: 60, image: "/placeholder.svg?height=200&width=200", description: "Certified HVAC technician specializing in installation, maintenance, and repair of heating and cooling systems.", quantity: 2, location: "Phoenix, AZ", experience: 7 }
]

// Simulated data for products
const products = [
  { id: 1, name: "Premium Hardwood Planks", supplier: { id: "S1", name: "WoodCraft Co.", rating: 4.6 }, price: 25, unit: "per sq ft", image: "/placeholder.svg?height=200&width=200", description: "High-quality hardwood planks perfect for flooring or custom furniture projects.", quantity: 1000, inStock: true, category: "Wood" },
  { id: 2, name: "High-Grade Steel Beams", supplier: { id: "S2", name: "SteelWorks Inc.", rating: 4.8 }, price: 500, unit: "per beam", image: "/placeholder.svg?height=200&width=200", description: "Durable steel beams for structural support in commercial and residential construction.", quantity: 50, inStock: true, category: "Steel" },
  { id: 3, name: "Eco-Friendly Insulation Rolls", supplier: { id: "S3", name: "GreenBuild Supplies", rating: 4.7 }, price: 35, unit: "per roll", image: "/placeholder.svg?height=200&width=200", description: "Environmentally friendly insulation material for improved energy efficiency.", quantity: 200, inStock: false, category: "Insulation" },
  { id: 4, name: "Reinforced Concrete Mix", supplier: { id: "S4", name: "ConcreteKing", rating: 4.5 }, price: 15, unit: "per bag", image: "/placeholder.svg?height=200&width=200", description: "High-strength concrete mix suitable for foundations and structural elements.", quantity: 500, inStock: true, category: "Concrete" },
  { id: 5, name: "Solar Panel Kit", supplier: { id: "S5", name: "EcoEnergy Solutions", rating: 4.9 }, price: 750, unit: "per kit", image: "/placeholder.svg?height=200&width=200", description: "Complete solar panel kit for residential installation, includes panels and inverter.", quantity: 20, inStock: true, category: "Electrical" }
]

const categories = [
  { id: "all", name: "All Categories" },
  {
    id: "gigs",
    name: "Construction Services",
    subcategories: ["Carpentry", "Electrical", "Plumbing", "Painting", "HVAC", "Landscaping", "Demolition", "Welding", "Masonry", "Roofing", "Flooring", "Insulation", "Drywall", "Concrete", "Other"]
  },
  {
    id: "products",
    name: "Construction Materials",
    subcategories: ["Wood", "Steel", "Concrete", "Insulation", "Electrical", "Plumbing", "HVAC", "Tools & Equipment", "Safety Gear", "Other"]
  },
]

const locations = ["All Locations", "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ"]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const toggleFavorite = (id: number, type: 'gig' | 'product') => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const filteredGigs = gigs.filter(gig => 
    (searchTerm === '' || gig.title.toLowerCase().includes(searchTerm.toLowerCase()) || gig.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedLocation === 'All Locations' || gig.location === selectedLocation) &&
    gig.price >= priceRange[0] && gig.price <= priceRange[1]
  )

  const filteredProducts = products.filter(product => 
    (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  )

  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-1 p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Construction Marketplace</h1>
        </div>

        <div className="flex flex-col space-y-4">
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
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Price Range:</span>
            <Slider
              min={0}
              max={1000000}
              step={1000}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-[200px]"
            />
            <span className="text-sm">${priceRange[0]} - ${priceRange[1]}</span>
          </div>
          <div className="flex space-x-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Featured Gigs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.map((gig) => (
              <Card key={gig.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{gig.title}</CardTitle>
                  <CardDescription>Provided by {gig.provider.name}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="aspect-square relative mb-4">
                    <img
                      src={gig.image}
                      alt={gig.title}
                      className="object-cover rounded-md"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={gig.provider.name} />
                      <AvatarFallback>{gig.provider.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{gig.provider.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 stroke-yellow-400" />
                        {gig.provider.rating}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm mb-4">{gig.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">${gig.price}/hour</p>
                    <Badge variant="secondary">
                      <MapPin className="h-4 w-4 mr-1" />
                      {gig.location}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => toggleFavorite(gig.id, 'gig')}>
                    <Heart className={`mr-2 h-4 w-4 ${favorites.has(gig.id) ? 'fill-red-500' : ''}`} />
                    {favorites.has(gig.id) ? 'Favorited' : 'Favorite'}
                  </Button>
                  <Button asChild>
                    <Link href={`/marketplace/gigs/${gig.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>Supplied by {product.supplier.name}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="aspect-square relative mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover rounded-md"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <p className="text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">${product.price} {product.unit}</p>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <Badge variant={product.inStock ? "success" : "destructive"} className="mt-2">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => toggleFavorite(product.id, 'product')}>
                    <Heart className={`mr-2 h-4 w-4 ${favorites.has(product.id) ? 'fill-red-500' : ''}`} />
                    {favorites.has(product.id) ? 'Favorited' : 'Favorite'}
                  </Button>
                  <Button asChild>
                    <Link href={`/marketplace/products/${product.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

