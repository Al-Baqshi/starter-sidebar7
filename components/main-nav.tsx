import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { HomeIcon, FolderIcon, UsersIcon, DollarSignIcon, BarChartIcon, ShoppingCartIcon, SettingsIcon, FileIcon, HardHatIcon, MessageSquare, FileText, UserPlus, UserCog } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
}

export function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname()
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Projects', href: '/projects', icon: FolderIcon },
    { name: 'File Manager', href: '/file-manager', icon: FolderIcon },
    { name: 'On-Site Management', href: '/on-site', icon: HardHatIcon },
    { name: 'Finance', href: '/finance', icon: DollarSignIcon },
    { name: 'Tenders', href: '/tenders', icon: FileIcon },
    { name: 'SOQ Client', href: '/soq', icon: FileText },
    { name: 'SOQ Viewer', href: '/soq/bidder', icon: FileText },
    { name: 'Reports & Analytics', href: '/reports', icon: BarChartIcon },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingCartIcon },
    { name: 'User Management', href: '/users', icon: UsersIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
    { name: 'Networking', href: '/profiles', icon: UsersIcon },
    { name: 'Create Profile', href: '/profile/create', icon: UserPlus },
    { name: 'KYC/KYB Application', href: '/kyc-application', icon: FileText },
    { name: 'KYC/KYB Admin', href: '/kyc-admin', icon: UserCog },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1 pb-12", className)} {...props}>
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md",
              item.href === pathname
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}

