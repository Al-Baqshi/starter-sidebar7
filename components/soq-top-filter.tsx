import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Search, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
// import { Category, SOQJob } from "@/types/soq"
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SOQTopFilterProps {
  categories: any[];
  selectedJobId: string | null;
  onSelectJob: (jobId: string) => void;
  onAddCategory: (categoryName: string) => void;
  onRemoveCategory: (categoryId: string) => void;
}

export function SOQTopFilter({
  categories,
  selectedJobId,
  onSelectJob,
  onAddCategory,
  onRemoveCategory,
}: SOQTopFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      jobs: category.jobs.filter(
        (job: any) =>
          job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.jobId.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.jobs.length > 0);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName("");
      setIsAddCategoryDialogOpen(false);
    }
  };

  return (
    <div className="w-full bg-background p-4 border-b">
      <div className="mb-4">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
      </div>
      <ScrollArea className="h-[200px] p-2">
        <Button
          variant="outline"
          className="w-full mb-2"
          onClick={() => setIsAddCategoryDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
        <Accordion type="multiple" className="w-full">
          {filteredCategories.map((category) => (
            <AccordionItem
              value={category.id}
              key={category.id}
              className="relative"
            >
              <AccordionTrigger className="hover:no-underline px-4">
                <div className="flex items-center justify-between w-full">
                  <span>{category.name}</span>
                </div>
              </AccordionTrigger>
              <div
                className="absolute right-4 top-3 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveCategory(category.id);
                }}
              >
                <X className="h-4 w-4 cursor-pointer" />
              </div>
              <AccordionContent>
                <div className="pl-4 space-y-1">
                  {category.jobs.map((job: any) => (
                    <Button
                      key={job.id}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start hover:bg-primary/10 hover:text-primary transition-colors",
                        selectedJobId === job.id &&
                          "bg-accent text-accent-foreground"
                      )}
                      onClick={() => onSelectJob(job.id)}
                    >
                      {job.jobId}: {job.name}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
