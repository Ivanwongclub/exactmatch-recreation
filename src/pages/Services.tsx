import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-services.jpg";
import portrait1 from "@/assets/portrait-1.jpg";
import portrait2 from "@/assets/portrait-2.jpg";

const familyCouncilServices = [
  {
    title: "Charity & Philanthropy",
    description:
      "Strategic philanthropic planning to create meaningful impact while optimizing tax benefits.",
  },
  {
    title: "Wealth Planning",
    description:
      "Comprehensive wealth structuring to preserve and grow assets across generations.",
  },
  {
    title: "Education",
    description:
      "Preparing the next generation with financial literacy and leadership development programs.",
  },
  {
    title: "Family Governance",
    description:
      "Establishing frameworks for family decision-making, conflict resolution, and succession planning.",
  },
];

const investmentServices = [
  {
    title: "Wealth Management",
    description:
      "Tailored investment strategies aligned with your family's risk tolerance and objectives.",
  },
  {
    title: "Tax Planning",
    description:
      "Sophisticated tax optimization strategies across multiple jurisdictions.",
  },
  {
    title: "Alternative Investments",
    description:
      "Access to exclusive private equity, real estate, and hedge fund opportunities.",
  },
  {
    title: "Trust and Corporate Services",
    description:
      "Expert structuring and administration of trusts and family holding companies.",
  },
];

const Services = () => {
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
            <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
              Our Services
            </h1>
            <h2 className="text-accent font-serif text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              Fortify, Grow, Succeed
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <AnimatedSection>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
                At King Armour, we offer a comprehensive suite of services designed to address
                the unique needs of ultra-high-net-worth families. Our holistic approach
                integrates financial expertise with family dynamics, ensuring that every
                solution we provide strengthens both your portfolio and your legacy.
              </p>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                Our services are structured around two core pillars: Family Council Services
                and Investment Services. Together, they form a complete framework for
                multi-generational wealth preservation and growth.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="flex gap-4">
              <div className="flex-1 rounded-lg overflow-hidden">
                <img
                  src={portrait1}
                  alt="Professional advisor"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="flex-1 rounded-lg overflow-hidden">
                <img
                  src={portrait2}
                  alt="Professional advisor"
                  className="w-full h-64 object-cover"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Family Council Services */}
          <AnimatedSection className="mb-20">
            <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-8 title-accent">
              Family Council Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {familyCouncilServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-accent/10 rounded-lg p-6 card-hover"
                >
                  <h4 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h4>
                  <p className="font-sans text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Investment Services */}
          <AnimatedSection>
            <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-8 title-accent">
              Investment Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investmentServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-primary/10 rounded-lg p-6 card-hover"
                >
                  <h4 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h4>
                  <p className="font-sans text-muted-foreground">{service.description}</p>
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

export default Services;
