import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import WhoWeServeSection from "@/components/home/WhoWeServeSection";
import ServicePillarsSection from "@/components/home/ServicePillarsSection";
import KingsNetworkSpotlight from "@/components/home/KingsNetworkSpotlight";
import LegacyExpertiseSection from "@/components/home/LegacyExpertiseSection";
import LeadershipTrustSection from "@/components/home/LeadershipTrustSection";
import EventsTeaserSection from "@/components/home/EventsTeaserSection";
import HistoryTeaserSection from "@/components/home/HistoryTeaserSection";
import FinalCTASection from "@/components/home/FinalCTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhoWeServeSection />
      <ServicePillarsSection />
      <KingsNetworkSpotlight />
      <LegacyExpertiseSection />
      <LeadershipTrustSection />
      <EventsTeaserSection />
      <HistoryTeaserSection />
      <FinalCTASection />
    </Layout>
  );
};

export default Index;
