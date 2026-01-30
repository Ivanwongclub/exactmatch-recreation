import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import portrait1 from "@/assets/portrait-1.jpg";
import portrait2 from "@/assets/portrait-2.jpg";
import aboutImage from "@/assets/about-image.jpg";
import heroNetwork from "@/assets/hero-network.jpg";

const FeatureCards = () => {
  return (
    <section className="bg-background py-16 lg:py-24 border-t border-accent/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {/* Column 1 - About Us + Image */}
          <AnimatedSection delay={0} className="flex flex-col gap-4 lg:gap-5">
            <TextCard
              title="ABOUT US"
              subtitle="Your Family's Strategic Ally"
              link="/"
              variant="dark"
              className="min-h-[320px] lg:min-h-[380px]"
            />
            <ImageCard src={portrait1} alt="Historic building" className="h-[280px] lg:h-[320px]" />
          </AnimatedSection>

          {/* Column 2 - Image + History */}
          <AnimatedSection delay={0.1} className="flex flex-col gap-4 lg:gap-5">
            <ImageCard src={aboutImage} alt="Key on currency" className="h-[280px] lg:h-[340px]" />
            <TextCard
              title="HISTORY"
              subtitle="From 1957 to the Future"
              link="/history"
              variant="gold"
              className="min-h-[280px] lg:min-h-[360px]"
            />
          </AnimatedSection>

          {/* Column 3 - Services + Network Image + Kings Network */}
          <AnimatedSection delay={0.2} className="flex flex-col gap-4 lg:gap-5">
            <TextCard
              title="OUR SERVICES"
              subtitle="Fortify, Grow, Succeed"
              link="/services"
              variant="gold"
              className="min-h-[200px] lg:min-h-[240px]"
            />
            <ImageCard src={heroNetwork} alt="Network connections" className="h-[180px] lg:h-[200px]" />
            <TextCard
              title="KINGS NETWORK"
              subtitle="Elite Connections, Exclusive Access"
              link="/kings-network"
              variant="dark"
              className="min-h-[200px] lg:min-h-[240px]"
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
      className={`rounded-2xl p-8 lg:p-10 flex flex-col justify-between ${
        isDark ? "bg-[#1a1a1a]" : "bg-[#d4b896]"
      } ${className}`}
    >
      <div>
        <h3
          className={`font-serif text-3xl lg:text-4xl font-bold mb-6 ${
            isDark ? "text-white" : "text-[#4a3f6b]"
          }`}
        >
          {title}
        </h3>
      </div>
      <div>
        <p
          className={`font-serif text-lg lg:text-xl italic mb-6 ${
            isDark ? "text-[#d4b896]" : "text-[#5a4a3a]"
          }`}
        >
          {subtitle}
        </p>
        <Link
          to={link}
          className={`inline-block font-sans text-sm font-medium border-b ${
            isDark 
              ? "text-white border-white/60 hover:border-white" 
              : "text-[#4a3f6b] border-[#4a3f6b]/60 hover:border-[#4a3f6b]"
          } transition-colors`}
        >
          Learn more
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
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
};

export default FeatureCards;
