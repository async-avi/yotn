import asyncHandler from "@/handlers/asyncHandler";
import errorHandler from "@/handlers/errorHandler";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const cookie = cookies();
  if (
    reqBody.password == process.env.ADMIN_PASSWORD &&
    reqBody.secretKey == process.env.SECRET_KEY
  ) {
    cookie.set("adminAuth", `${reqBody.username}`, {
      maxAge: 3 * 60 * 60,
      sameSite: "none",
      secure: true,
    });
    const response = await asyncHandler(
      200,
      "User authenticated",
      `${reqBody.username.toLowerCase()}`
    );
    return NextResponse.json(response);
  } else {
    const response = await errorHandler(401, "Invalid username or password");
    return NextResponse.json(response);
  }
}
