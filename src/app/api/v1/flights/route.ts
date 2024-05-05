import { NextRequest, NextResponse } from "next/server";
import { searchFlights } from "@/lib/amadeus";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

  try {
    console.log("fetching flights..");

    const flightData = await searchFlights(body);
    console.log("Flight data:", flightData);
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ message: "Hello, world!" });
}
