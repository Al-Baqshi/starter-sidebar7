"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronDown, ChevronUp, FileUp, UserPlus, FilePlusIcon, MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

interface CategoryHeaderProps {
  title: string
  isExpanded: boolean
  onToggle: () => void
  onTitleChange: (newTitle: string) => void
  onInviteUsers: () => void
  onCreateJob: () => void
  onUploadDocuments: () => void
}

export function CategoryHeader({
  title,
  isExpanded,
  onToggle,
  onTitleChange,
  onInviteUsers,
  onCreateJob,
  onUploadDocuments,
}: CategoryHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  const handleTitleSubmit = () => {
    onTitleChange(editedTitle)
    setIsEditing(false)
  }

  return (
    <div className="flex w-full items-center justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg">
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
            className="max-w-[200px]"
            autoFocus
          />
        ) : (
          <Button
            variant="ghost"
            className="text-xl font-semibold hover:bg-accent hover:text-accent-foreground"
            onClick={() => setIsEditing(true)}
          >
            {title}
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsInviteDialogOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Users
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Users</DialogTitle>
            </DialogHeader>
            {/* Add invite users form content here */}
          </DialogContent>
        </Dialog>

        <Button variant="outline" size="sm" onClick={onCreateJob}>
          <FilePlusIcon className="mr-2 h-4 w-4" />
          Create Job Wizard
        </Button>

        <Button variant="outline" size="sm" onClick={onUploadDocuments}>
          <FileUp className="mr-2 h-4 w-4" />
          Upload Documents
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              Edit Title
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onToggle}>
              {isExpanded ? 'Collapse' : 'Expand'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AnimatePresence initial={false}>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="focus:outline-none"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

