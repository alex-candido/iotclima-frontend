// src/app/(home)/layout.tsx

import { FooterSection } from "@/components/home/footer-section";
import { HeaderSection } from "@/components/home/header-section";
import { App } from "@/components/layouts/app";
import { Main } from "@/components/layouts/main";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <HeaderSection />
      <Main>{children}</Main>
      <FooterSection />
    </App>
  );
}
