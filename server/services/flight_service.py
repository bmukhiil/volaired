from amadeus import Client, Location, ResponseError
from flask import jsonify
import json


#use this function to access amadeus calls - look at this link: https://pypi.org/project/amadeus/
amadeus = Client(
    client_id='cRtVjhwJYi2zr8MHE7adjhBEh4hYgGKA',
    client_secret='z4Zdp26tfwFrwBmA'
)



def flight_search(request):
    departureDate = request["departureDate"]
    returnDate = request["returnDate"]
    travelers = request["travelers"]
    startCity = request["startCity"]
    endCity = request["endCity"]
    
    
    
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
            "maxFlightOffers":4,
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
    
    body["originDestinations"][0]["departureDateTimeRange"]["date"] = departureDate
    body["originDestinations"][1]["departureDateTimeRange"]["date"] = returnDate
    body["originDestinations"][0]["originLocationCode"] = startCity
    body["originDestinations"][0]["destinationLocationCode"] = endCity
    body["originDestinations"][1]["originLocationCode"] = endCity
    body["originDestinations"][1]["destinationLocationCode"] = startCity
    

        
    
    flights = amadeus.shopping.flight_offers_search.post(body)
    
    
    formatted_data = []
    
    flights = flights.data

    for item in flights:
        formatted_item = {
            "id": int(item["id"]),
            "outboundTotalDuration": item["itineraries"][0]["duration"],
            "inboundTotalDuration": item["itineraries"][1]["duration"],
            "flightPath": [],
            "price": float(item["price"]["total"])
        }

        for itinerary in item["itineraries"]:
            for segment in itinerary["segments"]:
                formatted_segment = {
                    "departureAirport": segment["departure"]["iataCode"],
                    "departureTime": segment["departure"]["at"],
                    "arrivalAirport": segment["arrival"]["iataCode"],
                    "arrivalTime": segment["arrival"]["at"],
                    "airlines": segment["carrierCode"],
                    "Duration": segment["duration"]
                }
                formatted_item["flightPath"].append(formatted_segment)

        formatted_data.append(formatted_item)

    # Printing the formatted data
    print(json.dumps(formatted_data, indent=2))
    
    

    
    
    return jsonify(formatted_data)
    
