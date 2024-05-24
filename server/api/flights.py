from flask_restful import Resource

class FlightsSearch(Resource):
	def post(self):
   # Logic to search for flights based on criteria
		return {'message': 'Searching for flights...'}

class FlightsAddToPlan(Resource):
	def post(self):
	# Logic to add selected flight to plan
		return {'message': 'Adding flight to plan...'}


