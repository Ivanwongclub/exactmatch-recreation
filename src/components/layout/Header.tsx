import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCmsBlocksByPage } from "@/hooks/useCmsBlocks";
import { resolveCmsBlock } from "@/lib/cms/blockUtils";
import logoFull from "@/assets/king-armour-logo-full.png";
import logoMark from "@/assets/king-armour-logo-mark.png";

interface HeaderNavItem {
  label: string;
  href: string;
  dropdown?: Array<{ label: string; href: string }>;
}

const fallbackNavItems: HeaderNavItem[] = [
  {
    label: "ABOUT US",
    href: "/",
    dropdown: [
      { label: "Home", href: "/" },
      { label: "Our Mission", href: "/our-mission" },
      { label: "History", href: "/history" },
      { label: "Executive Team", href: "/executive-team" },
      { label: "Board of Directors", href: "/board-of-directors" },
    ],
  },
  { label: "SERVICES", href: "/services" },
  {
    label: "KINGS NETWORK",
    href: "/kings-network",
    dropdown: [
      { label: "Overview", href: "/kings-network" },
      { label: "Members-Only Events", href: "/members-only-events" },
      { label: "Summer Program", href: "/summer-program" },
      { label: "Event", href: "/event" },
    ],
  },
  {
    label: "EXPERTISE",
    href: "/legacy-and-business-expertise",
  },
  { label: "CONTACT", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { data: cmsBlocks } = useCmsBlocksByPage("global");
  const navItems = resolveCmsBlock(cmsBlocks, "header_nav", fallbackNavItems);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-primary/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 overflow-visible">
        <div className="flex items-center justify-between gap-6 h-20 lg:h-28 overflow-visible">
          <Link
            to="/"
            className="shrink-0 flex items-center relative z-10 self-start mt-4"
            aria-label="King Armour Family Office Home"
          >
            <img
              src={logoMark}
              alt="King Armour"
              className="h-[60px] w-auto lg:hidden drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
              loading="eager"
            />
            <img
              src={logoFull}
              alt="King Armour Family Office"
              className="hidden lg:block h-[84px] xl:h-[120px] w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
              loading="eager"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 min-w-0" aria-label="Main navigation">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.dropdown && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1 text-primary-foreground/90 hover:text-accent font-sans text-[13px] xl:text-sm font-semibold tracking-wider transition-colors whitespace-nowrap",
                    location.pathname === item.href && "text-accent"
                  )}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 min-w-[200px] bg-primary/95 backdrop-blur-sm rounded-lg shadow-xl py-2"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block px-4 py-2 text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/5 font-sans text-sm transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-primary shadow-2xl lg:hidden z-50"
          >
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="flex items-center justify-center px-6 pt-6 pb-4 border-b border-primary-foreground/10">
                <Link to="/" aria-label="King Armour Family Office Home" onClick={() => setIsMobileMenuOpen(false)}>
                  <img
                    src={logoFull}
                    alt="King Armour Family Office"
                    className="h-20 w-auto"
                  />
                </Link>
              </div>
              <div className="flex flex-col px-6 pt-4 pb-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className="block py-4 text-primary-foreground font-sans text-lg font-medium tracking-wider border-b border-primary-foreground/10"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4 py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block py-2 text-primary-foreground/70 font-sans text-base"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
