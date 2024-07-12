import errorHandler from "@/handlers/errorHandler";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "../../../../db";
import asyncHandler from "@/handlers/asyncHandler";

export async function GET() {
  try {
    const products = await prisma.item.findMany({
      where: {
        drop: {
          active: true,
        },
      },
      select: {
        name: true,
        hikedPrice: true,
        actualPrice: true,
        images: true,
      },
    });

    const response = await asyncHandler(200, "fetched", products);
    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, `${error.message}`);
    return NextResponse.json(response);
  }
}

export async function POST(req: NextRequest) {
  const auth = req.cookies.get("adminAuth");
  const requestBody = await req.json();
  const {
    name,
    description,
    actualPrice,
    hikedPrice,
    images,
    category,
    sizes,
    dropName,
  } = requestBody;

  try {
    if (!auth) {
      const response = await errorHandler(403, "Unauthorized");
      return NextResponse.json(response);
    }

    const dropAsked = await prisma.drop.findFirst({
      where: {
        name: dropName,
      },
    });

    const newProduct = await prisma.item.create({
      data: {
        name,
        description,
        actualPrice,
        hikedPrice,
        images,
        category,
        sizes,
        drop: {
          connect: {
            id: dropAsked?.id,
          },
        },
      },
    });

    const response = await asyncHandler(
      201,
      "Product created successfully",
      newProduct.id
    );

    return NextResponse.json(response);
  } catch (error: any) {
    const response = await errorHandler(500, `${error.message}`);
    return NextResponse.json(response);
  }
}
