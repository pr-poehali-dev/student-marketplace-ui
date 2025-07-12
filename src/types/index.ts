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

export interface FilterOptions {
  categories: string[];
  dormitories: string[];
  priceRanges: { value: string; label: string }[];
  sortOptions: { value: string; label: string }[];
}
