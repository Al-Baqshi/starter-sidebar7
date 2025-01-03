"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Phone, Mail, Globe, Calendar, Users, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { profiles } from '@/data/profiles'

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    // In a real application, you would fetch the profile data from an API
    // For this example, we're using the mock data
    setProfile(profiles[params.id as keyof typeof profiles])
  }, [params.id])

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex justify-between mb-4">
        <Button variant="outline" asChild>
          <Link href="/profiles">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Profiles
          </Link>
        </Button>
        <div>
          {parseInt(params.id) > 1 && (
            <Button variant="outline" asChild className="mr-2">
              <Link href={`/profile/${parseInt(params.id) - 1}`}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Link>
            </Button>
          )}
          {parseInt(params.id) < Object.keys(profiles).length && (
            <Button variant="outline" asChild>
              <Link href={`/profile/${parseInt(params.id) + 1}`}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-xl text-muted-foreground">{profile.type}</p>
          </div>
        </div>
        <Button>Contact</Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          <span className="ml-1 font-semibold">{profile.rating}</span>
          <span className="ml-1 text-muted-foreground">({profile.reviewCount} reviews)</span>
        </div>
        <Badge variant="secondary" className="text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {profile.location}
        </Badge>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>About {profile.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{profile.description}</p>
            <div className="mt-4 space-y-2">
              <p className="font-semibold">Specialties:</p>
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((specialty: string, index: number) => (
                  <Badge key={index} variant="outline">{specialty}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Founded in {profile.foundedYear}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>{profile.employeeCount} employees</span>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Certifications:</p>
              {profile.certifications.map((cert: string, index: number) => (
                <div key={index} className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.projects.map((project: any) => (
              <Card key={project.id}>
                <Image src={project.image} alt={project.name} width={300} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <p>Reviews will be displayed here.</p>
        </TabsContent>
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>{profile.contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>{profile.contact.email}</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                <span>{profile.contact.website}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

