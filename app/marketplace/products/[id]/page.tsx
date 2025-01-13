"use client"

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, Truck, Package, ShieldCheck, ChevronLeft, Building, BarChart } from 'lucide-react'
import Link from 'next/link'

// Simulated data for products (this would typically come from an API or database)
const products = [
  { id: 1, name: "Premium Hardwood Planks", supplier: { id: "S1", name: "WoodCraft Co.", rating: 4.6 }, price: 25, unit: "per sq ft", image: "/placeholder.svg?height=400&width=600", description: "High-quality hardwood planks perfect for flooring or custom furniture projects. Our premium planks are sourced from sustainable forests and treated to ensure long-lasting beauty and durability. Ideal for both residential and commercial applications.", quantity: 1000, inStock: true, minOrder: 50, deliveryTime: "3-5 business days", warranty: "10 years limited", category: "Wood", origin: "North America", certification: "FSC Certified", dimensions: "6\" x 48\" x 3/4\"", finishOptions: ["Natural", "Oak", "Walnut", "Cherry"] },
  { id: 2, name: "High-Grade Steel Beams", supplier: { id: "S2", name: "SteelWorks Inc.", rating: 4.8 }, price: 500, unit: "per beam", image: "/placeholder.svg?height=400&width=600", description: "Durable steel beams for structural support in commercial and residential construction. Engineered for maximum strength and reliability, our steel beams meet or exceed all industry standards. Available in various sizes to suit your project needs.", quantity: 50, inStock: true, minOrder: 1, deliveryTime: "7-10 business days", warranty: "25 years structural", category: "Steel", origin: "USA", certification: "ASTM A992 Compliant", dimensions: "W8x31", finishOptions: ["Raw", "Primed", "Powder Coated"] },
  { id: 3, name: "Eco-Friendly Insulation Rolls", supplier: { id: "S3", name: "GreenBuild Supplies", rating: 4.7 }, price: 35, unit: "per roll", image: "/placeholder.svg?height=400&width=600", description: "Environmentally friendly insulation material for improved energy efficiency. Made from recycled materials, our insulation provides excellent thermal and acoustic properties while reducing your carbon footprint. Easy to install and suitable for walls, attics, and crawl spaces.", quantity: 200, inStock: false, minOrder: 10, deliveryTime: "5-7 business days", warranty: "Lifetime performance", category: "Insulation", origin: "USA", certification: "ENERGY STAR Certified", dimensions: "16\" x 48\" x 3.5\"", rValue: "R-13" },
]

export default function ProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = parseInt(params.id as string)
  const product = products.find(p => p.id === productId)

  const [quantity, setQuantity] = useState(product?.minOrder || 1)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Button>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <p className="font-semibold">Supplied by {product.supplier.name}</p>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1">{product.supplier.rating}</span>
            </div>
          </div>
        </div>
        <Badge variant={product.inStock ? "success" : "destructive"} className="text-lg">
          {product.inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                <span>Minimum Order: {product.minOrder} {product.unit}</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                <span>Delivery Time: {product.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2" />
                <span>Warranty: {product.warranty}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                <span>Origin: {product.origin}</span>
              </div>
              <div className="flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                <span>Dimensions: {product.dimensions}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Certification:</strong> {product.certification}</p>
              {product.rValue && <p><strong>R-Value:</strong> {product.rValue}</p>}
              {product.finishOptions && (
                <div>
                  <strong>Finish Options:</strong>
                  <ul className="list-disc list-inside">
                    {product.finishOptions.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order This Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity ({product.unit})
              </label>
              <Input
                id="quantity"
                type="number"
                min={product.minOrder}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value)))}
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Total: ${(product.price * quantity).toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Contact Supplier</Button>
          <Button disabled={!product.inStock}>
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

