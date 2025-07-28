// src/app/(maps)/maps/layout.tsx

import { App } from "@/components/layouts/app";
import { Main } from "@/components/layouts/main";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <Main>{children}</Main>
    </App>
  );
}
