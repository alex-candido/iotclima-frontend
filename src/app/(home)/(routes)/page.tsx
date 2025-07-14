// src/app/(admin)/admin/dashboard/page.tsx

import { HeaderSection } from "@/components/home/header-section";

export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSection />
    </div>
  );
}
