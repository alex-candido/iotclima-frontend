// src/app/(admin)/admin/Layout.tsx

import { ProfileDropdown } from "@/components/base/profile-dropdown";
import { Search } from "@/components/base/search";
import { ThemeSwitch } from "@/components/base/theme-switch";
import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { Main } from "@/components/layouts/main";
import { Sidebar } from "@/components/layouts/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <SidebarProvider>
        <Sidebar />
        <div className="relative flex w-full flex-1 flex-col">
          <Header>
            <Search />
            <div className="ml-auto flex items-center gap-4">
              <ThemeSwitch />
              {/* <NotificationsDropdown /> */}
              <ProfileDropdown variant="header" />
            </div>
          </Header>
          <Main>{children}</Main>
          <Footer />
        </div>
      </SidebarProvider>
    </section>
  );
}
