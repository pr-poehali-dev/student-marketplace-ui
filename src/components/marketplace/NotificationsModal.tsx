import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { Notification } from "@/types";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: 1,
      type: "message",
      title: "Новое сообщение",
      message: "Алексей написал вам по поводу iPhone 14 Pro",
      createdAt: "2024-01-15T10:30:00",
      isRead: false,
      actionUrl: "/chat/123",
      authorName: "Алексей К.",
      authorAvatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      type: "moderation",
      title: "Объявление одобрено",
      message:
        'Ваше объявление "Велосипед горный" прошло модерацию и опубликовано',
      createdAt: "2024-01-15T09:15:00",
      isRead: false,
      actionUrl: "/listing/456",
    },
    {
      id: 3,
      type: "review",
      title: "Новый отзыв",
      message: "Мария оставила отзыв о покупке учебников",
      createdAt: "2024-01-14T16:45:00",
      isRead: true,
      actionUrl: "/profile#reviews",
      authorName: "Мария С.",
      authorAvatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      type: "sale",
      title: "Товар продан",
      message: 'Ваш товар "Кофеварка DeLonghi" был продан',
      createdAt: "2024-01-14T14:20:00",
      isRead: true,
      actionUrl: "/my-listings",
    },
    {
      id: 5,
      type: "system",
      title: "Обновление системы",
      message: "Добавлены новые функции в личном кабинете",
      createdAt: "2024-01-13T12:00:00",
      isRead: true,
      actionUrl: "/profile",
    },
    {
      id: 6,
      type: "moderation",
      title: "Требуется доработка",
      message:
        'Объявление "Ноутбук ASUS" требует доработки. Добавьте больше фотографий.',
      createdAt: "2024-01-12T11:30:00",
      isRead: true,
      actionUrl: "/my-listings",
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return { name: "MessageCircle", color: "text-blue-500" };
      case "moderation":
        return { name: "ShieldCheck", color: "text-green-500" };
      case "review":
        return { name: "Star", color: "text-yellow-500" };
      case "sale":
        return { name: "DollarSign", color: "text-emerald-500" };
      case "system":
        return { name: "Settings", color: "text-gray-500" };
      default:
        return { name: "Bell", color: "text-gray-500" };
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 1) return "Только что";
    if (diffInMinutes < 60) return `${diffInMinutes} мин. назад`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ч. назад`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} дн. назад`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} нед. назад`;

    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} мес. назад`;
  };

  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;
  const hasUnread = unreadCount > 0;

  const handleNotificationClick = (notification: Notification) => {
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
    onClose();
  };

  const NotificationItem = ({
    notification,
  }: {
    notification: Notification;
  }) => {
    const icon = getNotificationIcon(notification.type);

    return (
      <div
        className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50 ${
          !notification.isRead ? "bg-primary/5" : ""
        }`}
        onClick={() => handleNotificationClick(notification)}
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            {notification.authorAvatar ? (
              <Avatar className="w-10 h-10">
                <AvatarImage src={notification.authorAvatar} />
                <AvatarFallback>
                  {notification.authorName?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div
                className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${icon.color}`}
              >
                <Icon name={icon.name as any} size={20} />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className={`text-sm font-medium truncate ${
                      !notification.isRead
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {notification.title}
                  </h4>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  )}
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    !notification.isRead
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {notification.message}
                </p>
                {notification.authorName && (
                  <p className="text-xs text-muted-foreground mt-1">
                    от {notification.authorName}
                  </p>
                )}
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {getTimeAgo(notification.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-[600px] p-0 flex flex-col">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Bell" size={20} />
              Уведомления
              {hasUnread && (
                <Badge className="bg-red-500 text-white h-5 min-w-5 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={16} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {mockNotifications.length > 0 ? (
            <ScrollArea className="flex-1">
              <div className="divide-y divide-border">
                {mockNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center py-8">
                <Icon
                  name="Bell"
                  size={48}
                  className="mx-auto text-muted-foreground mb-4"
                />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Нет уведомлений
                </h3>
                <p className="text-muted-foreground">
                  Все уведомления будут отображаться здесь
                </p>
              </div>
            </div>
          )}
        </div>

        {mockNotifications.length > 0 && (
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Check" size={14} className="mr-2" />
                Отметить все как прочитанные
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={14} />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
