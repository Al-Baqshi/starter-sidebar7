"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { BulkActionForm } from "@/components/users/BulkActionForm";
import { toast } from "@/components/ui/use-toast";
import { useSendBulkEmailMutation } from "@/services/users";

interface FiltersProps {
  users: any[];
  setFilteredUsers: (users: any[]) => void;
  categories: any;
  roles: string[];
  entities: any[];
  onMoveUsers: (targetCategory: string, selectedUsers: string[]) => void;
  selectedUsers: string[];
  onUpdateSelectedUsers: (selectedUsers: string[]) => void;
}

export function Filters({
  users,
  setFilteredUsers,
  categories,
  roles,
  entities,
  onMoveUsers,
  selectedUsers,
  onUpdateSelectedUsers,
}: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedEntity, setSelectedEntity] = useState("all");
  const [targetCategory, setTargetCategory] = useState("");
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkActionType, setBulkActionType] = useState<string[]>([]);
  const [bulkAction] = useSendBulkEmailMutation();
  const applyFilters = (searchValue?: string) => {
    console.log(searchValue, "searchValue");
    const filtered = users?.filter((user) => {
      const matchesSearch =
        !searchValue || // Skip search if searchValue is empty
        user?.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchValue.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || user?.category === selectedCategory;

      const matchesRole = selectedRole === "all" || user?.role === selectedRole;

      const matchesEntity =
        selectedEntity === "all" || user?.entity === selectedEntity;

      return matchesSearch && matchesCategory && matchesRole && matchesEntity;
    });

    setFilteredUsers(filtered);
  };

  const handleBulkActionSubmit = async (
    emailSubject: string,
    emailMessage: string,
    smsMessage: string,
    notificationMessage: string
  ) => {
    // Placeholder for handling bulk actions
    console.log("Email Subject:", emailSubject);
    console.log("Email Message:", emailMessage);
    console.log("SMS Message:", smsMessage);
    console.log("Notification Message:", notificationMessage);
    const payload = {
      subject: emailSubject,
      message: emailMessage,
      selectedUsers: users
        .filter((user) => selectedUsers.includes(user?.id))
        .map((item) => item?.email),
    };
    console.log(payload, "payload bulk action");
    try {
      const response = await bulkAction(payload);
      toast({
        title: "Bulk actions sent",
        description: "The bulk actions have been processed.",
      });
      setShowBulkActions(false);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    applyFilters(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    applyFilters();
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    applyFilters();
  };

  const handleEntityChange = (value: string) => {
    setSelectedEntity(value);
    applyFilters();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-auto"
        />
        <Button
          onClick={() => setShowBulkActions(true)}
          disabled={selectedUsers.length === 0}
        >
          Bulk Actions
        </Button>
        {showBulkActions && (
          <Dialog open={showBulkActions} onOpenChange={setShowBulkActions}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Actions</DialogTitle>
              </DialogHeader>
              <BulkActionForm
                onSubmit={handleBulkActionSubmit}
                selectedCount={selectedUsers.length}
                bulkActionType={bulkActionType}
                setBulkActionType={setBulkActionType}
              />
            </DialogContent>
          </Dialog>
        )}
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
                  {categories?.map((category: any) => (
                    <SelectItem key={category?.id} value={category?.id}>
                      {category?.name}
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
  );
}
