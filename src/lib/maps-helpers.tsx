// src/lib/maps-helpers.ts

import { AppEventSeverity } from "@/types/app-event";
import { StationStatus } from "@/types/station";
import Image from 'next/image';

// Retorna a cor Tailwind para o status da estação
export function getStationStatusColorClass(status: StationStatus): string {
  switch (status) {
    case StationStatus.ACTIVE:
      return "bg-green-500";
    case StationStatus.INACTIVE:
      return "bg-gray-500";
    case StationStatus.ONLINE:
      return "bg-blue-500";
    case StationStatus.OFFLINE:
      return "bg-gray-400";
    case StationStatus.MAINTENANCE:
      return "bg-yellow-400";
    default:
      return "bg-gray-300";
  }
}

// Retorna a cor Tailwind para severidade do evento
export function getEventSeverityColorClass(severity: AppEventSeverity): string {
  switch (severity) {
    case AppEventSeverity.CRITICAL:
      return "bg-purple-500";
    case AppEventSeverity.HIGH:
      return "bg-red-500";
    case AppEventSeverity.MEDIUM:
      return "bg-orange-500";
    case AppEventSeverity.LOW:
      return "bg-yellow-400";
    case AppEventSeverity.WARN:
      return "bg-yellow-300";
    default:
      return "bg-green-500";
  }
}

// Retorna label legível para status da estação
export function getStationStatusLabel(status: StationStatus): string {
  switch (status) {
    case StationStatus.ACTIVE:
      return "Ativa";
    case StationStatus.INACTIVE:
      return "Inativa";
    case StationStatus.ONLINE:
      return "Online";
    case StationStatus.OFFLINE:
      return "Offline";
    case StationStatus.MAINTENANCE:
      return "Manutenção";
    default:
      return "Desconhecido";
  }
}

// Retorna label legível para severidade do evento
export function getEventSeverityLabel(severity: AppEventSeverity): string {
  switch (severity) {
    case AppEventSeverity.CRITICAL:
      return "Crítico";
    case AppEventSeverity.HIGH:
      return "Alto";
    case AppEventSeverity.MEDIUM:
      return "Médio";
    case AppEventSeverity.LOW:
      return "Baixo";
    case AppEventSeverity.WARN:
      return "Aviso";
    default:
      return "Normal";
  }
}

// Retorna componente React do ícone pelo nome
export function getWeatherIconComponent(name: string) {
  const iconPath = `/weather-icons/animated/${name}`;
  return ({ className }: { className: string }) => (
    <Image src={iconPath} alt={name} className={className} width={24} height={24} />
  );
}
