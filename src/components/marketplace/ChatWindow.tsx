import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { Chat, ChatMessage } from "@/types";

interface ChatWindowProps {
  chatId: number;
  onBack?: () => void;
}

const ChatWindow = ({ chatId, onBack }: ChatWindowProps) => {
  const [messageText, setMessageText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock chat data
  const mockChat: Chat = {
    id: chatId,
    participantId: 101,
    participantName: "Алексей Смирнов",
    participantAvatar: "/api/placeholder/40/40",
    listingId: 1,
    listingTitle: "iPhone 14 Pro 128GB Space Black",
    listingImage: "/api/placeholder/80/80",
    unreadCount: 0,
    isOnline: true,
  };

  // Mock messages
  const mockMessages: ChatMessage[] = [
    {
      id: 1,
      chatId: chatId,
      senderId: 101,
      senderName: "Алексей Смирнов",
      content: "Привет! Интересует ваш iPhone.",
      createdAt: "2024-01-15T09:00:00",
      isRead: true,
      isDelivered: true,
    },
    {
      id: 2,
      chatId: chatId,
      senderId: 2, // Current user
      senderName: "Вы",
      content: "Здравствуйте! Да, телефон в продаже. Что именно интересует?",
      createdAt: "2024-01-15T09:05:00",
      isRead: true,
      isDelivered: true,
    },
    {
      id: 3,
      chatId: chatId,
      senderId: 101,
      senderName: "Алексей Смирнов",
      content: "Состояние какое? Есть ли царапины на экране?",
      createdAt: "2024-01-15T09:10:00",
      isRead: true,
      isDelivered: true,
    },
    {
      id: 4,
      chatId: chatId,
      senderId: 2,
      senderName: "Вы",
      content:
        "Состояние отличное, пользовался всегда в чехле и с защитным стеклом. Царапин нет.",
      createdAt: "2024-01-15T09:15:00",
      isRead: true,
      isDelivered: true,
    },
    {
      id: 5,
      chatId: chatId,
      senderId: 101,
      senderName: "Алексей Смирнов",
      content: "Супер! А торг возможен? И когда можно посмотреть?",
      createdAt: "2024-01-15T09:20:00",
      isRead: true,
      isDelivered: true,
    },
    {
      id: 6,
      chatId: chatId,
      senderId: 2,
      senderName: "Вы",
      content:
        "Небольшой торг возможен. Можем встретиться завтра после 15:00. Где вам удобно?",
      createdAt: "2024-01-15T09:25:00",
      isRead: true,
      isDelivered: true,
    },
    {
      id: 7,
      chatId: chatId,
      senderId: 101,
      senderName: "Алексей Смирнов",
      content: 'Отлично! Можно у метро "Калининград"? В 15:30 подойдет?',
      createdAt: "2024-01-15T10:30:00",
      isRead: false,
      isDelivered: true,
    },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mockMessages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would send the message to your backend
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Сегодня";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Вчера";
    } else {
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      });
    }
  };

  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { [key: string]: ChatMessage[] } = {};
    messages.forEach((message) => {
      const date = new Date(message.createdAt).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(mockMessages);

  const MessageBubble = ({ message }: { message: ChatMessage }) => {
    const isOwn = message.senderName === "Вы";

    return (
      <div className={`flex gap-2 ${isOwn ? "justify-end" : "justify-start"}`}>
        {!isOwn && (
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={mockChat.participantAvatar} />
            <AvatarFallback className="text-xs">
              {mockChat.participantName
                .split(" ")
                .map((n) => n.charAt(0))
                .join("")}
            </AvatarFallback>
          </Avatar>
        )}

        <div className={`max-w-[80%] ${isOwn ? "order-first" : ""}`}>
          <div
            className={`rounded-lg px-3 py-2 ${
              isOwn
                ? "bg-primary text-primary-foreground ml-auto"
                : "bg-muted text-foreground"
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>

          <div
            className={`flex items-center gap-1 mt-1 ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <span className="text-xs text-muted-foreground">
              {formatTime(message.createdAt)}
            </span>
            {isOwn && (
              <div className="flex-shrink-0">
                {message.isRead ? (
                  <Icon name="CheckCheck" size={12} className="text-blue-500" />
                ) : message.isDelivered ? (
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
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden"
          >
            <Icon name="ArrowLeft" size={16} />
          </Button>

          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={mockChat.participantAvatar} />
              <AvatarFallback>
                {mockChat.participantName
                  .split(" ")
                  .map((n) => n.charAt(0))
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {mockChat.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground">
              {mockChat.participantName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {mockChat.isOnline ? "В сети" : "Был в сети недавно"}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Icon name="Phone" size={16} />
            </Button>
            <Button variant="outline" size="icon">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>

        {/* Listing Info */}
        {mockChat.listingTitle && (
          <Card className="mt-3">
            <CardContent className="p-3">
              <div className="flex gap-3">
                <img
                  src={mockChat.listingImage}
                  alt={mockChat.listingTitle}
                  className="w-12 h-12 rounded-lg object-cover bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {mockChat.listingTitle}
                  </h4>
                  <p className="text-xs text-muted-foreground">Объявление</p>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="ExternalLink" size={12} className="mr-1" />
                  Открыть
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {Object.entries(messageGroups).map(([date, messages]) => (
            <div key={date} className="space-y-4">
              <div className="flex justify-center">
                <Badge variant="secondary" className="text-xs">
                  {formatDate(date)}
                </Badge>
              </div>
              <div className="space-y-3">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Напишите сообщение..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            >
              <Icon name="Paperclip" size={14} />
            </Button>
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="glow-primary"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Button variant="ghost" size="sm" className="h-6 text-xs">
            <Icon name="Smile" size={12} className="mr-1" />
            Emoji
          </Button>
          <Button variant="ghost" size="sm" className="h-6 text-xs">
            <Icon name="Image" size={12} className="mr-1" />
            Фото
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
