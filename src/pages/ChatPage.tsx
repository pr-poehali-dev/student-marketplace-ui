import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/marketplace/Header";
import ChatWindow from "@/components/marketplace/ChatWindow";

const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/messages");
  };

  if (!chatId) {
    return <div>Chat not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      <main className="container mx-auto px-6 py-8 h-screen">
        <div className="max-w-4xl mx-auto h-full">
          <div className="glass-surface rounded-lg h-full overflow-hidden">
            <ChatWindow chatId={parseInt(chatId)} onBack={handleBack} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
