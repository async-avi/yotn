import { type NextRequest, NextResponse } from "next/server";
import asyncHandler from "@/handlers/asyncHandler";
import bcrypt from "bcrypt";
import prisma from "../../../../../db";
import errorHandler from "@/handlers/errorHandler";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookie = cookies();
  const requestBody = await req.json();
  const { phoneNumber, password } = requestBody;
  try {
    const existing = await prisma.client.findFirst({
      where: {
        phoneNumber,
      },
    });

    if (!existing) {
      const response = await errorHandler(
        405,
        "User not found with this phone number"
      );
      return NextResponse.json(response);
    } else {
      const decodePassword = await bcrypt.compare(password, existing.password);
      if (decodePassword) {
        const response = await asyncHandler(
          200,
          "User authenticated successfully",
          null
        );
        cookie.set("user", `${existing.id}`);
        return NextResponse.json(response);
      } else {
        const response = await errorHandler(401, "Invalid password");
        return NextResponse.json(response);
      }
    }
  } catch (error: any) {
    const response = await errorHandler(500, error.message);
    return NextResponse.json(response);
  }
}
