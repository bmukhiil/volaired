from amadeus import Client, Location, ResponseError
from flask import jsonify
import json

class AmadeusSingleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(AmadeusSingleton, cls).__new__(cls, *args, **kwargs)
            cls._instance._init()
        return cls._instance

    def _init(self):
        ID = 'cRtVjhwJYi2zr8MHE7adjhBEh4hYgGKA'
        SECRET = 'z4Zdp26tfwFrwBmA'
        self.amadeus = Client(client_id=ID, client_secret=SECRET)

    def search_flights(self, request):
        departureDate = request["departureDate"]
        returnDate = request["returnDate"]
        travelers = request["travelers"]
        startCity = request["startCity"]
        endCity = request["endCity"]
        #currency = request["currency"]

        body = {
            "currencyCode": "USD",
            "originDestinations": [
                {
                    "id": "1",
                    "originLocationCode": "NYC",
                    "destinationLocationCode": "MAD",
                    "departureDateTimeRange": {
                        "date": "2024-11-01"
                        # "time": "10:00:00"
                    }
                },
                           {
                    "id": "2",
                    "originLocationCode": "MAD",
                    "destinationLocationCode": "NYC",
                    "departureDateTimeRange": {
                        "date": "2024-11-04"
                        # "time": "10:00:00"
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




        flights = self.amadeus.shopping.flight_offers_search.post(body)


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
                        "duration": segment["duration"]
                    }
                    formatted_item["flightPath"].append(formatted_segment)

            formatted_data.append(formatted_item)

        # Printing the formatted data
        print(json.dumps(formatted_data, indent=2))





        return jsonify(formatted_data)
    

    def search_hotels(self, request):
        
        checkInDate = request["checkInDate"]
        checkOutDate = request["checkOutDate"]
        city = request["city"]
        guests = request["guests"]
        
        hotel_data = self.amadeus.reference_data.locations.hotels.by_city.get(
        cityCode=city  # City code for Paris
    )
        hotel_id = []
        
        for item in hotel_data.data:
            hotel_id.append(item["hotelId"])
            
        hotel_offers = []
        
        
        available_hotel_offers = self.amadeus.shopping.hotel_offers_search.get(
            hotelIds='RTPAR001', adults='2', checkInDate='2024-07-02', checkOutDate='2024-07-04'
        )
            
        
        hotel_offers.append(available_hotel_offers.data)

        extracted_data = []
        print(hotel_offers)
        hotel_offers_data = hotel_offers[0]

        for offer in hotel_offers_data[0]['offers']:
            entry = {
                'checkInDate': offer['checkInDate'],
                'checkOutDate': offer['checkOutDate'],
                'Description': offer['room']['description']['text'],
                'city': hotel_offers_data[0]['hotel']['cityCode'],
                'price': offer['price']['total'],
                'hotelName': hotel_offers_data[0]['hotel']['name']
            }
            extracted_data.append(entry)
            
        print(json.dumps(extracted_data, indent=2))

        return extracted_data

amadeus_instance = AmadeusSingleton()