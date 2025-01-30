"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import CreatableSelect from "react-select/creatable";
import { useCreateUserProfileMutation } from "@/services/users";
import { useUploadFile } from "@/hooks/use-upload-file";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  type: z
    .string()
    .min(2, { message: "Business type must be at least 2 characters." }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  foundedYear: z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid year (YYYY).",
  }),
  employeeCount: z.string().min(1, {
    message: "Please enter the number of employees.",
  }),
  specialties: z
    .array(z.string())
    .min(1, { message: "Please enter at least one specialty." }),
  profilePicture: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .png, and .webp formats are supported."
    )
    .optional(),
  galleryImages: z
    .array(
      z.object({
        file: z
          .any()
          .refine(
            (file) => file?.size <= MAX_FILE_SIZE,
            `Max file size is 5MB.`
          )
          .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .png, and .webp formats are supported."
          ),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function CreateProfilePage() {
  const router = useRouter();
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);
  const [galleryPreviews, setGalleryPreviews] = useState<any>([]);

  const [createProfile] = useCreateUserProfileMutation();
  const { upload } = useUploadFile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      type: "",
      location: "",
      description: "",
      foundedYear: "",
      employeeCount: "",
      specialties: [],
      galleryImages: [],
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    const payload = {
      profile: profilePicturePreview,
      name: data?.name,
      email: data?.email,
      businessType: data?.type,
      location: data?.location,
      description: data?.description,
      year: parseInt(data?.foundedYear),
      employeeCount: parseInt(data?.employeeCount),
      specialities: data?.specialties?.join(", "),
      userGallery: galleryPreviews,
    };
    const response: any = await createProfile(payload);
    console.log(response, "response");
    if (response?.data) {
      toast({
        title: "Profile created successfully",
        description: "Your profile has been created and saved.",
      });
      router.push("/dashboard");
    } else {
      toast({
        title: "Profile creation failed",
        description: "Failed to create user profile",
      });
    }
    // Here you would typically send the data to your backend API
    // For now, we'll just redirect to the main profile page
  }

  const handleProfilePictureChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const s3Link = await upload(file);
      console.log(s3Link, "s3Link");
      if (s3Link) {
        form.setValue("profilePicture", file);
        setProfilePicturePreview(s3Link as string);
        toast({ title: "File Upload Successessfully" });
      } else {
        toast({ title: "Failed to upload file." });
      }
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setProfilePicturePreview(reader.result as string);
      // };
      // reader.readAsDataURL(file);
    }
  };

  const handleGalleryImagesChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({ file }));

      // Set the form values as they are
      form.setValue("galleryImages", [
        ...(form.getValues("galleryImages") || []),
        ...newImages,
      ]);

      // Create file previews immediately for UI feedback
      // const newPreviews = Array.from(files).map((file) =>
      //   URL.createObjectURL(file)
      // );
      // setGalleryPreviews([...galleryPreviews, ...newPreviews]);

      // Upload files and get S3 links
      const uploadPromises = Array.from(files).map(async (file) => {
        const link = await upload(file);
        return link;
      });

      try {
        const s3Links = await Promise.all(uploadPromises);
        console.log("S3 Links:", s3Links);

        // Append valid S3 links to gallery previews
        setGalleryPreviews(s3Links);
      } catch (error) {
        console.error("Error uploading one or more files:", error);
      }
    }
  };

  const removeGalleryImage = (index: number) => {
    const currentGalleryImages = form.getValues("galleryImages") || [];
    const updatedGalleryImages = [...currentGalleryImages];
    updatedGalleryImages.splice(index, 1);
    form.setValue("galleryImages", updatedGalleryImages);

    const updatedPreviews = [...galleryPreviews];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    setGalleryPreviews(updatedPreviews);
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>
            Fill out the form below to create your professional profile. This
            information will be visible to potential clients and partners.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-24 h-24">
                          <AvatarImage
                            src={profilePicturePreview || ""}
                            alt="Profile picture"
                          />
                          <AvatarFallback>Upload</AvatarFallback>
                        </Avatar>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureChange}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload a profile picture (max 5MB, .jpg, .png, or .webp)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name or company name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your contact email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Other") {
                          // Reset the field value to empty string when "Other" is selected
                          field.onChange("");
                        }
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Construction Company">
                          Construction Company
                        </SelectItem>
                        <SelectItem value="Plumber">Plumber</SelectItem>
                        <SelectItem value="Painter">Painter</SelectItem>
                        <SelectItem value="Kitchen Maker">
                          Kitchen Maker
                        </SelectItem>
                        <SelectItem value="Concrete Specialist">
                          Concrete Specialist
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {(field.value === "Other" ||
                      ![
                        "Construction Company",
                        "Plumber",
                        "Painter",
                        "Kitchen Maker",
                        "Concrete Specialist",
                      ].includes(field.value)) && (
                      <Input
                        placeholder="Enter your custom business type"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="mt-2"
                      />
                    )}
                    <FormDescription>
                      Select the category that best describes your business, or
                      enter your own if not listed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City, State/Province, Country"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your primary business location.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your business..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of your services and
                      expertise.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="foundedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Founded</FormLabel>
                    <FormControl>
                      <Input placeholder="YYYY" {...field} />
                    </FormControl>
                    <FormDescription>
                      The year your business was established.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Employees</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      The current number of employees in your company.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialties</FormLabel>
                    <FormControl>
                      <CreatableSelect
                        isMulti
                        options={field.value.map((specialty: string) => ({
                          label: specialty,
                          value: specialty,
                        }))}
                        value={field.value.map((specialty: string) => ({
                          label: specialty,
                          value: specialty,
                        }))}
                        onChange={(newValue) => {
                          const specialties = newValue.map(
                            (item: any) => item.value
                          );
                          field.onChange(specialties);
                        }}
                        placeholder="e.g., Residential, Commercial, Renovation"
                      />
                    </FormControl>
                    <FormDescription>
                      Add your main areas of expertise. You can add multiple
                      specialties.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="galleryImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gallery Images</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryImagesChange}
                        />
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          {galleryPreviews.map((preview, index) => (
                            <div key={index} className="relative">
                              <img
                                src={preview}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md"
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1"
                                onClick={() => removeGalleryImage(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload images for your project gallery (max 5MB each,
                      .jpg, .png, or .webp)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Profile</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
