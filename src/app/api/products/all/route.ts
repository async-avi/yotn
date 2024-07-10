import asyncHandler from "@/handlers/asyncHandler";
import prisma from "../../../../../db";
import { NextResponse } from "next/server";
import errorHandler from "@/handlers/errorHandler";
import dotenv from "dotenv";
import { cookies } from "next/headers";

dotenv.config();
export async function GET() {
  const cookie = cookies();
  try {
    const auth = cookie.get("adminAuth");
    console.log(auth);
    if (auth) {
      const allProduct = await prisma.item.findMany({});
      const response = await asyncHandler(200, "Fetched", allProduct);
      return NextResponse.json(response);
    } else {
      const response = await errorHandler(403, "Unauthenticated");
      return NextResponse.json(response);
    }
  } catch (error: any) {
    const response = await errorHandler(500, error.message || "error");
    return NextResponse.json(response);
  }
}
