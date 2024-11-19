import { jwtDecode } from "jwt-decode";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AuthRoutes = ["/"];

const roleBasedPrivateRoutes = {
  admin: [/^\/dashboard(\/.*)?$/],
  super_admin: [/^\/dashboard(\/.*)?$/],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("token")?.value ?? null;
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  let decodedData = null;
  try {
    decodedData = jwtDecode(accessToken) as any;
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const role = decodedData?.role as Role;

  if (role && roleBasedPrivateRoutes[role]) {
    const routes = roleBasedPrivateRoutes[role];
    if (routes.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/login", "/register", "/profile/:path*", "/dashboard/:path*"],
};
