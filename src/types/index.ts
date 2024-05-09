// Type for the basic airport information as might be stored in the local JSON file.
export interface StaticAirport {
  ident: string; // Unique identifier for the airport, used in maps and references.
  type: string; // Type of airport, such as heliport, small_airport, etc.
  name: string; // The full name of the airport.
  elevation_ft: number; // Elevation of the airport in feet.
  continent: string; // Continent where the airport is located.
  iso_country: string; // ISO code for the country where the airport is located.
  iso_region: string; // ISO code for the region where the airport is located.
  municipality: string; // The city or municipality where the airport is located.
  gps_code: string; // GPS code for the airport.
  iata_code: string | null; // IATA code for the airport, if available.
  local_code: string; // Local code for the airport.
  coordinates: string; // GPS coordinates of the airport.
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
