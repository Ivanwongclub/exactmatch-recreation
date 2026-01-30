import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import marbleTexture from "@/assets/marble-texture.webp";

const CompanyInfoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={containerRef} className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Image with Parallax Zoom */}
          <AnimatedSection direction="left" className="order-2 lg:order-1 h-full">
            <div className="relative rounded-lg overflow-hidden h-full min-h-[300px]">
              <motion.img
                src={marbleTexture}
                alt="Marble texture"
                className="w-full h-full object-cover"
                style={{ scale }}
              />
            </div>
          </AnimatedSection>

          {/* Text Content */}
          <AnimatedSection direction="right" className="order-1 lg:order-2">
            <p className="text-foreground font-sans text-lg leading-relaxed mb-6">
              At King Armour, we understand that true wealth extends beyond financial assets.
              It encompasses the values, traditions, and aspirations that define your family's
              unique legacy. Our team of seasoned professionals works closely with you to
              understand your vision and craft bespoke solutions that protect and grow your
              family's interests across generations.
            </p>
            <p className="text-foreground font-sans text-lg leading-relaxed mb-6">
              Whether you're seeking to diversify your investment portfolio, establish
              philanthropic initiatives, or navigate complex succession planning, King Armour
              provides the expertise and discretion you deserve. We combine global insights
              with local knowledge, leveraging our extensive network to unlock exclusive
              opportunities for our clients.
            </p>
            <p className="text-foreground font-sans text-lg leading-relaxed">
              Join the ranks of distinguished families who have entrusted their legacies to
              King Armour. Together, we'll build a future that honors your past while
              embracing the possibilities of tomorrow.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfoSection;
