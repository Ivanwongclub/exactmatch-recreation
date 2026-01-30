import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-primary font-serif font-bold text-lg">K</span>
              </div>
              <span className="font-serif text-xl font-semibold tracking-wide">
                King Armour
              </span>
            </Link>
            <p className="text-primary-foreground/60 text-sm font-sans mt-2">
              © {currentYear} King Armour Family Office. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-sans">
            <Link
              to="/"
              className="text-primary-foreground/70 hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              to="/history"
              className="text-primary-foreground/70 hover:text-accent transition-colors"
            >
              History
            </Link>
            <Link
              to="/services"
              className="text-primary-foreground/70 hover:text-accent transition-colors"
            >
              Services
            </Link>
            <Link
              to="/kings-network"
              className="text-primary-foreground/70 hover:text-accent transition-colors"
            >
              Kings Network
            </Link>
          </nav>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 border border-accent text-accent rounded-full font-sans text-sm hover:bg-accent hover:text-primary transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to Top</span>
          </motion.button>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 mt-8 pt-6">
          <p className="text-center text-primary-foreground/50 text-xs font-sans">
            A prestigious affiliate of Sunwah Kingsway Capital Holdings Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
