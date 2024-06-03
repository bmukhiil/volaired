from amadeus import Client, Location, ResponseError

#use this function to access amadeus calls - look at this link: https://pypi.org/project/amadeus/
amadeus = Client(
    client_id='cRtVjhwJYi2zr8MHE7adjhBEh4hYgGKA',
    client_secret='z4Zdp26tfwFrwBmA'
)

hotel_data = None

try:
    response = amadeus.reference_data.locations.hotels.by_city.get(
        cityCode='NYC'  # City code for Paris
    )
    hotel_data = response.data  # Print the raw JSON response
    # Now you can process the response data as needed
except ResponseError as error:
    print(error)
    

    
hotel_id = []

for item in hotel_data:
    hotel_id.append(item["hotelId"])
    

available_hotel_offers = amadeus.shopping.hotel_offers_search.get(
    hotelIds='RTPAR001', adults='2', checkInDate='2024-07-02', checkOutDate='2024-07-04'
)

print(available_hotel_offers.data)

hotel_response = {}

    