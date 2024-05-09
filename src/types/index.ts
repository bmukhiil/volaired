// Type for the basic airport information as might be stored in the local JSON file.
export interface StaticAirport {
  ident: string; // Unique identifier for the airport, used in maps and references.
  name: string; // The full name of the airport.
  location: string; // The city or location of the airport.
  country: string; // Country where the airport is located.
  elevation: number; // Elevation of the airport above sea level.
  runways: number; // Number of runways at the airport.
}

// Type for the individual flight data returned from the OpenSky API.
export interface OpenSkyAPIFlight {
  icao24: string; // Unique ICAO24 identifier for the aircraft.
  firstSeen: number; // Timestamp of the estimated departure.
  estDepartureAirport: string; // Estimated departure airport ICAO code.
  lastSeen: number; // Timestamp of the estimated arrival.
  estArrivalAirport: string; // Estimated arrival airport ICAO code.
  callsign: string; // The callsign or identifier of the aircraft.
  estDepartureAirportHorizDistance: number; // Horizontal distance from departure airport.
  estDepartureAirportVertDistance: number; // Vertical distance from departure airport.
  estArrivalAirportHorizDistance: number; // Horizontal distance from arrival airport.
  estArrivalAirportVertDistance: number; // Vertical distance from arrival airport.
  departureAirportCandidatesCount: number; // Number of possible departure airports.
  arrivalAirportCandidatesCount: number; // Number of possible arrival airports.
}

// Type for detailed flight data that includes enriched information about airports.
export interface EnrichedFlightDetails {
  icao24: string; // Unique ICAO24 identifier for the aircraft.
  depAirport: StaticAirport; // Enriched departure airport data.
  arrAirport: StaticAirport; // Enriched arrival airport data.
  depTime: number; // Timestamp of the estimated departure.
  arrTime: number; // Timestamp of the estimated arrival.
}
