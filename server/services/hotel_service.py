from amadeus import Client, Location, ResponseError

#use this function to access amadeus calls - look at this link: https://pypi.org/project/amadeus/
amadeus = Client(
    client_id='cRtVjhwJYi2zr8MHE7adjhBEh4hYgGKA',
    client_secret='z4Zdp26tfwFrwBmA'
)

hotel_id_data = None

try:
    response = amadeus.reference_data.locations.hotels.by_city.get(
        cityCode='NYC'  # City code for Paris
    )
    print(response.data)  # Print the raw JSON response
    # Now you can process the response data as needed
except ResponseError as error:
    print(error)

    