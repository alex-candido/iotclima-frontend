// src/data/routes.ts

export interface AppRoute {
  path: string;
  label?: string;
  dynamicPath?: (id: string | number) => string;
  editPath?: (id: string | number) => string;
  newPath?: string;
  parent?: string;
  icon?: string;
  authRequired?: boolean;
  roles?: string[];
  external?: boolean;
}

export const APP_ROUTES = {
  HOME: {
    path: '/',
    label: 'Home',
    icon: 'Home',
  },
  APP_MAIN: {
    path: '/app',
    label: 'Main App',
    authRequired: true,
    roles: ['CUSTOMER', 'ADMIN', 'OWNER', 'MANAGER', 'OPERATOR', 'EMPLOYEE', 'VIEWER'],
  },
  DOCS: {
    path: '/docs',
    label: 'Documentation',
  },

  AUTH: {
    SIGN_IN: {
      path: '/auth/sign-in',
      label: 'Sign In',
    },
    SIGN_UP: {
      path: '/auth/sign-up',
      label: 'Sign Up',
    },
    FORGOT_PASSWORD: {
      path: '/auth/forgot-password',
      label: 'Forgot Password',
    },
    RESET_PASSWORD: {
      path: '/auth/reset-password',
      label: 'Reset Password',
    },
    NEXTAUTH_CALLBACK: '/api/auth/callback',
  },

  ADMIN: {
    DASHBOARD: {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      authRequired: true,
      roles: ['ADMIN', 'OWNER', 'MANAGER', 'OPERATOR', 'EMPLOYEE', 'VIEWER'],
    },
    SETTINGS: {
      path: '/admin/settings',
      label: 'Settings',
      icon: 'Settings',
      authRequired: true,
      roles: ['ADMIN'],
      PROFILE: {
        path: '/admin/settings/profile',
        label: 'Profile Settings',
        authRequired: true,
        roles: ['ADMIN', 'OWNER', 'MANAGER', 'OPERATOR', 'EMPLOYEE', 'VIEWER', 'CUSTOMER'],
      },
      ACCOUNT_DETAILS: {
        path: '/admin/settings/account',
        label: 'Account Details',
        authRequired: true,
        roles: ['ADMIN', 'OWNER', 'MANAGER', 'OPERATOR', 'EMPLOYEE', 'VIEWER', 'CUSTOMER'],
      },
      NOTIFICATIONS: {
        path: '/admin/settings/notifications',
        label: 'Notifications Settings',
        authRequired: true,
        roles: ['ADMIN', 'OWNER', 'MANAGER', 'OPERATOR', 'EMPLOYEE', 'VIEWER', 'CUSTOMER'],
      },
      APPEARANCE: {
        path: '/admin/settings/appearance',
        label: 'Appearance Settings',
        authRequired: true,
        roles: ['ADMIN', 'OWNER', 'MANAGER', 'OPERATOR', 'EMPLOYEE', 'VIEWER', 'CUSTOMER'],
      },
      DISPLAY: {
        path: '/admin/settings/display',
        label: 'Display Settings',
        authRequired: true,
        roles: ['ADMIN', 'OWNER', 'MANAGER', 'OPERATOR', 'EMPLOYEE', 'VIEWER', 'CUSTOMER'],
      },
    },
    MAP_VIEW: {
      path: '/admin/map-view',
      label: 'Map View',
      icon: 'Map',
      authRequired: true,
      roles: ['ADMIN', 'OWNER', 'MANAGER', 'OPERATOR', 'EMPLOYEE', 'VIEWER'],
    },

    USERS: {
      LIST: '/admin/users',
      DETAIL: (id: string | number) => `/admin/users/${id}`,
      NEW: '/admin/users/new',
      EDIT: (id: string | number) => `/admin/users/${id}/edit`,
      label: 'Users',
      icon: 'Users',
      authRequired: true,
      roles: ['ADMIN', 'MANAGER'],
    },
    PLACES: {
      LIST: '/admin/places',
      DETAIL: (id: string | number) => `/admin/places/${id}`,
      NEW: '/admin/places/new',
      EDIT: (id: string | number) => `/admin/places/${id}/edit`,
      label: 'Places',
      icon: 'MapPin',
      authRequired: true,
      roles: ['ADMIN', 'OWNER', 'MANAGER'],
    },
    STATIONS: {
      LIST: '/admin/stations',
      DETAIL: (id: string | number) => `/admin/stations/${id}`,
      NEW: '/admin/stations/new',
      EDIT: (id: string | number) => `/admin/stations/${id}/edit`,
      label: 'Stations',
      icon: 'ActivitySquare',
      authRequired: true,
      roles: ['ADMIN', 'OWNER', 'MANAGER', 'OPERATOR'],
    },
    SENSORS: { 
      LIST: '/admin/sensors',
      DETAIL: (id: string | number) => `/admin/sensors/${id}`,
      NEW: '/admin/sensors/new',
      EDIT: (id: string | number) => `/admin/sensors/${id}/edit`,
      label: 'Sensors',
      icon: 'Gauge',
      authRequired: true,
      roles: ['ADMIN', 'OWNER', 'MANAGER', 'OPERATOR'],
    },
    STATION_SENSORS: { 
      LIST: '/admin/station-sensors',
      DETAIL: (id: string | number) => `/admin/station-sensors/${id}`,
      NEW: '/admin/station-sensors/new',
      EDIT: (id: string | number) => `/admin/station-sensors/${id}/edit`,
      label: 'Station-Sensor Links',
      icon: 'Link',
      authRequired: true,
      roles: ['ADMIN', 'MANAGER', 'OPERATOR'],
    },
    RECORDS: {
      LIST: '/admin/records',
      DETAIL: (id: string | number) => `/admin/records/${id}`,
      NEW: '/admin/records/new',
      EDIT: (id: string | number) => `/admin/records/${id}/edit`,
      label: 'Records',
      icon: 'BarChart2',
      authRequired: true,
      roles: ['ADMIN', 'OWNER', 'MANAGER', 'OPERATOR', 'EMPLOYEE', 'VIEWER'],
    },
    EVENTS: {
      LIST: '/admin/events',
      DETAIL: (id: string | number) => `/admin/events/${id}`,
      NEW: '/admin/events/new',
      EDIT: (id: string | number) => `/admin/events/${id}/edit`,
      label: 'Events',
      icon: 'BellRing',
      authRequired: true,
      roles: ['ADMIN', 'OWNER', 'MANAGER', 'VIEWER'],
    },
    LOGS: {
      LIST: '/admin/logs',
      DETAIL: (id: string | number) => `/admin/logs/${id}`,
      NEW: '/admin/logs/new',
      EDIT: (id: string | number) => `/admin/logs/${id}/edit`,
      label: 'Logs',
      icon: 'ClipboardList',
      authRequired: true,
      roles: ['ADMIN', 'VIEWER'],
    },
  },
};

export const getRouteByPath = (path: string): AppRoute | undefined => {
  const allRoutes = Object.values(APP_ROUTES).flatMap(category =>
    Object.values(category).filter(route => typeof route !== 'string')
  ) as AppRoute[];
  return allRoutes.find(route => route.path === path);
};
