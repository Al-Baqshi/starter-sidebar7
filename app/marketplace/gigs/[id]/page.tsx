"use client"

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, MessageSquare, Calendar, Clock, ChevronLeft, MapPin, Briefcase } from 'lucide-react'
import Link from 'next/link'

// Simulated data for gigs (this would typically come from an API or database)
const gigs = [
  { id: 1, title: "Experienced Carpenter for Custom Cabinetry", provider: { id: "P1", name: "John Doe", rating: 4.8 }, price: 45, image: "/placeholder.svg?height=400&width=600", description: "Specializing in high-quality custom cabinetry for kitchens and bathrooms. With over 15 years of experience, I can bring your vision to life with precision and craftsmanship. From design to installation, I ensure every detail is perfect.", quantity: 5, availability: "Mon-Fri, 8AM-6PM", location: "New York, NY", experience: 15, completedProjects: 120, specialties: ["Custom Cabinetry", "Kitchen Remodeling", "Furniture Making"], languages: ["English", "Spanish"] },
  { id: 2, title: "Certified Electrician for Residential Wiring", provider: { id: "P2", name: "Jane Smith", rating: 4.9 }, price: 55, image: "/placeholder.svg?height=400&width=600", description: "Expert in residential electrical systems, including new installations and repairs. Licensed and insured with a focus on safety and quality. Specializing in smart home integrations and energy-efficient solutions.", quantity: 3, availability: "Mon-Sat, 7AM-8PM", location: "Los Angeles, CA", experience: 10, completedProjects: 85, specialties: ["Residential Wiring", "Smart Home Integration", "Electrical Repairs"], languages: ["English", "Mandarin"] },
  { id: 3, title: "Skilled Plumber for Bathroom Renovation", provider: { id: "P3", name: "Mike Johnson", rating: 4.7 }, price: 50, image: "/placeholder.svg?height=400&width=600", description: "Experienced in complete bathroom renovations, including fixture installation and plumbing. From small repairs to full remodels, I provide reliable and efficient service. Expertise in water-saving fixtures and modern plumbing solutions.", quantity: 4, availability: "Tue-Sun, 8AM-7PM", location: "Chicago, IL", experience: 8, completedProjects: 60, specialties: ["Bathroom Renovation", "Fixture Installation", "Pipe Repair"], languages: ["English"] },
]

export default function GigPage() {
  const router = useRouter()
  const params = useParams()
  const gigId = parseInt(params.id as string)
  const gig = gigs.find(g => g.id === gigId)

  const [hours, setHours] = useState(1)

  if (!gig) {
    return <div>Gig not found</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Button>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{gig.title}</h1>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=50&width=50`} alt={gig.provider.name} />
              <AvatarFallback>{gig.provider.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{gig.provider.name}</p>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1">{gig.provider.rating}</span>
              </div>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="text-lg">
          ${gig.price}/hour
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={gig.image} alt={gig.title} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Gig</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{gig.description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Provider Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Location: {gig.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                <span>Experience: {gig.experience} years</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Availability: {gig.availability}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Completed Projects: {gig.completedProjects}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                <span>Languages: {gig.languages.join(", ")}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Specialties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {gig.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">{specialty}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Book This Gig</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Hours
              </label>
              <Input
                id="hours"
                type="number"
                min="1"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Total: ${(gig.price * hours).toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Contact Provider</Button>
          <Button>Book Now</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

