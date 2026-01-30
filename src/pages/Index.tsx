import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import FeatureCards from "@/components/home/FeatureCards";
import ResearchSection from "@/components/shared/ResearchSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WelcomeSection />
      <FeatureCards />
      <ResearchSection />
    </Layout>
  );
};

export default Index;
