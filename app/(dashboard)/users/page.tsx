"use client";

import { useState } from "react";
import { UserList } from "@/components/users/UserList";
import { mockUsers } from "./data/mockData";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building,
  UserPlus,
  FolderPlus,
  ArrowRightLeft,
  Send,
  Download,
  Upload,
} from "lucide-react";
import {
  useGetUserCategoriesQuery,
  useGetUserRolesQuery,
  useInviteSubUsersMutation,
} from "@/services/users";
import { Item } from "@radix-ui/react-dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const inviteUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  userType: z.string().optional().nullable(),
  // .string()
  // .refine((value) => value !== "", { message: "Please select a user type" }),
  role: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  invitationLink: z.string().optional().nullable(),
});

type InviteUserFormData = z.infer<typeof inviteUserSchema>;

export default function UsersPage() {
  const [users] = useState(mockUsers);
  const [isAddEntityOpen, setIsAddEntityOpen] = useState(false);
  const [isInviteUserOpen, setIsInviteUserOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [userType, setUserType] = useState<"inhouse" | "external">("external");
  const { data: userRoles } = useGetUserRolesQuery();
  const { data: userCategories, isLoading: isLoadingCategories } =
    useGetUserCategoriesQuery();
  const [inviteUser] = useInviteSubUsersMutation();

  const form = useForm({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      userType: "",
      role: "",
      category: "",
      invitationLink: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values, "values");
    // const payload = {
    //   email: values.email,
    //   role: values.role,
    //   category: values.category,
    //   project: 3,
    // };
    // try {
    //   const response = await inviteUser(payload);
    //   console.log(response, "response");
    // } catch (error) {
    //   console.log(error, "error");
    // }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-screen">
      <div className="flex flex-wrap gap-4 mb-6">
        <Button onClick={() => setIsInviteUserOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite User
        </Button>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Users
        </Button>

        <Button variant="outline" onClick={() => setIsImportOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Import Users
        </Button>
      </div>

      {/* Add Entity Dialog */}
      <Dialog open={isAddEntityOpen} onOpenChange={setIsAddEntityOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Entity</DialogTitle>
            <DialogDescription>
              Create a new entity in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="entityName" className="text-right">
                Name
              </Label>
              <Input id="entityName" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="entityType" className="text-right">
                Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Entity</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite User Dialog */}
      <Dialog open={isInviteUserOpen} onOpenChange={setIsInviteUserOpen}>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <DialogHeader>
                <DialogTitle>Invite User</DialogTitle>
                <DialogDescription>
                  Send an invitation to a new user.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          setUserType(value as "inhouse" | "external")
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inhouse">In-house</SelectItem>
                          <SelectItem value="external">External</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {userType === "inhouse" ? (
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {userRoles?.data?.map(
                              (item: any, index: number) => (
                                <SelectItem key={index} value={item?.id}>
                                  {item?.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {userCategories?.data?.map(
                              (item: any, index: number) => (
                                <SelectItem key={index} value={item?.id}>
                                  {item?.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="invitationLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invitation Link</FormLabel>
                      {/* <FormControl> */}
                      <div className="col-span-3 flex gap-2">
                        <Input
                          id="invitationLink"
                          type="text"
                          readOnly
                          {...field}
                          value="https://example.com/invite/abc123"
                        />
                        <Button variant="outline">Copy</Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Send Invitation</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      {/*Removed Redundant Dialog*/}

      {/* Import Users Dialog */}
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Users</DialogTitle>
            <DialogDescription>
              Upload a CSV file to import multiple users.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                File
              </Label>
              <Input
                id="file"
                type="file"
                accept=".csv"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Import Users</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UserList userCategories={userCategories} />
    </div>
  );
}
