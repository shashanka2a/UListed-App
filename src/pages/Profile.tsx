"use client";

import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Settings,
  Heart,
  Package,
  Star,
  DollarSign,
  MapPin,
  Mail,
  ShieldCheck,
  LogOut,
  Edit2,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import profileImage from "@/src/assets/02f0d2a21d4e1a2756452640e4ff8a77f60228e3.png";
import { User, Listing } from "@/app/types";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

interface ProfileProps {
  user: User;
  userListings: Listing[];
  onLogout: () => void;
}

export function Profile({ user, userListings, onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("Love finding great deals and helping fellow students!");
  const activeListings = userListings.filter(l => l.seller === user.name);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-gray-900">Profile</h1>
          <motion.button
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar className="w-24 h-24 mb-4 ring-4 ring-blue-50">
                  <AvatarImage src={profileImage} alt={user.name} />
                  <AvatarFallback className="bg-blue-600 text-white text-xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Name */}
              <h2 className="text-gray-900 mb-1">{user.name}</h2>

              {/* Username with Verification */}
              <div className="flex items-center gap-1.5 mb-6">
                <span className="text-gray-500">{user.username}</span>
                <ShieldCheck className="w-4 h-4 text-blue-600" />
              </div>

              {/* Bio */}
              {isEditing ? (
                <div className="w-full max-w-sm mb-6">
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 transition-all duration-200 focus:border-blue-600 resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 h-10 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setBio("Love finding great deals and helping fellow students!");
                        setIsEditing(false);
                      }}
                      variant="outline"
                      className="flex-1 h-10 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-sm mb-6">
                  <p className="text-gray-600 leading-relaxed mb-3">
                    {bio}
                  </p>
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Bio</span>
                  </motion.button>
                </div>
              )}

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-6 w-full">
                {/* Rating */}
                <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-900 text-xl">{user.rating}</span>
                  </div>
                  <span className="text-gray-500">Rating</span>
                </div>

                {/* Balance */}
                <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-gray-900 text-xl">{user.balance.toFixed(2)}</span>
                  </div>
                  <span className="text-gray-500">Balance</span>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-gray-900 text-xl mb-1">
                  {user.activeListings}
                </div>
                <div className="text-gray-500">Active</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 text-xl mb-1">
                  {user.soldItems}
                </div>
                <div className="text-gray-500">Sold</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 text-xl mb-1">
                  {user.boughtItems}
                </div>
                <div className="text-gray-500">Bought</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="p-4 rounded-2xl border-0 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-gray-700">Favorites</span>
              </motion.button>

              <motion.button
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-gray-700">Orders</span>
              </motion.button>
            </div>
          </Card>
        </motion.div>

        {/* My Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-gray-900 mb-4">My Listings</h2>
          {activeListings.length === 0 ? (
            <Card className="p-8 rounded-2xl border-0 shadow-sm text-center">
              <div className="text-gray-400 mb-2">No active listings</div>
              <p className="text-gray-500">Start selling to see your items here</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {activeListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Card className="p-4 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          className="rounded-xl object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1">
                          {listing.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="text-blue-600">
                            ${listing.price}
                          </div>
                          <Badge className="bg-green-50 text-green-600 border-0">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full h-12 rounded-xl border-2 border-gray-200 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
