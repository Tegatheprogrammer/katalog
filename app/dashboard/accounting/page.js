"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Lock, DollarSign, TrendingUp, TrendingDown, CheckCircle, Plus } from "lucide-react"
import Link from "next/link"

export default function AccountingPage() {
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
              <CardTitle className="text-2xl">Accounting & Finance</CardTitle>
              <CardDescription>
                Upgrade your plan to access advanced accounting and financial management features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-left space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Automated bookkeeping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Expense tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Financial reporting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Tax calculations</span>
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

  const transactions = [
    {
      id: "TXN-001",
      date: "2024-01-15",
      description: "Samsung Galaxy A54 Sale",
      type: "Income",
      amount: 285000,
      category: "Sales",
      status: "Completed",
    },
    {
      id: "TXN-002",
      date: "2024-01-15",
      description: "Office Rent Payment",
      type: "Expense",
      amount: -150000,
      category: "Rent",
      status: "Completed",
    },
    {
      id: "TXN-003",
      date: "2024-01-14",
      description: "Nike Air Force 1 Sale",
      type: "Income",
      amount: 85000,
      category: "Sales",
      status: "Completed",
    },
    {
      id: "TXN-004",
      date: "2024-01-14",
      description: "Marketing Campaign",
      type: "Expense",
      amount: -25000,
      category: "Marketing",
      status: "Pending",
    },
    {
      id: "TXN-005",
      date: "2024-01-13",
      description: "Inventory Purchase",
      type: "Expense",
      amount: -500000,
      category: "Inventory",
      status: "Completed",
    },
  ]

  const stats = [
    {
      title: "Total Revenue",
      value: "₦2,450,000",
      icon: DollarSign,
      change: "+12.5% from last month",
      trend: "up",
    },
    {
      title: "Total Expenses",
      value: "₦1,200,000",
      icon: TrendingDown,
      change: "+5.2% from last month",
      trend: "up",
    },
    {
      title: "Net Profit",
      value: "₦1,250,000",
      icon: TrendingUp,
      change: "+18.7% from last month",
      trend: "up",
    },
  ]

  const getTypeColor = (type) => {
    return type === "Income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getStatusColor = (status) => {
    return status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Accounting & Finance</h1>
            <p className="text-muted-foreground mt-1">
              Track income, expenses, and monitor your business financial health.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
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

        {/* Transactions Table */}
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>View and manage your business transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(transaction.type)}>{transaction.type}</Badge>
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                        ₦{Math.abs(transaction.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
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
