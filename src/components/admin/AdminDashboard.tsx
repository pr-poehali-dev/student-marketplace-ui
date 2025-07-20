import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('analytics');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [listingSearchTerm, setListingSearchTerm] = useState('');

  // Mock analytics data
  const analyticsData = {
    totalUsers: 2847,
    activeUsers: 1923,
    totalListings: 8461,
    activeListings: 6789,
    totalSales: 1234,
    revenue: 2847650,
    pendingReports: 12,
    pendingListings: 8,
    userGrowth: [
      { date: '2024-01-15', count: 2650 },
      { date: '2024-01-16', count: 2678 },
      { date: '2024-01-17', count: 2712 },
      { date: '2024-01-18', count: 2789 },
      { date: '2024-01-19', count: 2824 },
      { date: '2024-01-20', count: 2847 }
    ],
    categoryStats: [
      { category: 'Электроника', count: 3245, percentage: 38.3 },
      { category: 'Одежда', count: 2156, percentage: 25.5 },
      { category: 'Учеба', count: 1534, percentage: 18.1 },
      { category: 'Спорт', count: 987, percentage: 11.7 },
      { category: 'Другое', count: 539, percentage: 6.4 }
    ],
    dormitoryStats: [
      { dormitory: 'Общежитие №1', users: 652, listings: 1789 },
      { dormitory: 'Общежитие №2', users: 598, listings: 1654 },
      { dormitory: 'Общежитие №3', users: 524, listings: 1432 },
      { dormitory: 'Общежитие №4', users: 487, listings: 1298 },
      { dormitory: 'Общежитие №5', users: 586, listings: 1611 }
    ]
  };

  // Mock users data
  const mockUsers = [
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: '/api/placeholder/40/40',
      email: 'anna.petrova@example.com',
      dormitory: 'Общежитие №2',
      role: 'user' as const,
      status: 'active' as const,
      joinedAt: '2023-09-15',
      totalListings: 23,
      totalSales: 18,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Дмитрий Соколов',
      avatar: '/api/placeholder/40/40',
      email: 'dmitry.sokolov@example.com',
      dormitory: 'Общежитие №1',
      role: 'moderator' as const,
      status: 'active' as const,
      joinedAt: '2023-08-12',
      totalListings: 5,
      totalSales: 5,
      rating: 4.9
    }
  ];

  // Mock listings data
  const mockListings = [
    {
      id: 301,
      title: 'iPhone 14 Pro 128GB',
      price: '75 000 ₽',
      category: 'Электроника',
      dormitory: 'Общежитие №2',
      status: 'active' as const,
      createdAt: '2024-01-20',
      views: 247,
      userId: 1,
      userName: 'Анна Петрова'
    },
    {
      id: 302,
      title: 'MacBook Air M2',
      price: '85 000 ₽',
      category: 'Электроника',
      dormitory: 'Общежитие №3',
      status: 'pending' as const,
      createdAt: '2024-01-20',
      views: 45,
      userId: 3,
      userName: 'Елена Волкова'
    }
  ];

  // Mock moderators data
  const mockModerators = [
    {
      id: 2,
      name: 'Дмитрий Соколов',
      avatar: '/api/placeholder/40/40',
      email: 'dmitry.sokolov@example.com',
      dormitory: 'Общежитие №1',
      role: 'moderator' as const,
      status: 'active' as const,
      joinedAt: '2023-08-12',
      actionsToday: 12,
      totalActions: 456,
      performance: 94
    }
  ];

  // Mock subscriptions data
  const mockSubscriptions = [
    {
      id: 1,
      userId: 1,
      userName: 'Анна Петрова',
      userAvatar: '/api/placeholder/40/40',
      type: 'premium' as const,
      status: 'active' as const,
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      price: 299
    }
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'blocked': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'suspended': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'pending': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'moderator': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'user': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getSubscriptionColor = (type: string) => {
    switch (type) {
      case 'vip': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'premium': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'basic': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Панель администратора
          </h1>
          <p className="text-muted-foreground">
            Управление платформой и аналитика
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="glass-surface">
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="listings">Объявления</TabsTrigger>
            <TabsTrigger value="moderators">Модераторы</TabsTrigger>
            <TabsTrigger value="subscriptions">Подписки</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-surface">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon name="Users" size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {formatNumber(analyticsData.totalUsers)}
                      </p>
                      <p className="text-sm text-muted-foreground">Всего пользователей</p>
                      <p className="text-xs text-green-600">
                        +{formatNumber(analyticsData.activeUsers)} активных
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-surface">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Icon name="Package" size={24} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {formatNumber(analyticsData.totalListings)}
                      </p>
                      <p className="text-sm text-muted-foreground">Всего объявлений</p>
                      <p className="text-xs text-green-600">
                        +{formatNumber(analyticsData.activeListings)} активных
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-surface">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Icon name="TrendingUp" size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {formatNumber(analyticsData.totalSales)}
                      </p>
                      <p className="text-sm text-muted-foreground">Продаж</p>
                      <p className="text-xs text-green-600">
                        ₽{formatNumber(analyticsData.revenue)} оборот
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-surface">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <Icon name="AlertTriangle" size={24} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {analyticsData.pendingReports}
                      </p>
                      <p className="text-sm text-muted-foreground">Жалобы</p>
                      <p className="text-xs text-yellow-600">
                        +{analyticsData.pendingListings} на модерации
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Distribution */}
              <Card className="glass-surface">
                <CardHeader>
                  <CardTitle>Распределение по категориям</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.categoryStats.map((category) => (
                      <div key={category.category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{category.category}</span>
                          <span className="text-muted-foreground">
                            {category.count} ({category.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dormitory Stats */}
              <Card className="glass-surface">
                <CardHeader>
                  <CardTitle>Статистика по общежитиям</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.dormitoryStats.map((dormitory) => (
                      <div key={dormitory.dormitory} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <p className="font-medium">{dormitory.dormitory}</p>
                          <p className="text-sm text-muted-foreground">
                            {dormitory.users} пользователей
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{dormitory.listings}</p>
                          <p className="text-xs text-muted-foreground">объявлений</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Growth Chart */}
            <Card className="glass-surface">
              <CardHeader>
                <CardTitle>Рост пользователей (последние 7 дней)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {analyticsData.userGrowth.map((day, index) => (
                    <div key={day.date} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-primary rounded-t"
                        style={{
                          height: `${(day.count / Math.max(...analyticsData.userGrowth.map(d => d.count))) * 200}px`
                        }}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(day.date).getDate()}.{new Date(day.date).getMonth() + 1}
                      </p>
                      <p className="text-xs font-medium">{day.count}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="glass-surface">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Управление пользователями</CardTitle>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Поиск пользователей..."
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Button variant="outline">
                      <Icon name="Download" size={16} className="mr-2" />
                      Экспорт
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground">{user.name}</h4>
                            <Badge className={getRoleColor(user.role)}>
                              {user.role === 'admin' ? 'Админ' : 
                               user.role === 'moderator' ? 'Модератор' : 'Пользователь'}
                            </Badge>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status === 'active' ? 'Активен' :
                               user.status === 'blocked' ? 'Заблокирован' : 'Приостановлен'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{user.email}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{user.dormitory}</span>
                            <span>Регистрация: {formatDate(user.joinedAt)}</span>
                            <span>{user.totalListings} объявлений</span>
                            <span>{user.totalSales} продаж</span>
                            <span>Рейтинг: {user.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Профиль
                          </Button>
                          <Select>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Действия" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="edit">Редактировать</SelectItem>
                              <SelectItem value="block">Заблокировать</SelectItem>
                              <SelectItem value="promote">Модератор</SelectItem>
                              <SelectItem value="delete">Удалить</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <Card className="glass-surface">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Управление объявлениями</CardTitle>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Поиск объявлений..."
                      value={listingSearchTerm}
                      onChange={(e) => setListingSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="active">Активные</SelectItem>
                        <SelectItem value="pending">На модерации</SelectItem>
                        <SelectItem value="rejected">Отклонённые</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {mockListings.map((listing) => (
                    <div key={listing.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-muted rounded"></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground">{listing.title}</h4>
                            <Badge className={getStatusColor(listing.status)}>
                              {listing.status === 'active' ? 'Активно' :
                               listing.status === 'pending' ? 'На модерации' : 'Отклонено'}
                            </Badge>
                          </div>
                          <p className="text-lg font-bold text-primary mb-1">{listing.price}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{listing.category}</span>
                            <span>{listing.dormitory}</span>
                            <span>От {listing.userName}</span>
                            <span>{formatDate(listing.createdAt)}</span>
                            <span>{listing.views} просмотров</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Открыть
                          </Button>
                          <Select>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Действия" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="edit">Редактировать</SelectItem>
                              <SelectItem value="promote">Продвинуть</SelectItem>
                              <SelectItem value="hide">Скрыть</SelectItem>
                              <SelectItem value="delete">Удалить</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderators Tab */}
          <TabsContent value="moderators" className="space-y-6">
            <Card className="glass-surface">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Управление модераторами</CardTitle>
                  <Button>
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Добавить модератора
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {mockModerators.map((moderator) => (
                    <div key={moderator.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={moderator.avatar} />
                          <AvatarFallback>{moderator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground">{moderator.name}</h4>
                            <Badge className={getStatusColor(moderator.status)}>
                              {moderator.status === 'active' ? 'Активен' : 'Неактивен'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{moderator.email}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{moderator.dormitory}</span>
                            <span>С {formatDate(moderator.joinedAt)}</span>
                            <span>Сегодня: {moderator.actionsToday} действий</span>
                            <span>Всего: {moderator.totalActions}</span>
                            <span>Эффективность: {moderator.performance}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Статистика
                          </Button>
                          <Select>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Действия" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="edit">Редактировать</SelectItem>
                              <SelectItem value="permissions">Права</SelectItem>
                              <SelectItem value="suspend">Приостановить</SelectItem>
                              <SelectItem value="remove">Снять права</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <Card className="glass-surface">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Управление подписками</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Icon name="Download" size={16} className="mr-2" />
                      Экспорт
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {mockSubscriptions.map((subscription) => (
                    <div key={subscription.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={subscription.userAvatar} />
                          <AvatarFallback>{subscription.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground">{subscription.userName}</h4>
                            <Badge className={getSubscriptionColor(subscription.type)}>
                              {subscription.type.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(subscription.status)}>
                              {subscription.status === 'active' ? 'Активна' :
                               subscription.status === 'expired' ? 'Истекла' : 'Отменена'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>С {formatDate(subscription.startDate)}</span>
                            <span>До {formatDate(subscription.endDate)}</span>
                            <span>{subscription.price} ₽/месяц</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Детали
                          </Button>
                          <Select>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Действия" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="extend">Продлить</SelectItem>
                              <SelectItem value="cancel">Отменить</SelectItem>
                              <SelectItem value="refund">Возврат</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;