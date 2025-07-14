// src/components/pages/admin/sensors/sensors-stats-section.tsx
"use client";

import { StatsCard } from "@/components/base/stats-card";
import { APP_TEXT } from "@/data/ui-content";
import { AlertCircle, CheckCircle, Gauge, XCircle } from "lucide-react";

interface SensorsStatsSectionProps {
  totalSensors: number;
  activeSensors: number;
  inactiveSensors: number;
  errorSensors: number;
}

export function SensorsStatsSection({
  totalSensors,
  activeSensors,
  inactiveSensors,
  errorSensors,
}: SensorsStatsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatsCard
        title={
          APP_TEXT.SENSORS_PAGE.STATS_TOTAL_SENSORS_TITLE || "Total de Sensores"
        }
        value={totalSensors}
        description={
          APP_TEXT.SENSORS_PAGE.STATS_TOTAL_SENSORS_DESCRIPTION ||
          "Sensores cadastrados"
        }
        icon={Gauge}
        iconColorClass="text-muted-foreground"
      />

      <StatsCard
        title={
          APP_TEXT.SENSORS_PAGE.STATS_ACTIVE_SENSORS_TITLE || "Sensores Ativos"
        }
        value={activeSensors}
        description={
          APP_TEXT.SENSORS_PAGE.STATS_ACTIVE_SENSORS_DESCRIPTION ||
          "Atualmente em operação"
        }
        icon={CheckCircle}
        iconColorClass="text-green-500"
      />

      <StatsCard
        title={
          APP_TEXT.SENSORS_PAGE.STATS_INACTIVE_SENSORS_TITLE ||
          "Sensores Inativos"
        }
        value={inactiveSensors}
        description={
          APP_TEXT.SENSORS_PAGE.STATS_INACTIVE_SENSORS_DESCRIPTION ||
          "Atualmente inativos"
        }
        icon={XCircle}
        iconColorClass="text-red-500"
      />

      <StatsCard
        title={
          APP_TEXT.SENSORS_PAGE.STATS_ERROR_SENSORS_TITLE || "Sensores com Erro"
        }
        value={errorSensors}
        description={
          APP_TEXT.SENSORS_PAGE.STATS_ERROR_SENSORS_DESCRIPTION ||
          "Em estado de falha"
        }
        icon={AlertCircle}
        iconColorClass="text-orange-500"
      />
    </div>
  );
}
