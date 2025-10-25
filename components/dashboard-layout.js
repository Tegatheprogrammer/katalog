"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, Calculator, BarChart3, Settings, Menu, X, Home, LogOut, Crown, Lock } from "lucide-react"

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      current: pathname === "/dashboard",
      locked: false,
    },
    {
      name: "Inventory",
      href: "/dashboard/inventory",
      icon: Package,
      current: pathname === "/dashboard/inventory",
      locked: false,
    },
    {
      name: "Logistics",
      href: "/dashboard/logistics",
      icon: Truck,
      current: pathname === "/dashboard/logistics",
      locked: user?.plan === "free",
    },
    {
      name: "Accounting",
      href: "/dashboard/accounting",
      icon: Calculator,
      current: pathname === "/dashboard/accounting",
      locked: user?.plan === "free",
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      current: pathname === "/dashboard/analytics",
      locked: user?.plan === "free",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings",
      locked: false,
    },
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 glass-strong border-r">
            <SidebarContent
              navigation={navigation}
              user={user}
              onLogout={handleLogout}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:block">
        <div className="glass-strong h-full border-r">
          <SidebarContent navigation={navigation} user={user} onLogout={handleLogout} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navigation */}
        <header className="glass-strong sticky top-0 z-40 border-b">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>

              <div>
                <h1 className="text-lg font-semibold">
                  {navigation.find((item) => item.current)?.name || "Dashboard"}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant={user.plan === "free" ? "secondary" : "default"}>
                {user.plan === "free" && <Crown className="h-3 w-3 mr-1" />}
                {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
              </Badge>

              {user.plan === "free" && (
                <Link href="/plans">
                  <Button size="sm">Upgrade</Button>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

function SidebarContent({ navigation, user, onLogout, onClose }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between p-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold">MyKatalog</span>
        </Link>

        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* User info */}
      <div className="px-6 pb-6">
        <Card className="glass border-0 p-4">
          <div className="text-sm font-medium">{user.businessName}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {user.businessName.toLowerCase().replace(/\s+/g, "")}.mykatalog.com
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              {item.locked ? (
                <div className="flex items-center justify-between px-3 py-2 text-sm text-muted-foreground rounded-lg">
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  <Lock className="h-4 w-4" />
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    item.current
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={onClose}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-6">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
