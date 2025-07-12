import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Listing } from "@/types";

interface FavoritesProps {
  favorites?: Listing[];
}

const Favorites = ({ favorites = [] }: FavoritesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data for demonstration
  const mockFavorites: Listing[] = [
    {
      id: 1,
      title: "iPhone 14 Pro 128GB Space Black",
      price: "75 000 ₽",
      description:
        "Отличное состояние, все документы в наличии. Пользовался аккуратно, без падений.",
      image: "/api/placeholder/300/200",
      verified: true,
      dormitory: "Общежитие №1",
      category: "Электроника",
      createdAt: "2024-01-15",
      views: 247,
    },
    {
      id: 2,
      title: "Учебники по высшей математике",
      price: "2 500 ₽",
      description: "Комплект учебников за 1 курс, состояние хорошее",
      image: "/api/placeholder/300/200",
      verified: true,
      dormitory: "Общежитие №2",
      category: "Учебники",
      createdAt: "2024-01-14",
      views: 125,
    },
    {
      id: 3,
      title: "Велосипед горный Trek",
      price: "15 000 ₽",
      description: "Состояние отличное, недавно проходил ТО",
      image: "/api/placeholder/300/200",
      verified: false,
      dormitory: "Общежитие №3",
      category: "Спорт",
      createdAt: "2024-01-12",
      views: 89,
    },
    {
      id: 4,
      title: "Кофеварка DeLonghi",
      price: "8 500 ₽",
      description: "Автоматическая кофеварка, почти новая",
      image: "/api/placeholder/300/200",
      verified: true,
      dormitory: "Общежитие №1",
      category: "Дом и быт",
      createdAt: "2024-01-10",
      views: 156,
    },
    {
      id: 5,
      title: "Настольная лампа LED",
      price: "1 200 ₽",
      description: "Современная LED лампа с регулировкой яркости",
      image: "/api/placeholder/300/200",
      verified: true,
      dormitory: "Общежитие №2",
      category: "Дом и быт",
      createdAt: "2024-01-08",
      views: 78,
    },
  ];

  const categories = [
    "all",
    ...Array.from(new Set(mockFavorites.map((item) => item.category))),
  ];

  const filteredFavorites = mockFavorites
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
          );
        case "price-asc":
          return (
            parseInt(a.price.replace(/[^\d]/g, "")) -
            parseInt(b.price.replace(/[^\d]/g, ""))
          );
        case "price-desc":
          return (
            parseInt(b.price.replace(/[^\d]/g, "")) -
            parseInt(a.price.replace(/[^\d]/g, ""))
          );
        case "popular":
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  };

  const handleRemoveFromFavorites = (id: number) => {
    // Handle remove from favorites logic here
    console.log("Remove from favorites:", id);
  };

  const FavoriteCard = ({ listing }: { listing: Listing }) => (
    <div className="glass-surface rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="relative">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-48 object-cover bg-muted"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleRemoveFromFavorites(listing.id)}
        >
          <Icon name="Heart" size={16} className="text-red-500 fill-red-500" />
        </Button>
        {listing.verified && (
          <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-500">
            <Icon name="ShieldCheck" size={12} className="mr-1" />
            Проверено
          </Badge>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {listing.title}
        </h3>
        <p className="text-xl font-bold text-primary mb-2">{listing.price}</p>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {listing.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Icon name="MapPin" size={12} />
              {listing.dormitory}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Eye" size={12} />
              {listing.views}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Icon name="Calendar" size={12} />
            {formatDate(listing.createdAt!)}
          </span>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 h-8">Посмотреть</Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Icon name="MessageCircle" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Избранное</h1>
        <p className="text-muted-foreground">
          Сохраненные объявления ({mockFavorites.length})
        </p>
      </div>

      {/* Filters and Search */}
      <div className="glass-surface rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Поиск в избранном..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Все категории" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Сначала новые</SelectItem>
              <SelectItem value="oldest">Сначала старые</SelectItem>
              <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
              <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
              <SelectItem value="popular">По популярности</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {filteredFavorites.length > 0 ? (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            Найдено {filteredFavorites.length} из {mockFavorites.length}{" "}
            объявлений
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((listing) => (
              <FavoriteCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      ) : searchQuery || categoryFilter !== "all" ? (
        <div className="text-center py-12">
          <Icon
            name="SearchX"
            size={48}
            className="mx-auto text-muted-foreground mb-4"
          />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Ничего не найдено
          </h3>
          <p className="text-muted-foreground mb-4">
            Попробуйте изменить параметры поиска
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
              disabled={!searchQuery}
            >
              Очистить поиск
            </Button>
            <Button
              variant="outline"
              onClick={() => setCategoryFilter("all")}
              disabled={categoryFilter === "all"}
            >
              Все категории
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon
            name="Heart"
            size={48}
            className="mx-auto text-muted-foreground mb-4"
          />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Пока нет избранных
          </h3>
          <p className="text-muted-foreground mb-4">
            Добавляйте понравившиеся объявления в избранное
          </p>
          <Button>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Перейти к объявлениям
          </Button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
