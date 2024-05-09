"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { testEmail } from "@/lib/validate";
import {
  HeroSection,
  ConfettiExplosionCanvas,
  FlightDelayChart,
  FlightPriceInfo,
  GroupTripSection,
} from "@/components/pages/home";

import { atom } from "jotai";

export default function Home() {
  const [date, setDate] = React.useState<Date>(new Date());
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [tripJoined, setTripJoined] = useState(false);
  const [tripDeclined, setTripDeclined] = useState(false);
  const [tripJoinedTriggered, setTripJoinedTriggered] = useState(false);
  const [priceDataLoading, setPriceDataLoading] = useState(false);

  const handleInputChange = (e: string) => {
    setEmail(e);
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    setIsExploding(false);
    setLoading(true);
    try {
      if (!testEmail(email)) {
        setError("Invalid email address");
        return;
      }
      const response = await fetch("/api/v1/notifications/launch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setSuccess(true);
      setIsExploding(true);
    } catch (e: any) {
      setError(e.message);
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceData = async () => {
    const epochDate = date.getTime();
    setPriceDataLoading(true);
    try {
      const response = await fetch(`/api/v1/flights/prices?date=${epochDate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (e: any) {
      console.error("Price data error:", e.message);
    } finally {
      setPriceDataLoading(false);
    }
  };

  useEffect(() => {
    handlePriceData();
  }, []);

  return (
    <section className="px-6 overflow-x-hidden pt-12" id="hero">
      {isExploding && <ConfettiExplosionCanvas />}
      <HeroSection
        loading={loading}
        success={success}
        email={email}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        error={error}
      />
      <div className="py-28 flex flex-col gap-y-6">
        <GroupTripSection
          tripDeclined={tripDeclined}
          tripJoined={tripJoined}
          setTripDeclined={setTripDeclined}
          setTripJoined={setTripJoined}
          setTripJoinedTriggered={setTripJoinedTriggered}
          tripJoinedTriggered={tripJoinedTriggered}
        />
      </div>
      <div className="pb-28 flex flex-col gap-y-6">
        <FlightPriceInfo
          date={date}
          setDate={setDate}
          handleSubmit={handlePriceData}
          loading={priceDataLoading}
        />
      </div>
      <div className="pb-28 flex flex-col gap-y-6">
        <FlightDelayChart />
      </div>
    </section>
  );
}
