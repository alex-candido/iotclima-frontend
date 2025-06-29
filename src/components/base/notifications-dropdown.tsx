// src/components/base/notifications-dropdown.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";

import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Loader2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useEvents } from "@/hooks/use-events";
import { AppEventSeverity } from "@/types/app-event";
import { Notification } from "@/types/notification";

import { processEventsToNotifications } from "@/lib/notification-helpers";
import { formatTimeAgo } from "@/lib/utils";

export function NotificationsDropdown() {
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(
    [],
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString().split("T")[0];

  const {
    data: eventsData,
    isLoading,
    error,
  } = useEvents({
    page_size: 5,
    severity__in: [AppEventSeverity.CRITICAL, AppEventSeverity.HIGH],
    occurred_at__gte: todayISO,
  });

  useEffect(() => {
    if (eventsData?.results) {
      setLocalNotifications((prevLocal) =>
        processEventsToNotifications(eventsData.results, prevLocal),
      );
    }
  }, [eventsData]);

  const unreadCount = localNotifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setLocalNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const dismissNotification = (id: string) => {
    setLocalNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">
            {APP_TEXT.ADMIN_LAYOUT.NOTIFICATIONS_LABEL || "Notificações"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="font-semibold px-4 py-2">
          {APP_TEXT.ADMIN_LAYOUT.NOTIFICATIONS_LABEL || "Notificações"} (
          {unreadCount})
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoading ? (
          <DropdownMenuItem className="justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <span>Carregando Notificações...</span>
          </DropdownMenuItem>
        ) : localNotifications.length === 0 ? (
          <DropdownMenuItem className="text-center py-4 text-muted-foreground">
            {APP_TEXT.ADMIN_LAYOUT.NO_NEW_NOTIFICATIONS_TEXT ||
              "Nenhuma nova notificação."}
          </DropdownMenuItem>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {localNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start gap-1 p-3 text-sm cursor-pointer"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    {notification.category === "alert" && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        notification.read
                          ? "font-normal text-muted-foreground"
                          : "font-semibold"
                      }
                    >
                      {notification.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(notification.occurred_at)}
                    </span>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Marcar como lida</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        dismissNotification(notification.id);
                      }}
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Dispensar</span>
                    </Button>
                  </div>
                </div>
                <p
                  className={
                    notification.read
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }
                >
                  {notification.description}
                </p>
              </DropdownMenuItem>
            ))}
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center">
          <Link href={APP_ROUTES.ADMIN.SETTINGS.NOTIFICATIONS.path}>
            <span className="font-medium text-primary hover:underline">
              {APP_TEXT.ADMIN_LAYOUT.VIEW_ALL_NOTIFICATIONS_LINK ||
                "Ver todas as notificações"}
            </span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
