import React from "react";
import Header from "@/components/marketplace/Header";
import Favorites from "@/components/marketplace/Favorites";

const FavoritesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Favorites />
      </main>
    </div>
  );
};

export default FavoritesPage;
