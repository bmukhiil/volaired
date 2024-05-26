import { atom } from "jotai";

const adultCountAtom = atom(2);
const childCountAtom = atom(0);
const infantCountAtom = atom(0);

const departureAirportAtom = atom(null);
const destinationAirportAtom = atom(null);

export {
  adultCountAtom,
  childCountAtom,
  infantCountAtom,
  departureAirportAtom,
  destinationAirportAtom,
};
