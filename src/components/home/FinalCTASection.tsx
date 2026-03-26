import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";

const FinalCTASection = () => {
  return (
    <section className="bg-primary text-primary-foreground py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Fortify Your Growth, Armour Your Assets, Unite Generations
            </h2>
            <p className="text-primary-foreground/65 font-sans text-lg leading-relaxed mb-10">
              Begin a conversation about what matters most—your family's future.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-accent text-accent-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-accent/90 transition-colors"
            >
              GET IN TOUCH
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCTASection;
