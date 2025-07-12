import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { FilterOptions } from "@/types";
import FilterSection from "./FilterSection";

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

        <FilterSection filterOptions={filterOptions} />
      </div>
    </section>
  );
};

export default SearchSection;
