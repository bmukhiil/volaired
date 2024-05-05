"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [flights, setFlights] = useState([]);

  const handleSearch = async () => {
    console.log("searching...");
    const response = await fetch("/api/v1/flights", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    setFlights(data);
  };

  return (
    <main>
      <Input />
      <Button onClick={() => handleSearch()}>Find flights</Button>
    </main>
  );
}
