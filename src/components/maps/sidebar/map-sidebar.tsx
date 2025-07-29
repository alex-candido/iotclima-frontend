// src/components/maps/sidebar/map-sidebar.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { Logo } from "@/components/base/logo";
import { MapSidebarToggleButton } from "@/components/maps/sidebar/map-sidebar-toggle-button";
import { MapSidebarNavItem } from "@/components/maps/sidebar/sidebar-nav-item";
import { useMap } from "@/providers/map-provider";
import { Bookmark, History, LayoutDashboard } from "lucide-react";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "saved", icon: Bookmark, label: "Salvos" },
  { id: "recent", icon: History, label: "Pesquisas Recentes" },
];

export function MapSidebar() {
  const { isSidebarExpanded, toggleSidebar, toggleAsidePanel, activeAsidePanel } = useMap();

  return (
    <FloatingCard
      className={`map-sidebar !rounded-none absolute left-0 top-0 z-20 h-full text-card-foreground flex flex-col transition-all duration-300 ease-in-out ${isSidebarExpanded ? "w-64" : "w-16"}`}>
      
      <header className="map-sidebar-header flex flex-col items-center p-2 border-b">
        <Logo href="/" isExpanded={isSidebarExpanded} className="h-16" />
        <MapSidebarToggleButton isExpanded={isSidebarExpanded} onClick={toggleSidebar} />
      </header>

      <nav className="map-sidebar-nav flex-grow p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <MapSidebarNavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isExpanded={isSidebarExpanded}
            isActive={activeAsidePanel === item.id}
            onClick={() => toggleAsidePanel(item.id)}
          />
        ))}
      </nav>

    </FloatingCard>
  );
}
