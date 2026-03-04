import React from "react";
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
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Rotas Protegidas */}
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/scripts" element={<ProtectedRoute><ScriptEditor /></ProtectedRoute>} />
            <Route path="/guests" element={<ProtectedRoute><Guests /></ProtectedRoute>} />
            <Route path="/guests/:id" element={<ProtectedRoute><GuestDetail /></ProtectedRoute>} />
            <Route path="/episodes/new" element={<ProtectedRoute><CreateEpisode /></ProtectedRoute>} />
            <Route path="/episodes/:id" element={<ProtectedRoute><EpisodeDetail /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
            <Route path="/episodes/post/:id" element={<ProtectedRoute><PostProduction /></ProtectedRoute>} />
            <Route path="/episodes" element={<ProtectedRoute><Episodes /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/knowledge" element={<ProtectedRoute><KnowledgeBase /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/media" element={<ProtectedRoute><MediaLibrary /></ProtectedRoute>} />
            
            {/* Rota Pública */}
            <Route path="/public/script/:id" element={<PublicScript />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;