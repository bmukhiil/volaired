"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { testEmail } from "@/lib/validate";
import {
  HeroSection,
  ConfettiExplosionCanvas,
  FlightPriceInfo,
  GroupTripSection,
  MeetCopilot,
  FeaturesSection,
} from "@/components/pages/home";
import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://volaired.com",
  name: "Volaired",
  description:
    "Optimize your flights for cost and layovers with ease. Plan group trips and split bills seamlessly with Volaired.",
  // "publisher": {
  //   "@type": "Organization",
  //   "name": "Volaired",
  //   "logo": {
  //     "@type": "ImageObject",
  //     "url": "https://volaired.com/images/logo.png",
  //   },
  // },
};

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [tripJoined, setTripJoined] = useState(false);
  const [tripDeclined, setTripDeclined] = useState(false);
  const [tripJoinedTriggered, setTripJoinedTriggered] = useState(false);
  const [priceDataLoading, setPriceDataLoading] = useState(false);
  const [priceData, setPriceData] = useState({});

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
    const epochDate = date?.getTime();
    setPriceDataLoading(true);
    try {
      const response = await fetch(`/api/v1/flights/prices?date=${epochDate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      // if (!response.ok) {
      //   throw new Error(await response.text());
      // }
      console.log(response.data.data[0]);
      setPriceData(response.data.data[0]);
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
    <section
      className="px-6 overflow-x-hidden pt-14 md:pt-20 lg:-mx-6 lg:pt-32"
      id="hero"
    >
      <Script
        id="json-ld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {isExploding && <ConfettiExplosionCanvas />}
      <HeroSection
        loading={loading}
        success={success}
        email={email}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        error={error}
      />
      <div className="py-28 md:py-24 lg:py-36 drop-shadow-sm"></div>
      <div className="lg:px-40 flex flex-col gap-y-6">
        <GroupTripSection
          tripDeclined={tripDeclined}
          tripJoined={tripJoined}
          setTripDeclined={setTripDeclined}
          setTripJoined={setTripJoined}
          setTripJoinedTriggered={setTripJoinedTriggered}
          tripJoinedTriggered={tripJoinedTriggered}
        />
      </div>
      <div className="lg:px-40 py-28 md:py-24 lg:py-36 flex flex-col gap-y-6">
        <FeaturesSection />
      </div>
      {/* <div className="lg:px-40 pb-28 md:pb-24 lg:pb-36 flex flex-col gap-y-6 lg:flex-row lg:items-center lg:gap-x-4"> */}
      {/* <FlightPriceInfo
          date={date}
          setDate={setDate}
          handleSubmit={handlePriceData}
          loading={priceDataLoading}
          data={priceData}
        /> */}
      {/* </div> */}
      <div className="lg:px-40 pb-28 md:pb-24 lg:pb-36 flex flex-col gap-y-6">
        <MeetCopilot />
      </div>
    </section>
  );
}
