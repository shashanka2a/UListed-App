"use client";

import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import {
  Monitor,
  GraduationCap,
  Home,
  Shirt,
  Megaphone,
  Users,
  Car,
  Sparkles,
  Gamepad2,
  Search,
  Heart,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: 1, name: "School", icon: GraduationCap, color: "#2563EB" },
  { id: 2, name: "Tech & Electronics", icon: Monitor, color: "#2563EB" },
  { id: 3, name: "Student Living", icon: Home, color: "#2563EB" },
  { id: 4, name: "Clothing & Style", icon: Shirt, color: "#2563EB" },
  { id: 5, name: "Tailgating", icon: Megaphone, color: "#2563EB" },
  { id: 6, name: "Sports & Social", icon: Users, color: "#2563EB" },
  { id: 7, name: "Transportation", icon: Car, color: "#2563EB" },
  { id: 8, name: "Beauty & Self-Care", icon: Sparkles, color: "#2563EB" },
  { id: 9, name: "Toys & Extras", icon: Gamepad2, color: "#2563EB" },
];

export function Categories() {
  const [activeTab, setActiveTab] = useState("browse");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search UListed"
              className="w-full h-12 pl-12 pr-4 rounded-full border-2 border-gray-200 transition-all duration-200 focus:border-blue-600 hover:border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-lg mx-auto">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as string)} className="w-full">
            <TabsList className="w-full h-14 bg-transparent border-0 rounded-none p-0 grid grid-cols-3">
              <TabsTrigger
                value="browse"
                className="h-full rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 transition-colors duration-200"
              >
                Browse
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="h-full rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 transition-colors duration-200"
              >
                Saved Searches
              </TabsTrigger>
              <TabsTrigger
                value="likes"
                className="h-full rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 transition-colors duration-200"
              >
                My Likes
              </TabsTrigger>
            </TabsList>

            {/* Browse Tab Content */}
            <TabsContent value="browse" className="mt-0">
              <div className="max-w-lg mx-auto px-6 py-6">
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ y: -4 }}
                      >
                        <Card className="p-8 rounded-2xl border-0 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer bg-white">
                          <div className="flex flex-col items-center text-center space-y-3">
                            <motion.div
                              className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Icon className="w-6 h-6 text-blue-600" />
                            </motion.div>
                            <h3 className="text-gray-900">{category.name}</h3>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Saved Searches Tab Content */}
            <TabsContent value="saved" className="mt-0">
              <div className="max-w-lg mx-auto px-6 py-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">No Saved Searches</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      Save your searches to quickly find what you're looking for next time.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* My Likes Tab Content */}
            <TabsContent value="likes" className="mt-0">
              <div className="max-w-lg mx-auto px-6 py-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">No Liked Items</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      Items you like will appear here so you can easily find them later.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
