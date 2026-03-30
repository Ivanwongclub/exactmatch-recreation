import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-network.jpg";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useCmsMediaAssetBySlug } from "@/hooks/useCmsBlocks";

interface EventItem {
  title: string;
  date: string;
  location: string;
  description: string;
  slug?: string;
  status: "upcoming" | "past";
}

const allEvents: EventItem[] = [
  {
    title: "Art Collections & Private Auction",
    date: "September 2025",
    location: "Hong Kong",
    description:
      "An evening of private viewings and curated access to rare investment-grade artwork, paired with expert-led discussion on art as an asset class.",
    slug: "art-auction-hk-2025",
    status: "upcoming",
  },
  {
    title: "Delegation Trip — Vietnam",
    date: "November 2025",
    location: "Ho Chi Minh City & Hanoi",
    description:
      "A curated journey exploring emerging investment opportunities, strategic partnerships, and cultural immersion across Vietnam's dynamic markets.",
    slug: "delegation-vietnam-2025",
    status: "upcoming",
  },
  {
    title: "Legacy Wine Tasting",
    date: "January 2026",
    location: "Bordeaux, France",
    description:
      "An intimate experience featuring rare vintages, wine investment insights, and networking among Kings Network members in a storied estate setting.",
    slug: "wine-bordeaux-2026",
    status: "upcoming",
  },
  {
    title: "Innovation Summit 2025",
    date: "March 2025",
    location: "Singapore",
    description:
      "Access to cutting-edge technologies and startup ecosystems, featuring keynotes from global innovators and exclusive deal-flow previews.",
    status: "past",
  },
  {
    title: "Exclusive Lunch — Family Office Leaders",
    date: "December 2024",
    location: "London",
    description:
      "An intimate gathering with family office principals discussing governance best practices and intergenerational wealth transfer strategies.",
    status: "past",
  },
];

const EventCard = ({ event, index }: { event: EventItem; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.5 }}
    viewport={{ once: true }}
    className={`rounded-lg p-6 card-hover ${
      event.status === "upcoming" ? "bg-primary" : "bg-muted"
    }`}
  >
    <div className="flex items-center gap-4 mb-3">
      <span
        className={`inline-flex items-center gap-1.5 font-sans text-xs font-medium tracking-wider uppercase ${
          event.status === "upcoming"
            ? "text-accent"
            : "text-muted-foreground"
        }`}
      >
        <Calendar className="w-3.5 h-3.5" />
        {event.date}
      </span>
      <span
        className={`inline-flex items-center gap-1.5 font-sans text-xs tracking-wider ${
          event.status === "upcoming"
            ? "text-primary-foreground/60"
            : "text-muted-foreground/70"
        }`}
      >
        <MapPin className="w-3.5 h-3.5" />
        {event.location}
      </span>
    </div>
    <h4
      className={`font-sans text-xl font-semibold mb-2 ${
        event.status === "upcoming" ? "text-primary-foreground" : "text-foreground"
      }`}
    >
      {event.title}
    </h4>
    <p
      className={`font-sans text-sm leading-relaxed mb-4 ${
        event.status === "upcoming"
          ? "text-primary-foreground/70"
          : "text-muted-foreground"
      }`}
    >
      {event.description}
    </p>
    {event.status === "upcoming" && (
      <Link
        to="/event"
        className="group inline-flex items-center gap-2 text-accent font-sans text-sm font-medium tracking-wider hover:text-accent/80 transition-colors"
      >
        View Details
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    )}
  </motion.div>
);

const MembersOnlyEvents = () => {
  const { data: heroMedia } = useCmsMediaAssetBySlug("hero-network");
  const resolvedHeroImage = heroMedia?.url ?? heroImage;
  const upcomingEvents = allEvents.filter((e) => e.status === "upcoming");
  const pastEvents = allEvents.filter((e) => e.status === "past");

  return (
    <Layout>
      <SEOHead
        title="Members-Only Events"
        description="Curated quarterly gatherings for Kings Network members — exclusive dinners, delegation trips, art auctions, and innovation summits."
        preloadImage={resolvedHeroImage}
        ogImage={resolvedHeroImage}
      />
      {/* Hero */}
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
              Members-Only Events
            </h1>
            <h2 className="text-accent font-sans text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              Where Ideas Meet Opportunity
            </h2>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="max-w-3xl mb-16">
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">
              Kings Network events are carefully curated to bring together families of
              substance in settings that encourage candid conversation, strategic
              collaboration, and lasting relationships. Each gathering is designed
              with intention — limited in size, exceptional in quality.
            </p>
          </AnimatedSection>

          {/* Upcoming Events */}
          <AnimatedSection className="mb-20">
            <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-8 title-accent">
              Upcoming Events
            </h3>
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={event.title} event={event} index={index} />
                ))}
              </div>
            ) : (
              <div className="bg-muted rounded-lg p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <h4 className="font-sans text-xl font-semibold text-foreground mb-2">
                  No Upcoming Events
                </h4>
                <p className="text-muted-foreground font-sans max-w-md mx-auto mb-6">
                  Our next events are being finalised. Contact us to express
                  interest and receive priority invitations.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-2.5 bg-primary text-primary-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-primary/90 transition-colors"
                >
                  CONTACT US
                </Link>
              </div>
            )}
          </AnimatedSection>

          {/* Past Events */}
          <AnimatedSection className="mb-20">
            <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-8 title-accent">
              Past Events
            </h3>
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.map((event, index) => (
                  <EventCard key={event.title} event={event} index={index} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground font-sans text-lg">
                Past event archives will be available soon.
              </p>
            )}
          </AnimatedSection>

          {/* Back to Network + CTA */}
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                to="/kings-network"
                className="inline-flex items-center px-7 py-3 border border-foreground/20 text-foreground font-sans text-sm font-semibold tracking-wider rounded hover:border-accent hover:text-accent transition-colors"
              >
                ← BACK TO KINGS NETWORK
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-7 py-3 bg-primary text-primary-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-primary/90 transition-colors"
              >
                REQUEST AN INVITATION
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ResearchSection />
    </Layout>
  );
};

export default MembersOnlyEvents;
