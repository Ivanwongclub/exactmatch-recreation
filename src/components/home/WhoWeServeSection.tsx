import AnimatedSection from "@/components/ui/AnimatedSection";

const WhoWeServeSection = () => {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection className="max-w-4xl">
          <p className="text-accent font-sans text-sm font-semibold tracking-widest uppercase mb-4">
            Who We Serve
          </p>
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Partnering with Families of Substance
          </h2>
          <p className="text-foreground/70 font-sans text-lg md:text-xl leading-relaxed mb-4 max-w-3xl">
            King Armour is a prestigious affiliate of Sunwah Kingsway Capital
            Holdings Limited, established in 1957. Headquartered in Hong Kong with
            a global network spanning Beijing, Shanghai, Toronto, Singapore, and
            beyond, we partner with families to drive growth, manage risk, and
            ensure the seamless continuity of their legacies.
          </p>
          <p className="text-foreground/70 font-sans text-lg md:text-xl leading-relaxed max-w-3xl">
            We serve multi-generational families, business founders, and
            next-generation leaders who seek a trusted, long-term strategic
            partner—not a transactional advisor.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WhoWeServeSection;
