import { atom } from "jotai";

const adultCountAtom = atom(1);
const childCountAtom = atom(0);
const infantCountAtom = atom(0);

const departureAirportAtom = atom({
  iataCode: "YVR",
  name: "Vancouver INTL",
  city: "Vancouver",
  country: "Canada",
});
const destinationAirportAtom = atom({
  iataCode: "YYZ",
  name: "Toronto Pearson",
  city: "Toronto",
  country: "Canada",
});

const flightOffersAtom = atom([]);
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
};
