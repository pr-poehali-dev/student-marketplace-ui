import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Report {
  id: number;
  reporterId: number;
  reporter: { name: string; avatar: string };
  targetType: 'listing' | 'user' | 'message';
  targetId: number;
  target?: any;
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  evidence?: string[];
}

interface PendingListing {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
  dormitory: string;
  userId: number;
  user: { name: string; avatar: string };
  createdAt: string;
  reason?: string;
}

const ModeratorDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('reports');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedListing, setSelectedListing] = useState<PendingListing | null>(null);
  const [resolution, setResolution] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  // Mock data
  const mockReports: Report[] = [
    {
      id: 1,
      reporterId: 101,
      reporter: { name: 'Анна Петрова', avatar: '/api/placeholder/40/40' },
      targetType: 'listing',
      targetId: 201,
      target: {
        title: 'iPhone 14 Pro за 30000₽',
        image: '/api/placeholder/100/100'
      },
      reason: 'Подозрительная цена',
      description: 'Цена слишком низкая для нового iPhone 14 Pro. Возможно мошенничество.',
      status: 'pending',
      priority: 'high',
      createdAt: '2024-01-20T10:30:00',
      evidence: ['/api/placeholder/200/150', '/api/placeholder/200/150']
    },
    {
      id: 2,
      reporterId: 102,
      reporter: { name: 'Дмитрий Соколов', avatar: '/api/placeholder/40/40' },
      targetType: 'user',
      targetId: 301,
      target: {
        name: 'Сергей Иванов',
        avatar: '/api/placeholder/40/40'
      },
      reason: 'Неадекватное поведение',
      description: 'Пользователь оскорбляет покупателей в сообщениях.',
      status: 'pending',
      priority: 'medium',
      createdAt: '2024-01-20T09:15:00'
    }
  ];

  const mockPendingListings: PendingListing[] = [
    {
      id: 301,
      title: 'MacBook Air M2 2022',
      price: '85 000 ₽',
      description: 'Продаю MacBook Air с чипом M2, 8GB RAM, 256GB SSD. Состояние отличное.',
      image: '/api/placeholder/200/150',
      category: 'Электроника',
      dormitory: 'Общежитие №3',
      userId: 401,
      user: { name: 'Елена Волкова', avatar: '/api/placeholder/40/40' },
      createdAt: '2024-01-20T11:00:00'
    },
    {
      id: 302,
      title: 'Учебники по математике',
      price: '2 500 ₽',
      description: 'Комплект учебников по высшей математике для 1-2 курса.',
      image: '/api/placeholder/200/150',
      category: 'Учеба',
      dormitory: 'Общежитие №1',
      userId: 402,
      user: { name: 'Алексей Морозов', avatar: '/api/placeholder/40/40' },
      createdAt: '2024-01-20T10:45:00'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'low': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'reviewed': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'resolved': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'dismissed': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  const handleReportAction = (action: 'resolve' | 'dismiss') => {
    if (!selectedReport) return;
    // Здесь будет API вызов
    console.log(`${action} report ${selectedReport.id} with resolution: ${resolution}`);
    setSelectedReport(null);
    setResolution('');
  };

  const handleListingAction = (action: 'approve' | 'reject') => {
    if (!selectedListing) return;
    // Здесь будет API вызов
    console.log(`${action} listing ${selectedListing.id}`, action === 'reject' ? `reason: ${rejectionReason}` : '');
    setSelectedListing(null);
    setRejectionReason('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Панель модератора
          </h1>
          <p className="text-muted-foreground">
            Управление жалобами и модерация новых объявлений
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Icon name="AlertTriangle" size={24} className="text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Активные жалобы</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon name="Clock" size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-sm text-muted-foreground">На модерации</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Icon name="CheckCircle" size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">47</p>
                  <p className="text-sm text-muted-foreground">Решено сегодня</p>
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
                  <p className="text-2xl font-bold text-foreground">92%</p>
                  <p className="text-sm text-muted-foreground">Эффективность</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="glass-surface">
            <TabsTrigger value="reports">Жалобы</TabsTrigger>
            <TabsTrigger value="listings">Модерация объявлений</TabsTrigger>
            <TabsTrigger value="actions">История действий</TabsTrigger>
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Reports List */}
              <div className="lg:col-span-2">
                <Card className="glass-surface">
                  <CardHeader>
                    <CardTitle>Активные жалобы</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {mockReports.map((report) => (
                        <div
                          key={report.id}
                          className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedReport?.id === report.id ? 'bg-primary/10' : ''
                          }`}
                          onClick={() => setSelectedReport(report)}
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={report.reporter.avatar} />
                              <AvatarFallback>
                                {report.reporter.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={getPriorityColor(report.priority)}>
                                  {report.priority === 'high' ? 'Высокий' : 
                                   report.priority === 'medium' ? 'Средний' : 'Низкий'}
                                </Badge>
                                <Badge className={getStatusColor(report.status)}>
                                  {report.status === 'pending' ? 'На рассмотрении' : 
                                   report.status === 'reviewed' ? 'Рассмотрено' :
                                   report.status === 'resolved' ? 'Решено' : 'Отклонено'}
                                </Badge>
                              </div>
                              <h4 className="font-medium text-foreground mb-1">
                                {report.reason}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {report.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                От {report.reporter.name} • {formatDate(report.createdAt)}
                              </p>
                            </div>
                            {report.targetType === 'listing' && report.target && (
                              <img
                                src={report.target.image}
                                alt=""
                                className="w-16 h-12 object-cover rounded"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Report Detail */}
              <div className="lg:col-span-1">
                {selectedReport ? (
                  <Card className="glass-surface">
                    <CardHeader>
                      <CardTitle>Детали жалобы #{selectedReport.id}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Причина:</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedReport.reason}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Описание:</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedReport.description}
                        </p>
                      </div>

                      {selectedReport.target && (
                        <div>
                          <h4 className="font-medium mb-2">Объект жалобы:</h4>
                          {selectedReport.targetType === 'listing' ? (
                            <div className="p-3 border border-border rounded-lg">
                              <div className="flex items-center gap-3">
                                <img
                                  src={selectedReport.target.image}
                                  alt=""
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium text-sm">
                                    {selectedReport.target.title}
                                  </p>
                                  <Button variant="link" size="sm" className="p-0 h-auto">
                                    Посмотреть объявление
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 border border-border rounded-lg">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={selectedReport.target.avatar} />
                                  <AvatarFallback>
                                    {selectedReport.target.name?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">
                                    {selectedReport.target.name}
                                  </p>
                                  <Button variant="link" size="sm" className="p-0 h-auto">
                                    Посмотреть профиль
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedReport.evidence && selectedReport.evidence.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Доказательства:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedReport.evidence.map((evidence, index) => (
                              <img
                                key={index}
                                src={evidence}
                                alt={`Evidence ${index + 1}`}
                                className="w-full h-20 object-cover rounded cursor-pointer"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium mb-2">Решение:</h4>
                        <Textarea
                          placeholder="Опишите принятое решение..."
                          value={resolution}
                          onChange={(e) => setResolution(e.target.value)}
                          className="mb-3"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleReportAction('resolve')}
                            className="flex-1"
                            disabled={!resolution.trim()}
                          >
                            Решить
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleReportAction('dismiss')}
                            className="flex-1"
                          >
                            Отклонить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="glass-surface">
                    <CardContent className="p-6 text-center">
                      <Icon name="MousePointerClick" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Выберите жалобу для просмотра деталей
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Listings List */}
              <div className="lg:col-span-2">
                <Card className="glass-surface">
                  <CardHeader>
                    <CardTitle>Объявления на модерации</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {mockPendingListings.map((listing) => (
                        <div
                          key={listing.id}
                          className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedListing?.id === listing.id ? 'bg-primary/10' : ''
                          }`}
                          onClick={() => setSelectedListing(listing)}
                        >
                          <div className="flex items-start gap-4">
                            <img
                              src={listing.image}
                              alt=""
                              className="w-20 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-foreground mb-1">
                                {listing.title}
                              </h4>
                              <p className="text-lg font-bold text-primary mb-2">
                                {listing.price}
                              </p>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {listing.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>{listing.category}</span>
                                <span>{listing.dormitory}</span>
                                <span>{formatDate(listing.createdAt)}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={listing.user.avatar} />
                                  <AvatarFallback>
                                    {listing.user.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">
                                  {listing.user.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Listing Detail */}
              <div className="lg:col-span-1">
                {selectedListing ? (
                  <Card className="glass-surface">
                    <CardHeader>
                      <CardTitle>Объявление #{selectedListing.id}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <img
                          src={selectedListing.image}
                          alt=""
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      </div>

                      <div>
                        <h4 className="font-medium mb-1">{selectedListing.title}</h4>
                        <p className="text-xl font-bold text-primary">{selectedListing.price}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Описание:</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedListing.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Категория:</span>
                          <p className="font-medium">{selectedListing.category}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Общежитие:</span>
                          <p className="font-medium">{selectedListing.dormitory}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Продавец:</h4>
                        <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={selectedListing.user.avatar} />
                            <AvatarFallback>
                              {selectedListing.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{selectedListing.user.name}</p>
                            <Button variant="link" size="sm" className="p-0 h-auto">
                              Посмотреть профиль
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Select value={rejectionReason} onValueChange={setRejectionReason}>
                          <SelectTrigger>
                            <SelectValue placeholder="Причина отклонения (если нужна)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inappropriate">Неподходящий контент</SelectItem>
                            <SelectItem value="spam">Спам</SelectItem>
                            <SelectItem value="duplicate">Дубликат</SelectItem>
                            <SelectItem value="prohibited">Запрещенный товар</SelectItem>
                            <SelectItem value="fake">Поддельный товар</SelectItem>
                            <SelectItem value="other">Другое</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleListingAction('approve')}
                          className="flex-1 glow-primary"
                        >
                          <Icon name="Check" size={16} className="mr-1" />
                          Одобрить
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleListingAction('reject')}
                          className="flex-1"
                          disabled={!rejectionReason}
                        >
                          <Icon name="X" size={16} className="mr-1" />
                          Отклонить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="glass-surface">
                    <CardContent className="p-6 text-center">
                      <Icon name="MousePointerClick" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Выберите объявление для модерации
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions">
            <Card className="glass-surface">
              <CardHeader>
                <CardTitle>История действий модератора</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          Одобрено объявление "iPhone 14 Pro 128GB"
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Сегодня в 14:30
                        </p>
                      </div>
                      <Badge variant="outline">Объявление</Badge>
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

export default ModeratorDashboard;