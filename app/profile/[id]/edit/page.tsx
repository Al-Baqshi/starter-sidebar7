"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Upload, Trash2, Plus } from "lucide-react";
import { profiles } from "@/data/profiles";
import Image from "next/image";

export default function EditProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [newProjectImages, setNewProjectImages] = useState<File[]>([]);

  useEffect(() => {
    // Fetch profile data, including gallery images
    const fetchedProfile:any = profiles[params.id as keyof typeof profiles];
    setProfile(fetchedProfile);
    setGalleryImages(fetchedProfile?.galleryImages || []);
  }, [params.id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Append other profile data to formData
    formData.append("name", profile.name);
    formData.append("type", profile.type);
    formData.append("description", profile.description);
    formData.append("location", profile.location);
    formData.append("foundedYear", profile.foundedYear);
    formData.append("employeeCount", profile.employeeCount);

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    // Append gallery images to formData
    galleryImages.forEach((image, index) => {
      formData.append("galleryImages", image.file);
    });

    // Send formData to backend
    // ...

    router.push(`/profile/${params.id}`);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleGalleryImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setGalleryImages([...galleryImages, ...newImages]);
    }
  };

  const removeGalleryImage = (index: number) => {
    const updatedGalleryImages = [...galleryImages];
    updatedGalleryImages.splice(index, 1);
    setGalleryImages(updatedGalleryImages);
  };

  const handleProjectImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setNewProjectImages(Array.from(e.target.files));
    }
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" asChild>
          <Link href={`/profile/${params.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="avatar">Profile Picture</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={
                      avatarFile
                        ? URL.createObjectURL(avatarFile)
                        : profile.avatar
                    }
                    alt={profile.name}
                  />
                  <AvatarFallback>{profile.name[0]}</AvatarFallback>
                </Avatar>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Business Type</Label>
              <Input
                id="type"
                value={profile.type}
                onChange={(e) =>
                  setProfile({ ...profile, type: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={profile.description}
                onChange={(e) =>
                  setProfile({ ...profile, description: e.target.value })
                }
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input
                id="foundedYear"
                type="number"
                value={profile.foundedYear}
                onChange={(e) =>
                  setProfile({ ...profile, foundedYear: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeCount">Employee Count</Label>
              <Input
                id="employeeCount"
                value={profile.employeeCount}
                onChange={(e) =>
                  setProfile({ ...profile, employeeCount: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="galleryImages">Gallery Images</Label>
              <div>
                <label className="flex items-center px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300">
                  <Upload className="mr-2 h-4 w-4" />
                  <span>Upload Images</span>
                  <Input
                    id="galleryImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImageChange}
                    className="hidden"
                  />
                </label>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {galleryImages.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image.preview || image.file}
                        alt={`Gallery image ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1"
                        onClick={() => removeGalleryImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
