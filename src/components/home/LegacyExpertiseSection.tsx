import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import marbleTexture from "@/assets/marble-texture.webp";

const LegacyExpertiseSection = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection>
            <p className="text-accent font-sans text-sm font-semibold tracking-widest uppercase mb-4">
              Legacy & Business Expertise
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold leading-tight mb-6">
              Bridging Generations of Ambition
            </h2>
            <p className="text-primary-foreground/65 font-sans text-lg leading-relaxed mb-4">
              Drawing on Sunwah's extensive expertise across finance, real
              estate, technology, and infrastructure, we bridge the aspirations
              of young visionaries with the seasoned wisdom of established
              dynasties.
            </p>
            <p className="text-primary-foreground/65 font-sans text-lg leading-relaxed mb-8">
              Our advisory spans investment strategy, philanthropic design,
              family governance, and cross-border structuring—ensuring every
              decision reinforces your family's long-term position.
            </p>
            <Link
              to="/legacy-and-business-expertise"
              className="group inline-flex items-center text-accent font-sans text-sm font-medium tracking-wider transition-colors hover:text-accent/80"
            >
              <span className="relative">
                LEARN MORE
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full" />
              </span>
            </Link>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="rounded-2xl overflow-hidden">
              <img loading="lazy" decoding="async"
                src={marbleTexture}
                alt="Legacy expertise"
                className="w-full h-[340px] lg:h-[420px] object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default LegacyExpertiseSection;
