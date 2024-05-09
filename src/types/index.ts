// Type for the basic airport information as might be stored in the local JSON file.
export interface Airport {
  ident: string; // Unique identifier for the airport, used in maps and references.
  name: string; // The full name of the airport.
  location: string; // The city or location of the airport.
  country: string; // Country where the airport is located.
  elevation: number; // Elevation of the airport above sea level.
  runways: number; // Number of runways at the airport.
  // Add other relevant fields based on your airports.json data structure.
}

// Type for the individual flight data returned from the OpenSky API.
export interface Flight {
  icao24: string; // Unique ICAO24 identifier for the aircraft.
  firstSeen: number; // Timestamp of the estimated departure.
  lastSeen: number; // Timestamp of the estimated arrival.
  estDepartureAirport: string; // Estimated departure airport ICAO code.
  estArrivalAirport: string; // Estimated arrival airport ICAO code.
  // Include other relevant fields that the OpenSky API returns.
}

// Type for detailed flight data that includes enriched information about airports.
export interface FlightDetails {
  icao24: string; // Unique ICAO24 identifier for the aircraft.
  depAirport: Airport; // Enriched departure airport data.
  arrAirport: Airport; // Enriched arrival airport data.
  depTime: number; // Timestamp of the estimated departure.
  arrTime: number; // Timestamp of the estimated arrival.
}
