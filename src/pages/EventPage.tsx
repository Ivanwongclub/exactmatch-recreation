import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-network.jpg";
import { Calendar, MapPin, Clock, AlertCircle } from "lucide-react";

interface EventDetail {
  title: string;
  date: string;
  location: string;
  time?: string;
  summary: string;
  agenda: string[];
  available: boolean;
}

const eventData: EventDetail = {
  title: "Art Collections & Private Auction",
  date: "September 2025",
  location: "Hong Kong",
  time: "6:00 PM — 10:00 PM HKT",
  summary:
    "An evening of private viewings and curated access to rare investment-grade artwork, paired with expert-led discussion on art as an asset class. This exclusive gathering brings together Kings Network members for an evening of culture, conversation, and connoisseurship.",
  agenda: [
    "Welcome reception and private gallery viewing",
    "Expert-led discussion: Art as a multigenerational asset",
    "Curated auction of selected works",
    "Networking dinner among Kings Network members",
  ],
  available: true,
};

const EventPage = () => {
  return (
    <Layout>
      <SEOHead
        title="Event"
        description="Upcoming Kings Network event — exclusive gatherings and experiences for members and invited guests."
      preloadImage={heroImage}
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
              Event
            </h1>
            <h2 className="text-accent font-sans text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              Upcoming Gatherings and Experiences
            </h2>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          {eventData.available ? (
            <>
              {/* Event Header */}
              <AnimatedSection className="mb-12">
                <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {eventData.title}
                </h2>
                <div className="flex flex-wrap gap-6 mb-8">
                  <span className="inline-flex items-center gap-2 text-accent font-sans text-sm font-medium tracking-wider">
                    <Calendar className="w-4 h-4" />
                    {eventData.date}
                  </span>
                  <span className="inline-flex items-center gap-2 text-muted-foreground font-sans text-sm tracking-wider">
                    <MapPin className="w-4 h-4" />
                    {eventData.location}
                  </span>
                  {eventData.time && (
                    <span className="inline-flex items-center gap-2 text-muted-foreground font-sans text-sm tracking-wider">
                      <Clock className="w-4 h-4" />
                      {eventData.time}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-3xl">
                  {eventData.summary}
                </p>
              </AnimatedSection>

              {/* Agenda */}
              <AnimatedSection className="mb-16">
                <div className="border-t border-accent/30 pt-10">
                  <h3 className="font-sans text-2xl font-bold text-foreground mb-6">
                    Agenda
                  </h3>
                  <div className="space-y-4 max-w-2xl">
                    {eventData.agenda.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4"
                      >
                        <span className="font-sans text-accent text-sm font-semibold min-w-[28px] mt-0.5">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="font-sans text-muted-foreground text-lg leading-relaxed">
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* CTA */}
              <AnimatedSection>
                <div className="bg-primary rounded-lg p-8 lg:p-12">
                  <h3 className="font-sans text-2xl font-bold text-primary-foreground mb-4">
                    Secure Your Place
                  </h3>
                  <p className="text-primary-foreground/70 font-sans text-lg mb-6 max-w-2xl">
                    Attendance is by invitation only. If you are a Kings Network
                    member or wish to attend as a guest, please contact our team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-accent/90 transition-colors"
                    >
                      REQUEST INVITATION
                    </Link>
                    <Link
                      to="/members-only-events"
                      className="inline-flex items-center justify-center px-8 py-3 border border-primary-foreground/20 text-primary-foreground font-sans text-sm font-semibold tracking-wider rounded hover:border-accent hover:text-accent transition-colors"
                    >
                      ALL EVENTS
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </>
          ) : (
            /* Unavailable State */
            <AnimatedSection>
              <div className="bg-muted rounded-lg p-12 text-center max-w-2xl mx-auto">
                <AlertCircle className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="font-sans text-2xl font-semibold text-foreground mb-3">
                  Event Details Unavailable
                </h3>
                <p className="text-muted-foreground font-sans text-lg mb-8 max-w-md mx-auto">
                  This event is not currently available for viewing. It may have
                  concluded or details are still being finalised.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/members-only-events"
                    className="inline-flex items-center justify-center px-7 py-3 bg-primary text-primary-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-primary/90 transition-colors"
                  >
                    VIEW ALL EVENTS
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-7 py-3 border border-foreground/20 text-foreground font-sans text-sm font-semibold tracking-wider rounded hover:border-accent hover:text-accent transition-colors"
                  >
                    CONTACT US
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <ResearchSection />
    </Layout>
  );
};

export default EventPage;
