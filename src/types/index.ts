export interface Listing {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  verified: boolean;
  dormitory: string;
  category: string;
  pushed?: boolean;
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
