"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  FileIcon,
  DownloadIcon,
  MessageSquare,
  Award,
  Clock,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface JobTableItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface BidderDetails {
  name: string;
  company: string;
  email: string;
  phone: string;
  avatar: string;
}

interface LaborInfo {
  numberOfStaff: number;
  operationHours: string;
}

interface Bid {
  id: string;
  bidderDetails: BidderDetails;
  bidAmount: number;
  proposedDuration: string;
  jobTable: JobTableItem[];
  attachments: Attachment[];
  laborInfo: LaborInfo;
}

// Mock data for the bid
const mockBid: Bid = {
  id: "B1",
  bidderDetails: {
    name: "John Doe",
    company: "ABC Construction",
    email: "john.doe@abcconstruction.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  bidAmount: 75000,
  proposedDuration: "3 weeks",
  jobTable: [
    {
      id: "J1",
      description: "Foundation Work",
      quantity: 1,
      unit: "lot",
      unitPrice: 50000,
      totalPrice: 50000,
    },
    {
      id: "J2",
      description: "Concrete Pouring",
      quantity: 100,
      unit: "m3",
      unitPrice: 250,
      totalPrice: 25000,
    },
  ],
  attachments: [
    {
      id: "A1",
      name: "Detailed Cost Breakdown",
      type: "pdf",
      url: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "A2",
      name: "Project Timeline",
      type: "pdf",
      url: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "A3",
      name: "Equipment List",
      type: "xlsx",
      url: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "A4",
      name: "Team Qualifications",
      type: "docx",
      url: "/placeholder.svg?height=300&width=300",
    },
  ],
  laborInfo: {
    numberOfStaff: 15,
    operationHours: "Monday to Friday, 7:00 AM - 5:00 PM",
  },
};

function AttachmentCard({ attachment }: { attachment: Attachment }) {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex flex-col items-center">
        <div className="w-full h-40 relative mb-2">
          <Image
            src={attachment.url}
            alt={attachment.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p className="text-sm font-medium mb-2 text-center">
          {attachment.name}
        </p>
        <p className="text-xs text-muted-foreground mb-2">
          {attachment.type.toUpperCase()}
        </p>
        <Button variant="outline" size="sm">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ProposalPage() {
  const params = useParams();
  const router = useRouter();
  const [bid, setBid] = useState<Bid | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the bid details from an API
    // For this example, we'll use the mock data
    setBid(mockBid);
  }, [params.id, params.bidId]);

  const handleAward = () => {
    // In a real application, you would send a request to your API to award the bid
    console.log(`Awarding bid ${params.bidId} for tender ${params.id}`);
    // Then you might want to redirect to the tender page or show a success message
    router.push(`/tenders/${params.id}`);
  };

  if (!bid) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container space-y-6 p-8">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => router.back()}>
          Back to Tender
        </Button>
        <Button
          onClick={handleAward}
          className="bg-green-500 hover:bg-green-600"
        >
          <Award className="mr-2 h-4 w-4" />
          Award Bid
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{bid.bidderDetails.company} Proposal</CardTitle>
              <CardDescription>Detailed breakdown of the bid</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={bid.bidderDetails.avatar}
                  alt={bid.bidderDetails.name}
                />
                <AvatarFallback>{bid.bidderDetails.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{bid.bidderDetails.name}</p>
                <p className="text-sm text-muted-foreground">
                  {bid.bidderDetails.company}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="font-semibold">Estimated Cost:</p>
                <p className="text-2xl font-bold">
                  ${bid.bidAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="font-semibold">Estimated Duration:</p>
                <p className="text-2xl font-bold">{bid.proposedDuration}</p>
              </div>
              <div>
                <p className="font-semibold">Number of Staff:</p>
                <p className="text-2xl font-bold">
                  {bid.laborInfo.numberOfStaff}
                </p>
              </div>
              <div>
                <p className="font-semibold">Operation Hours:</p>
                <p className="text-sm">{bid.laborInfo.operationHours}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Bidder Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Email:</p>
                  <p>{bid.bidderDetails.email}</p>
                </div>
                <div>
                  <p className="font-semibold">Phone:</p>
                  <p>
                    <a
                      href={`tel:${bid.bidderDetails.phone}`}
                      className="text-blue-500 hover:underline"
                    >
                      {bid.bidderDetails.phone}
                    </a>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Bidder
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Contact {bid.bidderDetails.name}
                      </DialogTitle>
                      <DialogDescription>
                        Send a message to the bidder regarding their proposal.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="message" className="text-right">
                          Message
                        </Label>
                        <Textarea id="message" className="col-span-3" />
                      </div>
                    </div>
                    <Button type="submit">Send Message</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Job Breakdown</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bid.jobTable.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Attachments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {bid.attachments.map((attachment) => (
                  <AttachmentCard key={attachment.id} attachment={attachment} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
