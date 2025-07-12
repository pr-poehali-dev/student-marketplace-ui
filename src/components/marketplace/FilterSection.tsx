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
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { FilterOptions } from "@/types";

interface FilterSectionProps {
  filterOptions: FilterOptions;
}

const FilterSection = ({ filterOptions }: FilterSectionProps) => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState("");

  const formatPrice = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}к ₽`;
    }
    return `${value} ₽`;
  };

  const handleMinPriceChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setMinPrice(numValue);
    setPriceRange([numValue, maxPrice]);
  };

  const handleMaxPriceChange = (value: string) => {
    const numValue = parseInt(value) || 100000;
    setMaxPrice(numValue);
    setPriceRange([minPrice, numValue]);
  };

  const handleSliderChange = (values: number[]) => {
    setPriceRange(values);
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-surface rounded-lg p-3 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Categories with Subcategories - Two Column Layout */}
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
            <PopoverContent
              className="w-96 p-0 overflow-hidden"
              align="start"
              alignOffset={0}
              sideOffset={4}
              avoidCollisions={true}
              collisionPadding={16}
            >
              <div className="flex min-h-[320px] max-h-[400px]">
                {/* Categories Column */}
                <div className="w-1/2 border-r border-border bg-background">
                  <div className="p-3 h-full">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm mb-2 font-medium"
                      onClick={() => {
                        setSelectedCategory("");
                        setSelectedSubcategory("");
                      }}
                    >
                      Все категории
                    </Button>
                    <div className="space-y-1 overflow-y-auto max-h-[340px]">
                      {filterOptions.categories.map((category) => (
                        <Button
                          key={category.name}
                          variant="ghost"
                          className={`w-full justify-start text-sm transition-colors ${
                            hoveredCategory === category.name ||
                            selectedCategory === category.name
                              ? "bg-primary/10 text-primary"
                              : "text-foreground"
                          }`}
                          onMouseEnter={() => setHoveredCategory(category.name)}
                          onMouseLeave={() => setHoveredCategory("")}
                          onClick={() => {
                            setSelectedCategory(category.name);
                            setSelectedSubcategory("");
                          }}
                        >
                          {category.name}
                          <Icon
                            name="ChevronRight"
                            size={12}
                            className="ml-auto"
                          />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subcategories Column */}
                <div className="w-1/2 bg-background">
                  <div className="p-3 h-full">
                    {hoveredCategory && (
                      <>
                        <div className="text-sm font-medium text-foreground mb-2">
                          {hoveredCategory}
                        </div>
                        <div className="space-y-1 overflow-y-auto max-h-[340px]">
                          {filterOptions.categories
                            .find((cat) => cat.name === hoveredCategory)
                            ?.subcategories.map((sub) => (
                              <Button
                                key={sub}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-xs text-muted-foreground hover:text-primary hover:bg-primary/5"
                                onClick={() => {
                                  setSelectedCategory(hoveredCategory);
                                  setSelectedSubcategory(sub);
                                }}
                              >
                                {sub}
                              </Button>
                            ))}
                        </div>
                      </>
                    )}
                    {selectedCategory && !hoveredCategory && (
                      <>
                        <div className="text-sm font-medium text-foreground mb-2">
                          {selectedCategory}
                        </div>
                        <div className="space-y-1 overflow-y-auto max-h-[340px]">
                          {filterOptions.categories
                            .find((cat) => cat.name === selectedCategory)
                            ?.subcategories.map((sub) => (
                              <Button
                                key={sub}
                                variant="ghost"
                                size="sm"
                                className={`w-full justify-start text-xs transition-colors ${
                                  selectedSubcategory === sub
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                }`}
                                onClick={() => {
                                  setSelectedSubcategory(sub);
                                }}
                              >
                                {sub}
                              </Button>
                            ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
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

          {/* Price Range Slider with Input Fields */}
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
                  <span className="text-sm font-medium">Диапазон цен</span>
                  <Badge variant="outline" className="text-xs">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </Badge>
                </div>

                {/* Input Fields for Min and Max */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">От</label>
                    <Input
                      type="number"
                      value={minPrice}
                      onChange={(e) => handleMinPriceChange(e.target.value)}
                      className="h-8 text-sm"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">До</label>
                    <Input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => handleMaxPriceChange(e.target.value)}
                      className="h-8 text-sm"
                      placeholder="100000"
                    />
                  </div>
                </div>

                {/* Slider */}
                <Slider
                  value={priceRange}
                  onValueChange={handleSliderChange}
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
