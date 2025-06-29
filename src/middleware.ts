// src/middleware.ts

import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Reintroducing UserGroup enum directly in middleware for testing
export enum UserGroup {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  OPERATOR = "OPERATOR",
  OWNER = "OWNER",
  VIEWER = "VIEWER",
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Configuration for testing: define simple public/guest/protected paths
  const PUBLIC_PATHS = ['/', '/docs'];
  const GUEST_PATHS = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password', '/auth/reset-password'];
  const PROTECTED_PREFIXES = ['/app', '/admin']; // Routes that require authentication

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET! });
  const isAuthenticated = !!token;
  // Get user groups from the token
  const userGroups: UserGroup[] = (token?.groupNames as UserGroup[]) || [];

  // Log for debugging
  console.log('Middleware: Pathname', pathname);
  console.log('Middleware: Is Authenticated', isAuthenticated);
  console.log('Middleware: User Groups', userGroups);


  // Exclude specific paths from middleware processing (same as previous)
  const excludedPathsRegex = /^\/(api|_next\/static|_next\/image|favicon\.ico|sitemap\.xml|robots\.txt|images|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js)$).*/;
  if (excludedPathsRegex.test(pathname)) {
    return NextResponse.next();
  }

  // 1. Handle Guest Routes: Redirect authenticated users away from sign-in/sign-up pages
  if (isAuthenticated && GUEST_PATHS.includes(pathname)) {
    console.log('Middleware: Authenticated user on guest path, redirecting to /');
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to home or /app
  }

  // 2. Handle Public Routes: Allow access for anyone
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // 3. Handle Protected Routes: Redirect unauthenticated users to sign-in
  const isProtectedPath = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix));
  if (isProtectedPath && !isAuthenticated) {
    console.log('Middleware: Unauthenticated user on protected path, redirecting to /auth/sign-in');
    const signInUrl = new URL('/auth/sign-in', request.url);
    // Corrected: Use request.nextUrl.pathname and request.nextUrl.search
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(signInUrl);
  }

  // --- NEW: Handle Role-Based Access for Authenticated Users ---
  if (isAuthenticated) {
    // Specific rule: /admin paths
    if (pathname.startsWith('/admin')) {
      const ADMIN_ROLES: UserGroup[] = [
        UserGroup.ADMIN,
        UserGroup.EMPLOYEE,
        UserGroup.MANAGER,
        UserGroup.OPERATOR,
        UserGroup.OWNER,
        UserGroup.VIEWER,
      ];

      // Check if the user has any of the required roles for /admin
      const hasAdminAccess = userGroups.some(group => ADMIN_ROLES.includes(group));

      if (!hasAdminAccess) {
        // Special case: CUSTOMERs trying to access /admin
        if (userGroups.includes(UserGroup.CUSTOMER)) {
          console.log('Middleware: CUSTOMER trying to access /admin, redirecting to /app');
          return NextResponse.redirect(new URL('/app', request.url));
        } else {
          // Other unauthorized roles trying to access /admin
          console.log('Middleware: Unauthorized role trying to access /admin, redirecting to /not-found');
          return NextResponse.redirect(new URL('/not-found', request.url));
        }
      }
    }
    // You can add more role-based logic for other paths here if needed for testing.
  }

  // Allow the request to proceed if no specific redirect logic was triggered
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\.xml|robots\.txt|images|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js)$).*)',
  ],
};
