from amadeus import Client, Location, ResponseError
from flask import jsonify

#use this function to access amadeus calls - look at this link: https://pypi.org/project/amadeus/
amadeus = Client(
    client_id='cRtVjhwJYi2zr8MHE7adjhBEh4hYgGKA',
    client_secret='z4Zdp26tfwFrwBmA'
)

def flight_search(request):
    dd = request["departureDate"]
    rd = request["returnDate"]
    t = request["travelers"]
    
    body = {
        "currencyCode": "USD",
        "originDestinations": [
            {
                "id": "1",
                "originLocationCode": "NYC",
                "destinationLocationCode": "MAD",
                "departureDateTimeRange": {
                    "date": "2024-11-01",
                    "time": "10:00:00"
                }
            },
                       {
                "id": "2",
                "originLocationCode": "MAD",
                "destinationLocationCode": "NYC",
                "departureDateTimeRange": {
                    "date": "2024-11-04",
                    "time": "10:00:00"
                }
            }
        ],
        "travelers": [
            {
                "id": "1",
                "travelerType": "ADULT"
            }
        ],
        "sources": [
            "GDS"
        ],
        "searchCriteria": {
            "maxFlightOffers": 2,
            "flightFilters": {
                "cabinRestrictions": [
                    {
                        "cabin": "BUSINESS",
                        "coverage": "MOST_SEGMENTS",
                        "originDestinationIds": [
                            "1"
                        ]
                    }
                ]
            }
        }
    }
    
    body["originDestinations"][0]["departureDateTimeRange"]["date"] = dd
    body["originDestinations"][1]["departureDateTimeRange"]["date"] = rd
    
    flights = amadeus.shopping.flight_offers_search.post(body)
    

    
    
    return jsonify(flights.data)
    
