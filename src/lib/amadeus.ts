interface CachedToken {
  value: string | null;
  expiry: number | null;
  status: string | null;
}

let cachedToken: CachedToken = {
  value: null,
  expiry: null,
  status: null,
};

// Function to fetch a token from the Amadeus API.
// It uses client API key and client API secret to authenticate and obtain a token.
async function fetchToken(): Promise<CachedToken> {
  try {
    console.log("Fetching token...");
    const response = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${process.env.AMADEUS_CLIENT_API_KEY}&client_secret=${process.env.AMADEUS_CLIENT_API_SECRET}`,
      },
    );

    const tokenData = await response.json();
    if (!response.ok) {
      throw new Error(
        `Failed to fetch token: ${response.status} ${response.statusText}`,
      );
    }

    return {
      value: tokenData.access_token,
      expiry: Date.now() + tokenData.expires_in * 1000, // Convert seconds to milliseconds
      status: tokenData.status,
    };
  } catch (error) {
    console.error("Error fetching token:", error);
    return { value: null, expiry: null, status: null };
  }
}

// Function to get a valid Amadeus API token.
// It returns a token from cache if available and valid; otherwise, it fetches a new one.
async function getAmadeusToken(): Promise<string | null> {
  const now = Date.now();

  if (
    !cachedToken.value ||
    !cachedToken.expiry ||
    cachedToken.expiry < now ||
    cachedToken.status === "expired"
  ) {
    console.log("Token expired or not found, fetching new token...");
    cachedToken = await fetchToken();
  } else {
    console.log("Using cached token...");
  }

  return cachedToken.value;
}

// Function to search for flights using the Amadeus API.
// It requires flight search parameters and a valid token.
export async function searchFlights(searchParams: any) {
  const token = await getAmadeusToken();
  try {
    console.log("Searching for flights...");
    const response = await fetch(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchParams),
      },
    ).then((res) => res.json());
    return response;
  } catch (error) {
    console.error("Error searching for flights:", error);
  }
}

export async function getAirlineCode(code: string) {
  const token = await getAmadeusToken();

  try {
    console.log("Searching for airline code...");
    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${code}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    ).then((res) => res.json());
    return response;
  } catch (error) {
    console.error("Error searching for airline code:", error);
  }
}
