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
    { name: 'Collaboration Hub', href: '/collaboration', icon: MessageSquare },
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
          <Button
            key={item.name}
            variant={item.href === pathname ? 'secondary' : 'ghost'}
            className={cn(
              "justify-start hover:bg-white/10 transition-colors w-full",
              item.href === pathname ? "bg-white/10" : ""
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon className="mr-2 h-4 w-4" />
              <span className="hover:text-gray-300 transition-colors">{item.name}</span>
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}

