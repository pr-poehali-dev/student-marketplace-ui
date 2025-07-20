export type ListingStatus = "active" | "pending" | "stashed" | "completed" | "rejected";
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
  role?: 'user' | 'moderator' | 'admin';
  status?: 'active' | 'blocked' | 'suspended';
  lastActivity?: string;
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

export interface Report {
  id: number;
  reporterId: number;
  reporter: UserProfile;
  targetType: 'listing' | 'user' | 'message';
  targetId: number;
  target?: Listing | UserProfile | ChatMessage;
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: number;
  moderator?: UserProfile;
  resolution?: string;
  evidence?: string[];
}

export interface ModerationAction {
  id: number;
  moderatorId: number;
  moderator: UserProfile;
  targetType: 'listing' | 'user' | 'report';
  targetId: number;
  action: 'approve' | 'reject' | 'block' | 'warn' | 'delete' | 'edit';
  reason: string;
  description?: string;
  createdAt: string;
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalListings: number;
  activeListings: number;
  totalSales: number;
  revenue: number;
  pendingReports: number;
  pendingListings: number;
  userGrowth: { date: string; count: number }[];
  listingGrowth: { date: string; count: number }[];
  categoryStats: { category: string; count: number; percentage: number }[];
  dormitoryStats: { dormitory: string; users: number; listings: number }[];
  moderationStats: {
    totalActions: number;
    approvedListings: number;
    rejectedListings: number;
    resolvedReports: number;
  };
}

export interface Subscription {
  id: number;
  userId: number;
  user: UserProfile;
  type: 'basic' | 'premium' | 'vip';
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  price: number;
  features: string[];
}