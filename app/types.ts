export interface User {
  name: string;
  username: string;
  email: string;
  university: string;
  avatar?: string;
  rating: number;
  reviews: number;
  activeListings: number;
  soldItems: number;
  boughtItems: number;
  balance: number;
}

export interface Listing {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  condition: string;
  description: string;
  seller: string;
  sellerAvatar?: string;
  location: string;
  postedAt: string;
  isFavorited?: boolean;
}

export interface ChatConversation {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  listing?: string;
}

