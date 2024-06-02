import { atom } from "jotai";

const adultCountAtom = atom(1);
const childCountAtom = atom(0);
const infantCountAtom = atom(0);

const departureAirportAtom = atom({
  iataCode: "",
  name: "",
  city: "",
  country: "",
});
const destinationAirportAtom = atom({
  iataCode: "",
  name: "",
  city: "",
  country: "",
});

const dateRangeAtom = atom({
  from: new Date(),
  to: new Date(),
});

interface FlightOffer {
  id: number;
  outboundTotalDuration: string;
  inboundTotalDuration: string;
  flightPath: {
    departureAirport: string;
    departureTime: string;
    arrivalAirport: string;
    arrivalTime: string;
    airlines: string;
    duration: string;
  }[];
  price: number;
}

const flightOffersAtom = atom<FlightOffer[]>([]);
const flightOfferFiltersAtom = atom([]);

const userDataAtom = atom(null);

export {
  adultCountAtom,
  childCountAtom,
  infantCountAtom,
  departureAirportAtom,
  destinationAirportAtom,
  flightOffersAtom,
  flightOfferFiltersAtom,
  userDataAtom,
  dateRangeAtom,
};
