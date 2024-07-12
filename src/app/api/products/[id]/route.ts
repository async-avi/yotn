import errorHandler from "@/handlers/errorHandler";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../db";
import asyncHandler from "@/handlers/asyncHandler";

export async function GET(context: any) {
  const { params } = context;
  try {
    const product = await prisma.item.findFirst({
      where: { id: params.id },
      select: {
        name: true,
        images: true,
        hikedPrice: true,
        actualPrice: true,
        sizes: true,
        description: true,
        category: true,
      },
    });
    const response = await asyncHandler(202, "GET", product);
    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, `${error.message}`);
    return NextResponse.json(response);
  }
}

export async function PATCH(req: NextRequest, context: any) {
  const auth = req.cookies.get("adminAuth");
  const { params } = context;
  const query: any = req.nextUrl.searchParams.get("q");
  const set = req.nextUrl.searchParams.get("s");
  try {
    if (!auth) {
      const response = await errorHandler(403, "Unauthorized");
      return NextResponse.json(response);
    }
    const updated = await prisma.item.update({
      where: {
        id: params.id,
      },
      data: {
        [query]: set,
      },
    });

    const response = await asyncHandler(
      200,
      "updated",
      `${updated.id} : ${query} updated to ${set}`
    );

    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, `${error.message}`);
    return NextResponse.json(response);
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const auth = req.cookies.get("adminAuth");
  const { params } = context;

  try {
    if (!auth) {
      const response = await errorHandler(403, "Unauthorized");
      return NextResponse.json(response);
    }
    await prisma.item.delete({
      where: {
        id: params.id,
      },
    });

    const response = await asyncHandler(200, `${params.id} is deleted`, null);
    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, `${error.message}`);
    return NextResponse.json(response);
  }
}
