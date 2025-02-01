import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
// import { Category, SOQJob } from "@/types/soq"
import { motion, AnimatePresence } from "framer-motion";

interface SOQSideFilterProps {
  categories: any[];
  selectedJobId: string | null;
  onSelectJob: (jobId: string) => void;
}

export function SOQSideFilter({
  categories,
  selectedJobId,
  onSelectJob,
}: SOQSideFilterProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(
    []
  );
  const [searchTerm, setSearchTerm] = React.useState("");

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

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

  return (
    <div className="w-64 bg-background border-r p-4 flex flex-col h-full">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        {filteredCategories.map((category) => (
          <div key={category.id} className="mb-2">
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => toggleCategory(category.id)}
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: expandedCategories.includes(category.id) ? 90 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="mr-2 h-4 w-4" />
              </motion.div>
              {category.name}
            </Button>
            <AnimatePresence>
              {expandedCategories.includes(category.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="ml-4 mt-1 space-y-1">
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
