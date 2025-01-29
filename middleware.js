import { getIronSession } from "iron-session";

import { NextResponse } from "next/server";
import { sessionOptions } from "./libs/session";
import { matchRoute } from "./libs/utils";

const routes = {
  auth: ["/login", "/register"],
  protected: ["/checkout"], 
  // "^/admin(?:/.*)?$"
};

// This function can be marked async if using await inside
export async function middleware(request) {
  const session = await getIronSession(request.cookies, sessionOptions);
  // If the user is unauthenticated and tries to access a protected route
  if (matchRoute(request.nextUrl.pathname, routes.protected) && !session.auth) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If the user is authenticated and tries to access an auth route
  if (session.auth && routes.auth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};