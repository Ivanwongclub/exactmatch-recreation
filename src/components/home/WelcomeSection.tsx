import AnimatedSection from "@/components/ui/AnimatedSection";

const WelcomeSection = () => {
  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-6">
        <AnimatedSection className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-8 leading-tight italic font-medium" style={{ color: '#402c5d' }}>
            Fortify Your Growth, Armour Your Assets, Unite Generations
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="max-w-6xl mx-auto">
          <p className="text-black font-sans text-lg md:text-xl leading-relaxed mb-6">
            Welcome to King Armour Family Office, a prestigious affiliate of Sunwah Kingsway
            Capital Holdings Limited, established in 1957. Headquartered in the vibrant
            financial hub of Hong Kong, with a robust global network spanning Beijing,
            Shanghai, Shenzhen, Toronto, Vietnam, Cambodia, Singapore, and numerous other
            Chinese cities, we are committed to partnering with families to drive ambitious
            growth, expertly manage risks, and ensure the seamless continuity of their
            legacies.
          </p>
          <p className="text-black font-sans text-lg md:text-xl leading-relaxed">
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
