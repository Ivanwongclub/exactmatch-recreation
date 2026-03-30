import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import historicBuilding from "@/assets/historic-building.webp";
import { useCmsMediaAssets } from "@/hooks/useCmsBlocks";
import { resolveMediaUrl } from "@/lib/cms/mediaUtils";

const EventsTeaserSection = () => {
  const { data: mediaAssets } = useCmsMediaAssets();
  const teaserImage = resolveMediaUrl(mediaAssets, "home-events-teaser", historicBuilding);

  return (
    <section className="bg-primary text-primary-foreground py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="rounded-2xl overflow-hidden">
              <img loading="lazy" decoding="async"
                src={teaserImage}
                alt="Members-only events venue"
                className="w-full h-[340px] lg:h-[420px] object-cover"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <p className="text-accent font-sans text-sm font-semibold tracking-widest uppercase mb-4">
              Members-Only Events
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold leading-tight mb-6">
              Where Ideas Meet Opportunity
            </h2>
            <p className="text-primary-foreground/65 font-sans text-lg leading-relaxed mb-4">
              From intimate roundtables to our signature Summer Program, our
              events create the conditions for meaningful connections and
              collaborative insight among the world's most dynamic families.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/members-only-events"
                className="group inline-flex items-center text-accent font-sans text-sm font-medium tracking-wider transition-colors hover:text-accent/80"
              >
                <span className="relative">
                  UPCOMING EVENTS
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full" />
                </span>
              </Link>
              <span className="text-primary-foreground/30">|</span>
              <Link
                to="/summer-program"
                className="group inline-flex items-center text-accent font-sans text-sm font-medium tracking-wider transition-colors hover:text-accent/80"
              >
                <span className="relative">
                  SUMMER PROGRAM
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full" />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default EventsTeaserSection;
