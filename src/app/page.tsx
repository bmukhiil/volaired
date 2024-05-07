"use client";

import { useAtom, atom } from "jotai";

export default function Home() {
  const testAtom = atom([
    {
      title: "Ghost in the Shell",
      year: 1995,
      watched: true,
    },
    {
      title: "Serial Experiments Lain",
      year: 1998,
      watched: false,
    },
  ]);
  const [test, setTest] = useAtom(testAtom);
  return <main></main>;
}
