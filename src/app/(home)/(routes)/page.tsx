// src/app/(home)/(routes)/page.tsx

import { ArchitectureSection } from "@/components/home/architecture-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { OverviewSection } from "@/components/home/overview-section";
import { StationsSection } from "@/components/home/stations-section";
import { TechnologySection } from "@/components/home/technology-section";

export default function Page() {
  return (
    <div className="home-page">
      <HeroSection />
      <OverviewSection />
      <ArchitectureSection />
      <FeaturesSection />
      <StationsSection />
      <TechnologySection />
    </div>
  );
}
