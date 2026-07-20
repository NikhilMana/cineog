import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PASSWORD = "cineogadmin";
const COOKIE_NAME = "cineog_session";

const SESSION_VALUE = "cineog_admin_session_active";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const dashboardPassword = process.env.DASHBOARD_PASSWORD || DEFAULT_PASSWORD;

    if (password === dashboardPassword) {
      const response = NextResponse.json({ success: true }, { status: 200 });
      
      response.cookies.set(COOKIE_NAME, SESSION_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return response;
    }

    return NextResponse.json(
      { error: "Incorrect password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth login error:", error);
    return NextResponse.json(
      { error: "Server error during authentication" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get(COOKIE_NAME)?.value;

  if (session === SESSION_VALUE) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}
