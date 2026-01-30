import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import portrait1 from "@/assets/portrait-1.jpg";
import portrait2 from "@/assets/portrait-2.jpg";
import aboutImage from "@/assets/about-image.jpg";

const cards = [
  {
    title: "ABOUT US",
    subtitle: "Your Family's Strategic Ally",
    link: "/",
    linkText: "Learn more",
    image: portrait1,
    variant: "dark" as const,
    showImage: true,
    imagePosition: "bottom" as const,
  },
  {
    title: "HISTORY",
    subtitle: "From 1957 to the Future",
    link: "/history",
    linkText: "Learn more",
    image: portrait2,
    variant: "gold" as const,
    showImage: true,
    imagePosition: "top" as const,
  },
  {
    title: "OUR SERVICES",
    subtitle: "Fortify, Grow, Succeed",
    link: "/services",
    linkText: "Learn more",
    image: aboutImage,
    variant: "gold" as const,
    showImage: true,
    imagePosition: "bottom" as const,
  },
  {
    title: "KINGS NETWORK",
    subtitle: "Elite Connections, Exclusive Access",
    link: "/kings-network",
    linkText: "Learn more",
    variant: "dark" as const,
    showImage: false,
  },
];

const FeatureCards = () => {
  return (
    <section className="bg-background py-16 lg:py-24 border-t border-accent/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Column 1 - About Us */}
          <AnimatedSection delay={0} className="space-y-4">
            <CardContent {...cards[0]} />
          </AnimatedSection>

          {/* Column 2 - History (hidden on tablet, shown on desktop) */}
          <AnimatedSection delay={0.1} className="hidden lg:block space-y-4">
            <div className="rounded-lg overflow-hidden">
              <img
                src={portrait2}
                alt="Professional portrait"
                className="w-full h-64 object-cover"
              />
            </div>
            <CardContent {...cards[1]} showImage={false} />
          </AnimatedSection>

          {/* Column 3 - Services & Network */}
          <AnimatedSection delay={0.2} className="space-y-4">
            <CardContent {...cards[2]} showImage={false} />
            <div className="rounded-lg overflow-hidden">
              <img
                src={aboutImage}
                alt="Luxury yacht"
                className="w-full h-48 object-cover"
              />
            </div>
            <CardContent {...cards[3]} />
          </AnimatedSection>
        </div>

        {/* Mobile-only History card */}
        <AnimatedSection delay={0.3} className="lg:hidden mt-4">
          <CardContent {...cards[1]} />
        </AnimatedSection>
      </div>
    </section>
  );
};

interface CardContentProps {
  title: string;
  subtitle: string;
  link: string;
  linkText: string;
  variant: "dark" | "gold";
  showImage?: boolean;
  image?: string;
  imagePosition?: "top" | "bottom";
}

const CardContent = ({
  title,
  subtitle,
  link,
  linkText,
  variant,
  showImage = false,
  image,
  imagePosition = "bottom",
}: CardContentProps) => {
  const isDark = variant === "dark";

  return (
    <div className="flex flex-col gap-4">
      {showImage && imagePosition === "top" && image && (
        <div className="rounded-lg overflow-hidden">
          <img src={image} alt={title} className="w-full h-64 object-cover" />
        </div>
      )}

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className={`rounded-lg p-6 lg:p-8 ${
          isDark ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        }`}
      >
        <h3
          className={`font-serif text-2xl lg:text-3xl font-semibold mb-2 ${
            isDark ? "text-primary-foreground" : "text-accent-foreground"
          }`}
        >
          {title}
        </h3>
        <p
          className={`font-serif text-lg mb-4 ${
            isDark ? "text-accent" : "text-accent-foreground/80"
          }`}
        >
          {subtitle}
        </p>
        <Link
          to={link}
          className={`inline-block font-sans text-sm font-medium link-underline ${
            isDark ? "text-primary-foreground" : "text-accent-foreground"
          }`}
        >
          {linkText}
        </Link>
      </motion.div>

      {showImage && imagePosition === "bottom" && image && (
        <div className="rounded-lg overflow-hidden">
          <img src={image} alt={title} className="w-full h-64 object-cover" />
        </div>
      )}
    </div>
  );
};

export default FeatureCards;
