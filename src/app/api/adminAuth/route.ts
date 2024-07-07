import asyncHandler from "@/handlers/asyncHandler";
import errorHandler from "@/handlers/errorHandler";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { name, password } = requestBody;
  const cookie = cookies();
  try {
    if (
      name == process.env.ADMIN_ONE ||
      process.env.ADMIN_TW0 ||
      (process.env.ADMIN_THREE && password == process.env.ADMIN_PASSWORD)
    ) {
      const response = await asyncHandler(202, "Admin Authenticated", null);
      cookie.set("adminAuth", "true", {
        maxAge: 24 * 60 * 60,
        sameSite: "none",
      });
      return NextResponse.json(response);
    } else {
      const response = await errorHandler(403, "Unauthorized Access");
      return NextResponse.json(response);
    }
  } catch (error: any) {
    const response = await errorHandler(500, error.message);
    console.log(process.env.ADMIN_ONE);
    return NextResponse.json(response);
  }
}
