import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResearchSection from "@/components/shared/ResearchSection";
import heroImage from "@/assets/hero-services.jpg";
import { Users } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

const executiveTeam: TeamMember[] = [
  {
    name: "Dr. Jonathan Choi",
    role: "Chairman",
    bio: "Visionary leader of the Sunwah Group for over four decades, Dr. Choi brings unparalleled experience in cross-border commerce, strategic investment, and family enterprise governance. His leadership has shaped the foundation upon which King Armour serves its clients.",
  },
  {
    name: "Michael Choi",
    role: "Chief Executive Officer",
    bio: "Drawing on deep expertise in international finance and family office management, Michael leads King Armour's day-to-day operations with a focus on delivering bespoke, high-touch service to each family we serve.",
  },
  {
    name: "Sarah Lam",
    role: "Head of Family Advisory",
    bio: "With over fifteen years of experience in wealth structuring and succession planning, Sarah guides families through the complexities of multi-generational governance and philanthropic strategy.",
  },
];

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-primary rounded-lg overflow-hidden card-hover"
  >
    {member.image ? (
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-56 object-cover"
      />
    ) : (
      <div className="w-full h-56 bg-secondary/50 flex items-center justify-center">
        <Users className="w-16 h-16 text-primary-foreground/20" />
      </div>
    )}
    <div className="p-6">
      <h4 className="font-sans text-xl font-semibold text-primary-foreground mb-1">
        {member.name}
      </h4>
      <p className="text-accent font-sans text-sm font-medium tracking-wider mb-4">
        {member.role}
      </p>
      <p className="font-sans text-primary-foreground/70 text-sm leading-relaxed">
        {member.bio}
      </p>
    </div>
  </motion.div>
);

const ExecutiveTeam = () => {
  return (
    <Layout>
      <SEOHead
        title="Executive Team"
        description="Meet King Armour's leadership team — decades of experience in global finance, family governance, and cross-border enterprise."
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 noise-bg opacity-30" />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="title-accent"
          >
            <h1 className="text-white font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
              Executive Team
            </h1>
            <h2 className="text-accent font-sans text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
              Leadership Grounded in Integrity and Experience
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="max-w-3xl mb-16">
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">
              King Armour's leadership team combines decades of experience in global
              finance, family governance, and cross-border enterprise. Each member
              brings a distinct perspective, united by a shared commitment to
              stewardship, discretion, and long-term value creation.
            </p>
          </AnimatedSection>

          {executiveTeam.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {executiveTeam.map((member, index) => (
                <TeamCard key={member.name} member={member} index={index} />
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <div className="bg-muted rounded-lg p-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="font-sans text-xl font-semibold text-foreground mb-2">
                  Team Profiles Coming Soon
                </h3>
                <p className="text-muted-foreground font-sans max-w-md mx-auto">
                  We are currently preparing detailed profiles of our executive
                  leadership. Please check back shortly or contact us for more
                  information.
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <ResearchSection />
    </Layout>
  );
};

export default ExecutiveTeam;
