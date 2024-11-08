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

  try {
    // Call the authentication API to validate session
    const responseAPI = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        Cookie: `session=${session.value}`,
      },
    });

    if (responseAPI.status === 200) {
      console.log("Session validated, allowing access");
      return NextResponse.next();
    } else {
      console.log(
        "Session invalid, received non-200 status:",
        responseAPI.status,
        responseAPI
      );
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.log("Error in middleware API call:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Protect routes
export const config = {
  // matcher: [],
  matcher: ["/caller-dashboard"],
};
