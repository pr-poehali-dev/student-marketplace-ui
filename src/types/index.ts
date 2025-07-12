export type ListingStatus = "active" | "pending" | "stashed" | "completed";
export type ItemCondition = "new" | "used" | "damaged";

export interface Listing {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  verified: boolean;
  dormitory: string;
  category: string;
  subcategory?: string;
  condition?: ItemCondition;
  pushed?: boolean;
  status?: ListingStatus;
  createdAt?: string;
  views?: number;
}

export interface CategoryOption {
  name: string;
  subcategories: string[];
}

export interface FilterOptions {
  categories: CategoryOption[];
  dormitories: string[];
  priceRanges: { value: string; label: string }[];
  sortOptions: { value: string; label: string }[];
}

export interface Review {
  id: number;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  listingTitle?: string;
}

export interface UserProfile {
  id: number;
  name: string;
  avatar?: string;
  email?: string;
  phone?: string;
  dormitory: string;
  joinedAt: string;
  rating: number;
  totalSales: number;
  totalReviews: number;
  isOnline?: boolean;
  lastSeen?: string;
  bio?: string;
}

export type NotificationType =
  | "message"
  | "moderation"
  | "review"
  | "system"
  | "sale";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  actionUrl?: string;
  authorName?: string;
  authorAvatar?: string;
}

export interface ChatMessage {
  id: number;
  chatId: number;
  senderId: number;
  senderName: string;
  senderAvatar?: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  isDelivered: boolean;
}

export interface Chat {
  id: number;
  participantId: number;
  participantName: string;
  participantAvatar?: string;
  listingId?: number;
  listingTitle?: string;
  listingImage?: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
  isOnline?: boolean;
  lastSeen?: string;
}
