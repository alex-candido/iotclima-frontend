// src/lib/middleware-helpers.ts

import { APP_ROUTES, AppRoute } from '@/data/routes';
import { UserGroup } from '@/types/next-auth.d';

// Internal structure to optimize route lookup in the middleware
interface ProcessedRoute {
  pathRegex: RegExp;
  authRequired: boolean;
  roles: UserGroup[];
}

export const processedAppRoutes: ProcessedRoute[] = [];

// Helper to normalize pathnames for consistent comparison
export function normalizePathname(pathname: string): string {
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

// Helper to convert dynamic paths (e.g., /admin/users/[id]) to a regex
function dynamicPathToRegex(path: string): RegExp {
  const regexPath = path.replace(/\[[^\]]+\]/g, '[^/]+');
  return new RegExp(`^${regexPath}/?$`);
}

// Function to find the route configuration for a given pathname
export function getRouteConfig(pathname: string): { config: AppRoute | null; isExactMatch: boolean; } {
  let matchedConfig: AppRoute | null = null;
  let isExactMatch = false;

  const allRoutes = Object.values(APP_ROUTES).flatMap(category => {
    if (typeof category === 'object') {
      return Object.values(category).filter(route => typeof route === 'object' && route !== null) as AppRoute[];
    }
    return [];
  });

  for (const route of allRoutes) {
    if (route.path) {
      if (normalizePathname(route.path) === normalizePathname(pathname)) {
        return { config: route, isExactMatch: true };
      }
      const dynamicPathRegex = dynamicPathToRegex(route.path);
      if (dynamicPathRegex.test(normalizePathname(pathname))) {
        matchedConfig = route;
      }
    }
    if (route.newPath && normalizePathname(route.newPath) === normalizePathname(pathname)) {
      return { config: route, isExactMatch: true };
    }
    if (route.editPath) {
      const editPathRegex = dynamicPathToRegex(route.editPath('DUMMY_ID').replace('DUMMY_ID', '[^/]+'));
      if (editPathRegex.test(normalizePathname(pathname))) {
        matchedConfig = route;
      }
    }
  }

  if (!matchedConfig) {
    if (pathname.startsWith(normalizePathname(APP_ROUTES.ADMIN.DASHBOARD.path.replace('/dashboard', '')))) {
      return { config: APP_ROUTES.ADMIN.DASHBOARD as AppRoute, isExactMatch: false };
    }
    if (pathname.startsWith(normalizePathname(APP_ROUTES.APP_MAIN.path)) && normalizePathname(pathname) !== normalizePathname(APP_ROUTES.APP_MAIN.path)) {
        return { config: APP_ROUTES.APP_MAIN as AppRoute, isExactMatch: false };
    }
  }

  return { config: matchedConfig, isExactMatch: matchedConfig?.path === pathname };
}

/**
 * Checks if a given pathname is a public route (accessible to anyone, authenticated or not).
 */
export function isPublicRoute(pathname: string): boolean {
  const publicPaths = [
    APP_ROUTES.HOME.path,
    APP_ROUTES.DOCS.path,
  ];
  return publicPaths.includes(pathname);
}

/**
 * Checks if a given pathname is a guest route (only accessible to unauthenticated users).
 */
export function isGuestRoute(pathname: string): boolean {
  const guestPaths = [
    APP_ROUTES.AUTH.SIGN_IN.path,
    APP_ROUTES.AUTH.SIGN_UP.path,
    APP_ROUTES.AUTH.FORGOT_PASSWORD.path,
    APP_ROUTES.AUTH.RESET_PASSWORD.path,
  ];
  return guestPaths.includes(pathname);
}

// Populate the list of processed routes on middleware initialization
// This needs to be called once to prepare the routes for `getRouteConfig`
export function initializeMiddlewareRoutes() {
  if (processedAppRoutes.length === 0) { // Avoid re-populating on hot-reloads
    _populateProcessedRoutesInternal(APP_ROUTES);
  }
}

function _populateProcessedRoutesInternal(routesObject: any) {
  for (const key in routesObject) {
    const value = routesObject[key];

    if (typeof value === 'object' && value !== null && 'path' in value) {
      const routeConfig = value as AppRoute;

      if (routeConfig.authRequired && routeConfig.roles && routeConfig.roles.length > 0) {
        let rolesAsUserGroup = (routeConfig.roles as string[]).map(role => UserGroup[role as keyof typeof UserGroup]);

        if (routeConfig.path.startsWith('/admin')) {
          rolesAsUserGroup = rolesAsUserGroup.filter(role => role !== UserGroup.CUSTOMER);
        }

        const basePattern = routeConfig.path.replace(/\[[^\]]+\]/g, '[^/]+');

        processedAppRoutes.push({
          pathRegex: new RegExp(`^${basePattern}/?$`),
          authRequired: true,
          roles: rolesAsUserGroup,
        });

        if (routeConfig.dynamicPath) {
          const dynamicPathSegment = routeConfig.path.substring(0, routeConfig.path.lastIndexOf('/'));
          const dynamicRegex = new RegExp(`^${dynamicPathSegment}/[^/]+/?$`);
          processedAppRoutes.push({
            pathRegex: dynamicRegex,
            authRequired: true,
            roles: rolesAsUserGroup,
          });
        }

        if (routeConfig.editPath) {
          const editPathSample = routeConfig.editPath('DUMMY_ID');
          const editRegex = editPathSample.replace('DUMMY_ID', '[^/]+');
          processedAppRoutes.push({
            pathRegex: new RegExp(`^${editRegex}/?$`),
            authRequired: true,
            roles: rolesAsUserGroup,
          });
        }

        if (routeConfig.newPath) {
          processedAppRoutes.push({
            pathRegex: new RegExp(`^${routeConfig.newPath}/?$`),
            authRequired: true,
            roles: rolesAsUserGroup,
          });
        }

      }
    } else if (typeof value === 'object' && value !== null) {
      _populateProcessedRoutesInternal(value);
    }
  }
}

// Call once to initialize routes
initializeMiddlewareRoutes();
