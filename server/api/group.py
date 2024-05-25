from flask_restx import Resource

class CreateGroup(Resource):
	def post(self):
   # Logic to search for flights based on criteria
		return {'message': 'group has been created'}

class AddGroupMember(Resource):
	def post(self):
	# Logic to search for flights based on criteria
		return {'message': 'group has been created'}

class AddPlanToGroup(Resource):
	def post(self):
		return {'message': 'yup'}


        


        