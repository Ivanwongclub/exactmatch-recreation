import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import historicBuilding from "@/assets/historic-building.webp";
import keyOnCurrency from "@/assets/key-on-currency.webp";
import networkPattern from "@/assets/network-pattern.webp";
import { useCmsMediaAssets } from "@/hooks/useCmsBlocks";
import { resolveMediaUrl } from "@/lib/cms/mediaUtils";

const FeatureCards = () => {
  const { data: mediaAssets } = useCmsMediaAssets();
  const historicBuildingImage = resolveMediaUrl(mediaAssets, "home-historic-building", historicBuilding);
  const keyOnCurrencyImage = resolveMediaUrl(mediaAssets, "home-key-on-currency", keyOnCurrency);
  const networkPatternImage = resolveMediaUrl(mediaAssets, "home-network-pattern", networkPattern);

  return (
    <section className="bg-background py-16 lg:py-24 border-t border-accent/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 auto-rows-fr">
          {/* Column 1 - About Us + Image */}
          <AnimatedSection delay={0} className="flex flex-col gap-4 lg:gap-5 h-full">
            <TextCard
              title="ABOUT US"
              subtitle="Your Family's Strategic Ally"
              link="/"
              variant="dark"
              className="flex-[1.2]"
            />
            <ImageCard src={historicBuildingImage} alt="Historic building" className="flex-1" />
          </AnimatedSection>

          {/* Column 2 - Image + History */}
          <AnimatedSection delay={0.1} className="flex flex-col gap-4 lg:gap-5 h-full">
            <ImageCard src={keyOnCurrencyImage} alt="Key on currency" className="flex-1" />
            <TextCard
              title="HISTORY"
              subtitle="From 1957 to the Future"
              link="/history"
              variant="gold"
              className="flex-[1.2]"
            />
          </AnimatedSection>

          {/* Column 3 - Services + Network Image + Kings Network */}
          <AnimatedSection delay={0.2} className="flex flex-col gap-4 lg:gap-5 h-full">
            <TextCard
              title="OUR SERVICES"
              subtitle="Fortify, Grow, Succeed"
              link="/services"
              variant="gold"
              className="flex-1"
            />
            <ImageCard src={networkPatternImage} alt="Network connections" className="flex-[0.7]" />
            <TextCard
              title="KINGS NETWORK"
              subtitle="Elite Connections, Exclusive Access"
              link="/kings-network"
              variant="dark"
              className="flex-1"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

interface TextCardProps {
  title: string;
  subtitle: string;
  link: string;
  variant: "dark" | "gold";
  className?: string;
}

const TextCard = ({ title, subtitle, link, variant, className = "" }: TextCardProps) => {
  const isDark = variant === "dark";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-8 lg:p-10 flex flex-col min-h-[200px] ${
        isDark ? "bg-[#2B2338]" : "bg-[#DEBA82]"
      } ${className}`}
    >
      <div className="flex-1 flex flex-col justify-center">
        <h3
          className={`font-sans text-3xl lg:text-4xl font-semibold tracking-tight mb-4 ${
            isDark ? "text-white" : "text-[#4a3f6b]"
          }`}
        >
          {title}
        </h3>
        <p
          className={`font-sans text-base lg:text-lg font-light ${
            isDark ? "text-[#d4b896]" : "text-[#5a4a3a]"
          }`}
        >
          {subtitle}
        </p>
      </div>
      <div className="mt-6">
        <Link
          to={link}
          className={`group inline-flex items-center font-sans text-sm font-medium transition-all duration-300 hover:translate-y-0.5 ${
            isDark 
              ? "text-white hover:text-ka-gold" 
              : "text-[#4a3f6b] hover:text-primary"
          }`}
        >
          <span className="relative">
            Learn more
            <span 
              className={`absolute left-0 -bottom-1 h-px w-0 transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full ${
                isDark ? "bg-ka-gold" : "bg-primary"
              }`} 
            />
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageCard = ({ src, alt, className = "" }: ImageCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl overflow-hidden ${className}`}
    >
      <img loading="lazy" decoding="async" src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
};

export default FeatureCards;
