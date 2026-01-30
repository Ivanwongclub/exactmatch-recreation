import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-history.jpg";
import portrait1 from "@/assets/portrait-1.jpg";
import companyImage from "@/assets/company-large.jpg";

const History = () => {
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
              History
            </h1>
            <h2 className="text-accent font-serif text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              From 1957 to the Future
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <AnimatedSection>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                From 1957 to the Future
              </h2>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
                The story of King Armour is deeply intertwined with the legacy of the Sunwah
                Group, a distinguished enterprise founded in 1957 by the visionary Dr. Jonathan
                Choi's father. What began as a modest trading company in Hong Kong has grown
                into a diversified conglomerate with interests spanning finance, real estate,
                technology, and infrastructure across Asia and beyond.
              </p>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                King Armour Family Office was established to extend this legacy of excellence
                to families seeking sophisticated wealth management solutions. Drawing on
                decades of experience navigating complex markets and building lasting value,
                we bring a unique perspective to family office services.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={portrait1}
                  alt="Professional portrait"
                  className="w-full h-auto object-cover"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Global Connections Section */}
          <AnimatedSection className="mb-20">
            <div className="border-t border-accent/30 pt-12">
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                Global Connections
              </h3>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-3xl">
                Under the leadership of Dr. Jonathan Choi, the Sunwah Group has expanded its
                global footprint, establishing strategic partnerships and ventures across
                China, Vietnam, Cambodia, Canada, and beyond. These connections form the
                foundation of King Armour's extensive network, providing our clients with
                unparalleled access to opportunities worldwide.
              </p>
            </div>
          </AnimatedSection>

          {/* Large Parallax Image */}
          <AnimatedSection>
            <div className="rounded-lg overflow-hidden">
              <motion.img
                src={companyImage}
                alt="King Armour office"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ResearchSection />
    </Layout>
  );
};

export default History;
