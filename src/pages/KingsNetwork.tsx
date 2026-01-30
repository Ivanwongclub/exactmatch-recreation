import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-network.jpg";
import portrait1 from "@/assets/portrait-1.jpg";
import portrait2 from "@/assets/portrait-2.jpg";

const events = [
  {
    title: "Car Racing Meetup",
    description: "Exclusive track days with fellow enthusiasts at world-class circuits.",
  },
  {
    title: "Exclusive Lunch Meetings",
    description: "Intimate gatherings with industry leaders and thought pioneers.",
  },
  {
    title: "Yacht Events",
    description: "Networking aboard luxury vessels in stunning destinations.",
  },
  {
    title: "Art Collections & Auctions",
    description: "Private viewings and access to rare investment-grade artwork.",
  },
  {
    title: "Delegation Trips",
    description: "Curated journeys to emerging markets and investment opportunities.",
  },
  {
    title: "Innovation Summits",
    description: "Access to cutting-edge technologies and startup ecosystems.",
  },
  {
    title: "Legacy Wine Tastings",
    description: "Rare vintage experiences and wine investment opportunities.",
  },
];

const programPillars = [
  {
    title: "Social",
    description:
      "Building lasting relationships with peers from distinguished families worldwide.",
  },
  {
    title: "Charity",
    description: "Collaborative philanthropic initiatives that create meaningful impact.",
  },
  {
    title: "Informational",
    description: "Exclusive insights from global experts in finance, technology, and business.",
  },
  {
    title: "Mentorship",
    description: "Guidance from seasoned leaders to accelerate personal and professional growth.",
  },
];

const KingsNetwork = () => {
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
              Kings Network
            </h1>
            <h2 className="text-accent font-serif text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              Elite Connections, Exclusive Access
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
                The Kings Network is an exclusive community of distinguished families and
                individuals who share a commitment to excellence, legacy, and mutual growth.
                As a member, you gain access to a curated network of like-minded peers,
                thought leaders, and exclusive opportunities unavailable to the general public.
              </p>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                Our network facilitates meaningful connections that transcend business,
                fostering relationships that span generations and continents. Through
                carefully curated events and initiatives, we create environments where
                partnerships are forged and legacies are strengthened.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="flex gap-4">
              <div className="flex-1 rounded-lg overflow-hidden">
                <img
                  src={portrait1}
                  alt="Network member"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="flex-1 rounded-lg overflow-hidden">
                <img
                  src={portrait2}
                  alt="Network member"
                  className="w-full h-64 object-cover"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Quarterly Events */}
          <AnimatedSection id="events" className="mb-20">
            <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-8 title-accent">
              Quarterly Members-Only Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-primary rounded-lg p-6 card-hover"
                >
                  <h4 className="font-serif text-xl font-semibold text-primary-foreground mb-2">
                    {event.title}
                  </h4>
                  <p className="font-sans text-primary-foreground/70 text-sm">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Global Elite Summer Program */}
          <AnimatedSection className="mb-20">
            <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-8 title-accent">
              Global Elite Summer Program
            </h3>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-8 max-w-3xl">
              Our flagship program for the next generation, designed to cultivate leadership,
              build global perspectives, and forge lifelong connections with peers from
              distinguished families worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-accent rounded-lg p-6 text-center"
                >
                  <h4 className="font-serif text-2xl font-semibold text-accent-foreground mb-3">
                    {pillar.title}
                  </h4>
                  <p className="font-sans text-accent-foreground/80 text-sm">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Exclusive Network Access */}
          <AnimatedSection>
            <div className="bg-primary rounded-lg p-8 lg:p-12 text-center">
              <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground mb-4">
                Exclusive Network Access
              </h3>
              <p className="text-primary-foreground/70 font-sans text-lg mb-6 max-w-2xl mx-auto">
                Membership in the Kings Network is by invitation only. If you believe your
                family would benefit from joining our community, we invite you to begin a
                confidential conversation with our team.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-accent text-accent-foreground font-sans font-medium px-8 py-3 rounded-full hover:bg-accent/90 transition-colors"
              >
                Request an Introduction
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ResearchSection />
    </Layout>
  );
};

export default KingsNetwork;
