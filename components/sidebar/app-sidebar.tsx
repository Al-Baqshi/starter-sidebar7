"use client"

import * as React from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  FolderOpen,
  Files,
  Building2,
  Users2,
  DollarSign,
  FileText,
  Store,
  BarChart3,
  Settings,
  Network,
  UserPlus,
  FileCheck2,
  ShieldCheck,
  MessagesSquare,
  User,
  LogOut
} from "lucide-react"

import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@clerk/nextjs"

export {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderOpen,
  },
  // {
  //   title: "File Manager",
  //   url: "/file-manager",
  //   icon: Files,
  // },
  // {
  //   title: "On-Site Management",
  //   url: "/on-site",
  //   icon: Building2,
  // },
  // {
  //   title: "Collaboration Hub",
  //   url: "/collaboration",
  //   icon: MessagesSquare,
  // },
  // {
  //   title: "Finance",
  //   url: "/finance",
  //   icon: DollarSign,
  // },
  // {
  //   title: "Tenders",
  //   url: "/tenders",
  //   icon: FileText,
  // },
  // {
  //   title: "SOQ Client",
  //   url: "/soq",
  //   icon: User,
  // },
  // {
  //   title: "SOQ Viewer",
  //   url: "/soq/bidder",
  //   icon: Users2,
  // },
  // {
  //   title: "Reports & Analytics",
  //   url: "/reports",
  //   icon: BarChart3,
  // },
  // {
  //   title: "Marketplace",
  //   url: "/marketplace",
  //   icon: Store,
  // },
  {
    title: "User Management",
    url: "/users",
    icon: Users2,
  },
  // {
  //   title: "Settings",
  //   url: "/settings",
  //   icon: Settings,
  // },
  {
    title: "Networking",
    url: "/profiles",
    icon: Network,
  },
  {
    title: "Create Profile",
    url: "/profile/create",
    icon: UserPlus,
  },
  {
    title: "KYC/KYB Application",
    url: "/kyc-application",
    icon: FileCheck2,
  },
  {
    title: "KYC/KYB Admin",
    url: "/kyc-admin",
    icon: ShieldCheck,
  },
]

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState("/dashboard")
  const { signOut } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1 className="px-4 text-xl font-bold">SOQ Dashboard</h1>
      </SidebarHeader>
      <SidebarContent>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                activeItem === item.url
                  ? "bg-gray-100 dark:bg-gray-800 text-primary"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveItem(item.url)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div
        onClick={() => signOut()}
        className="flex items-center gap-3 cursor-pointer px-4 py-2"
      >
        <LogOut size={16} />
        <span className="text-sm">Logout</span>
      </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
