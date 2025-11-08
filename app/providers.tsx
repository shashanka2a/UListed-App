"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import type { User, Listing, ChatConversation } from "./types";

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  user: User;
  setUser: (user: User) => void;
  listings: Listing[];
  setListings: (listings: Listing[]) => void;
  conversations: ChatConversation[];
  setConversations: (conversations: ChatConversation[]) => void;
  favoritedItems: number[];
  setFavoritedItems: (items: number[]) => void;
  toggleFavorite: (listingId: number) => void;
  addListing: (newListing: Omit<Listing, "id" | "seller" | "sellerAvatar" | "postedAt" | "isFavorited">) => void;
  markConversationAsRead: (conversationId: number) => void;
  handleLogin: (email: string) => void;
  handleLogout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  
  const [user, setUser] = useState<User>({
    name: "Andrea Ludvin",
    username: "@andrealud",
    email: "sjagannatham@ufl.edu",
    university: "University of Florida",
    rating: 4.8,
    reviews: 24,
    activeListings: 12,
    soldItems: 28,
    boughtItems: 15,
    balance: 127.50,
  });

  const [listings, setListings] = useState<Listing[]>([
    {
      id: 1,
      title: "MacBook Pro 2021 M1",
      price: 899,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      category: "Electronics",
      condition: "Like New",
      description: "Barely used MacBook Pro with M1 chip. Great for students!",
      seller: "John Smith",
      location: "Turlington Hall",
      postedAt: "2h ago",
      isFavorited: false,
    },
    {
      id: 2,
      title: "Calculus Textbook",
      price: 45,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
      category: "Books",
      condition: "Good",
      description: "Calculus 8th Edition. Some highlighting but great condition.",
      seller: "Sarah Johnson",
      location: "Library West",
      postedAt: "5h ago",
      isFavorited: true,
    },
    {
      id: 3,
      title: "Mini Fridge - Dorm Size",
      price: 60,
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
      category: "Furniture",
      condition: "Good",
      description: "Perfect for dorm rooms. Clean and works great!",
      seller: "Mike Davis",
      location: "Beaty Towers",
      postedAt: "1d ago",
      isFavorited: false,
    },
    {
      id: 4,
      title: "UF Football Tickets (2)",
      price: 120,
      image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=400&h=400&fit=crop",
      category: "Tickets",
      condition: "New",
      description: "2 student section tickets for next home game!",
      seller: "Emily White",
      location: "Stadium",
      postedAt: "3h ago",
      isFavorited: false,
    },
    {
      id: 5,
      title: "Desk Lamp LED",
      price: 25,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
      category: "Electronics",
      condition: "Like New",
      description: "Adjustable LED desk lamp with USB charging port.",
      seller: "Alex Brown",
      location: "Southwest Rec",
      postedAt: "6h ago",
      isFavorited: true,
    },
    {
      id: 6,
      title: "Backpack - Northface",
      price: 40,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category: "Clothing",
      condition: "Good",
      description: "Durable Northface backpack. Perfect for campus life.",
      seller: "Chris Lee",
      location: "Student Union",
      postedAt: "4h ago",
      isFavorited: false,
    },
  ]);

  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Is the textbook still available?",
      timestamp: "2m ago",
      unread: true,
      listing: "Calculus Textbook",
    },
    {
      id: 2,
      name: "Mike Davis",
      lastMessage: "I can meet at Turlington at 3pm",
      timestamp: "1h ago",
      unread: false,
      listing: "Mini Fridge",
    },
    {
      id: 3,
      name: "Emily White",
      lastMessage: "Thanks for buying!",
      timestamp: "2h ago",
      unread: false,
      listing: "Football Tickets",
    },
  ]);

  const [favoritedItems, setFavoritedItems] = useState<number[]>([2, 5]);

  const handleLogin = (email: string) => {
    setUser({
      ...user,
      email: email,
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const toggleFavorite = (listingId: number) => {
    if (favoritedItems.includes(listingId)) {
      setFavoritedItems(favoritedItems.filter(id => id !== listingId));
      setListings(listings.map(listing => 
        listing.id === listingId ? { ...listing, isFavorited: false } : listing
      ));
    } else {
      setFavoritedItems([...favoritedItems, listingId]);
      setListings(listings.map(listing => 
        listing.id === listingId ? { ...listing, isFavorited: true } : listing
      ));
    }
  };

  const addListing = (newListing: Omit<Listing, "id" | "seller" | "sellerAvatar" | "postedAt" | "isFavorited">) => {
    const listing: Listing = {
      ...newListing,
      id: listings.length + 1,
      seller: user.name,
      postedAt: "Just now",
      isFavorited: false,
    };
    setListings([listing, ...listings]);
    setUser({
      ...user,
      activeListings: user.activeListings + 1,
    });
    setCurrentPage("home");
  };

  const markConversationAsRead = (conversationId: number) => {
    setConversations(conversations.map(conv =>
      conv.id === conversationId ? { ...conv, unread: false } : conv
    ));
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentPage,
        setCurrentPage,
        user,
        setUser,
        listings,
        setListings,
        conversations,
        setConversations,
        favoritedItems,
        setFavoritedItems,
        toggleFavorite,
        addListing,
        markConversationAsRead,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

