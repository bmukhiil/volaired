import { NextRequest, NextResponse } from "next/server";
import { searchFlights } from "@/lib/amadeus";

export async function POST(req: NextRequest) {
  const { body } = req;
  try {
    console.log("fetching flights..");

    const flightData = await searchFlights(body);
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ message: "Hello, world!" });
}
