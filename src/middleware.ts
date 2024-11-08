import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  console.log("Checking session in middleware:", session);

  // Redirect to /login if no session exists
  if (!session) {
    console.log("No session found, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// Protect routes
export const config = {
  // matcher: [],
  matcher: ["/caller-dashboard"],
};
