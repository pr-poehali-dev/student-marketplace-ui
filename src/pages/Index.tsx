import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const vipListings = [
    {
      id: 1,
      title: 'MacBook Pro 14" M3',
      price: "85 000 ₽",
      description: "Как новый, гарантия до 2025 года",
      image: "/img/816a7c3b-6f30-4725-9463-6c8e08377da5.jpg",
      verified: true,
      dormitory: "7",
      category: "Электроника",
    },
    {
      id: 2,
      title: "Комплект учебников по математике",
      price: "3 500 ₽",
      description: "Все учебники за 1-2 курс, отличное состояние",
      image: "/img/c9f47189-cf58-4488-b450-1afb51e90349.jpg",
      verified: true,
      dormitory: "12",
      category: "Учебники",
    },
  ];

  const regularListings = [
    {
      id: 3,
      title: "Велосипед складной",
      price: "12 000 ₽",
      description: "Отлично подходит для поездок по кампусу",
      image: "/img/19fcc879-a72f-40bf-ace2-5e85cb6fd86d.jpg",
      verified: false,
      dormitory: "3",
      category: "Транспорт",
      pushed: true,
    },
    {
      id: 4,
      title: "Репетиторство по физике",
      price: "800 ₽/час",
      description: "Помогу подготовиться к экзаменам",
      image: "/placeholder.svg",
      verified: true,
      dormitory: "8",
      category: "Услуги",
      pushed: true,
    },
    {
      id: 5,
      title: "Настольная лампа IKEA",
      price: "1 200 ₽",
      description: "Почти новая, идеальная для учебы",
      image: "/placeholder.svg",
      verified: false,
      dormitory: "5",
      category: "Мебель",
      pushed: false,
    },
    {
      id: 6,
      title: "Планшет Samsung Galaxy Tab",
      price: "18 000 ₽",
      description: "Для заметок и чтения, с стилусом",
      image: "/placeholder.svg",
      verified: true,
      dormitory: "11",
      category: "Электроника",
      pushed: false,
    },
    {
      id: 7,
      title: "Кофемашина Delonghi",
      price: "15 000 ₽",
      description: "Для общей кухни в общаге",
      image: "/placeholder.svg",
      verified: false,
      dormitory: "2",
      category: "Техника",
      pushed: false,
    },
    {
      id: 8,
      title: "Курсовые и дипломы на заказ",
      price: "от 5 000 ₽",
      description: "Качественное выполнение работ",
      image: "/placeholder.svg",
      verified: true,
      dormitory: "9",
      category: "Услуги",
      pushed: false,
    },
  ];

  const categories = [
    "Все категории",
    "Электроника",
    "Учебники",
    "Мебель",
    "Одежда",
    "Транспорт",
    "Услуги",
    "Техника",
    "Спорт",
  ];

  const dormitories = [
    "Все общежития",
    "Общага 1",
    "Общага 2",
    "Общага 3",
    "Общага 4",
    "Общага 5",
    "Общага 6",
    "Общага 7",
    "Общага 8",
    "Общага 9",
    "Общага 10",
    "Общага 11",
    "Общага 12",
    "Общага 13",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header */}
      <header className="glass-surface border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">
                stu<span className="text-accent">DD</span>eal
              </h1>
              <Badge variant="secondary" className="hidden md:flex">
                БФУ маркетплейс
              </Badge>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Главная
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Мои объявления
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Избранное
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="outline" className="hidden md:flex">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Сообщения
              </Button>
              <Button className="glow-primary">
                <Icon name="Plus" size={16} className="mr-2" />
                Подать объявление
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Маркетплейс для студентов БФУ
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Покупай и продавай товары и услуги внутри студенческого сообщества
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="glass-card rounded-2xl p-6 px-3 py-3">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Icon
                    name="Search"
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    placeholder="Что ищете? Например: учебники, ноутбук, репетитор..."
                    className="pl-10 h-12 text-base border-0 bg-white/50"
                  />
                </div>
                <Button size="lg" className="h-12 px-8 glow-primary">
                  <Icon name="Search" size={18} className="mr-2" />
                  Найти
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="max-w-6xl mx-auto">
            <div className="glass-surface rounded-xl p-4 px-2">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select>
                  <SelectTrigger className="bg-white/50 border-0">
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white/50 border-0">
                    <SelectValue placeholder="Общежитие" />
                  </SelectTrigger>
                  <SelectContent>
                    {dormitories.map((dorm) => (
                      <SelectItem key={dorm} value={dorm.toLowerCase()}>
                        {dorm}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white/50 border-0">
                    <SelectValue placeholder="Цена" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1000">До 1 000 ₽</SelectItem>
                    <SelectItem value="1000-5000">1 000 - 5 000 ₽</SelectItem>
                    <SelectItem value="5000-15000">5 000 - 15 000 ₽</SelectItem>
                    <SelectItem value="15000+">От 15 000 ₽</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white/50 border-0">
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Сначала новые</SelectItem>
                    <SelectItem value="price-low">Сначала дешевые</SelectItem>
                    <SelectItem value="price-high">Сначала дорогие</SelectItem>
                    <SelectItem value="popular">Популярные</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Listings Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="glass-card rounded-2xl p-6 mb-8 glow-accent">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Icon name="Crown" size={24} className="text-accent" />
                <h3 className="text-2xl font-semibold">VIP объявления</h3>
                <Badge className="bg-accent text-accent-foreground">
                  Премиум
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                Все VIP
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vipListings.map((listing) => (
                <Card
                  key={listing.id}
                  className="glass-surface border-accent/20 hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-foreground truncate">
                            {listing.title}
                          </h4>
                          {listing.verified && (
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-primary flex-shrink-0 ml-2"
                            />
                          )}
                        </div>
                        <p className="text-2xl font-bold text-primary mb-2">
                          {listing.price}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {listing.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {listing.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Общага {listing.dormitory}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Icon name="Heart" size={14} />
                            </Button>
                            <Button size="sm">
                              <Icon
                                name="MessageCircle"
                                size={14}
                                className="mr-1"
                              />
                              Написать
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regular Listings */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Все объявления</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Найдено: 1,247 объявлений</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularListings.map((listing) => (
              <Card
                key={listing.id}
                className={`glass-surface hover:shadow-lg transition-all duration-300 group ${
                  listing.pushed ? "ring-2 ring-primary/20 glow-primary" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {listing.pushed && (
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                        <Icon name="TrendingUp" size={12} className="mr-1" />
                        Продвинуто
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Icon name="Heart" size={14} />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-foreground text-sm line-clamp-2 flex-1">
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

                    <p className="text-lg font-bold text-primary">
                      {listing.price}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {listing.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {listing.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Общага {listing.dormitory}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 mr-2"
                      >
                        <Icon name="MessageCircle" size={12} className="mr-1" />
                        Написать
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Icon name="Share" size={12} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="glass-surface rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <Icon name="ChevronLeft" size={14} />
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span className="px-2 text-muted-foreground">...</span>
                <Button variant="outline" size="sm">
                  25
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="ChevronRight" size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-primary mb-4">stuDDeal</h4>
              <p className="text-sm text-muted-foreground">
                Маркетплейс для студентов БФУ. Покупай и продавай легко и
                безопасно.
              </p>
            </div>
            <div>
              <h5 className="font-medium mb-4">Категории</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Электроника
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Учебники
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Услуги
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Мебель
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Помощь</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Как продавать
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Как покупать
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Правила
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Поддержка
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Контакты</h5>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">БФУ им. И. Канта</li>
                <li className="text-muted-foreground">support@studdeal.ru</li>
                <li className="text-muted-foreground">Telegram: @studdeal</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 stuDDeal. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
