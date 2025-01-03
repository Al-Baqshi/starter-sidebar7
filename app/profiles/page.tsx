"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star } from 'lucide-react'
import Link from 'next/link'

// Import the profiles data
import { profiles } from '@/data/profiles'

const categories = ["All", "Construction Company", "Plumber", "Painter", "Kitchen Maker", "Concrete Specialist"]
const areas = ["All", "New York, NY", "Los Angeles, CA", "Chicago, IL", "Boston, MA", "Denver, CO"]

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArea, setSelectedArea] = useState('All')

  const filteredProfiles = Object.values(profiles).filter(profile => 
    (profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     profile.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'All' || profile.type === selectedCategory) &&
    (selectedArea === 'All' || profile.location === selectedArea)
  )

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Construction Professionals</h1>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedArea} onValueChange={setSelectedArea}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Area" />
          </SelectTrigger>
          <SelectContent>
            {areas.map((area) => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <Link href={`/profile/${profile.id}`} key={profile.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>{profile.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{profile.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{profile.type}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{profile.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">({profile.reviewCount})</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    {profile.location}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

