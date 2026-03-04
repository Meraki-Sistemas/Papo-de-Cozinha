import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ScriptEditor from "./pages/ScriptEditor";
import Guests from "./pages/Guests";
import CreateEpisode from "./pages/CreateEpisode";
import PublicScript from "./pages/PublicScript";
import CalendarPage from "./pages/Calendar";
import PostProduction from "./pages/PostProduction";
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
          <Route path="/episodes/new" element={<CreateEpisode />} />
          <Route path="/public/script/:id" element={<PublicScript />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/episodes/post/:id" element={<PostProduction />} />
          <Route path="/episodes" element={<Index />} /> {/* Fallback para demo */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;