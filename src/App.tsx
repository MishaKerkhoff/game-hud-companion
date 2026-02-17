import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuLayout from "./components/game/MenuLayout";
import MainMenu from "./pages/MainMenu";
import Stash from "./pages/Stash";
import PlaceholderPage from "./pages/PlaceholderPage";
import Raider from "./pages/Raider";
import Shop from "./pages/Shop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Hub pages with nav rail */}
          <Route element={<MenuLayout />}>
            <Route path="/" element={<MainMenu />} />
            <Route path="/stash" element={<Stash />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/craft" element={<PlaceholderPage title="Craft" />} />
            <Route path="/stats" element={<Raider />} />
          </Route>
          {/* Raid (no rail) */}
          <Route path="/game" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
