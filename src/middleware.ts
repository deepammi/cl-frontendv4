import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  console.log("session...", session);

  //Return to /login if don't have a session
  if (!session) {
    console.log("in if !session");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //Call the authentication endpoint
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });
  console.log("responseAPI", responseAPI);

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    console.log("responseAPI.status", responseAPI.status);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: ["/caller-dashboard"],
};
