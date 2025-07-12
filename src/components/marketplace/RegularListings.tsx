import React from "react";
import ProductCard from "./ProductCard";
import { Listing } from "@/types";

interface RegularListingsProps {
  listings: Listing[];
  totalCount?: number;
}

const RegularListings = ({
  listings,
  totalCount = 1247,
}: RegularListingsProps) => {
  return (
    <section className="py-6 px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Все объявления</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Найдено: {totalCount.toLocaleString()} объявлений</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {listings.map((listing) => (
            <ProductCard key={listing.id} listing={listing} isVip={false} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegularListings;
