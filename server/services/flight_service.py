from amadeus import Client, Location, ResponseError

ID = "cRtVjhwJYi2zr8MHE7adjhBEh4hYgGKA"
SECRET = "z4Zdp26tfwFrwBmA"
amadeus = Client(client_id=ID, client_secret=SECRET)



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
            },
         },
         {
            "id": "2",
            "originLocationCode": "MAD",
            "destinationLocationCode": "NYC",
            "departureDateTimeRange": {
               "date": "2024-11-04"
               # "time": "10:00:00"
            },
         },
   ],
   "travelers": [{"id": "1", "travelerType": "ADULT"}],
   "sources": ["GDS"],
   "searchCriteria": {
         "maxFlightOffers": 4,
         "flightFilters": {
            "cabinRestrictions": [
               {
                     "cabin": "BUSINESS",
                     "coverage": "MOST_SEGMENTS",
                     "originDestinationIds": ["1", "2"],
               }
            ]
         },
   },
}

traveler = {
    'id': '1',
    'dateOfBirth': '1982-01-16',
    'name': {
        'firstName': 'JORGE',
        'lastName': 'GONZALES'
    },
    'gender': 'MALE',
    'contact': {
        'emailAddress': 'jorge.gonzales833@telefonica.es',
        'phones': [{
            'deviceType': 'MOBILE',
            'countryCallingCode': '34',
            'number': '480080076'
        }]
    },
    'documents': [{
        'documentType': 'PASSPORT',
        'birthPlace': 'Madrid',
        'issuanceLocation': 'Madrid',
        'issuanceDate': '2015-04-14',
        'number': '00000000',
        'expiryDate': '2025-04-14',
        'issuanceCountry': 'ES',
        'validityCountry': 'ES',
        'nationality': 'ES',
        'holder': True
    }]
}


flights = amadeus.shopping.flight_offers_search.post(body)

price = amadeus.shopping.flight_offers.pricing.post(flights.data[0])

#print(price.data)

booking = amadeus.booking.flight_orders.post(flights.data[0], traveler)

print(booking.data)

