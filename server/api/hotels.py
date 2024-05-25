from flask_restx import Resource

class HotelsSearch(Resource):
	def post(self):
	# Logic to search for hotels based on criteria
		return {'message': 'Searching for hotels...'}


class HotelsAddToPlan(Resource):
	def post(self):
	# Logic to add selected hotel to plan
		return {'message': 'Adding hotel to plan...'}
