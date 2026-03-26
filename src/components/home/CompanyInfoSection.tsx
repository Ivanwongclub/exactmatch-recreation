import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import marbleTexture from "@/assets/marble-texture.webp";

const CompanyInfoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.35, 1.15, 1]);

  return (
    <section ref={containerRef} className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">
          {/* Image with Parallax Zoom */}
          <AnimatedSection direction="left" className="order-2 lg:order-1 h-full lg:col-span-2">
            <div className="relative h-full min-h-[300px] rounded-lg bg-background overflow-hidden">
              <motion.div
                className="w-full h-full"
                style={{ scale }}
              >
                <img loading="lazy" decoding="async"
                  src={marbleTexture}
                  alt="Marble texture"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Text Content */}
          <AnimatedSection direction="right" className="order-1 lg:order-2 lg:col-span-3">
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
            <p className="text-foreground font-sans text-lg leading-relaxed mb-8">
              Join the ranks of distinguished families who have entrusted their legacies to
              King Armour. Together, we'll build a future that honors your past while
              embracing the possibilities of tomorrow.
            </p>
            <Link 
              to="/services" 
              className="group inline-flex items-center gap-1 text-primary font-medium transition-all duration-300 hover:text-ka-gold hover:translate-y-0.5"
            >
              <span className="relative">
                Learn more
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-ka-gold transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full" />
              </span>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfoSection;
