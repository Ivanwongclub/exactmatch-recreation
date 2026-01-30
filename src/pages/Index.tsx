import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import FeatureCards from "@/components/home/FeatureCards";
import CompanyInfoSection from "@/components/home/CompanyInfoSection";
import ResearchSection from "@/components/shared/ResearchSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WelcomeSection />
      <FeatureCards />
      <CompanyInfoSection />
      <ResearchSection />
    </Layout>
  );
};

export default Index;
