import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-home.jpg";
import { GraduationCap, Globe, Users, Lightbulb, CheckCircle } from "lucide-react";

const programPillars = [
  {
    icon: Users,
    title: "Social",
    description:
      "Building lasting relationships with peers from distinguished families worldwide through shared experiences and collaborative challenges.",
  },
  {
    icon: Globe,
    title: "Charity",
    description:
      "Collaborative philanthropic initiatives that teach purpose-driven leadership and create meaningful community impact.",
  },
  {
    icon: Lightbulb,
    title: "Informational",
    description:
      "Exclusive workshops and seminars led by global experts in finance, technology, governance, and entrepreneurship.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship",
    description:
      "One-on-one and group guidance from seasoned leaders who have navigated the complexities of family enterprise and global business.",
  },
];

const outcomes = [
  "Confidence in leadership and decision-making within family enterprises",
  "A global network of peers who share similar values and ambitions",
  "Practical understanding of governance, philanthropy, and wealth stewardship",
  "Cross-cultural fluency and exposure to diverse business environments",
  "A lasting connection to the Kings Network community",
];

type ProgramStatus = "accepting" | "in-progress" | "completed" | "upcoming";

const currentStatus: ProgramStatus = "upcoming";
const programYear = "2025";

const statusLabels: Record<ProgramStatus, { label: string; color: string }> = {
  accepting: { label: "Now Accepting Applications", color: "text-accent" },
  upcoming: { label: "Programme Details Coming Soon", color: "text-accent" },
  "in-progress": { label: "Currently In Session", color: "text-accent" },
  completed: { label: `${programYear} Programme Completed`, color: "text-muted-foreground" },
};

const SummerProgram = () => {
  return (
    <Layout>
      <SEOHead
        title="Summer Program"
        description="The Global Elite Summer Program — cultivating leadership, global perspective, and lifelong connections for the next generation of distinguished families."
      />
      {/* Hero */}
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
              Summer Program
            </h1>
            <h2 className="text-accent font-sans text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              Cultivating the Next Generation of Leaders
            </h2>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Status Badge */}
          <AnimatedSection className="mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-5 py-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className={`font-sans text-sm font-medium tracking-wider ${statusLabels[currentStatus].color}`}>
                {statusLabels[currentStatus].label}
              </span>
            </div>
          </AnimatedSection>

          {/* Audience & Goals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
            <AnimatedSection>
              <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-6">
                Who It's For
              </h3>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
                The Global Elite Summer Program is designed for young adults aged 18–28
                from distinguished families — the future stewards of family enterprise,
                wealth, and legacy.
              </p>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                Participants are selected based on their family's alignment with the
                Kings Network values: integrity, ambition, and a commitment to
                purposeful leadership.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-6">
                Programme Goals
              </h3>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
                To equip the next generation with the mindset, skills, and relationships
                they need to lead with confidence — whether in family governance,
                business, philanthropy, or public life.
              </p>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                The programme combines immersive learning, cross-cultural exposure,
                and peer mentorship in an environment that challenges participants to
                think beyond borders and generations.
              </p>
            </AnimatedSection>
          </div>

          {/* Four Pillars */}
          <AnimatedSection className="mb-24">
            <h3 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-10 title-accent">
              Programme Pillars
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-primary rounded-lg p-6 text-center card-hover"
                >
                  <pillar.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h4 className="font-sans text-xl font-semibold text-primary-foreground mb-3">
                    {pillar.title}
                  </h4>
                  <p className="font-sans text-primary-foreground/70 text-sm">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Outcomes */}
          <AnimatedSection className="mb-24">
            <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-8 title-accent">
              Expected Outcomes
            </h3>
            <div className="max-w-2xl space-y-4">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="font-sans text-muted-foreground text-lg leading-relaxed">
                    {outcome}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection>
            <div className="bg-primary rounded-lg p-8 lg:p-12 text-center">
              <h3 className="font-sans text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Express Interest for {programYear}
              </h3>
              <p className="text-primary-foreground/70 font-sans text-lg mb-6 max-w-2xl mx-auto">
                Places are limited and offered by invitation. Contact us to learn
                more about the programme and the application process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-accent/90 transition-colors"
                >
                  CONTACT US
                </Link>
                <Link
                  to="/kings-network"
                  className="inline-flex items-center justify-center px-8 py-3 border border-primary-foreground/20 text-primary-foreground font-sans text-sm font-semibold tracking-wider rounded hover:border-accent hover:text-accent transition-colors"
                >
                  BACK TO KINGS NETWORK
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ResearchSection />
    </Layout>
  );
};

export default SummerProgram;
