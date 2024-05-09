import airportsData from "@/data/airports.json";
import {
  StaticAirport,
  OpenSkyAPIFlight,
  EnrichedFlightDetails,
} from "@/types";

/**
 * Fetches flights data from the OpenSky API for the time span of 2 hours starting from yesterday.
 * Filters flights to include only those that have both departure and arrival airports recognized in the local data.
 * Optionally limits the number of results or filters them all if limit is -1.
 *
 * @param {number} limit - The maximum number of flight records to return, or -1 for no limit.
 * @returns {Promise<EnrichedFlightDetails[]>} - An array of flight details with enriched airport information.
 */
export async function fetchPrevFlights(
  limit: number,
): Promise<EnrichedFlightDetails[]> {
  // yesterday at same time in epoch in seconds
  const yesterday = Math.floor(Date.now() / 1000) - 86400;

  // yesterday at same time but 2 hour later in epoch in seconds
  const yesterday2HoursLater = yesterday + 7200;

  const response = await fetch(
    `https://opensky-network.org/api/flights/all?begin=${yesterday}&end=${yesterday2HoursLater}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(process.env.OPENSKY_USERNAME + ":" + process.env.OPENSKY_PASSWORD)}`,
      },
    },
  ).then((res) => res.json());

  const airports: Record<string, StaticAirport> = Array.isArray(airportsData)
    ? airportsData.reduce((acc, airport) => {
        acc[airport.ident] = airport;
        return acc;
      }, {})
    : {};

  let filteredResponse = response.filter(
    (flight: OpenSkyAPIFlight) =>
      flight.estDepartureAirport &&
      flight.estArrivalAirport &&
      airports[flight.estDepartureAirport] &&
      airports[flight.estArrivalAirport],
  );

  // Applying the limit if specified
  if (limit !== -1) {
    filteredResponse = filteredResponse.slice(0, limit);
  }

  // Mapping flights to detailed structured data
  const flightPathData: EnrichedFlightDetails[] = filteredResponse.map(
    (flight: OpenSkyAPIFlight) => ({
      icao24: flight.icao24,
      depAirport: airports[flight.estDepartureAirport],
      arrAirport: airports[flight.estArrivalAirport],
      depTime: flight.firstSeen,
      arrTime: flight.lastSeen,
    }),
  );

  return flightPathData;
}
