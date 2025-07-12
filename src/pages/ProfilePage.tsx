import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/marketplace/Header";
import Profile from "@/components/marketplace/Profile";

const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user");
  const isOwnProfile = !userId; // If no user param, it's own profile

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Profile isOwnProfile={isOwnProfile} userId={userId || undefined} />
      </main>
    </div>
  );
};

export default ProfilePage;
