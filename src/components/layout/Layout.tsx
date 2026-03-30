import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCmsPreviewMode } from "@/hooks/useCmsBlocks";
import { getCmsPreviewBannerState } from "@/lib/cms/previewBanner";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { previewEnabled, previewRequested } = useCmsPreviewMode();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const previewBanner = getCmsPreviewBannerState(previewRequested, previewEnabled);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded focus:font-sans focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <Header />
      {previewBanner.show && (
        <div
          className={`border-y px-4 py-2 text-center font-sans text-xs font-semibold tracking-wide ${
            previewBanner.level === "success"
              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
              : "border-amber-300 bg-amber-50 text-amber-900"
          }`}
          role="status"
          aria-live="polite"
        >
          {previewBanner.message}
        </div>
      )}
      <motion.main
        id="main-content"
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
        role="main"
      >
        {children}
      </motion.main>
      <Footer />
      <motion.div
        initial={false}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          y: showBackToTop ? 0 : 12,
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          type="button"
          size="icon"
          aria-label="Back to top"
          onClick={handleBackToTop}
          className="h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default Layout;
