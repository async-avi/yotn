import { NextResponse, type NextRequest } from "next/server";
import prisma from "../../../../db";
import errorHandler from "@/handlers/errorHandler";
import asyncHandler from "@/handlers/asyncHandler";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { fullName, phoneNumber } = requestBody;
  try {
    const existingUser = await prisma.client.findFirst({
      where: { phoneNumber },
    });

    if (!existingUser) {
      await prisma.client.create({
        data: {
          fullName,
          phoneNumber,
          address: null,
        },
      });
      const otp = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
      const response = await asyncHandler(
        201,
        "User created successfully",
        otp
      );
      return NextResponse.json(response);
    } else {
      const response = await errorHandler(409, "User already exists");
      return NextResponse.json(response);
    }
  } catch (error: any) {
    const response = await errorHandler(500, error.message);
    return NextResponse.json(response);
  }
}
