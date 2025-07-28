// src/app/(home)/(routes)/page.tsx

import { HeroSection } from "@/components/home/hero-section";

export default function Page() {
  return (
    <div className="home-page bg-gradient-to-br from-blue-50 via-white to-green-50">
      <HeroSection />
      {/* <OverviewSection />
      <ArchitectureSection />
      <FeaturesSection />
      <StationsSection />
      <TechnologySection /> */}
    </div>
  );
}
