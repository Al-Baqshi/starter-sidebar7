import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Clock,
  MessageSquare,
  Plus,
  RefreshCw,
  Save
} from "lucide-react";
import React from "react";

interface JobDetailsProps {
  job: any;
  updateMaterialInput: (
    jobId: string,
    itemId: string,
    field: any,
    value: string | number | File[]
  ) => void;
  updateLaborInput: (
    jobId: string,
    itemId: string,
    field: any,
    value: string | number
  ) => void;
  addMaterial: (jobId: string) => void;
  addLabor: (jobId: string) => void;
  submitBid: (jobId: string) => void;
  withdrawBid: (jobId: string) => void;
  openNotesDialog: (jobId: string, itemId: string, isLabor: boolean) => void;
  openVariationDialog: (
    jobId: string,
    itemId: string,
    isLabor: boolean
  ) => void;
  isExpanded: boolean;
}

const unitOptions = [
  { value: "m3", label: "Volume (m³)", description: "Cubic metres" },
  { value: "m2", label: "Area (m²)", description: "Square metres" },
  { value: "m", label: "Length (m)", description: "Linear metres" },
  { value: "no", label: "Number", description: "Quantity" },
  { value: "kg", label: "Weight (kg)", description: "Kilograms" },
];

export function JobDetails({
  job,
  updateMaterialInput,
  updateLaborInput,
  addMaterial,
  addLabor,
  submitBid,
  withdrawBid,
  openNotesDialog,
  openVariationDialog,
  isExpanded,
}: JobDetailsProps) {
  const [openPopover, setOpenPopover] = React.useState(false);

  return (
    <Collapsible open={isExpanded} className="w-full">
      <CollapsibleTrigger className="w-full">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isExpanded
              ? job.status === "submitted"
                ? "#10B981"
                : "#3B82F6"
              : "#E5E7EB",
          }}
          className={`flex justify-between items-center p-4 rounded-lg ${
            isExpanded ? "text-white" : "text-gray-900"
          }`}
        >
          <h3 className="text-xl font-bold">
            Job {job.rawNumber}: {job.jobId} - {job.name}
          </h3>
          <div className="flex items-center space-x-2">
            <Badge
              variant={job.status === "submitted" ? "secondary" : "outline"}
            >
              {job.status === "submitted" ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Submitted
                </>
              ) : (
                <>
                  <Clock className="mr-1 h-4 w-4" /> Pending
                </>
              )}
            </Badge>
            <motion.div
              initial={false}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 border border-t-0 rounded-b-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p>
                  <strong>Description:</strong> {job.description}
                </p>
              </div>
              <div>
                <p>
                  <strong>Time Frame:</strong> {job.startDate} to {job.endDate}
                </p>
              </div>
            </div>

            <Tabs defaultValue="materials" className="w-full">
              <TabsList>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="labor">Labor</TabsTrigger>
              </TabsList>
              <TabsContent value="materials">
                <ScrollArea className="h-[300px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">No.</TableHead>
                        <TableHead className="w-[200px]">
                          Item Description
                        </TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Est. Qty</TableHead>
                        <TableHead>Bid Qty</TableHead>
                        <TableHead>Unit Rate ($)</TableHead>
                        <TableHead>Total Cost ($)</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {job.items.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.number}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{item.estimatedQuantity}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={item.bidderQuantity || ""}
                              onChange={(e) =>
                                updateMaterialInput(
                                  job.id,
                                  item.id,
                                  "bidderQuantity",
                                  Number(e.target.value)
                                )
                              }
                              className="w-20"
                              disabled={job.status === "submitted"}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={item.unitRate || ""}
                              onChange={(e) =>
                                updateMaterialInput(
                                  job.id,
                                  item.id,
                                  "unitRate",
                                  Number(e.target.value)
                                )
                              }
                              className="w-20"
                              disabled={job.status === "submitted"}
                            />
                          </TableCell>
                          <TableCell>${item.totalCost.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                openNotesDialog(job.id, item.id, false)
                              }
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Notes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addMaterial(job.id)}
                  className="mt-2"
                  disabled={job.status === "submitted"}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Material
                </Button>
              </TabsContent>
              <TabsContent value="labor">
                <ScrollArea className="h-[300px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">No.</TableHead>
                        <TableHead className="w-[200px]">
                          Labor Description
                        </TableHead>
                        <TableHead>Est. Staff</TableHead>
                        <TableHead>Bid Staff</TableHead>
                        <TableHead>Est. Hours</TableHead>
                        <TableHead>Bid Hours</TableHead>
                        <TableHead>Hourly Rate ($)</TableHead>
                        <TableHead>Total Cost ($)</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {job.laborItems.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.number}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.estimatedStaff}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={item.bidderStaff || ""}
                              onChange={(e) =>
                                updateLaborInput(
                                  job.id,
                                  item.id,
                                  "bidderStaff",
                                  Number(e.target.value)
                                )
                              }
                              className="w-16"
                              disabled={job.status === "submitted"}
                            />
                          </TableCell>
                          <TableCell>{item.estimatedHours}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={item.bidderHours || ""}
                              onChange={(e) =>
                                updateLaborInput(
                                  job.id,
                                  item.id,
                                  "bidderHours",
                                  Number(e.target.value)
                                )
                              }
                              className="w-20"
                              disabled={job.status === "submitted"}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={item.hourlyRate || ""}
                              onChange={(e) =>
                                updateLaborInput(
                                  job.id,
                                  item.id,
                                  "hourlyRate",
                                  Number(e.target.value)
                                )
                              }
                              className="w-20"
                              disabled={job.status === "submitted"}
                            />
                          </TableCell>
                          <TableCell>${item.totalCost.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                openNotesDialog(job.id, item.id, true)
                              }
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Notes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLabor(job.id)}
                  className="mt-2"
                  disabled={job.status === "submitted"}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Labor
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-lg font-bold mb-2 sm:mb-0">
                Total Bid: ${job.totalBid.toFixed(2)}
              </p>
              {job.status === "submitted" ? (
                <Button variant="outline" onClick={() => withdrawBid(job.id)}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Withdraw and Resubmit
                </Button>
              ) : (
                <Button onClick={() => submitBid(job.id)}>
                  <Save className="mr-2 h-4 w-4" />
                  Submit Bid
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function JobDetailsSkeleton() {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <Skeleton className="h-8 w-3/4" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}
