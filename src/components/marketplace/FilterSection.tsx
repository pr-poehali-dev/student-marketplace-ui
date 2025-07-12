import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { FilterOptions } from "@/types";

interface FilterSectionProps {
  filterOptions: FilterOptions;
}

const FilterSection = ({ filterOptions }: FilterSectionProps) => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const formatPrice = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}к ₽`;
    }
    return `${value} ₽`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-surface rounded-lg p-3 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Categories with Subcategories */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-white/50 border-0 h-9 text-sm justify-between"
              >
                {selectedSubcategory || selectedCategory || "Категория"}
                <Icon name="ChevronDown" size={14} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" align="start">
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedSubcategory("");
                  }}
                >
                  Все категории
                </Button>
                {filterOptions.categories.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm font-medium"
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setSelectedSubcategory("");
                      }}
                    >
                      {category.name}
                    </Button>
                    <div className="ml-4 space-y-1">
                      {category.subcategories.map((sub) => (
                        <Button
                          key={sub}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs text-muted-foreground hover:text-primary"
                          onClick={() => {
                            setSelectedCategory(category.name);
                            setSelectedSubcategory(sub);
                          }}
                        >
                          {sub}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Dormitories */}
          <Select>
            <SelectTrigger className="bg-white/50 border-0 h-9 text-sm">
              <SelectValue placeholder="Общежитие" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.dormitories.map((dorm) => (
                <SelectItem key={dorm} value={dorm.toLowerCase()}>
                  {dorm}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Range Slider */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-white/50 border-0 h-9 text-sm justify-between"
              >
                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                <Icon name="ChevronDown" size={14} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Цена</span>
                  <Badge variant="outline" className="text-xs">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </Badge>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 ₽</span>
                  <span>100к ₽</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Sort */}
          <Select>
            <SelectTrigger className="bg-white/50 border-0 h-9 text-sm">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
