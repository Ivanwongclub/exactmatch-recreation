import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import History from "./pages/History";
import Services from "./pages/Services";
import KingsNetwork from "./pages/KingsNetwork";
import PlaceholderPage from "./pages/PlaceholderPage";
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
          <Route path="/history" element={<History />} />
          <Route path="/services" element={<Services />} />
          <Route path="/kings-network" element={<KingsNetwork />} />
          <Route path="/our-mission" element={<PlaceholderPage title="Our Mission" subtitle="Purpose-driven stewardship for families of substance" />} />
          <Route path="/executive-team" element={<PlaceholderPage title="Executive Team" subtitle="Leadership grounded in integrity and experience" />} />
          <Route path="/board-of-directors" element={<PlaceholderPage title="Board of Directors" subtitle="Governance that inspires confidence" />} />
          <Route path="/legacy-and-business-expertise" element={<PlaceholderPage title="Legacy & Business Expertise" subtitle="Bridging generations of ambition" />} />
          <Route path="/members-only-events" element={<PlaceholderPage title="Members-Only Events" subtitle="Where ideas meet opportunity" />} />
          <Route path="/summer-program" element={<PlaceholderPage title="Summer Program" subtitle="Cultivating the next generation of leaders" />} />
          <Route path="/event" element={<PlaceholderPage title="Event" subtitle="Upcoming gatherings and experiences" />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact Us" subtitle="Begin a conversation about what matters most" />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" subtitle="How we protect your information" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
