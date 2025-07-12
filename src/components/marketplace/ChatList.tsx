import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { Chat } from "@/types";

interface ChatListProps {
  onChatSelect?: (chatId: number) => void;
}

const ChatList = ({ onChatSelect }: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock chats data
  const mockChats: Chat[] = [
    {
      id: 1,
      participantId: 101,
      participantName: "Алексей Смирнов",
      participantAvatar: "/api/placeholder/40/40",
      listingId: 1,
      listingTitle: "iPhone 14 Pro 128GB",
      listingImage: "/api/placeholder/60/60",
      lastMessage: {
        id: 1,
        chatId: 1,
        senderId: 101,
        senderName: "Алексей Смирнов",
        content: "Привет! Интересует ваш iPhone. Можно встретиться завтра?",
        createdAt: "2024-01-15T10:30:00",
        isRead: false,
        isDelivered: true,
      },
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 2,
      participantId: 102,
      participantName: "Мария Петрова",
      participantAvatar: "/api/placeholder/40/40",
      listingId: 2,
      listingTitle: "Учебники по математике",
      listingImage: "/api/placeholder/60/60",
      lastMessage: {
        id: 2,
        chatId: 2,
        senderId: 2, // Current user
        senderName: "Вы",
        content: "Хорошо, встречаемся завтра в 15:00 у общежития",
        createdAt: "2024-01-15T09:45:00",
        isRead: true,
        isDelivered: true,
      },
      unreadCount: 0,
      isOnline: false,
      lastSeen: "2024-01-15T09:50:00",
    },
    {
      id: 3,
      participantId: 103,
      participantName: "Дмитрий Козлов",
      participantAvatar: "/api/placeholder/40/40",
      listingId: 3,
      listingTitle: "Велосипед горный Trek",
      listingImage: "/api/placeholder/60/60",
      lastMessage: {
        id: 3,
        chatId: 3,
        senderId: 103,
        senderName: "Дмитрий Козлов",
        content: "Спасибо за быструю продажу! Рекомендую продавца 👍",
        createdAt: "2024-01-14T16:20:00",
        isRead: true,
        isDelivered: true,
      },
      unreadCount: 0,
      isOnline: false,
      lastSeen: "2024-01-14T18:30:00",
    },
    {
      id: 4,
      participantId: 104,
      participantName: "Анна Волкова",
      participantAvatar: "/api/placeholder/40/40",
      listingId: 4,
      listingTitle: "Кофеварка DeLonghi",
      listingImage: "/api/placeholder/60/60",
      lastMessage: {
        id: 4,
        chatId: 4,
        senderId: 104,
        senderName: "Анна Волкова",
        content: "Добрый день! Кофеварка еще актуальна?",
        createdAt: "2024-01-14T11:15:00",
        isRead: false,
        isDelivered: true,
      },
      unreadCount: 1,
      isOnline: true,
    },
  ];

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.listingTitle?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 1) return "только что";
    if (diffInMinutes < 60) return `${diffInMinutes} мин.`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ч.`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} дн.`;

    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
  };

  const handleChatClick = (chatId: number) => {
    onChatSelect?.(chatId);
  };

  const totalUnread = filteredChats.reduce(
    (sum, chat) => sum + chat.unreadCount,
    0,
  );

  const ChatItem = ({ chat }: { chat: Chat }) => (
    <Card
      className={`glass-surface cursor-pointer transition-all hover:shadow-md ${
        chat.unreadCount > 0 ? "ring-1 ring-primary/20" : ""
      }`}
      onClick={() => handleChatClick(chat.id)}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Listing Image */}
          {chat.listingImage && (
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={chat.listingImage}
                alt={chat.listingTitle}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Chat Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={chat.participantAvatar} />
                    <AvatarFallback className="text-xs">
                      {chat.participantName
                        .split(" ")
                        .map((n) => n.charAt(0))
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-sm truncate">
                    {chat.participantName}
                  </h4>
                  {chat.listingTitle && (
                    <p className="text-xs text-muted-foreground truncate">
                      по объявлению: {chat.listingTitle}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {chat.unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white h-5 min-w-5 text-xs">
                    {chat.unreadCount}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {chat.lastMessage && getTimeAgo(chat.lastMessage.createdAt)}
                </span>
              </div>
            </div>

            {chat.lastMessage && (
              <div className="flex items-center gap-1">
                <p
                  className={`text-sm flex-1 truncate ${
                    chat.unreadCount > 0
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {chat.lastMessage.senderName === "Вы" && (
                    <span className="text-muted-foreground">Вы: </span>
                  )}
                  {chat.lastMessage.content}
                </p>
                {chat.lastMessage.senderName === "Вы" && (
                  <div className="flex-shrink-0">
                    {chat.lastMessage.isRead ? (
                      <Icon
                        name="CheckCheck"
                        size={12}
                        className="text-blue-500"
                      />
                    ) : chat.lastMessage.isDelivered ? (
                      <Icon
                        name="Check"
                        size={12}
                        className="text-muted-foreground"
                      />
                    ) : (
                      <Icon
                        name="Clock"
                        size={12}
                        className="text-muted-foreground"
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Сообщения</h2>
          {totalUnread > 0 && (
            <Badge className="bg-red-500 text-white">{totalUnread} новых</Badge>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Поиск по чатам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          <div className="p-4 space-y-3">
            {filteredChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              {searchQuery ? (
                <>
                  <Icon
                    name="SearchX"
                    size={48}
                    className="mx-auto text-muted-foreground mb-4"
                  />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Ничего не найдено
                  </h3>
                  <p className="text-muted-foreground">
                    Попробуйте изменить поисковый запрос
                  </p>
                </>
              ) : (
                <>
                  <Icon
                    name="MessageCircle"
                    size={48}
                    className="mx-auto text-muted-foreground mb-4"
                  />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Нет сообщений
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Начните общение с продавцами
                  </p>
                  <Button asChild>
                    <a href="/">
                      <Icon name="ArrowLeft" size={16} className="mr-2" />К
                      объявлениям
                    </a>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
