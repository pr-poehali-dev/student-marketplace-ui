import React from "react";
import Header from "@/components/marketplace/Header";
import MyListings from "@/components/marketplace/MyListings";

const MyListingsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <MyListings />
      </main>
    </div>
  );
};

export default MyListingsPage;
