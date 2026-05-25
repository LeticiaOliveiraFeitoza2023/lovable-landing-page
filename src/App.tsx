import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import IndexDesejo from "./pages/IndexDesejo.tsx";
import IndexDark from "./pages/IndexDark.tsx";
import Mergulho from "./pages/Mergulho.tsx";
import Privacidade from "./pages/Privacidade.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* v2 — Marketing de Desejo (para comparação com o board) */}
          <Route path="/v2" element={<IndexDesejo />} />
          {/* v3 — Experimento de Hero Dark Premium + Spline 3D */}
          <Route path="/v3" element={<IndexDark />} />
          {/* Mergulho Operacional — página de captura qualificada */}
          <Route path="/mergulho" element={<Mergulho />} />
          {/* Política de Privacidade — LGPD */}
          <Route path="/privacidade" element={<Privacidade />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
