import errorHandler from "@/handlers/errorHandler";
import asyncHandler from "@/handlers/asyncHandler";
import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "../../../../../db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { fullName, phoneNumber, password } = requestBody;
  const cookie = cookies();
  try {
    const hashedPass = await bcrypt.hash(`${password}`, 10);
    const user = await prisma.client.create({
      data: {
        fullName,
        phoneNumber,
        password: hashedPass,
      },
    });
    cookie.set("user", `${user.id}`, {
      secure: true,
      sameSite: "lax",
      maxAge: 2592000,
    });
    const response = await asyncHandler(202, "User signed in", null);
    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, `${error.message}`);
    return NextResponse.json(response);
  }
}
