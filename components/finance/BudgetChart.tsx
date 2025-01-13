import { Progress } from "@/components/ui/progress"

export function BudgetChart() {
  // TODO: Fetch real budget data from API
  const budgetPercentage = 65

  return (
    <div className="mt-4">
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${budgetPercentage}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm">
        <span>$0</span>
        <span>$10,000,000</span>
      </div>
    </div>
  )
}

