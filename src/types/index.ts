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
