// src/types/notification.d.ts


export type Notification = {
  id: string;
  title: string;
  description: string;
  occurred_at: string;
  type_display?: string;
  severity_display?: string;
  read: boolean;
  category?: 'alert' | 'info' | 'warning' | 'success';
};
