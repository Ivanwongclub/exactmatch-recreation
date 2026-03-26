import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
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
      <SEOHead
        title="King Armour Family Office — Stewardship That Endures"
        description="King Armour Family Office partners with distinguished families to preserve wealth, strengthen governance, and build enduring legacies. Trusted since 1957."
      />
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
