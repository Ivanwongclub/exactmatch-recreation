import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-home.jpg";

const principles = [
  {
    number: "01",
    title: "Stewardship Over Speculation",
    description:
      "We approach every engagement as custodians of generational wealth — prioritising preservation and purposeful growth over short-term gains.",
  },
  {
    number: "02",
    title: "Integrity Without Exception",
    description:
      "Trust is the cornerstone of every relationship we build. We hold ourselves to the highest ethical standards in every decision, every transaction, and every conversation.",
  },
  {
    number: "03",
    title: "Generational Continuity",
    description:
      "We design structures and strategies that outlast any single generation, ensuring that values, governance, and prosperity endure across decades.",
  },
  {
    number: "04",
    title: "Discretion & Confidentiality",
    description:
      "The families we serve expect — and deserve — absolute privacy. Discretion is embedded in our culture, not merely a policy.",
  },
  {
    number: "05",
    title: "Holistic Counsel",
    description:
      "Wealth is only one dimension of a family's legacy. We integrate financial strategy with governance, education, philanthropy, and succession to serve the whole family.",
  },
];

const OurMission = () => {
  return (
    <Layout>
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
              Our Mission
            </h1>
            <h2 className="text-accent font-sans text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              Purpose-Driven Stewardship for Families of Substance
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="max-w-3xl mb-20">
            <p className="text-foreground font-sans text-xl md:text-2xl leading-relaxed mb-8 font-medium">
              King Armour exists to safeguard the interests of distinguished families —
              ensuring that wealth, values, and vision are preserved and strengthened
              across generations.
            </p>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
              We believe that authentic family office stewardship goes beyond portfolio
              management. It requires a deep understanding of each family's unique
              aspirations, a commitment to long-term relationships, and the discipline
              to act with integrity in every circumstance.
            </p>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">
              Our mission is to serve as a trusted partner — offering the expertise,
              discretion, and global perspective that families of substance require to
              navigate an increasingly complex world with confidence.
            </p>
          </AnimatedSection>

          {/* Long-Term Philosophy */}
          <AnimatedSection className="mb-20">
            <div className="border-t border-accent/30 pt-12">
              <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-6">
                Our Long-Term Philosophy
              </h3>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-3xl mb-6">
                Short-term thinking erodes legacy. At King Armour, we take a measured,
                multi-generational view of every decision — from investment strategy
                to governance design, from succession planning to philanthropic
                commitment.
              </p>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-3xl">
                This philosophy is informed by over six decades of operational experience
                within the Sunwah Group, where patience, foresight, and disciplined
                execution have consistently delivered enduring value.
              </p>
            </div>
          </AnimatedSection>

          {/* Guiding Principles */}
          <AnimatedSection>
            <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-10">
              Guiding Principles
            </h3>
            <div className="space-y-8">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="border-t border-muted pt-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                    <div className="lg:col-span-1">
                      <span className="font-sans text-accent text-lg font-medium">
                        {principle.number}
                      </span>
                    </div>
                    <div className="lg:col-span-4">
                      <h4 className="font-sans text-xl font-semibold text-foreground">
                        {principle.title}
                      </h4>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="font-sans text-muted-foreground text-lg leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
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

export default OurMission;
