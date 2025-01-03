"use client"

import { useState } from "react"
import { UserList } from '@/components/UserList'
import { mockUsers } from '@/app/users/data/mockData'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, UserPlus, FolderPlus, ArrowRightLeft, Send, Download, Upload } from 'lucide-react'

export default function UsersPage() {
  const [users] = useState(mockUsers)
  const [isAddEntityOpen, setIsAddEntityOpen] = useState(false)
  const [isInviteUserOpen, setIsInviteUserOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isImportOpen, setIsImportOpen] = useState(false)
  const [userType, setUserType] = useState<'inhouse' | 'external'>('external');

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
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>
              Send an invitation to a new user.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userType" className="text-right">
                User Type
              </Label>
              <Select onValueChange={(value) => setUserType(value as 'inhouse' | 'external')}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inhouse">In-house</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {userType === 'inhouse' ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier">Supplier</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="invitationLink" className="text-right">
                Invitation Link
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input id="invitationLink" type="text" readOnly value="https://example.com/invite/abc123" />
                <Button variant="outline">Copy</Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Send Invitation</Button>
          </DialogFooter>
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
              <Input id="file" type="file" accept=".csv" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Import Users</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UserList users={users} />
    </div>
  )
}

