import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ScriptEditor from "./pages/ScriptEditor";
import Guests from "./pages/Guests";
import GuestDetail from "./pages/GuestDetail";
import CreateEpisode from "./pages/CreateEpisode";
import EpisodeDetail from "./pages/EpisodeDetail";
import PublicScript from "./pages/PublicScript";
import CalendarPage from "./pages/Calendar";
import PostProduction from "./pages/PostProduction";
import Episodes from "./pages/Episodes";
import Settings from "./pages/Settings";
import KnowledgeBase from "./pages/KnowledgeBase";
import Analytics from "./pages/Analytics";
import MediaLibrary from "./pages/MediaLibrary";
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
          <Route path="/scripts" element={<ScriptEditor />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/guests/:id" element={<GuestDetail />} />
          <Route path="/episodes/new" element={<CreateEpisode />} />
          <Route path="/episodes/:id" element={<EpisodeDetail />} />
          <Route path="/public/script/:id" element={<PublicScript />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/episodes/post/:id" element={<PostProduction />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;