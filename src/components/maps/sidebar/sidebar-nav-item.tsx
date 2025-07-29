// src/components/maps/sidebar/sidebar-nav-item.tsx
"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MapSidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  isExpanded: boolean;
  isActive: boolean;
  onClick: () => void;
}

export function MapSidebarNavItem({ icon: Icon, label, isExpanded, isActive, onClick }: MapSidebarNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "map-sidebar-nav-item group flex items-center w-full h-10 rounded-md cursor-pointer hover:bg-muted text-left",
        isExpanded ? "justify-start px-4" : "justify-center",
        isActive && "bg-muted"
      )}
    >
      <Icon className={cn(
        "h-5 w-5 text-muted-foreground group-hover:text-foreground",
        isExpanded ? "mr-3" : "",
        isActive && "text-foreground"
      )} />
      {isExpanded && (
        <span className={cn(
          "whitespace-nowrap overflow-hidden font-medium text-muted-foreground group-hover:text-foreground",
          isActive && "text-foreground"
        )}>
          {label}
        </span>
      )}
    </button>
  );
}