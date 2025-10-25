"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { User, Building, Bell, Shield, CreditCard, Globe } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setFormData((prev) => ({
      ...prev,
      businessName: parsedUser.businessName || "",
      email: parsedUser.email || "",
    }))
  }, [router])

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSave = () => {
    // Update user data in localStorage
    const updatedUser = {
      ...user,
      businessName: formData.businessName,
      email: formData.email,
    }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)

    // Show success message (in a real app, this would be a toast)
    alert("Settings saved successfully!")
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Information */}
            <Card className="glass border-0">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <CardTitle>Business Information</CardTitle>
                </div>
                <CardDescription>Update your business details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Enter business name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter business address"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="glass border-0">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <CardTitle>Notifications</CardTitle>
                </div>
                <CardDescription>Configure how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                  </div>
                  <Switch
                    checked={formData.notifications}
                    onCheckedChange={(checked) => handleSwitchChange("notifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get important updates via email</p>
                  </div>
                  <Switch
                    checked={formData.emailAlerts}
                    onCheckedChange={(checked) => handleSwitchChange("emailAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch
                    checked={formData.smsAlerts}
                    onCheckedChange={(checked) => handleSwitchChange("smsAlerts", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="glass border-0">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <CardTitle>Security</CardTitle>
                </div>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Password</Label>
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Overview */}
            <Card className="glass border-0">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <CardTitle>Account Overview</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Current Plan</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={user.plan === "free" ? "secondary" : "default"}>
                      {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                    </Badge>
                    {user.plan === "free" && (
                      <Link href="/plans">
                        <Button size="sm" variant="outline">
                          Upgrade
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Custom Domain</Label>
                  <p className="text-sm mt-1">{user.businessName.toLowerCase().replace(/\s+/g, "")}.mykatalog.com</p>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Member Since</Label>
                  <p className="text-sm mt-1">January 2024</p>
                </div>
              </CardContent>
            </Card>

            {/* Billing */}
            <Card className="glass border-0">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <CardTitle>Billing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Next Billing Date</Label>
                  <p className="text-sm mt-1">{user.plan === "free" ? "N/A" : "February 15, 2024"}</p>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Payment Method</Label>
                  <p className="text-sm mt-1">{user.plan === "free" ? "No payment method" : "**** **** **** 1234"}</p>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  {user.plan === "free" ? "Add Payment Method" : "Update Billing"}
                </Button>
              </CardContent>
            </Card>

            {/* Custom Domain */}
            {user.plan !== "free" && (
              <Card className="glass border-0">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <CardTitle>Custom Domain</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Current Domain</Label>
                    <p className="text-sm mt-1">{user.businessName.toLowerCase().replace(/\s+/g, "")}.mykatalog.com</p>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Connect Custom Domain
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
