import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-network.jpg";
import { ArrowRight, Calendar, GraduationCap, Users } from "lucide-react";

const highlights = [
  {
    icon: Calendar,
    title: "Members-Only Events",
    description:
      "Curated quarterly gatherings — from exclusive dinners to delegation trips — designed to foster meaningful connections among distinguished families.",
    href: "/members-only-events",
    cta: "View Events",
  },
  {
    icon: GraduationCap,
    title: "Global Elite Summer Program",
    description:
      "Our flagship next-generation programme cultivating leadership, global perspective, and lifelong peer relationships for young adults from prominent families.",
    href: "/summer-program",
    cta: "Learn More",
  },
  {
    icon: Users,
    title: "Peer Network",
    description:
      "Access to a vetted community of like-minded families and individuals who share a commitment to legacy, enterprise, and mutual growth.",
    href: "/contact",
    cta: "Request Introduction",
  },
];

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
            <h1 className="text-white font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
              Kings Network
            </h1>
            <h2 className="text-accent font-sans text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              Where Legacy Meets Opportunity
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="max-w-3xl mb-20">
            <p className="text-foreground font-sans text-xl leading-relaxed font-medium mb-6">
              The Kings Network is an invitation-only community for distinguished
              families and individuals who share a commitment to excellence, legacy,
              and mutual growth.
            </p>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">
              Through curated events, our flagship summer programme, and a vetted peer
              network, members gain access to relationships and opportunities that
              transcend business — fostering connections that span generations and
              continents.
            </p>
          </AnimatedSection>

          {/* Hub Highlights — cross-links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {highlights.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="bg-primary rounded-lg p-8 h-full flex flex-col card-hover">
                  <item.icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-sans text-xl font-semibold text-primary-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-primary-foreground/70 text-sm leading-relaxed flex-1 mb-6">
                    {item.description}
                  </p>
                  <Link
                    to={item.href}
                    className="group inline-flex items-center gap-2 text-accent font-sans text-sm font-medium tracking-wider transition-colors hover:text-accent/80"
                  >
                    {item.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Quarterly Events Preview */}
          <AnimatedSection className="mb-24">
            <div className="flex items-end justify-between mb-8">
              <h3 className="font-sans text-3xl md:text-4xl font-bold text-foreground title-accent">
                Signature Events
              </h3>
              <Link
                to="/members-only-events"
                className="hidden md:inline-flex items-center gap-2 text-foreground font-sans text-sm font-medium tracking-wider hover:text-accent transition-colors"
              >
                View All Events
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(0, 6).map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-primary rounded-lg p-6 card-hover"
                >
                  <h4 className="font-sans text-lg font-semibold text-primary-foreground mb-2">
                    {event.title}
                  </h4>
                  <p className="font-sans text-primary-foreground/70 text-sm">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
            <Link
              to="/members-only-events"
              className="md:hidden inline-flex items-center gap-2 text-foreground font-sans text-sm font-medium tracking-wider hover:text-accent transition-colors mt-6"
            >
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          {/* Summer Program Preview */}
          <AnimatedSection className="mb-24">
            <div className="flex items-end justify-between mb-8">
              <h3 className="font-sans text-3xl md:text-4xl font-bold text-foreground title-accent">
                Global Elite Summer Program
              </h3>
              <Link
                to="/summer-program"
                className="hidden md:inline-flex items-center gap-2 text-foreground font-sans text-sm font-medium tracking-wider hover:text-accent transition-colors"
              >
                Program Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-8 max-w-3xl">
              Our flagship programme for the next generation — cultivating leadership,
              global perspective, and lifelong connections with peers from distinguished
              families worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-accent/10 rounded-lg p-6 text-center"
                >
                  <h4 className="font-sans text-xl font-semibold text-foreground mb-3">
                    {pillar.title}
                  </h4>
                  <p className="font-sans text-muted-foreground text-sm">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
            <Link
              to="/summer-program"
              className="md:hidden inline-flex items-center gap-2 text-foreground font-sans text-sm font-medium tracking-wider hover:text-accent transition-colors mt-6"
            >
              Program Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          {/* Conversion CTA */}
          <AnimatedSection>
            <div className="bg-primary rounded-lg p-8 lg:p-12 text-center">
              <h3 className="font-sans text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Membership by Invitation
              </h3>
              <p className="text-primary-foreground/70 font-sans text-lg mb-6 max-w-2xl mx-auto">
                The Kings Network is an invitation-only community. If you believe
                your family would benefit from membership, we welcome a confidential
                conversation.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 bg-accent text-accent-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-accent/90 transition-colors"
              >
                REQUEST AN INTRODUCTION
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ResearchSection />
    </Layout>
  );
};

export default KingsNetwork;
