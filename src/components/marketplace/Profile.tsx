import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { UserProfile, Review, Listing } from "@/types";

interface ProfileProps {
  isOwnProfile?: boolean;
  userId?: string;
}

const Profile = ({ isOwnProfile = false }: ProfileProps) => {
  const [activeTab, setActiveTab] = useState("active");

  // Mock user data
  const mockProfile: UserProfile = {
    id: 1,
    name: "Анна Петрова",
    avatar: "/api/placeholder/120/120",
    email: "anna.petrova@student.bfu.edu",
    phone: "+7 (900) 123-45-67",
    dormitory: "Общежитие №2",
    joinedAt: "2023-09-01",
    rating: 4.8,
    totalSales: 47,
    totalReviews: 28,
    isOnline: true,
    bio: "Студентка 3 курса. Продаю только качественные вещи! Быстро отвечаю на сообщения.",
  };

  // Mock listings
  const mockActiveListings: Listing[] = [
    {
      id: 1,
      title: "iPhone 14 Pro 128GB",
      price: "75 000 ₽",
      description: "Отличное состояние",
      image: "/api/placeholder/300/200",
      verified: true,
      dormitory: "Общежитие №2",
      category: "Электроника",
      views: 145,
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      title: "Учебники по математике",
      price: "2 500 ₽",
      description: "Комплект за 1 курс",
      image: "/api/placeholder/300/200",
      verified: true,
      dormitory: "Общежитие №2",
      category: "Учебники",
      views: 89,
      createdAt: "2024-01-08",
    },
  ];

  const mockSoldListings: Listing[] = [
    {
      id: 3,
      title: "Ноутбук ASUS",
      price: "45 000 ₽",
      description: "Продан",
      image: "/api/placeholder/300/200",
      verified: true,
      dormitory: "Общежитие №2",
      category: "Электроника",
      views: 203,
      createdAt: "2023-12-15",
    },
  ];

  // Mock reviews
  const mockReviews: Review[] = [
    {
      id: 1,
      authorName: "Михаил К.",
      rating: 5,
      comment:
        "Отличный продавец! Товар соответствует описанию, быстрая доставка. Рекомендую!",
      createdAt: "2024-01-12",
      listingTitle: "Велосипед горный",
    },
    {
      id: 2,
      authorName: "Елена С.",
      rating: 5,
      comment: "Все супер! Анна очень отзывчивая, товар в отличном состоянии.",
      createdAt: "2024-01-05",
      listingTitle: "Учебники по физике",
    },
    {
      id: 3,
      authorName: "Дмитрий В.",
      rating: 4,
      comment: "Хороший продавец, но немного долго отвечал на сообщения.",
      createdAt: "2023-12-28",
      listingTitle: "Кофеварка",
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={14}
            className={`${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) return "Сегодня";
    if (diffInDays === 1) return "Вчера";
    if (diffInDays < 7) return `${diffInDays} дн. назад`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} нед. назад`;
    return `${Math.floor(diffInDays / 30)} мес. назад`;
  };

  const ListingCard = ({ listing }: { listing: Listing }) => (
    <Card className="glass-surface hover:shadow-md transition-all">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-16 h-16 rounded-lg object-cover bg-muted"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{listing.title}</h4>
            <p className="text-primary font-semibold text-sm">
              {listing.price}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {listing.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="Eye" size={10} />
                {listing.views}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ReviewCard = ({ review }: { review: Review }) => (
    <Card className="glass-surface">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">
              {review.authorName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-sm">{review.authorName}</p>
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-xs text-muted-foreground">
                    {getTimeAgo(review.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {review.comment}
            </p>
            {review.listingTitle && (
              <Badge variant="outline" className="text-xs">
                {review.listingTitle}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Profile Section */}
        <div className="lg:col-span-1">
          <Card className="glass-surface">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={mockProfile.avatar} />
                    <AvatarFallback className="text-xl">
                      {mockProfile.name
                        .split(" ")
                        .map((n) => n.charAt(0))
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {mockProfile.isOnline && (
                    <div className="absolute bottom-4 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <h1 className="text-xl font-bold text-foreground mb-2">
                  {mockProfile.name}
                </h1>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {renderStars(mockProfile.rating)}
                  <span className="text-sm font-medium ml-1">
                    {mockProfile.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({mockProfile.totalReviews} отзывов)
                  </span>
                </div>
                <Badge variant="secondary" className="mb-4">
                  <Icon name="MapPin" size={12} className="mr-1" />
                  {mockProfile.dormitory}
                </Badge>
              </div>

              {mockProfile.bio && (
                <div className="mb-6">
                  <h3 className="font-medium text-sm mb-2">О продавце</h3>
                  <p className="text-sm text-muted-foreground">
                    {mockProfile.bio}
                  </p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Продаж:</span>
                  <span className="font-medium">{mockProfile.totalSales}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    На сайте с:
                  </span>
                  <span className="font-medium">
                    {formatDate(mockProfile.joinedAt)}
                  </span>
                </div>
                {mockProfile.isOnline ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Статус:
                    </span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      <Icon
                        name="Circle"
                        size={8}
                        className="mr-1 fill-green-500"
                      />
                      Онлайн
                    </Badge>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Был в сети:
                    </span>
                    <span className="text-sm">{mockProfile.lastSeen}</span>
                  </div>
                )}
              </div>

              {!isOwnProfile && (
                <div className="space-y-3">
                  <Button className="w-full glow-primary">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Написать сообщение
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Phone" size={14} className="mr-1" />
                      Позвонить
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Flag" size={14} className="mr-1" />
                      Пожаловаться
                    </Button>
                  </div>
                </div>
              )}

              {isOwnProfile && (
                <Button variant="outline" className="w-full">
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать профиль
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Content Section */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="active" className="flex items-center gap-2">
                Активные
                <Badge variant="secondary" className="h-5 text-xs">
                  {mockActiveListings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="sold" className="flex items-center gap-2">
                Проданные
                <Badge variant="secondary" className="h-5 text-xs">
                  {mockSoldListings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                Отзывы
                <Badge variant="secondary" className="h-5 text-xs">
                  {mockReviews.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {mockActiveListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockActiveListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
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
                  <p className="text-muted-foreground">
                    {isOwnProfile
                      ? "Создайте первое объявление"
                      : "Пользователь не продает товары"}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="sold" className="space-y-4">
              {mockSoldListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockSoldListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon
                    name="CheckCircle"
                    size={48}
                    className="mx-auto text-muted-foreground mb-4"
                  />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Нет проданных товаров
                  </h3>
                  <p className="text-muted-foreground">
                    История продаж пока пуста
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              {mockReviews.length > 0 ? (
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon
                    name="Star"
                    size={48}
                    className="mx-auto text-muted-foreground mb-4"
                  />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Нет отзывов
                  </h3>
                  <p className="text-muted-foreground">
                    Отзывы появятся после первых продаж
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
