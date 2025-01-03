"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface FiltersProps {
  users: any[]
  setFilteredUsers: (users: any[]) => void
  categories: string[]
  roles: string[]
  entities: any[]
  onMoveUsers: (targetCategory: string, selectedUsers: string[]) => void
  selectedUsers: string[]
  onUpdateSelectedUsers: (selectedUsers: string[]) => void
}

export function Filters({ 
  users, 
  setFilteredUsers, 
  categories, 
  roles,
  entities,
  onMoveUsers, 
  selectedUsers, 
  onUpdateSelectedUsers 
}: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedEntity, setSelectedEntity] = useState('all')
  const [targetCategory, setTargetCategory] = useState('')

  const applyFilters = () => {
    const filtered = users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || user.category === selectedCategory
      const matchesRole = selectedRole === 'all' || user.role === selectedRole
      const matchesEntity = selectedEntity === 'all' || user.entity === selectedEntity
      return matchesSearch && matchesCategory && matchesRole && matchesEntity
    })
    setFilteredUsers(filtered)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    applyFilters()
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    applyFilters()
  }

  const handleRoleChange = (value: string) => {
    setSelectedRole(value)
    applyFilters()
  }

  const handleEntityChange = (value: string) => {
    setSelectedEntity(value)
    applyFilters()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-auto"
        />
        <div className="flex flex-wrap gap-2">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedRole} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedEntity} onValueChange={handleEntityChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select entity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              {entities.map((entity) => (
                <SelectItem key={entity.id} value={entity.name}>{entity.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" disabled={selectedUsers.length === 0}>
              Move Selected Users
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Move Selected Users</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Select onValueChange={setTargetCategory} value={targetCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a target category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={() => onMoveUsers(targetCategory, selectedUsers)}
                disabled={!targetCategory || selectedUsers.length === 0}
              >
                Move Users
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
