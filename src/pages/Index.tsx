import React from "react";
import Header from "@/components/marketplace/Header";
import SearchSection from "@/components/marketplace/SearchSection";
import VipListings from "@/components/marketplace/VipListings";
import RegularListings from "@/components/marketplace/RegularListings";
import Pagination from "@/components/marketplace/Pagination";
import Footer from "@/components/marketplace/Footer";
import { vipListings, regularListings, filterOptions } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Header />
      <SearchSection filterOptions={filterOptions} />
      <VipListings listings={vipListings} />
      <RegularListings listings={regularListings} totalCount={1247} />
      <Pagination currentPage={1} totalPages={25} />
      <Footer />
    </div>
  );
};

export default Index;
