import errorHandler from "@/handlers/errorHandler";
import { NextResponse, type NextRequest } from "next/server";
import prisma from "../../../../../../db";
import asyncHandler from "@/handlers/asyncHandler";

export async function PATCH(req: NextRequest, context: any) {
  const { params } = context;
  const query: any = req.nextUrl.searchParams.get("f");
  const requestBody = await req.json();
  const cookie = req.cookies.get("adminAuth");
  try {
    if (!cookie) {
      const response = await errorHandler(403, "Unauthorized");
      return NextResponse.json(response);
    }

    const item = await prisma.declarations.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!item) {
      const response = await errorHandler(404, "Item not found");
      return NextResponse.json(response);
    }

    await prisma.declarations.update({
      where: {
        id: params.id,
      },
      data: {
        [query]: requestBody.content,
      },
    });
    const response = await asyncHandler(200, "Done", null);
    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, error.message);
    return NextResponse.json(response);
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { params } = context;
  const cookie = req.cookies.get("adminAuth");
  try {
    if (!cookie) {
      const response = await errorHandler(403, "Unauthorized");
      return NextResponse.json(response);
    }
    await prisma.declarations.delete({
      where: {
        id: params.id,
      },
    });
    const response = await asyncHandler(200, "Deleted", null);
    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, error.message);
    return NextResponse.json(response);
  }
}
