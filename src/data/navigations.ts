import { APP_TEXT } from './ui-content';

interface NavLink {
  href: string;
  label: string;
  icon?: React.ElementType;
  isExternal?: boolean;
  authRequired?: boolean;
  roles?: string[];
}

export const ADMIN_SIDEBAR_LINKS: NavLink[] = [
  { href: "/admin/dashboard", label: APP_TEXT.ADMIN_LAYOUT.DASHBOARD_LINK },
  { href: "/admin/users", label: APP_TEXT.ADMIN_LAYOUT.USERS_LINK, roles: ['ADMIN', 'MANAGER'] },
  { href: "/admin/places", label: APP_TEXT.ADMIN_LAYOUT.PLACES_LINK },
  { href: "/admin/stations", label: APP_TEXT.ADMIN_LAYOUT.STATIONS_LINK },
  { href: "/admin/sensors", label: APP_TEXT.ADMIN_LAYOUT.SENSORS_LINK },
  { href: "/admin/records", label: APP_TEXT.ADMIN_LAYOUT.RECORDS_LINK },
  { href: "/admin/events", label: APP_TEXT.ADMIN_LAYOUT.EVENTS_LINK },
  { href: "/admin/logs", label: APP_TEXT.ADMIN_LAYOUT.LOGS_LINK, roles: ['ADMIN', 'VIEWER'] },
  { href: "/admin/map-view", label: APP_TEXT.ADMIN_LAYOUT.MAP_VIEW_LINK },
  { href: "/admin/account", label: APP_TEXT.ADMIN_LAYOUT.ACCOUNT_LINK, authRequired: true },
  { href: "/admin/settings", label: APP_TEXT.ADMIN_LAYOUT.SETTINGS_LINK, roles: ['ADMIN'] },
];

export const FOOTER_LINKS: NavLink[] = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];
