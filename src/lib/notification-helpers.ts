// src/lib/notification-helpers.ts

import { AppEvent, AppEventSeverity } from '@/types/app-event';
import { Notification } from '@/types/notification';

export function processEventsToNotifications(
  apiEvents: AppEvent[],
  previousNotifications: Notification[]
): Notification[] {
  const newNotifications: Notification[] = apiEvents
    .filter((event: AppEvent) =>
      event.severity === AppEventSeverity.CRITICAL ||
      event.severity === AppEventSeverity.HIGH
    )
    .map((event: AppEvent) => ({
      id: String(event.id),
      title: event.title,
      description: event.description,
      occurred_at: event.occurred_at,
      type_display: event.type_display,
      severity_display: event.severity_display,
      read: false,
      category: (event.severity === AppEventSeverity.CRITICAL ? 'alert' :
                 event.severity === AppEventSeverity.HIGH ? 'warning' : 'info') as Notification['category'],
    }))
    .slice(0, 5);

  const updatedNotificationsMap = new Map<string, Notification>();

  previousNotifications.forEach(notif => updatedNotificationsMap.set(notif.id, notif));

  newNotifications.forEach(newNotif => {
    const existing = updatedNotificationsMap.get(newNotif.id);
    updatedNotificationsMap.set(newNotif.id, existing ? { ...newNotif, read: existing.read } : newNotif);
  });

  return Array.from(updatedNotificationsMap.values());
}
