import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";

const HistoryTeaserSection = () => {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          <AnimatedSection>
            <p className="text-accent font-sans text-sm font-semibold tracking-widest uppercase mb-4">
              Since 1957
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              A Legacy of Trust Across Generations
            </h2>
            <p className="text-foreground/70 font-sans text-lg leading-relaxed mb-8 max-w-3xl">
              For over six decades, the Sunwah Group has built enduring
              relationships grounded in integrity, discretion, and deep expertise.
              King Armour carries this heritage forward, serving as the custodian
              of our clients' most important aspirations.
            </p>
            <Link
              to="/history"
              className="group inline-flex items-center text-foreground font-sans text-sm font-medium tracking-wider transition-colors hover:text-accent"
            >
              <span className="relative">
                EXPLORE OUR HISTORY
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full" />
              </span>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HistoryTeaserSection;
