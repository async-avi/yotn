import errorHandler from "@/handlers/errorHandler";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../db";
import asyncHandler from "@/handlers/asyncHandler";

export async function GET(req: NextRequest) {
  try {
    const drop = await prisma.drop.findMany({
      where: {
        active: true,
      },
      select: {
        name: true,
        description: true,
        imageUrl: true,
      },
    });
    const response = await asyncHandler(202, "OK", drop);
    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, `${error.message}`);
    return NextResponse.json(response);
  }
}

export async function POST(req: NextRequest) {
  const auth = req.cookies.get("adminAuth");
  const requestBody = await req.json();
  const { name, imageUrl, createdBy, description } = requestBody;
  try {
    if (!auth) {
      const response = await errorHandler(403, "Unauthorized");
      return NextResponse.json(response);
    }
    const newDrop = await prisma.drop.create({
      data: {
        name,
        description,
        imageUrl,
        createdBy,
      },
    });
    const response = await asyncHandler(
      201,
      "Drop created successfully",
      newDrop.id
    );
    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, `${error.message}`);
    return NextResponse.json(response);
  }
}
