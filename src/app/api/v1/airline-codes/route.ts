import { getAirlineCode } from "@/lib/amadeus";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("iata");
  console.log(code);

  try {
    console.log("fetching airline code..");

    const airlineCode = await getAirlineCode(code);
    console.log("Airline code:", airlineCode);
    return NextResponse.json({ airlineCode: airlineCode });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
