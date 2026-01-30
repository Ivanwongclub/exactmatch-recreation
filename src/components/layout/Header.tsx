import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "ABOUT US",
    href: "/",
    dropdown: [
      { label: "Home", href: "/" },
      { label: "History", href: "/history" },
    ],
  },
  { label: "HISTORY", href: "/history" },
  { label: "SERVICES", href: "/services" },
  {
    label: "KINGS NETWORK",
    href: "/kings-network",
    dropdown: [
      { label: "Overview", href: "/kings-network" },
      { label: "Events", href: "/kings-network#events" },
    ],
  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

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
        isScrolled ? "bg-primary/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {/* Golden Crest Logo - matching original site */}
            <svg 
              viewBox="0 0 80 90" 
              className="w-12 h-14 lg:w-16 lg:h-[72px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Shield outline */}
              <path 
                d="M40 2L4 18v30c0 22 16 36 36 40 20-4 36-18 36-40V18L40 2z" 
                fill="hsl(42, 47%, 60%)"
                stroke="hsl(42, 47%, 50%)"
                strokeWidth="1"
              />
              {/* Inner shield */}
              <path 
                d="M40 8L10 22v24c0 18 13 30 30 34 17-4 30-16 30-34V22L40 8z" 
                fill="hsl(265, 33%, 12%)"
              />
              {/* Crown */}
              <path 
                d="M25 35l5-8 5 5 5-7 5 7 5-5 5 8v6H25v-6z" 
                fill="hsl(42, 47%, 60%)"
              />
              {/* Shield center emblem */}
              <path 
                d="M40 48c-6 0-11 3-11 7s5 7 11 7 11-3 11-7-5-7-11-7z" 
                fill="hsl(42, 47%, 60%)"
              />
              {/* Decorative elements */}
              <circle cx="30" cy="55" r="2" fill="hsl(42, 47%, 60%)" />
              <circle cx="50" cy="55" r="2" fill="hsl(42, 47%, 60%)" />
              <path d="M35 65h10" stroke="hsl(42, 47%, 60%)" strokeWidth="1.5" />
              {/* Lions/supporters simplified */}
              <path 
                d="M15 30c-3 0-5 2-5 5s2 6 5 8l3-3v-7l-3-3z" 
                fill="hsl(42, 47%, 60%)"
              />
              <path 
                d="M65 30c3 0 5 2 5 5s-2 6-5 8l-3-3v-7l3-3z" 
                fill="hsl(42, 47%, 60%)"
              />
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1 text-primary-foreground/90 hover:text-accent font-sans text-sm font-medium tracking-wider transition-colors",
                    location.pathname === item.href && "text-accent"
                  )}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 min-w-[180px] bg-primary/95 backdrop-blur-sm rounded-lg shadow-xl py-2"
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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-primary shadow-2xl lg:hidden z-50"
          >
            <div className="flex flex-col h-full pt-24 px-6">
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
