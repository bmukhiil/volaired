from amadeus import Client, Location, ResponseError

#use this function to access amadeus calls - look at this link: https://pypi.org/project/amadeus/
amadeus = Client(
    client_id='cRtVjhwJYi2zr8MHE7adjhBEh4hYgGKA',
    client_secret='z4Zdp26tfwFrwBmA'
)

try:
    response = amadeus.get('/v1/booking/hotel-bookings',
    )
    print(response.data)  # This will print the response data
except ResponseError as error:
    print(error)
