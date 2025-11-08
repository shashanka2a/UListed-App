"use client";

import { AppProvider, useApp } from "./providers";
import { Login } from "@/src/views/Login";
import { HomeFeed } from "@/src/views/HomeFeed";
import { Categories } from "@/src/views/Categories";
import { SellForm } from "@/src/views/SellForm";
import { Chat } from "@/src/views/Chat";
import { Profile } from "@/src/views/Profile";
import { BottomNav } from "@/src/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";

function AppContent() {
  const { isLoggedIn, currentPage, listings, toggleFavorite, conversations, markConversationAsRead, user, addListing, handleLogout } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomeFeed 
            listings={listings} 
            onToggleFavorite={toggleFavorite}
          />
        );
      case "categories":
        return <Categories />;
      case "sell":
        return <SellForm onSubmit={addListing} />;
      case "chat":
        return (
          <Chat 
            conversations={conversations}
            onMarkAsRead={markConversationAsRead}
          />
        );
      case "profile":
        return (
          <Profile 
            user={user}
            userListings={listings.filter(l => l.seller === user.name)}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <HomeFeed 
            listings={listings} 
            onToggleFavorite={toggleFavorite}
          />
        );
    }
  };

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      
      <BottomNav />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

