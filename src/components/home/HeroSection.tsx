import { motion } from "framer-motion";
import heroImage from "@/assets/hero-home.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Purple/Magenta Gradient Overlay - matching original site colors */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(120, 60, 130, 0.75) 0%, rgba(80, 50, 100, 0.7) 50%, rgba(40, 30, 60, 0.8) 100%)',
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Additional purple tint overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(100, 50, 120, 0.3) 0%, transparent 50%, rgba(40, 20, 60, 0.4) 100%)'
        }}
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 noise-bg opacity-20" />

      {/* Content - positioned like original: left side, vertically centered */}
      <div className="relative z-10 container mx-auto px-8 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl"
        >
          {/* Gold left border accent */}
          <div className="border-l-4 border-accent pl-6 lg:pl-8">
            <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 lg:mb-6">
              King Armour
            </h1>
            <h2 className="text-accent font-serif text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal tracking-wide italic">
              Your Family's Strategic Ally
            </h2>
          </div>
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
