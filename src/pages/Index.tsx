import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import FeatureCards from "@/components/home/FeatureCards";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WelcomeSection />
      <FeatureCards />
    </Layout>
  );
};

export default Index;
