"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Package, AlertTriangle, TrendingUp } from "lucide-react"

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const products = [
    {
      id: 1,
      name: "Samsung Galaxy A54",
      sku: "SGX-A54-128",
      category: "Electronics",
      stock: 45,
      price: 285000,
      status: "In Stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      name: "Nike Air Force 1",
      sku: "NK-AF1-WHT",
      category: "Fashion",
      stock: 12,
      price: 85000,
      status: "Low Stock",
      lastUpdated: "2024-01-14",
    },
    {
      id: 3,
      name: 'MacBook Pro 14"',
      sku: "MBP-14-512",
      category: "Electronics",
      stock: 0,
      price: 1250000,
      status: "Out of Stock",
      lastUpdated: "2024-01-13",
    },
    {
      id: 4,
      name: "Adidas Ultraboost",
      sku: "AD-UB-BLK",
      category: "Fashion",
      stock: 28,
      price: 95000,
      status: "In Stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: 5,
      name: "iPhone 15 Pro",
      sku: "IP-15P-256",
      category: "Electronics",
      stock: 8,
      price: 850000,
      status: "Low Stock",
      lastUpdated: "2024-01-14",
    },
  ]

  const stats = [
    {
      title: "Total Products",
      value: "1,247",
      icon: Package,
      change: "+12 this week",
    },
    {
      title: "Low Stock Items",
      value: "23",
      icon: AlertTriangle,
      change: "5 need reorder",
    },
    {
      title: "Total Value",
      value: "₦45.2M",
      icon: TrendingUp,
      change: "+8.5% this month",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800"
      case "Out of Stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Inventory Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your products, track stock levels, and monitor inventory performance.
            </p>
          </div>
          <Button className="mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
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

        {/* Search and Filters */}
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>View and manage all your products in one place</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, SKU, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>

            {/* Products Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>₦{product.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{product.lastUpdated}</TableCell>
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
