import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "ABOUT US", path: "/" },
    { label: "HISTORY", path: "/history" },
    { label: "OUR SERVICES", path: "/services" },
    { label: "KINGS NETWORK", path: "/kings-network" },
    { label: "CONTACT US", path: "/contact" },
    { label: "PRIVACY POLICY", path: "/privacy" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Navigation Links */}
          <div className="flex flex-col gap-6">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-primary-foreground font-sans text-sm tracking-wider hover:text-accent transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* Email */}
            <a 
              href="mailto:info@king-armour.com" 
              className="text-accent font-sans text-sm tracking-wider hover:opacity-80 transition-opacity w-fit mt-4"
            >
              info@king-armour.com
            </a>
          </div>

          {/* Right side - Tagline & Copyright */}
          <div className="flex flex-col justify-between">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-primary-foreground">
              Fortify Your Growth, Armour Your Assets, Unite Generations
            </h2>
            
            <p className="text-primary-foreground/60 text-sm font-sans mt-8 lg:mt-0">
              © {currentYear} King Armour. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
