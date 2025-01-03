import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LeadsNavProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function LeadsNav({ className, ...props }: LeadsNavProps) {
  const statuses = [
    { name: "All", count: 4 },
    { name: "New", count: 1 },
    { name: "Quoting", count: 1 },
    { name: "Won", count: 2 },
    { name: "Qualifying", count: 0 },
    { name: "Lost", count: 0 },
  ]

  return (
    <div className={cn("flex flex-col space-y-1", className)} {...props}>
      {statuses.map((status) => (
        <Button
          key={status.name}
          variant="ghost"
          className={cn(
            "justify-between pl-8 text-muted-foreground hover:text-foreground",
            status.name === "All" && "text-orange-500 hover:text-orange-500"
          )}
        >
          {status.name}
          <Badge variant="secondary">{status.count}</Badge>
        </Button>
      ))}
    </div>
  )
}

