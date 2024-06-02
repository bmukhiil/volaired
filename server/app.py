from flask import Flask, render_template, request
from flask_restx import Api, Resource
from flask_cors import CORS, cross_origin
from lib.amadeus import amadeus_instance

app = Flask(__name__)
api = Api(app)
CORS(app)

@api.route("/flights/search")
class FlightsSearch(Resource):
    def get(self):
        # Logic to search for flights based on criteria
        # request_data = request.json
        args = request.args
        r_data = amadeus_instance.search_flights(args)
        print(r_data)

        return r_data

    def post(self):
        pass


@api.route("/flights/add-to-plan")
class FlightsAddToPlan(Resource):
    def post(self):
        # Logic to add selected flight to plan
        return {"message": "Adding flight to plan..."}


@api.route("/hotels/search")
class HotelsSearch(Resource):
    def get(self):
        request_data = request.json
        r_data = amadeus_instance.search_hotels(request_data)
        print(r_data)
        return r_data


@api.route("/hotels/add-to-plan")
class HotelsAddToPlan(Resource):
    def get(self):
        return {"message": "Adding hotel to plan..."}


# run the app
if __name__ == "__main__":
    app.run(port=8000, debug=True)
=======
@api.route('/flights/search')
class FlightsSearch(Resource):
	def get(self):
		   # Logic to search for flights based on criteria
		request_data = request.json
		r_data = amadeus_instance.search_flights(request_data)
		print(r_data)

		return r_data

	def post(self):
		pass
	

@api.route('/flights/add-to-plan')
class FlightsAddToPlan(Resource):
	def post(self):
	# Logic to add selected flight to plan
		return {'message': 'Adding flight to plan...'}

@api.route('/hotels/search')
class HotelsSearch(Resource):
	def get(self):
		request_data = request.json
		r_data = amadeus_instance.search_hotels(request_data)
		print(r_data)
		return r_data
	
@api.route('/hotels/add-to-plan')
class HotelsAddToPlan(Resource):
	def get(self):
		return {'message': 'Adding hotel to plan...'}



# run the app
if __name__ == '__main__':
	app.run(host=8000, debug=True)
