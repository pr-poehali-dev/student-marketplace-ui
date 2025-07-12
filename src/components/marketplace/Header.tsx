import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import NotificationsModal from "./NotificationsModal";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
      <header className="glass-surface border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-semibold text-primary">
                stu<span className="text-accent">DD</span>eal
              </h1>
              <Badge
                variant="secondary"
                className="hidden md:flex text-xs px-2 py-1"
              >
                БФУ маркетплейс
              </Badge>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Главная
              </a>
              <a
                href="/my-listings"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Мои объявления
              </a>
              <a
                href="/favorites"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Избранное
              </a>
            </nav>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex h-8 px-3"
                asChild
              >
                <a href="/messages">
                  <Icon name="MessageCircle" size={14} className="mr-1.5" />
                  Сообщения
                </a>
              </Button>
              <Button size="sm" className="glow-primary h-8 px-3" asChild>
                <a href="/add-listing">
                  <Icon name="Plus" size={14} className="mr-1.5" />
                  Подать объявление
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 relative"
                onClick={() => setShowNotifications(true)}
              >
                <Icon name="Bell" size={16} />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-red-500 text-white">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a href="/profile">
                  <Icon name="User" size={16} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
