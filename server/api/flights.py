from flask_restx import Resource
from flask import request
from services.flight_service import flight_search

class FlightsSearch(Resource):
	def post(self):
   # Logic to search for flights based on criteria
		request_data = request.json
		r_data = flight_search(request_data)
  
		return r_data

class FlightsAddToPlan(Resource):
	def post(self):
	# Logic to add selected flight to plan
		return {'message': 'Adding flight to plan...'}


