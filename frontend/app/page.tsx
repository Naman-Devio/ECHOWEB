import EnhancedHero from '@/components/EnhancedHero';
import ImpactStatsCounter from '@/components/ImpactStatsCounter';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorks from '@/components/HowItWorks';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  // Mock data - will be replaced with API calls
  const impactStats = {
    eWasteDiverted: 125000, // kg
    co2Saved: 87500, // kg
    materialsRecovered: 15000, // kg
  };

  const materialBreakdown = {
    goldGrams: 450,
    silverGrams: 1200,
    copperKg: 8500,
    aluminumKg: 4200,
    plasticKg: 12000,
  };

  return (
    <main className="min-h-screen">
      <EnhancedHero impactStats={impactStats} />
      <FeaturesSection />
      <HowItWorks />
      <ImpactStatsCounter
        eWasteDiverted={impactStats.eWasteDiverted}
        co2Saved={impactStats.co2Saved}
        materialsRecovered={materialBreakdown}
      />
      <CTASection />
      <Footer />
    </main>
  );
}
