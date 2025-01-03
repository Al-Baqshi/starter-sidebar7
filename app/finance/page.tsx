import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilterIcon, PlusIcon, FileIcon as FileInvoice, Scale, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function FinancePage() {
  return (
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Finance</h1>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search transactions..."
            className="max-w-[500px]"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <FilterIcon className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <FileInvoice className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Invoice</DialogTitle>
                <DialogDescription>
                  Generate a new invoice.
                </DialogDescription>
              </DialogHeader>
              <InvoiceForm />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Scale className="mr-2 h-4 w-4" />
                Create Escrow
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Escrow Agreement</DialogTitle>
                <DialogDescription>
                  Establish a new escrow agreement.
                </DialogDescription>
              </DialogHeader>
              <EscrowForm />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Create Demand
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Demand Request</DialogTitle>
                <DialogDescription>
                  Submit a new demand request.
                </DialogDescription>
              </DialogHeader>
              <DemandForm />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <ArrowDownLeft className="mr-2 h-4 w-4" />
                Create Supply
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Supply Offer</DialogTitle>
                <DialogDescription>
                  Submit a new supply offer.
                </DialogDescription>
              </DialogHeader>
              <SupplyForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="project-budgets">Project Budgets</TabsTrigger>
          <TabsTrigger value="recent-transactions">Recent Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground">Total Budget</div>
                <div className="mt-2 text-3xl font-bold">$10,000,000</div>
                <div className="text-sm text-muted-foreground">For all ongoing projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground">Total Spent</div>
                <div className="mt-2 text-3xl font-bold">$6,500,000</div>
                <div className="text-sm text-muted-foreground">65.0% of total budget</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground">Remaining Budget</div>
                <div className="mt-2 text-3xl font-bold">$3,500,000</div>
                <div className="text-sm text-muted-foreground">35.0% of total budget</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Budget Utilization</h3>
              <p className="text-sm text-muted-foreground">Overall budget usage across all projects</p>
              <div className="mt-4">
                <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: "65%" }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span>$0</span>
                  <span>$10,000,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const InvoiceForm = () => (
  <form className="space-y-4">
    <div>
      <Label htmlFor="invoiceRecipient">Recipient</Label>
      <Input id="invoiceRecipient" placeholder="Enter recipient" />
    </div>
    <div>
      <Label htmlFor="invoiceAmount">Amount</Label>
      <Input id="invoiceAmount" type="number" placeholder="Enter amount" />
    </div>
    <div>
      <Label htmlFor="invoiceDetails">Details</Label>
      <Textarea id="invoiceDetails" placeholder="Enter details" />
    </div>
    <DialogFooter>
      <Button type="submit">Create Invoice</Button>
    </DialogFooter>
  </form>
)

const EscrowForm = () => (
  <form className="space-y-4">
    <div>
      <Label htmlFor="escrowClient">Client</Label>
      <Input id="escrowClient" placeholder="Enter client" />
    </div>
    <div>
      <Label htmlFor="escrowAmount">Amount</Label>
      <Input id="escrowAmount" type="number" placeholder="Enter amount" />
    </div>
    <div>
      <Label htmlFor="escrowTerms">Terms</Label>
      <Textarea id="escrowTerms" placeholder="Enter terms" />
    </div>
    <DialogFooter>
      <Button type="submit">Create Escrow</Button>
    </DialogFooter>
  </form>
)

const DemandForm = () => (
  <form className="space-y-4">
    <div>
      <Label htmlFor="demandItem">Item</Label>
      <Input id="demandItem" placeholder="Enter item name" />
    </div>
    <div>
      <Label htmlFor="demandQuantity">Quantity</Label>
      <Input id="demandQuantity" type="number" placeholder="Enter quantity" />
    </div>
    <div>
      <Label htmlFor="demandDetails">Details</Label>
      <Textarea id="demandDetails" placeholder="Enter details" />
    </div>
    <DialogFooter>
      <Button type="submit">Create Demand</Button>
    </DialogFooter>
  </form>
)

const SupplyForm = () => (
  <form className="space-y-4">
    <div>
      <Label htmlFor="supplyItem">Item</Label>
      <Input id="supplyItem" placeholder="Enter item name" />
    </div>
    <div>
      <Label htmlFor="supplyQuantity">Quantity</Label>
      <Input id="supplyQuantity" type="number" placeholder="Enter quantity" />
    </div>
    <div>
      <Label htmlFor="supplyDetails">Details</Label>
      <Textarea id="supplyDetails" placeholder="Enter details" />
    </div>
    <DialogFooter>
      <Button type="submit">Create Supply</Button>
    </DialogFooter>
  </form>
)

