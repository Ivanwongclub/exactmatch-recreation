import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "ABOUT US", path: "/" },
    { label: "OUR MISSION", path: "/our-mission" },
    { label: "HISTORY", path: "/history" },
    { label: "OUR SERVICES", path: "/services" },
    { label: "KINGS NETWORK", path: "/kings-network" },
    { label: "EXECUTIVE TEAM", path: "/executive-team" },
    { label: "BOARD OF DIRECTORS", path: "/board-of-directors" },
    { label: "EXPERTISE", path: "/legacy-and-business-expertise" },
    { label: "EVENTS", path: "/members-only-events" },
    { label: "SUMMER PROGRAM", path: "/summer-program" },
    { label: "CONTACT US", path: "/contact" },
    { label: "PRIVACY POLICY", path: "/privacy" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden" role="contentinfo">
      <div className="aurora-wave aurora-wave-1" aria-hidden="true" />
      <div className="aurora-wave aurora-wave-2" aria-hidden="true" />
      <div className="aurora-wave aurora-wave-3" aria-hidden="true" />
      <div className="aurora-wave aurora-wave-4" aria-hidden="true" />
      <div className="aurora-wave aurora-wave-5" aria-hidden="true" />

      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-6">
            <nav className="grid grid-cols-2 gap-x-8 gap-y-3" aria-label="Footer navigation">
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

            <a
              href="mailto:info@king-armour.com"
              className="text-accent font-sans text-sm tracking-wider hover:opacity-80 transition-opacity w-fit mt-4"
            >
              info@king-armour.com
            </a>
          </div>

          <div className="flex flex-col justify-between">
            <div className="ka-wordmark mb-6" aria-hidden="true" style={{ opacity: 0.7 }}>
              <span className="ka-wordmark-kicker">KING</span>
              <span className="ka-wordmark-main">ARMOUR</span>
            </div>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-primary-foreground">
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
