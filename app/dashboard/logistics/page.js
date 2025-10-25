"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Lock, Truck, Package, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LogisticsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    if (parsedUser.plan === "free") {
      // Show locked state for free users
    }
  }, [router])

  if (!user) return null

  if (user.plan === "free") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="glass border-0 max-w-md text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">Logistics Management</CardTitle>
              <CardDescription>Upgrade your plan to access logistics and shipping management features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-left space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Order tracking and management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Shipping label generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Delivery status updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Courier integration</span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/plans">
                  <Button className="w-full">Upgrade to Starter Plan - ₦500/month</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  const orders = [
    {
      id: "ORD-001",
      customer: "Adebayo Johnson",
      items: 3,
      total: 125000,
      status: "In Transit",
      courier: "DHL",
      trackingNumber: "DHL123456789",
      estimatedDelivery: "2024-01-18",
    },
    {
      id: "ORD-002",
      customer: "Fatima Abdullahi",
      items: 1,
      total: 85000,
      status: "Processing",
      courier: "GIG Logistics",
      trackingNumber: "GIG987654321",
      estimatedDelivery: "2024-01-20",
    },
    {
      id: "ORD-003",
      customer: "Chinedu Okwu",
      items: 2,
      total: 195000,
      status: "Delivered",
      courier: "Jumia Logistics",
      trackingNumber: "JUM456789123",
      estimatedDelivery: "2024-01-15",
    },
  ]

  const stats = [
    {
      title: "Orders in Transit",
      value: "24",
      icon: Truck,
      change: "+3 today",
    },
    {
      title: "Pending Shipments",
      value: "12",
      icon: Package,
      change: "8 ready to ship",
    },
    {
      title: "Avg. Delivery Time",
      value: "3.2 days",
      icon: Clock,
      change: "-0.5 days improved",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "In Transit":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Logistics Management</h1>
            <p className="text-muted-foreground mt-1">
              Track orders, manage shipments, and monitor delivery performance.
            </p>
          </div>
          <Button>Create Shipment</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders Table */}
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Track and manage your order shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Courier</TableHead>
                    <TableHead>Tracking</TableHead>
                    <TableHead>Est. Delivery</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>₦{order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell>{order.courier}</TableCell>
                      <TableCell className="text-muted-foreground">{order.trackingNumber}</TableCell>
                      <TableCell>{order.estimatedDelivery}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Track
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
