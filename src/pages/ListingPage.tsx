import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/marketplace/Header";
import ListingDetail from "@/components/marketplace/ListingDetail";

const ListingPage = () => {
  const { listingId } = useParams<{ listingId: string }>();

  if (!listingId) {
    return <div>Listing not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <ListingDetail listingId={parseInt(listingId)} />
      </main>
    </div>
  );
};

export default ListingPage;
