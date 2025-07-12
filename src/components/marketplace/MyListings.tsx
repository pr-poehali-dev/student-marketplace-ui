import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { Listing, ListingStatus } from "@/types";

interface MyListingsProps {
  listings?: Listing[];
}

const MyListings = ({ listings = [] }: MyListingsProps) => {
  const [activeTab, setActiveTab] = useState<ListingStatus>("active");

  // Mock data for demonstration
  const mockListings: Listing[] = [
    {
      id: 1,
      title: "iPhone 14 Pro 128GB",
      price: "75 000 ₽",
      description: "Отличное состояние, все документы",
      image: "/api/placeholder/300/200",
      verified: true,
      dormitory: "Общежитие №1",
      category: "Электроника",
      status: "active",
      createdAt: "2024-01-15",
      views: 247,
    },
    {
      id: 2,
      title: "Учебники по математике",
      price: "2 500 ₽",
      description: "Комплект учебников за 1 курс",
      image: "/api/placeholder/300/200",
      verified: false,
      dormitory: "Общежитие №2",
      category: "Учебники",
      status: "pending",
      createdAt: "2024-01-14",
      views: 45,
    },
    {
      id: 3,
      title: "Велосипед горный",
      price: "15 000 ₽",
      description: "Состояние хорошее, недавно обслуживался",
      image: "/api/placeholder/300/200",
      verified: true,
      dormitory: "Общежитие №3",
      category: "Спорт",
      status: "stashed",
      createdAt: "2024-01-10",
      views: 128,
    },
    {
      id: 4,
      title: "Настольная лампа",
      price: "1 200 ₽",
      description: "Продано",
      image: "/api/placeholder/300/200",
      verified: true,
      dormitory: "Общежитие №1",
      category: "Дом и быт",
      status: "completed",
      createdAt: "2024-01-05",
      views: 89,
    },
  ];

  const getListingsByStatus = (status: ListingStatus) => {
    return mockListings.filter((listing) => listing.status === status);
  };

  const getStatusBadge = (status: ListingStatus) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Активно
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            На модерации
          </Badge>
        );
      case "stashed":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            В стеше
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Завершено
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTabCount = (status: ListingStatus) => {
    return getListingsByStatus(status).length;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  };

  const ListingCard = ({ listing }: { listing: Listing }) => (
    <div className="glass-surface rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-20 h-20 rounded-lg object-cover bg-muted"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-foreground truncate pr-2">
              {listing.title}
            </h3>
            {getStatusBadge(listing.status!)}
          </div>
          <p className="text-lg font-semibold text-primary mb-1">
            {listing.price}
          </p>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {listing.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Icon name="Eye" size={12} />
                {listing.views}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Calendar" size={12} />
                {formatDate(listing.createdAt!)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <Icon name="Edit" size={12} />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <Icon name="MoreHorizontal" size={12} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Мои объявления
        </h1>
        <p className="text-muted-foreground">Управляйте своими объявлениями</p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ListingStatus)}
      >
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="active" className="flex items-center gap-2">
            Активные
            {getTabCount("active") > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 text-xs">
                {getTabCount("active")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            На модерации
            {getTabCount("pending") > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 text-xs">
                {getTabCount("pending")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="stashed" className="flex items-center gap-2">
            В стеше
            {getTabCount("stashed") > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 text-xs">
                {getTabCount("stashed")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Завершенные
            {getTabCount("completed") > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 text-xs">
                {getTabCount("completed")}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {getListingsByStatus("active").length > 0 ? (
            getListingsByStatus("active").map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : (
            <div className="text-center py-12">
              <Icon
                name="Package"
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Нет активных объявлений
              </h3>
              <p className="text-muted-foreground mb-4">
                Создайте первое объявление
              </p>
              <Button className="glow-primary">
                <Icon name="Plus" size={16} className="mr-2" />
                Подать объявление
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {getListingsByStatus("pending").length > 0 ? (
            getListingsByStatus("pending").map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : (
            <div className="text-center py-12">
              <Icon
                name="Clock"
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Нет объявлений на модерации
              </h3>
              <p className="text-muted-foreground">
                Все ваши объявления прошли модерацию
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="stashed" className="space-y-4">
          {getListingsByStatus("stashed").length > 0 ? (
            getListingsByStatus("stashed").map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : (
            <div className="text-center py-12">
              <Icon
                name="Archive"
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Нет объявлений в стеше
              </h3>
              <p className="text-muted-foreground">
                Здесь будут храниться ваши скрытые объявления
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {getListingsByStatus("completed").length > 0 ? (
            getListingsByStatus("completed").map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : (
            <div className="text-center py-12">
              <Icon
                name="CheckCircle"
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Нет завершенных объявлений
              </h3>
              <p className="text-muted-foreground">
                Здесь будут отображаться проданные товары
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyListings;
