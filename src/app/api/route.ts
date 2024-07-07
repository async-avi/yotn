import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    message: "Yotn server working fine!",
  });
}
