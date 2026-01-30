import AnimatedSection from "@/components/ui/AnimatedSection";

const WelcomeSection = () => {
  return (
    <section className="relative py-24 lg:py-40 overflow-hidden">
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
            hsl(var(--ka-cream)) 0%, 
            hsl(30 30% 97%) 50%, 
            hsl(var(--ka-cream)) 100%)`
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection className="max-w-5xl mx-auto text-center mb-16 lg:mb-24">
          {/* Oversized display typography */}
          <h2 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-[1.1] tracking-tight">
            <span className="block mb-2">Fortify Your Growth,</span>
            <span className="block mb-2">Armour Your Assets,</span>
            <span className="block">Unite Generations</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="max-w-3xl mx-auto">
          <p className="text-muted-foreground font-sans text-lg md:text-xl leading-relaxed mb-6">
            Welcome to King Armour Family Office, a prestigious affiliate of Sunwah Kingsway
            Capital Holdings Limited, established in 1957. Headquartered in the vibrant
            financial hub of Hong Kong, with a robust global network spanning Beijing,
            Shanghai, Shenzhen, Toronto, Vietnam, Cambodia, Singapore, and numerous other
            Chinese cities, we are committed to partnering with families to drive ambitious
            growth, expertly manage risks, and ensure the seamless continuity of their
            legacies.
          </p>
          <p className="text-muted-foreground font-sans text-lg md:text-xl leading-relaxed">
            Our guiding pillars—Thrust Forward for unlocking unlimited potential and growth,
            Stand Guard for deploying sophisticated risk management strategies, and Pass the
            Torch for fostering enduring generational bonds—shape our highly personalized
            services. Drawing on Sunwah's extensive expertise across finance, real estate,
            technology, and infrastructure, we bridge the aspirations of young visionaries
            with the seasoned wisdom of established dynasties, positioning ourselves as
            fortified guardians of your wealth in the dynamic landscape of 2025.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WelcomeSection;
