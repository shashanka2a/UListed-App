"use client";

import { Home, Search, PlusCircle, MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/app/providers";

export function BottomNav() {
  const { currentPage, setCurrentPage } = useApp();
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "categories", label: "Search", icon: Search },
    { id: "sell", label: "Sell", icon: PlusCircle },
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50 shadow-lg"
    >
      <div className="max-w-lg mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg min-w-[60px] relative"
                style={{
                  color: isActive ? "#2563EB" : "#6B7280",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-50 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  className="w-6 h-6 relative z-10 transition-all duration-200"
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className="relative z-10 transition-all duration-200"
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
