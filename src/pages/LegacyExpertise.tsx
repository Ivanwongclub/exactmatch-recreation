import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-network.jpg";
import companyImage from "@/assets/company-large.jpg";
import { useCmsMediaAssetBySlug } from "@/hooks/useCmsBlocks";
import { resolveMediaUrl } from "@/lib/cms/mediaUtils";

const expertiseAreas = [
  {
    title: "Succession Architecture",
    description:
      "Designing governance frameworks and leadership transitions that ensure continuity of vision, values, and enterprise across generations.",
  },
  {
    title: "Cross-Border Enterprise",
    description:
      "Navigating the complexities of multi-jurisdictional operations — from regulatory compliance to strategic market entry — with the depth of experience built over six decades.",
  },
  {
    title: "Strategic Capital Allocation",
    description:
      "Deploying capital with discipline and foresight, balancing preservation with purposeful growth across traditional and alternative asset classes.",
  },
  {
    title: "Family Business Advisory",
    description:
      "Guiding family-owned enterprises through pivotal moments — expansion, professionalisation, partnership formation, and exit — while safeguarding family cohesion.",
  },
];

const LegacyExpertise = () => {
  const { data: heroMedia } = useCmsMediaAssetBySlug("hero-network");
  const { data: legacyCompanyMedia } = useCmsMediaAssetBySlug("legacy-company-image");
  const resolvedHeroImage = heroMedia?.url ?? heroImage;
  const resolvedCompanyImage = resolveMediaUrl(
    legacyCompanyMedia ? [legacyCompanyMedia] : null,
    "legacy-company-image",
    companyImage
  );

  return (
    <Layout>
      <SEOHead
        title="Legacy & Business Expertise"
        description="Built on six decades of enterprise — King Armour's heritage in succession architecture, cross-border strategy, and family business advisory."
        preloadImage={resolvedHeroImage}
        ogImage={resolvedHeroImage}
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${resolvedHeroImage})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 noise-bg opacity-30" />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="title-accent"
          >
            <h1 className="text-white font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
              Legacy & Business Expertise
            </h1>
            <h2 className="text-accent font-sans text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              Bridging Generations of Ambition
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Heritage Narrative */}
      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
            <AnimatedSection>
              <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built on Six Decades of Enterprise
              </h2>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
                King Armour's expertise is rooted in the operational legacy of the
                Sunwah Group — a diversified conglomerate that has navigated market
                cycles, geopolitical shifts, and generational transitions since 1957.
              </p>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                This heritage gives us a perspective that pure financial institutions
                cannot replicate: we understand the interplay between family dynamics,
                business strategy, and long-term wealth preservation because we have
                lived it.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="rounded-lg overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={resolvedCompanyImage}
                  alt="King Armour heritage"
                  className="w-full h-auto object-cover"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Intergenerational Strategy */}
          <AnimatedSection className="mb-20">
            <div className="border-t border-accent/30 pt-12">
              <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-6">
                Intergenerational Strategy
              </h3>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-3xl mb-6">
                Every family's legacy is unique. We work alongside families to
                articulate their vision, structure their governance, and implement
                strategies that honour the past while preparing for the future.
              </p>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-3xl">
                Our approach recognises that the greatest risk to generational wealth
                is not market volatility — it is the absence of clear purpose,
                transparent governance, and prepared successors.
              </p>
            </div>
          </AnimatedSection>

          {/* Expertise Areas */}
          <AnimatedSection>
            <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-10">
              Areas of Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-accent/10 rounded-lg p-6 card-hover"
                >
                  <h4 className="font-sans text-xl font-semibold text-foreground mb-3">
                    {area.title}
                  </h4>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ResearchSection />
    </Layout>
  );
};

export default LegacyExpertise;
