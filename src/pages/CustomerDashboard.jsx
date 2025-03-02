"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Calendar, Heart, HeartIcon, Home, LogOut, MessageSquare, Package2, Search, Settings, Star } from "lucide-react";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CustomerDashboard() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mock data for the dashboard
  const upcomingBookings = [
    { id: 1, venue: "Sunset Terrace", date: "Mar 15, 2025", time: "6:00 PM", status: "confirmed", guests: 75 },
    { id: 2, venue: "Garden Pavilion", date: "Apr 22, 2025", time: "2:00 PM", status: "pending", guests: 50 },
  ];

  const favoriteVenues = [
    { id: 1, name: "Lakeside Hall", type: "Waterfront", rating: 4.9, price: "$1,200 - $2,500" },
    { id: 2, name: "Mountain View Lodge", type: "Rustic", rating: 4.7, price: "$900 - $1,800" },
    { id: 3, name: "Urban Loft", type: "Indoor", rating: 4.5, price: "$800 - $1,500" },
    { id: 4, name: "Botanical Gardens", type: "Garden", rating: 4.8, price: "$1,100 - $2,200" },
  ];

  const pastBookings = [
    { id: 1, venue: "Rooftop Lounge", date: "Jan 10, 2025", status: "completed", reviewed: true },
    { id: 2, venue: "Beach Resort", date: "Dec 15, 2024", status: "completed", reviewed: false },
  ];

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Sidebar links for customer
  const sidebarLinks = [
    { name: "Home", path: "/customer", icon: <Home className="h-4 w-4" /> },
    { name: "My Bookings", path: "/customer/bookings", icon: <Calendar className="h-4 w-4" /> },
    { name: "Favorites", path: "/customer/favorites", icon: <Heart className="h-4 w-4" /> },
    { name: "Reviews", path: "/customer/reviews", icon: <Star className="h-4 w-4" /> },
    { name: "Support", path: "/customer/support", icon: <MessageSquare className="h-4 w-4" /> },
    { name: "Settings", path: "/customer/settings", icon: <Settings className="h-4 w-4" /> },
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
                  <AvatarFallback>CU</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Customer Name</span>
                  <span className="text-xs text-muted-foreground">customer@example.com</span>
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
              <h1 className="text-xl font-semibold">Welcome Back!</h1>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for venues..."
                  className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                />
              </div>
            </div>
          </header>
          <main className="p-4 md:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Card className="bg-gradient-to-r from-primary/20 to-primary/5">
                <CardHeader>
                  <CardTitle>Find Your Perfect Venue</CardTitle>
                  <CardDescription>Browse thousands of venues for your next event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Input placeholder="Location" className="flex-1" />
                    <Input type="date" className="flex-1" />
                    <Button>Search Venues</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Tabs defaultValue="upcoming" className="mt-6">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
                <TabsTrigger value="past">Past Bookings</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="mt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Bookings</CardTitle>
                      <CardDescription>You have {upcomingBookings.length} upcoming events</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingBookings.map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">{booking.venue}</p>
                              <p className="text-sm text-muted-foreground">
                                {booking.date} · {booking.time} · {booking.guests} guests
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={booking.status === "confirmed" ? "default" : "outline"}
                                className="capitalize"
                              >
                                {booking.status}
                              </Badge>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Bookings
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
              <TabsContent value="past" className="mt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Past Bookings</CardTitle>
                      <CardDescription>Your booking history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pastBookings.map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">{booking.venue}</p>
                              <p className="text-sm text-muted-foreground">{booking.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="capitalize">
                                {booking.status}
                              </Badge>
                              {!booking.reviewed ? (
                                <Button size="sm">Leave Review</Button>
                              ) : (
                                <Badge variant="secondary">Reviewed</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Favorite Venues</CardTitle>
                  <CardDescription>Venues you've saved for future reference</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {favoriteVenues.map((venue) => (
                      <Card key={venue.id} className="overflow-hidden">
                        <div className="aspect-video bg-muted relative">
                          <img
                            src={`/placeholder.svg?height=200&width=300`}
                            alt={venue.name}
                            className="object-cover w-full h-full"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-background/80 hover:bg-background/90"
                          >
                            <HeartIcon className="h-4 w-4 fill-primary text-primary" />
                          </Button>
                        </div>
                        <CardContent className="p-3">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{venue.name}</h3>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">{venue.rating}</span>
                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 ml-1" />
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">{venue.type}</p>
                            <p className="text-xs font-medium">{venue.price}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Favorites
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}