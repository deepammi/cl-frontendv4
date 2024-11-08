import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  console.log("in api/login POST");
  console.log("request", request);

  const authorization = request.headers.get("Authorization");
  console.log("authorization", authorization);
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Invalid token format" },
      { status: 400 }
    );
  }

  const idToken = authorization.split("Bearer ")[1];

  try {
    // Set session cookie with validated token
    const expiresIn = 60 * 60 * 24 * 5; // 5 days in seconds
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set("session", idToken, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });
    console.log("returning 200 response: ", response);
    return response;
  } catch (error) {
    console.error("Token validation failed:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function GET(request: NextRequest) {
  console.log("in api/login GET");
  const session = cookies().get("session")?.value || "";

  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}
