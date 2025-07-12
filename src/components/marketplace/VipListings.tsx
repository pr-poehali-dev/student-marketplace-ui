import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ProductCard from "./ProductCard";
import { Listing } from "@/types";

interface VipListingsProps {
  listings: Listing[];
}

const VipListings = ({ listings }: VipListingsProps) => {
  return (
    <section className="py-6 px-6">
      <div className="container mx-auto">
        <div className="glass-card rounded-2xl p-4 mb-6 glow-accent">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Crown" size={20} className="text-accent" />
              <h3 className="text-xl font-semibold">VIP объявления</h3>
              <Badge className="bg-accent text-accent-foreground text-xs">
                Премиум
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-sm">
              Все VIP
              <Icon name="ArrowRight" size={14} className="ml-1.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.map((listing) => (
              <ProductCard key={listing.id} listing={listing} isVip={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VipListings;
