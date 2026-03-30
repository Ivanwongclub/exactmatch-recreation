import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-services.jpg";
import { useCmsServicesPage } from "@/hooks/useCmsServicesPage";
import type { CmsServiceCategory } from "@/lib/cms/types";

const familyCouncilServices = [
  {
    title: "Charity & Philanthropy",
    description:
      "Strategic philanthropic planning to create meaningful impact while aligning with the family's values and legacy objectives.",
  },
  {
    title: "Wealth Planning",
    description:
      "Comprehensive wealth structuring designed to preserve and grow assets across generations with discipline and foresight.",
  },
  {
    title: "Education",
    description:
      "Preparing the next generation with financial literacy, leadership development, and a deep understanding of family governance.",
  },
  {
    title: "Family Governance",
    description:
      "Establishing frameworks for family decision-making, conflict resolution, and succession planning that endure beyond any single generation.",
  },
];

const investmentServices = [
  {
    title: "Wealth Management",
    description:
      "Tailored investment strategies aligned with your family's risk tolerance, time horizon, and long-term objectives.",
  },
  {
    title: "Tax Planning",
    description:
      "Sophisticated tax optimisation strategies across multiple jurisdictions, designed to protect and maximise generational wealth.",
  },
  {
    title: "Alternative Investments",
    description:
      "Curated access to private equity, real estate, and hedge fund opportunities vetted through rigorous due diligence.",
  },
  {
    title: "Trust & Corporate Services",
    description:
      "Expert structuring and administration of trusts and family holding companies, ensuring compliance and operational continuity.",
  },
];

const fallbackSettings = {
  heroTitle: "Our Services",
  heroSubtitle: "Fortify, Grow, Succeed",
  intro1:
    "At King Armour, we offer a comprehensive suite of services designed to address the unique needs of distinguished families. Our holistic approach integrates financial expertise with family dynamics, ensuring that every solution strengthens both your portfolio and your legacy.",
  intro2:
    "Our services are structured around two core pillars: Family Council Services and Investment Services. Together, they form a complete framework for multi-generational wealth preservation and growth.",
  ctaTitle: "Begin a Confidential Conversation",
  ctaBody:
    "Every family's needs are unique. Contact us to discuss how our services can be tailored to your family's objectives.",
  ctaButtonLabel: "CONTACT US",
  ctaButtonHref: "/contact",
  seoTitle: "Our Services",
  seoDescription:
    "Comprehensive family office services — from wealth planning and governance to alternative investments and trust administration. Fortify, grow, succeed.",
};

const Services = () => {
  const { data: cmsData, isLoading, isError } = useCmsServicesPage();

  const cmsSettings = cmsData?.settings;
  const settings = {
    heroTitle: cmsSettings?.hero_title ?? fallbackSettings.heroTitle,
    heroSubtitle: cmsSettings?.hero_subtitle ?? fallbackSettings.heroSubtitle,
    intro1: cmsSettings?.intro_paragraph_1 ?? fallbackSettings.intro1,
    intro2: cmsSettings?.intro_paragraph_2 ?? fallbackSettings.intro2,
    ctaTitle: cmsSettings?.cta_title ?? fallbackSettings.ctaTitle,
    ctaBody: cmsSettings?.cta_body ?? fallbackSettings.ctaBody,
    ctaButtonLabel: cmsSettings?.cta_button_label ?? fallbackSettings.ctaButtonLabel,
    ctaButtonHref: cmsSettings?.cta_button_href ?? fallbackSettings.ctaButtonHref,
    seoTitle: cmsSettings?.seo_title ?? fallbackSettings.seoTitle,
    seoDescription: cmsSettings?.seo_description ?? fallbackSettings.seoDescription,
  };

  const cmsItems = cmsData?.serviceItems ?? [];
  const byCategory = (category: CmsServiceCategory) =>
    cmsItems
      .filter((item) => item.category === category)
      .map(({ title, description }) => ({ title, description }));

  const familyCouncilData = byCategory("family_council");
  const investmentData = byCategory("investment");
  const resolvedFamilyCouncilServices =
    familyCouncilData.length > 0 ? familyCouncilData : familyCouncilServices;
  const resolvedInvestmentServices =
    investmentData.length > 0 ? investmentData : investmentServices;

  return (
    <Layout>
      <SEOHead
        title={settings.seoTitle}
        description={settings.seoDescription}
        preloadImage={heroImage}
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
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
              {settings.heroTitle}
            </h1>
            <h2 className="text-accent font-sans text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              {settings.heroSubtitle}
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          {isError && (
            <AnimatedSection className="mb-10">
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
                <p className="text-destructive font-sans text-sm">
                  CMS content is temporarily unavailable. Showing fallback content.
                </p>
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection className="max-w-3xl mb-20">
            <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
              {settings.intro1}
            </p>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">
              {settings.intro2}
            </p>
          </AnimatedSection>

          {/* Family Council Services */}
          <AnimatedSection className="mb-20">
            <h3 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-8 title-accent">
              Family Council Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isLoading ? familyCouncilServices : resolvedFamilyCouncilServices).map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-accent/10 rounded-lg p-6 card-hover"
                >
                  <h4 className="font-sans text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h4>
                  <p className="font-sans text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Investment Services */}
          <AnimatedSection className="mb-20">
            <h3 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-8 title-accent">
              Investment Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isLoading ? investmentServices : resolvedInvestmentServices).map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-primary/10 rounded-lg p-6 card-hover"
                >
                  <h4 className="font-sans text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h4>
                  <p className="font-sans text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection>
            <div className="bg-primary rounded-lg p-8 lg:p-12 text-center">
              <h3 className="font-sans text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                {settings.ctaTitle}
              </h3>
              <p className="text-primary-foreground/70 font-sans text-lg mb-6 max-w-2xl mx-auto">
                {settings.ctaBody}
              </p>
              <Link
                to={settings.ctaButtonHref}
                className="inline-flex items-center px-8 py-3 bg-accent text-accent-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-accent/90 transition-colors"
              >
                {settings.ctaButtonLabel}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ResearchSection />
    </Layout>
  );
};

export default Services;
