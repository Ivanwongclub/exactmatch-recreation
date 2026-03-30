import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import networkPattern from "@/assets/network-pattern.webp";
import { useCmsMediaAssets } from "@/hooks/useCmsBlocks";
import { resolveMediaUrl } from "@/lib/cms/mediaUtils";

const KingsNetworkSpotlight = () => {
  const { data: mediaAssets } = useCmsMediaAssets();
  const networkPatternImage = resolveMediaUrl(mediaAssets, "home-network-pattern", networkPattern);

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="rounded-2xl overflow-hidden">
              <img loading="lazy" decoding="async"
                src={networkPatternImage}
                alt="Kings Network — curated connections"
                className="w-full h-[340px] lg:h-[420px] object-cover"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <p className="text-accent font-sans text-sm font-semibold tracking-widest uppercase mb-4">
              Kings Network
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              Elite Connections, Exclusive Access
            </h2>
            <p className="text-foreground/70 font-sans text-lg leading-relaxed mb-4">
              The Kings Network is our invitation-only community connecting
              next-generation leaders, established family principals, and
              world-class advisors across industries and geographies.
            </p>
            <p className="text-foreground/70 font-sans text-lg leading-relaxed mb-8">
              Through curated events, thought-leadership forums, and
              collaborative deal-flow, members gain relationships that
              compound in value over decades.
            </p>
            <Link
              to="/kings-network"
              className="group inline-flex items-center text-foreground font-sans text-sm font-medium tracking-wider transition-colors hover:text-accent"
            >
              <span className="relative">
                DISCOVER THE NETWORK
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full" />
              </span>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default KingsNetworkSpotlight;
