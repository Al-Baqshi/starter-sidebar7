"use client";

import {
  initialCategories,
  initialRoles,
  mockEntities,
  Role,
} from "@/app/(dashboard)/users/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filters } from "@/components/users/Filters";
import { UserDetails } from "@/components/users/UserDetails";
import {
  useCreateUserCategoryMutation,
  useGetUserCategoriesQuery,
  useGetUserQuery,
  useMoveSelectedUsersMutation,
} from "@/services/users";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";

export function UserList({ userCategories }:any) {
  // State management
  const [users, setUsers] = useState([]);
  const [entities] = useState(mockEntities);
  const [roles, setRoles] = useState(initialRoles);
  const [categories, setCategories] = useState(initialCategories);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUserForDetails, setSelectedUserForDetails] =
    useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<any>(null);
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);

  const { data: userData, isLoading }:any = useGetUserQuery();
  // const { data: userCategories, isLoading: isLoadingCategories } =
  //   useGetUserCategoriesQuery();
  const [createCategory] = useCreateUserCategoryMutation();
  const [moveSelectedUser] = useMoveSelectedUsersMutation();

  // Function to toggle selection of all users
  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user:any) => user?.id));
    }
  };

  // Function to toggle selection of a single user
  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Function to handle moving users between categories
  const handleMoveUsers = async (targetCategory: string, userIds: string[]) => {
    const payload = {
      selectedUsers: userIds,
      category: String(targetCategory),
    };

    try {
      const response = await moveSelectedUser(payload);
      console.log(response, "response");
      toast({
        title: "Users moved successfully",
        // description: "Your profile has been created and saved.",
      });
    } catch (error) {
      toast({
        title: "Failed to move selected users",
        // description: "Your profile has been created and saved.",
      });
      console.log(error, "error");
    }
    // const updatedUsers = users.map((user) =>
    //   userIds.includes(user.id) ? { ...user, category: targetCategory } : user
    // );
    // setUsers(updatedUsers);
    // setFilteredUsers(updatedUsers);
    setSelectedUsers([]);
  };

  // Edit User Dialog component
  const EditUserDialog = ({ user, isOpen, onClose }:any) => {
    const [editedUser, setEditedUser] = useState(user);
    const [selectedRole, setSelectedRole] = useState(user.role || "");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (value: string) => {
      setSelectedRole(value);
      setEditedUser({ ...editedUser, role: value });
    };

    const handlePermissionChange = (permission: string, checked: boolean) => {
      const updatedRoles = roles.map((role) => {
        if (role.name === selectedRole) {
          return {
            ...role,
            permissions: {
              ...role.permissions,
              [permission]: checked,
            },
          };
        }
        return role;
      });
      setRoles(updatedRoles);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Update the user in the users array
      const updatedUsers:any = users.map((u:any) =>
        u.id === editedUser.id ? editedUser : u
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      onClose();
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit In-House User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select onValueChange={handleRoleChange} value={selectedRole}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedRole && (
                <div className="col-span-4">
                  <h4 className="mb-2 font-semibold">Permissions:</h4>
                  <div className="space-y-2">
                    {Object.entries(
                      roles.find((role) => role.name === selectedRole)
                        ?.permissions || {}
                    ).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <Checkbox
                          id={key}
                          checked={value}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(key, checked as boolean)
                          }
                        />
                        <label htmlFor={key} className="ml-2 text-sm">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  // Add Role Dialog component
  const AddRoleDialog = ({ isOpen, onClose }:any) => {
    const [newRole, setNewRole] = useState<Role>({
      id: (roles.length + 1).toString(),
      name: "",
      permissions: {
        projectManagement: false,
        userManagement: false,
        rfpManagement: false,
        financialManagement: false,
        communicationManagement: false,
        systemConfiguration: false,
        dataReporting: false,
      },
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setRoles([...roles, newRole]);
      onClose();
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roleName" className="text-right">
                  Role Name
                </Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="col-span-4">
                <h4 className="mb-2 font-semibold">Permissions:</h4>
                <div className="space-y-2">
                  {Object.entries(newRole.permissions).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) =>
                          setNewRole({
                            ...newRole,
                            permissions: {
                              ...newRole.permissions,
                              [key]: checked as boolean,
                            },
                          })
                        }
                      />
                      <label htmlFor={key} className="ml-2 text-sm">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Role</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  useEffect(() => {
    setUsers(userData?.data);
    setFilteredUsers(userData?.data);
  }, [userData?.data]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      <Filters
        users={users}
        setFilteredUsers={setFilteredUsers}
        categories={userCategories?.data}
        roles={roles.map((role) => role.name)}
        entities={entities}
        onMoveUsers={handleMoveUsers}
        selectedUsers={selectedUsers}
        onUpdateSelectedUsers={setSelectedUsers}
      />

      <Tabs
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="w-full"
      >
        <TabsList className="flex flex-wrap items-center">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="inhouse">In-House Users</TabsTrigger>
          {userCategories?.data?.map((category: any) => (
            <TabsTrigger key={category?.id} value={category?.id}>
              {category?.name}
            </TabsTrigger>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newCategory = formData.get("newCategory") as string;
                  if (newCategory) {
                    // setCategories([...categories, newCategory]);
                    await createCategory({ name: newCategory });
                  }
                  (e.target as HTMLFormElement).reset();
                }}
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newCategory" className="text-right">
                      Category Name
                    </Label>
                    <Input
                      id="newCategory"
                      name="newCategory"
                      placeholder="Enter new category"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Category</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          selectedUsers?.length === filteredUsers?.length
                        }
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>User Type</TableHead>
                    <TableHead>Role/Category</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>
                      KYC Status
                      <div className="flex space-x-2 mt-1">
                        <span
                          className="inline-block w-3 h-3 rounded-full bg-green-500"
                          title="Verified"
                        ></span>
                        <span
                          className="inline-block w-3 h-3 rounded-full bg-yellow-500"
                          title="Pending"
                        ></span>
                        <span
                          className="inline-block w-3 h-3 rounded-full bg-red-500"
                          title="Rejected"
                        ></span>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers?.map((user:any) => (
                    <TableRow key={user?.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers?.includes(user?.id)}
                          onCheckedChange={(checked) =>
                            toggleSelectUser(user?.id)
                          }
                        />
                      </TableCell>
                      <TableCell>{user?.name}</TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>
                        {user?.role ? "Registered" : "Guest"}
                      </TableCell>
                      <TableCell>{user?.role || user?.category}</TableCell>
                      <TableCell>{user?.entity}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user?.kycStatus === "Verified"
                              ? "bg-green-100 text-green-800"
                              : user?.kycStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user?.kycStatus}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUserForDetails(user)}
                          >
                            Action
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/profile/${user?.id}`}>
                              Visit Profile
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="inhouse">
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          selectedUsers?.length ===
                          filteredUsers?.filter((user:any) => user?.role)?.length
                        }
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers
                    ?.filter((user:any) => user?.role)
                    ?.map((user:any) => (
                      <TableRow key={user?.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(user?.id)}
                            onCheckedChange={(checked) =>
                              toggleSelectUser(user?.id)
                            }
                          />
                        </TableCell>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.role}</TableCell>
                        <TableCell>{user?.entity}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {roles.find((role) => role?.name === user?.role)
                              ?.permissions &&
                              Object.entries(
                                roles.find((role) => role?.name === user?.role)!
                                  .permissions
                              )
                                ?.filter(([_, value]) => value)
                                ?.map(([key, _]) => (
                                  <Badge
                                    key={key}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {key
                                      .replace(/([A-Z])/g, " $1")
                                      .replace(/^./, (str) =>
                                        str.toUpperCase()
                                      )}
                                  </Badge>
                                ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUserForDetails(user)}
                            >
                              Action
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/profile/${user?.id}`}>
                                Visit Profile
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        {userCategories?.data?.map((category:any) => (
          <TabsContent key={category.id} value={category?.id}>
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={
                            selectedUsers?.length ===
                            filteredUsers?.filter(
                              (user:any) => user?.category === category?.id
                            ).length
                          }
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead>
                        KYC Status
                        <div className="flex space-x-2 mt-1">
                          <span
                            className="inline-block w-3 h-3 rounded-full bg-green-500"
                            title="Verified"
                          ></span>
                          <span
                            className="inline-block w-3 h-3 rounded-full bg-yellow-500"
                            title="Pending"
                          ></span>
                          <span
                            className="inline-block w-3 h-3 rounded-full bg-red-500"
                            title="Rejected"
                          ></span>
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers
                      ?.filter((user:any) => user?.category === category?.id)
                      ?.map((user:any) => (
                        <TableRow key={user?.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers?.includes(user?.id)}
                              onCheckedChange={(checked) =>
                                toggleSelectUser(user?.id)
                              }
                            />
                          </TableCell>
                          <TableCell>{user?.name}</TableCell>
                          <TableCell>{user?.email}</TableCell>
                          <TableCell>{user?.entity}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                user?.kycStatus === "Verified"
                                  ? "bg-green-100 text-green-800"
                                  : user?.kycStatus === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user?.kycStatus}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedUserForDetails(user)}
                              >
                                Action
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/profile/${user?.id}`}>
                                  Visit Profile
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog
        open={!!selectedUserForDetails}
        onOpenChange={() => setSelectedUserForDetails(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUserForDetails && (
            <UserDetails user={selectedUserForDetails} />
          )}
        </DialogContent>
      </Dialog>
      {selectedUserForEdit && (
        <EditUserDialog
          user={selectedUserForEdit}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedUserForEdit(null);
          }}
        />
      )}
      <AddRoleDialog
        isOpen={isAddRoleDialogOpen}
        onClose={() => setIsAddRoleDialogOpen(false)}
      />
    </div>
  );
}
