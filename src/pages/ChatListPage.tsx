import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/marketplace/Header";
import ChatList from "@/components/marketplace/ChatList";

const ChatListPage = () => {
  const navigate = useNavigate();

  const handleChatSelect = (chatId: number) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      <main className="container mx-auto px-6 py-8 h-screen">
        <div className="max-w-md mx-auto h-full">
          <div className="glass-surface rounded-lg h-full overflow-hidden">
            <ChatList onChatSelect={handleChatSelect} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatListPage;
