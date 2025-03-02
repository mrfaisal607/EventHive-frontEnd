"use client";

import React, { useState } from "react";
// import { usePathname } from "react-router-dom";
import { BarChart3, CheckCircle, ChevronDown, Home, LogOut, Package2, PieChart, Settings, Users } from "lucide-react";
import { motion } from "framer-motion";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// // import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";

export default function AdminPanel() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mock data for the dashboard
  const stats = [
    { title: "Total Users", value: "2,834", change: "+12.5%", icon: <Users className="h-4 w-4" /> },
    { title: "Pending Venues", value: "24", change: "-4.3%", icon: <CheckCircle className="h-4 w-4" /> },
    { title: "Total Revenue", value: "$48,395", change: "+22.4%", icon: <BarChart3 className="h-4 w-4" /> },
    { title: "Active Events", value: "156", change: "+8.2%", icon: <Package2 className="h-4 w-4" /> },
  ];

  const recentUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", role: "customer", date: "2 hours ago" },
    { id: 2, name: "Michael Chen", email: "m.chen@example.com", role: "vendor", date: "5 hours ago" },
    { id: 3, name: "Emma Wilson", email: "emma.w@example.com", role: "customer", date: "1 day ago" },
    { id: 4, name: "James Rodriguez", email: "james.r@example.com", role: "vendor", date: "2 days ago" },
  ];

  const pendingVenues = [
    { id: 1, name: "Grand Ballroom", owner: "Luxury Events Inc.", submitted: "Yesterday", type: "Wedding Venue" },
    { id: 2, name: "Sunset Beach Resort", owner: "Coastal Experiences", submitted: "2 days ago", type: "Beach Venue" },
    { id: 3, name: "Urban Conference Center", owner: "City Spaces Ltd.", submitted: "3 days ago", type: "Conference" },
  ];

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Sidebar links for admin
  const sidebarLinks = [
    { name: "Dashboard", path: "/admin", icon: <Home className="h-4 w-4" /> },
    { name: "User Management", path: "/admin/users", icon: <Users className="h-4 w-4" /> },
    { name: "Approve Venues", path: "/admin/venues", icon: <CheckCircle className="h-4 w-4" /> },
    { name: "Reports", path: "/admin/reports", icon: <BarChart3 className="h-4 w-4" /> },
    { name: "Analytics", path: "/admin/analytics", icon: <PieChart className="h-4 w-4" /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EventHive</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarLinks.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton asChild isActive={pathname === link.path}>
                    <a href={link.path} className="flex items-center gap-3">
                      {link.icon}
                      <span>{link.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-3 py-2">
              <div className="flex items-center gap-3 rounded-md bg-muted p-2">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Admin User</span>
                  <span className="text-xs text-muted-foreground">admin@eventhive.com</span>
                </div>
              </div>
              <Button variant="outline" className="mt-2 w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <span>Today</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:p-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Pending Venue Approvals</CardTitle>
                  <CardDescription>You have {pendingVenues.length} venues waiting for approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingVenues.map((venue) => (
                      <div key={venue.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{venue.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {venue.owner} · {venue.type}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{venue.submitted}</Badge>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                  <CardDescription>{recentUsers.length} users registered recently</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                          <Badge variant="secondary">{user.date}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="md:col-span-2 lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                  <CardDescription>System performance and health metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Server Uptime</span>
                        <span className="text-sm text-muted-foreground">99.9%</span>
                      </div>
                      <Progress value={99.9} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">API Response Time</span>
                        <span className="text-sm text-muted-foreground">245ms</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Database Load</span>
                        <span className="text-sm text-muted-foreground">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}