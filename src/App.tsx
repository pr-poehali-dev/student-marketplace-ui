import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MyListingsPage from "./pages/MyListingsPage";
import FavoritesPage from "./pages/FavoritesPage";
import AddListingPage from "./pages/AddListingPage";
import ProfilePage from "./pages/ProfilePage";
import ChatListPage from "./pages/ChatListPage";
import ChatPage from "./pages/ChatPage";
import ListingPage from "./pages/ListingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/my-listings" element={<MyListingsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/add-listing" element={<AddListingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/messages" element={<ChatListPage />} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
          <Route path="/listing/:listingId" element={<ListingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
