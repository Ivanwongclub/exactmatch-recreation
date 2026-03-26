import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";

const LeadershipTrustSection = () => {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-sans text-sm font-semibold tracking-widest uppercase mb-4">
              Leadership
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              Guided by Integrity, Driven by Experience
            </h2>
            <p className="text-foreground/70 font-sans text-lg leading-relaxed mb-10">
              Our executive team and board bring decades of cross-sector
              leadership—finance, diplomacy, technology, and philanthropy—to
              every client relationship. Trust is earned, and we invest in it
              every day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/executive-team"
                className="inline-flex items-center px-7 py-3 bg-primary text-primary-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-primary/90 transition-colors"
              >
                EXECUTIVE TEAM
              </Link>
              <Link
                to="/board-of-directors"
                className="inline-flex items-center px-7 py-3 border border-foreground/20 text-foreground font-sans text-sm font-semibold tracking-wider rounded hover:border-accent hover:text-accent transition-colors"
              >
                BOARD OF DIRECTORS
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LeadershipTrustSection;
