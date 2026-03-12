import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import UserFeatures from '../components/UserFeatures';
import PartnerFeatures from '../components/PartnerFeatures';
import PricingTable from '../components/PricingTable';
import SocialProof from '../components/SocialProof';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    document.title = 'LocSho — Local Shops. Fast Delivery. Zero Hassle.';
  }, []);

  return (
    <>
      <HeroSection />
      <UserFeatures />
      <PartnerFeatures />
      <PricingTable />
      <SocialProof />
      <Footer />
    </>
  );
}
