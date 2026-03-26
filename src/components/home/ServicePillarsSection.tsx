import { Link } from "react-router-dom";
import { Shield, TrendingUp, Flame } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const pillars = [
  {
    icon: TrendingUp,
    title: "Thrust Forward",
    description:
      "Unlock growth through strategic investments, diversified portfolios, and access to exclusive global opportunities.",
  },
  {
    icon: Shield,
    title: "Stand Guard",
    description:
      "Deploy sophisticated risk management and asset-protection strategies tailored to your family's unique profile.",
  },
  {
    icon: Flame,
    title: "Pass the Torch",
    description:
      "Foster enduring generational bonds through succession planning, governance frameworks, and shared vision.",
  },
];

const ServicePillarsSection = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <p className="text-accent font-sans text-sm font-semibold tracking-widest uppercase mb-4">
            Our Approach
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold mb-14 max-w-2xl">
            Three Pillars of Family Stewardship
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, i) => (
            <AnimatedSection key={pillar.title} delay={i * 0.12}>
              <div className="border-t border-primary-foreground/15 pt-8">
                <pillar.icon className="w-8 h-8 text-accent mb-5" strokeWidth={1.5} />
                <h3 className="font-sans text-xl font-semibold mb-3">
                  {pillar.title}
                </h3>
                <p className="text-primary-foreground/65 font-sans text-base leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="mt-12">
          <Link
            to="/services"
            className="group inline-flex items-center text-accent font-sans text-sm font-medium tracking-wider transition-colors hover:text-accent/80"
          >
            <span className="relative">
              VIEW ALL SERVICES
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full" />
            </span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ServicePillarsSection;
