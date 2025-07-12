import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { Listing, UserProfile } from "@/types";

interface ListingDetailProps {
  listingId: number;
}

const ListingDetail = ({ listingId }: ListingDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock listing data
  const mockListing: Listing & { photos: string[] } = {
    id: listingId,
    title: "iPhone 14 Pro 128GB Space Black",
    price: "75 000 ₽",
    description: `Продаю iPhone 14 Pro 128GB в цвете Space Black. 

Состояние отличное, всегда использовался в чехле и с защитным стеклом. Никаких царапин и потертостей нет.

В комплекте:
• Телефон iPhone 14 Pro 128GB
• Оригинальная коробка
• Кабель USB-C - Lightning
• Документы и чеки

Аккумулятор держит отлично, емкость 96%.
Face ID работает идеально.
Все функции работают без нареканий.

Причина продажи - переход на Android.
Торг возможен при личной встрече.`,
    image: "/api/placeholder/600/400",
    photos: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
    ],
    verified: true,
    dormitory: "Общежитие №2",
    category: "Электроника",
    subcategory: "Телефоны",
    condition: "used",
    status: "active",
    createdAt: "2024-01-10T12:00:00",
    views: 247,
    pushed: false,
  };

  // Mock seller data
  const mockSeller: UserProfile = {
    id: 101,
    name: "Анна Петрова",
    avatar: "/api/placeholder/80/80",
    dormitory: "Общежитие №2",
    joinedAt: "2023-09-01",
    rating: 4.8,
    totalSales: 47,
    totalReviews: 28,
    isOnline: true,
    bio: "Студентка 3 курса. Продаю только качественные вещи!",
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === mockListing.photos.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? mockListing.photos.length - 1 : prev - 1,
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={12}
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

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "new":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Новое
          </Badge>
        );
      case "used":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Б/у
          </Badge>
        );
      case "damaged":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Требует ремонта
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary">
            Главная
          </a>
          <Icon name="ChevronRight" size={12} />
          <a href="/" className="hover:text-primary">
            {mockListing.category}
          </a>
          <Icon name="ChevronRight" size={12} />
          <span className="text-foreground">{mockListing.title}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Photo Gallery */}
          <Card className="glass-surface">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={mockListing.photos[currentImageIndex]}
                    alt={`${mockListing.title} - фото ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {mockListing.photos.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={prevImage}
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={nextImage}
                    >
                      <Icon name="ChevronRight" size={20} />
                    </Button>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex gap-2">
                        {mockListing.photos.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-white/50"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {mockListing.verified && (
                  <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-500">
                    <Icon name="ShieldCheck" size={12} className="mr-1" />
                    Проверено
                  </Badge>
                )}
              </div>

              {/* Thumbnail strip */}
              {mockListing.photos.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {mockListing.photos.map((photo, index) => (
                      <button
                        key={index}
                        className={`flex-shrink-0 w-16 h-12 rounded border-2 transition-colors ${
                          index === currentImageIndex
                            ? "border-primary"
                            : "border-transparent hover:border-primary/50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={photo}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover rounded-sm"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Listing Info */}
          <Card className="glass-surface">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                      {mockListing.title}
                    </h1>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{mockListing.category}</Badge>
                      {mockListing.subcategory && (
                        <Badge variant="outline">
                          {mockListing.subcategory}
                        </Badge>
                      )}
                      {getConditionBadge(mockListing.condition!)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Icon
                      name="Heart"
                      size={20}
                      className={
                        isFavorite
                          ? "text-red-500 fill-red-500"
                          : "text-muted-foreground"
                      }
                    />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-primary">
                    {mockListing.price}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      {mockListing.views} просмотров
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {formatDate(mockListing.createdAt!)}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium text-foreground mb-3">Описание</h3>
                  <div className="prose prose-sm max-w-none">
                    {mockListing.description
                      .split("\n")
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-muted-foreground mb-2 last:mb-0"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <Icon
                    name="MapPin"
                    size={16}
                    className="text-muted-foreground"
                  />
                  <span className="text-sm text-muted-foreground">
                    {mockListing.dormitory}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Action Buttons */}
            <Card className="glass-surface">
              <CardContent className="p-4 space-y-3">
                <Button className="w-full glow-primary">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Написать продавцу
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Показать телефон
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Share" size={14} className="mr-1" />
                    Поделиться
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Flag" size={14} className="mr-1" />
                    Пожаловаться
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="glass-surface">
              <CardHeader>
                <CardTitle className="text-base">Продавец</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={mockSeller.avatar} />
                        <AvatarFallback>
                          {mockSeller.name
                            .split(" ")
                            .map((n) => n.charAt(0))
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {mockSeller.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">
                        {mockSeller.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        {renderStars(mockSeller.rating)}
                        <span className="text-sm text-muted-foreground ml-1">
                          {mockSeller.rating} ({mockSeller.totalReviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  {mockSeller.bio && (
                    <p className="text-sm text-muted-foreground">
                      {mockSeller.bio}
                    </p>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Продаж:</span>
                      <span className="font-medium">
                        {mockSeller.totalSales}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">На сайте с:</span>
                      <span className="font-medium">
                        {formatDate(mockSeller.joinedAt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Общежитие:</span>
                      <span className="font-medium">
                        {mockSeller.dormitory}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <a href={`/profile?user=${mockSeller.id}`}>
                      Профиль продавца
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="glass-surface">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Icon name="Shield" size={16} />
                  Безопасность
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Icon
                      name="CheckCircle"
                      size={14}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Встречайтесь в людных местах</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon
                      name="CheckCircle"
                      size={14}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Проверяйте товар перед покупкой</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon
                      name="CheckCircle"
                      size={14}
                      className="text-green-500 mt-0.5"
                    />
                    <span>Не передавайте деньги заранее</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
