import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { FilterOptions } from "@/types";

interface SearchSectionProps {
  filterOptions: FilterOptions;
}

const SearchSection = ({ filterOptions }: SearchSectionProps) => {
  return (
    <section className="py-8 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-foreground mb-3">
            Маркетплейс для студентов БФУ
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto font-light">
            Покупай и продавай товары и услуги внутри студенческого сообщества
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="glass-card rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Что ищете? Например: учебники, ноутбук, репетитор..."
                  className="pl-10 h-10 text-sm border-0 bg-white/50"
                />
              </div>
              <Button size="sm" className="h-10 px-6 glow-primary">
                <Icon name="Search" size={16} className="mr-1.5" />
                Найти
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-surface rounded-lg p-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Select>
                <SelectTrigger className="bg-white/50 border-0 h-9 text-sm">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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

              <Select>
                <SelectTrigger className="bg-white/50 border-0 h-9 text-sm">
                  <SelectValue placeholder="Цена" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
      </div>
    </section>
  );
};

export default SearchSection;
