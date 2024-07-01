import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const response = NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/api/adminAuth")) {
    console.log("ok");
  }

  //   response.cookies.set("theme", "dark");
  //   return response;
}
