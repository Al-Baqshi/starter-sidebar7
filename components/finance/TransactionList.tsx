import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// TODO: Define Transaction type and fetch from API
type Transaction = {
  id: string
  description: string
  amount: number
  date: string
  type: 'income' | 'expense'
}

export function TransactionList() {
  // TODO: Fetch transactions from API
  const transactions: Transaction[] = [
    { id: '1', description: 'Project payment received', amount: 50000, date: '2023-06-15', type: 'income' },
    { id: '2', description: 'Equipment purchase', amount: 15000, date: '2023-06-14', type: 'expense' },
    { id: '3', description: 'Contractor payment', amount: 25000, date: '2023-06-13', type: 'expense' },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>${transaction.amount.toLocaleString()}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>
              <span className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                {transaction.type === 'income' ? 'Income' : 'Expense'}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

