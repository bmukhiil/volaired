// Importing necessary functions from custom libraries and Next.js server components
import { fetchPrevFlights } from "@/lib/opensky";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handler function for GET requests. Retrieves previous flights data based on a query parameter limit.
 * Validates the 'limit' query parameter to ensure it's a valid integer.
 *
 * @param {NextRequest} req - The incoming GET request.
 * @returns {Promise<NextResponse>} - The response containing flight data or an error message.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  // Extracting search parameters from the request URL
  const searchParams: URLSearchParams = req.nextUrl.searchParams;
  const limit: string | null = searchParams.get("limit");

  // Check if 'limit' parameter is present and is a valid integer
  if (!limit || isNaN(parseInt(limit, 10))) {
    return NextResponse.json(
      { message: "Missing or invalid 'limit' parameter" },
      { status: 400 }
    );
  }

  // Fetching previous flights data using the validated 'limit'
  const limitInt = parseInt(limit, 10);
  const flightPathData = await fetchPrevFlights(limitInt);

  // Returning the fetched flight data as JSON
  return NextResponse.json({ data: flightPathData });
}
