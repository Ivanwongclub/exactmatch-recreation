import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-home.jpg";

interface HeroSectionProps {
  heroImageSrc?: string;
}

const HeroSection = ({ heroImageSrc = heroImage }: HeroSectionProps) => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center">
      <img
        src={heroImageSrc}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(120, 60, 130, 0.75) 0%, rgba(80, 50, 100, 0.7) 50%, rgba(40, 30, 60, 0.8) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(100, 50, 120, 0.3) 0%, transparent 50%, rgba(40, 20, 60, 0.4) 100%)",
        }}
      />

      <div className="absolute inset-0 noise-bg opacity-20" />

      <div className="relative z-10 container mx-auto px-8 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl"
        >
          <div className="border-l-4 border-accent pl-6 lg:pl-8">
            <h1 className="text-white font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 lg:mb-6 leading-[1.1]">
              Stewardship That Endures
            </h1>
            <p className="text-white/80 font-sans text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-8">
              Trusted relationships. Long-term value.
              <br />
              Your family's strategic ally since 1957.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center px-7 py-3 bg-accent text-accent-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-accent/90 transition-colors"
              >
                CONTACT US
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-7 py-3 border border-white/40 text-white font-sans text-sm font-semibold tracking-wider rounded hover:border-accent hover:text-accent transition-colors"
              >
                EXPLORE SERVICES
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div className="w-1.5 h-3 bg-white/70 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
