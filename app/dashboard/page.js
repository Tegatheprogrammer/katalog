"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Truck, Calculator, BarChart3, TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) return null

  const stats = [
    {
      title: "Total Revenue",
      value: "₦2,450,000",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Active Orders",
      value: "156",
      change: "+8.2%",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Total Products",
      value: "1,247",
      change: "+3.1%",
      icon: Package,
      trend: "up",
    },
    {
      title: "Customers",
      value: "892",
      change: "+15.3%",
      icon: Users,
      trend: "up",
    },
  ]

  const quickActions = [
    {
      title: "Add New Product",
      description: "Add products to your inventory",
      icon: Package,
      href: "/dashboard/inventory",
    },
    {
      title: "Process Order",
      description: "Manage incoming orders",
      icon: Truck,
      href: "/dashboard/logistics",
    },
    {
      title: "Record Transaction",
      description: "Add financial transactions",
      icon: Calculator,
      href: "/dashboard/accounting",
    },
    {
      title: "View Reports",
      description: "Check business analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.businessName}!</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your business today.</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Badge variant={user.plan === "free" ? "secondary" : "default"}>
              {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
            </Badge>
            <span className="text-sm text-muted-foreground">{user.businessName}.mykatalog.com</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>{stat.change} from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="glass border-0 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-2">
                    <action.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <Card className="glass border-0">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New order received from Lagos</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Inventory updated for 5 products</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment received - ₦45,000</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
