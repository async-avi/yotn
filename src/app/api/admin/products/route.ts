import errorHandler from "@/handlers/errorHandler";
import { NextResponse, type NextRequest } from "next/server";
import prisma from "../../../../../db";
import asyncHandler from "@/handlers/asyncHandler";

export async function GET(req: NextRequest) {
  const auth = req.cookies.get("auth");
  try {
    if (!auth) {
      const response = await errorHandler(403, "Unauthorized");
      return NextResponse.json(response);
    }

    const products = await prisma.item.findMany({});
    let response = await asyncHandler(202, "OK", products);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error);
    let response = await errorHandler(500, `${error.message}`);
    return NextResponse.json(response);
  }
}

export async function POST(req: NextRequest) {
  const auth = req.cookies.get("auth");
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
