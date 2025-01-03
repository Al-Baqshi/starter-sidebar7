"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MoveUsersFormProps {
  users: string[]
  categories: string[]
  onMove: (users: string[], newCategory: string) => void
}

export function MoveUsersForm({ users, categories, onMove }: MoveUsersFormProps) {
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCategory) {
      onMove(users, selectedCategory)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="category">Select Category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center">
        <div>Selected users: {users.length}</div>
        <Button type="submit" disabled={!selectedCategory}>Move Users</Button>
      </div>
    </form>
  )
}

