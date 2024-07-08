import errorHandler from "@/handlers/errorHandler";
import { NextResponse, type NextRequest } from "next/server";
import prisma from "../../../../../db";
import asyncHandler from "@/handlers/asyncHandler";

export async function GET(req: NextRequest) {
  const adminCookie = req.cookies.get("adminAuth");
  try {
    if (!adminCookie) {
      const response = await errorHandler(403, "Unauthorized");
      return NextResponse.json(response);
    }

    const declarations = await prisma.declarations.findMany({});
    const response = await asyncHandler(
      200,
      "Fetched declarations",
      declarations
    );
    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, error.message);
    return NextResponse.json(response);
  }
}

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { title, description, page, createdBy } = requestBody;
  const adminCookie = req.cookies.get("adminAuth");
  try {
    if (!adminCookie) {
      const response = await errorHandler(403, "Unauthorized");
      return NextResponse.json(response);
    }
    const newData = await prisma.declarations.create({
      data: {
        title,
        description,
        page,
        createdBy,
      },
    });

    const response = await asyncHandler(
      201,
      "Declaration created successfully",
      newData.id
    );
    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, error.message);
    return NextResponse.json(response);
  }
}
