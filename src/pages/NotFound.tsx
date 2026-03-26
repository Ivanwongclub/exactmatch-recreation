import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/ui/AnimatedSection";

const recoveryLinks = [
  { label: "Home", path: "/" },
  { label: "Our Services", path: "/services" },
  { label: "Kings Network", path: "/kings-network" },
  { label: "History", path: "/history" },
  { label: "Contact Us", path: "/contact" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-32 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="border-l-4 border-accent pl-6">
              <p className="text-accent font-sans text-sm font-semibold tracking-widest uppercase mb-3">
                Page Not Found
              </p>
              <h1 className="font-sans text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
                404
              </h1>
              <p className="text-primary-foreground/65 font-sans text-lg md:text-xl max-w-lg">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-8">
              You might be looking for
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recoveryLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group p-5 rounded-xl border border-foreground/10 hover:border-accent transition-colors"
                >
                  <span className="font-sans text-base font-medium text-foreground group-hover:text-accent transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
