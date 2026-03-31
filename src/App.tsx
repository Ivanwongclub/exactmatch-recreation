import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LegacyRedirects from "./components/shared/LegacyRedirects";
import Index from "./pages/Index";
import History from "./pages/History";
import Services from "./pages/Services";
import KingsNetwork from "./pages/KingsNetwork";
import OurMission from "./pages/OurMission";
import ExecutiveTeam from "./pages/ExecutiveTeam";
import BoardOfDirectors from "./pages/BoardOfDirectors";
import LegacyExpertise from "./pages/LegacyExpertise";
import MembersOnlyEvents from "./pages/MembersOnlyEvents";
import SummerProgram from "./pages/SummerProgram";
import EventPage from "./pages/EventPage";
import Contact from "./pages/Contact";
import CmsAdmin from "./pages/CmsAdmin";
import AdminLogin from "./pages/AdminLogin";
import AdminRoute from "./components/shared/AdminRoute";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LegacyRedirects />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/history" element={<History />} />
          <Route path="/services" element={<Services />} />
          <Route path="/kings-network" element={<KingsNetwork />} />
          <Route path="/our-mission" element={<OurMission />} />
          <Route path="/executive-team" element={<ExecutiveTeam />} />
          <Route path="/board-of-directors" element={<BoardOfDirectors />} />
          <Route path="/legacy-and-business-expertise" element={<LegacyExpertise />} />
          <Route path="/members-only-events" element={<MembersOnlyEvents />} />
          <Route path="/summer-program" element={<SummerProgram />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/cms" element={<AdminRoute><CmsAdmin /></AdminRoute>} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" subtitle="How we protect your information" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
