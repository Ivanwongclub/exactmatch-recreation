import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const Counter = ({ end, prefix = "", suffix = "", duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const features = [
  {
    number: "01",
    title: "Research & Development",
    description:
      "Continuous innovation in wealth management strategies, leveraging cutting-edge financial technologies and global market insights.",
  },
  {
    number: "02",
    title: "Precision Testing Analysis",
    description:
      "Rigorous analysis and stress-testing of investment strategies to ensure optimal risk-adjusted returns for our clients.",
  },
  {
    number: "03",
    title: "Scalable Production Delivery",
    description:
      "Seamless execution and delivery of customized solutions, adapting to the evolving needs of multi-generational families.",
  },
];

const ResearchSection = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Stats */}
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <div className="text-center md:text-left">
            <div className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-2">
              <Counter end={500} prefix="$" suffix="+" />
            </div>
            <p className="font-sans text-lg text-primary-foreground/70">
              Million in assets under advisory
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-2">
              <Counter end={20} suffix="+" />
            </div>
            <p className="font-sans text-lg text-primary-foreground/70">
              Years of combined expertise
            </p>
          </div>
        </AnimatedSection>

        {/* Features */}
        <div className="space-y-12 lg:space-y-16">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.number} delay={index * 0.15}>
              <div className="border-t border-primary-foreground/20 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-1">
                    <span className="font-sans text-accent text-lg font-medium">
                      {feature.number}
                    </span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="font-serif text-2xl lg:text-3xl font-semibold">
                      {feature.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="font-sans text-primary-foreground/70 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
