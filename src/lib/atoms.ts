import { atom } from "jotai";

const adultCountAtom = atom(2);
const childCountAtom = atom(0);
const infantCountAtom = atom(0);

const departureAirportAtom = atom({
  iataCode: "YVR",
  name: "",
  city: "",
  country: "",
});
const destinationAirportAtom = atom({
  iataCode: "YYZ",
  name: "",
  city: "",
  country: "",
});

const flightOffersAtom = atom([]);
const flightOfferFiltersAtom = atom([]);

export {
  adultCountAtom,
  childCountAtom,
  infantCountAtom,
  departureAirportAtom,
  destinationAirportAtom,
  flightOffersAtom,
  flightOfferFiltersAtom,
};
