import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Listing } from "@/types";

interface ProductCardProps {
  listing: Listing;
  isVip?: boolean;
}

const ProductCard = ({ listing, isVip = false }: ProductCardProps) => {
  if (isVip) {
    return (
      <Card className="glass-surface border-accent/20 hover:shadow-lg transition-all duration-300 group">
        <CardContent className="p-3">
          <div className="flex space-x-3">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1.5">
                <h4 className="font-medium text-foreground truncate text-base">
                  {listing.title}
                </h4>
                {listing.verified && (
                  <Icon
                    name="CheckCircle"
                    size={14}
                    className="text-primary flex-shrink-0 ml-2"
                  />
                )}
              </div>
              <p className="text-xl font-semibold text-primary mb-1.5">
                {listing.price}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    {listing.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    {listing.dormitory}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <Icon name="Heart" size={12} />
                  </Button>
                  <Button size="sm" className="h-7 px-2">
                    <Icon name="MessageCircle" size={12} className="mr-1" />
                    Написать
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`glass-surface hover:shadow-lg transition-all duration-300 group ${
        listing.pushed ? "ring-1 ring-primary/30 glow-primary" : ""
      }`}
    >
      <CardContent className="p-3">
        <div className="relative mb-3">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {listing.pushed && (
            <Badge className="absolute top-1.5 left-1.5 bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
              <Icon name="TrendingUp" size={10} className="mr-1" />
              Продвинуто
            </Badge>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-1.5 right-1.5 bg-white/80 hover:bg-white h-7 w-7 p-0"
          >
            <Icon name="Heart" size={12} />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-foreground text-base line-clamp-2 flex-1">
              {listing.title}
            </h4>
            {listing.verified && (
              <Icon
                name="CheckCircle"
                size={14}
                className="text-primary flex-shrink-0 ml-1.5"
              />
            )}
          </div>

          <p className="text-lg font-semibold text-primary">{listing.price}</p>

          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
              {listing.category}
            </Badge>
            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
              {listing.dormitory}
            </Badge>
          </div>

          <div className="flex justify-between items-center pt-1">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 mr-1.5 h-7 text-xs"
            >
              <Icon name="MessageCircle" size={11} className="mr-1" />
              Написать
            </Button>
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
              <Icon name="Share" size={11} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
