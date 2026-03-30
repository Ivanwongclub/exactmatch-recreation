import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-history.jpg";
import { Shield } from "lucide-react";
import { useCmsMediaAssetBySlug } from "@/hooks/useCmsBlocks";

interface BoardMember {
  name: string;
  role: string;
  bio: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Dr. Jonathan Choi",
    role: "Chairman of the Board",
    bio: "Founder of the Sunwah Group and architect of King Armour's foundational vision. Dr. Choi's strategic leadership across Asia, North America, and beyond provides the governance framework that underpins every client relationship.",
  },
  {
    name: "Eleanor Yip",
    role: "Independent Director",
    bio: "A distinguished governance specialist with over twenty years of experience advising family enterprises on board composition, fiduciary responsibility, and regulatory compliance across multiple jurisdictions.",
  },
  {
    name: "David Chen",
    role: "Non-Executive Director",
    bio: "Brings deep expertise in institutional asset management and cross-border structuring, ensuring King Armour's investment frameworks meet the highest standards of prudence and accountability.",
  },
];

const BoardOfDirectors = () => {
  const { data: heroMedia } = useCmsMediaAssetBySlug("hero-history");
  const resolvedHeroImage = heroMedia?.url ?? heroImage;

  return (
    <Layout>
      <SEOHead
        title="Board of Directors"
        description="King Armour's Board of Directors provides independent oversight, strategic counsel, and the highest fiduciary standards for the families we serve."
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
              Board of Directors
            </h1>
            <h2 className="text-accent font-sans text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              Governance That Inspires Confidence
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Governance Framing */}
      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="max-w-3xl mb-16">
            <p className="text-foreground font-sans text-xl leading-relaxed font-medium mb-6">
              Strong governance is the foundation of enduring trust.
            </p>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
              King Armour's Board of Directors provides independent oversight,
              strategic counsel, and an unwavering commitment to the highest
              fiduciary standards. Our directors bring a breadth of experience
              spanning international finance, regulatory affairs, and family
              enterprise governance.
            </p>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">
              Every governance decision is guided by a single principle: to
              protect and advance the long-term interests of the families
              we serve.
            </p>
          </AnimatedSection>

          {boardMembers.length > 0 ? (
            <div className="space-y-8">
              {boardMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="border-t border-accent/20 pt-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                    <div className="lg:col-span-4">
                      <h4 className="font-sans text-xl font-semibold text-foreground">
                        {member.name}
                      </h4>
                      <p className="text-accent font-sans text-sm font-medium tracking-wider mt-1">
                        {member.role}
                      </p>
                    </div>
                    <div className="lg:col-span-8">
                      <p className="font-sans text-muted-foreground text-lg leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <div className="bg-muted rounded-lg p-12 text-center">
                <Shield className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="font-sans text-xl font-semibold text-foreground mb-2">
                  Board Profiles Coming Soon
                </h3>
                <p className="text-muted-foreground font-sans max-w-md mx-auto">
                  Detailed profiles of our Board of Directors are being
                  finalised. Please contact us for governance inquiries.
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <ResearchSection />
    </Layout>
  );
};

export default BoardOfDirectors;
