"use client";

import { useState } from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Listing } from "@/app/types";

interface HomeFeedProps {
  listings: Listing[];
  onToggleFavorite: (id: number) => void;
}

export function HomeFeed({ listings, onToggleFavorite }: HomeFeedProps) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  
  const filters = ["All", "Electronics", "Books", "Furniture", "Tickets", "Clothing"];
  
  const filteredListings = selectedFilter === "All" 
    ? listings 
    : listings.filter(listing => listing.category === selectedFilter);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">
                <span className="text-blue-600">U</span>Listed
              </h1>
              <p className="text-gray-600 mt-0.5">University Marketplace</p>
            </div>
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1.5 bg-blue-50 text-blue-600 border-0"
            >
              UF
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full border whitespace-nowrap transition-all duration-200 ${
                  filter === selectedFilter
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-600 hover:text-blue-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-lg mx-auto px-6 py-6">
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No items found</div>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card className="overflow-hidden rounded-2xl border-0 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer">
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={listing.image}
                      alt={listing.title}
                      fill
                      className="object-cover transition-transform duration-200 hover:scale-105"
                    />
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(listing.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart
                        className="w-4 h-4 transition-colors duration-200"
                        fill={listing.isFavorited ? "#EF4444" : "none"}
                        style={{ color: listing.isFavorited ? "#EF4444" : "#6B7280" }}
                      />
                    </motion.button>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="text-gray-700 bg-white/95 backdrop-blur-sm border-0 shadow-sm">
                        {listing.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-3 space-y-2">
                    <h3 className="text-gray-900 line-clamp-1">
                      {listing.title}
                    </h3>
                    <div className="text-blue-600">
                      ${listing.price}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span className="text-gray-500">
                        {listing.location}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
