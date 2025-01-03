import { cn } from "@/lib/utils"

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="container flex h-14 items-center">
        <p className="text-sm text-muted-foreground">
          © 2024 SOQ Dashboard. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

