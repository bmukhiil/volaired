from flask import Flask, render_template
from flask_restful import Api, Resource
from api.flights import FlightsSearch, FlightsAddToPlan
from api.hotels import HotelsSearch, HotelsAddToPlan
from flask_cors import CORS, cross_origin

app = Flask(__name__)
api = Api(app)
CORS(app)

# Registering flight-related endpoints
api.add_resource(FlightsSearch, '/flights/search-flights')
api.add_resource(FlightsAddToPlan, '/flights/add-to-plan')
#api.add_resource(FlightsBook, '/flights/book')

# Registering hotel-related endpoints
api.add_resource(HotelsSearch, '/hotels/search-hotels')
api.add_resource(HotelsAddToPlan, '/hotels/add-to-plan')
#api.add_resource(HotelsBook, '/hotels/book-hotels')


if __name__ == '__main__':
	app.run(debug=True)
