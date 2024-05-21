import { fetchPriceAnalysis } from "@/lib/amadeus";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Missing date parameter" },
      { status: 400 }
    );
  }

  const priceData = await fetchPriceAnalysis(date);

  return NextResponse.json({ data: priceData });
}
