"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  // KYC fields
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }).optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }).optional(),
  idType: z.enum(["passport", "drivers_license", "national_id"]).optional(),
  idNumber: z.string().min(1, { message: "ID number is required." }).optional(),
  idDocument: z.any().refine((file) => file instanceof File, {
    message: "Please upload a valid document.",
  }).optional(),

  // KYB fields
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }).optional(),
  nzbn: z.string().min(13, { message: "NZBN must be 13 digits." }).max(13).optional(),
  companyAddress: z.string().min(5, { message: "Company address must be at least 5 characters." }).optional(),
  directorName: z.string().min(2, { message: "Director's name must be at least 2 characters." }).optional(),
  businessType: z.enum(["sole_trader", "partnership", "limited_company", "trust"]).optional(),
})

export default function KYCApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationType, setApplicationType] = useState<"individual" | "business" | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      address: "",
      idType: "",
      idNumber: "",
      idDocument: null,
      companyName: "",
      nzbn: "",
      companyAddress: "",
      directorName: "",
      businessType: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // In a real application, you would send this data to your backend
    console.log(values)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Application Submitted",
        description: "Your KYC/KYB application has been submitted successfully.",
      })
    }, 2000)
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>KYC/KYB Application</CardTitle>
          <CardDescription>Please select your application type and fill out the form below.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup className="mb-6" onValueChange={(value) => setApplicationType(value as "individual" | "business")}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="individual" id="individual" />
              <Label htmlFor="individual">Individual (KYC)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="business" />
              <Label htmlFor="business">Business (KYB)</Label>
            </div>
          </RadioGroup>

          {applicationType === "individual" && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residential Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your full residential address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Type</FormLabel>
                      <Select onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("idDocument", null); // Reset file input when ID type changes
                      }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="drivers_license">Driver's License</SelectItem>
                          <SelectItem value="national_id">National ID</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idDocument"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{field.value ? `Upload ${form.getValues("idType")} Document` : "Upload ID Document"}</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept=".pdf,.jpg,.jpeg,.png" 
                          onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                          disabled={!form.getValues("idType")}
                        />
                      </FormControl>
                      <FormDescription>
                        Please upload a clear, legible copy of your selected ID document.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your ID number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit KYC Application</Button>
              </form>
            </Form>
          )}

          {applicationType === "business" && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nzbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Zealand Business Number (NZBN)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter NZBN" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registered Company Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter company address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="directorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Director's Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter director's full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sole_trader">Sole Trader</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="limited_company">Limited Company</SelectItem>
                          <SelectItem value="trust">Trust</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit KYB Application</Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

