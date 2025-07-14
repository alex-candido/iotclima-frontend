// src/components/pages/admin/places/places-stats-section.tsx
"use client";

import { StatsCard } from "@/components/base/stats-card";
import { APP_TEXT } from "@/data/ui-content";
import { CheckCircle, Leaf, MapPin, XCircle } from "lucide-react";

interface PlacesStatsSectionProps {
  totalPlaces: number;
  activePlaces: number;
  inactivePlaces: number;
}

export function PlacesStatsSection({
  totalPlaces,
  activePlaces,
  inactivePlaces,
}: PlacesStatsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatsCard
        title={
          APP_TEXT.PLACES_PAGE.STATS_TOTAL_PLACES_TITLE || "Total de Locais"
        }
        value={totalPlaces}
        description={
          APP_TEXT.PLACES_PAGE.STATS_TOTAL_PLACES_DESCRIPTION ||
          "Locais cadastrados"
        }
        icon={MapPin}
        iconColorClass="text-muted-foreground"
      />

      <StatsCard
        title={
          APP_TEXT.PLACES_PAGE.STATS_ACTIVE_PLACES_TITLE || "Locais Ativos"
        }
        value={activePlaces}
        description={
          APP_TEXT.PLACES_PAGE.STATS_ACTIVE_PLACES_DESCRIPTION ||
          "Atualmente operacionais"
        }
        icon={CheckCircle}
        iconColorClass="text-green-500"
      />

      <StatsCard
        title={
          APP_TEXT.PLACES_PAGE.STATS_INACTIVE_PLACES_TITLE || "Locais Inativos"
        }
        value={inactivePlaces}
        description={
          APP_TEXT.PLACES_PAGE.STATS_INACTIVE_PLACES_DESCRIPTION ||
          "Atualmente inativos"
        }
        icon={XCircle}
        iconColorClass="text-red-500"
      />

      <StatsCard
        title={
          APP_TEXT.PLACES_PAGE.STATS_FARM_PLACES_TITLE || "Locais tipo Fazenda"
        }
        value={0}
        description={
          APP_TEXT.PLACES_PAGE.STATS_FARM_PLACES_DESCRIPTION ||
          "Locais rurais cadastrados"
        }
        icon={Leaf}
        iconColorClass="text-amber-500"
      />
    </div>
  );
}
