import { APP_TEXT } from "@/data/ui-content";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return APP_TEXT.ADMIN_LAYOUT.NOTIFICATION_TIME_AGO(diffMinutes) || `${diffMinutes} mins ago`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'} atrás`;
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`;
  }
  return date.toLocaleDateString();
}
