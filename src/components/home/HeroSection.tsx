import { motion } from "framer-motion";
import heroImage from "@/assets/hero-home.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Purple Gradient Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Noise Texture */}
      <div className="absolute inset-0 noise-bg opacity-30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-20 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="title-accent"
        >
          <h1 className="text-white font-serif text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
            King Armour
          </h1>
          <h2 className="text-accent font-serif text-xl md:text-2xl lg:text-3xl font-normal tracking-wide">
            Your Family's Strategic Ally
          </h2>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
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
