import errorHandler from "@/handlers/errorHandler";
import { NextResponse, type NextRequest } from "next/server";
import prisma from "../../../../../../db";
import asyncHandler from "@/handlers/asyncHandler";

export async function PATCH(req: NextRequest, context: any) {
  const { params } = context;
  const query: any = req.nextUrl.searchParams.get("f");
  const requestBody = await req.json();
  const auth = req.cookies.get("auth");
  try {
    if (!auth) {
      const response = await errorHandler(403, "Unauthorized");
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
  const auth = req.cookies.get("auth");
  try {
    if (!auth) {
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
