// middleware.ts
import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const url = request.nextUrl;
  // const isAdmin = request.cookies.get("isAdmin")?.value;

  // Protect /admin-login with secret key
  if (pathname === "/admin-login") {
    const key = url.searchParams.get("key");
    if (key !== process.env.ADMIN_KEY) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
    return NextResponse.next();
  }

  //Protect /admin and subroutes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("token")?.value;
    // const headerToken = request.headers.get("authorization")?.replace("Bearer ", "");

    // const token = cookieToken || headerToken;

    console.log("Token found:", token); // Debug log

    if (!token) {
      console.log("No token - redirecting to 404");
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }

    // ✅ TEMPORARY: Just check if token exists, don't verify with backend
    // TODO: Add proper verification once /verify endpoint is ready
    console.log("Token exists - allowing access");
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
