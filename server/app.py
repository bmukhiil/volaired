from flask import Flask, render_template, request
from flask_restx import Api, Resource
from flask_cors import CORS, cross_origin
from lib.amadeus import amadeus_instance
from lib.supabase import supabase_instance

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
   
@api.route("/trips/add")
class TripsAdd(Resource):
   def post(self):
      request_data = request.json
      item = {
         "creator_email": request_data["creatorEmail"],
         "trip_name": request_data["name"],
         
      }
      
      response = supabase_instance.insert_data("trips",item)
      return response
   
@api.route("/itineraries/add")
class ItenerariesAdd(Resource):
   def post(self):
      request_data = request.json
      item = {
         "itinerary_name": request_data["name"],
         "description": request_data["description"],
         "trip_id": request_data["tripId"]
      }
      
      response = supabase_instance.insert_data("itineraries",item)
      return response

# run the app
if __name__ == "__main__":
   app.run(port=8000, debug=True)

