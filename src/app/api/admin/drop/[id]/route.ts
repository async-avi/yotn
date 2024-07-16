import errorHandler from "@/handlers/errorHandler";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../db";
import asyncHandler from "@/handlers/asyncHandler";

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const auth = req.cookies.get("auth");
  try {
    if (!auth) {
      const response = await errorHandler(403, "Unauthorized");
      return NextResponse.json(response);
    }
    const drop = await prisma.drop.findUnique({
      where: {
        id: params.id,
      },
    });
    const response = await asyncHandler(202, "ok", drop);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    const response = await errorHandler(500, "Internal Server Error");
    return NextResponse.json(response);
  }
}

export async function PATCH(req: NextRequest, context: any) {
  const auth = req.cookies.get("auth");
  const { params } = context;
  const query: any = req.nextUrl.searchParams.get("q");
  const requestBody = await req.json();
  const { updateParam } = requestBody;
  try {
    if (!auth) {
      const response = await errorHandler(403, "Unauthorized");
      return NextResponse.json(response);
    }

    if (query == "active") {
      const update = await prisma.drop.update({
        where: {
          id: params.id,
        },
        data: {
          active: true,
          updatedAt: new Date().toISOString(),
        },
      });
      const response = await asyncHandler(
        200,
        `${update.id} is set to active: true`,
        null
      );
      return NextResponse.json(response);
    } else if (query == "unactive") {
      const update = await prisma.drop.update({
        where: {
          id: params.id,
        },
        data: {
          active: false,
          updatedAt: new Date().toISOString(),
        },
      });
      const response = await asyncHandler(
        200,
        `${update.id} is set to active: false`,
        null
      );
      return NextResponse.json(response);
    } else {
      const update = await prisma.drop.update({
        where: {
          id: params.id,
        },
        data: {
          [query]: updateParam,
        },
      });
      const response = await asyncHandler(
        200,
        `${update.id} updated with ${query}: ${updateParam}`,
        null
      );
      return NextResponse.json(response);
    }
  } catch (error: any) {
    const response = await errorHandler(500, `${error.message}`);
    return NextResponse.json(response);
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const auth = req.cookies.get("auth");
  const { params } = context;
  try {
    if (!auth) {
      const response = await errorHandler(404, "Unauthorized");
      return NextResponse.json(response);
    }
    const deletedItem = await prisma.drop.delete({
      where: {
        id: params.id,
      },
    });
    const response = await asyncHandler(200, `${deletedItem.id} deleted`, null);
    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, `${error.message}`);
    return NextResponse.json(response);
  }
}
