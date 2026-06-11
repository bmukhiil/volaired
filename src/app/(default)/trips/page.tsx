"use client";

import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronDown,
  FaChevronRight,
  FaPlus,
  FaMagic,
  FaPlane,
  FaCar,
  FaBasketballBall,
  FaUtensils,
  FaWallet,
  FaBuilding,
  FaRegStickyNote,
  FaRegCreditCard,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

// Types for AddItemDialog Props
interface Field {
  name: string;
  label: string;
}

interface AddItemDialogProps<T> {
  title: string;
  fields: Field[];
  onAdd: (data: T) => void;
}

const AddItemDialog = <T extends object>({
  title,
  fields,
  onAdd,
}: AddItemDialogProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(formData as T);
    setFormData({});
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-dashed">
          <FaPlus className="w-4 h-4 mr-2" />
          Create a new item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                value={(formData as any)[field.name] || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: e.target.value,
                  }))
                }
                required
              />
            </div>
          ))}
          <Button type="submit" className="w-full">
            Add Item
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Types for Section Data
interface TravelItem {
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  class: string;
}

interface AccommodationItem {
  hotel: string;
  address: string;
  checkIn: string;
  checkOut: string;
}

interface BookingItem {
  name: string;
  type: string;
  date: string;
}

// Define types for Trip Data
interface Note {
  content: string;
}

interface Expense {
  category: string;
  amount: number;
}

interface Booking {
  type: string;
  price: number;
  icon: React.ElementType;
  time?: string;
  location?: string;
  color: string;
}

interface Activity {
  type: string;
  time: string;
  details: string;
  icon: React.ElementType; // Type for dynamic React icons
}

interface PlanDate {
  date: string;
  activities: Activity[];
}

interface TripData {
  title: string;
  date: string;
  budget: number;
  notes: string[];
  expenses: Expense[];
  bookings: Booking[];
  planDates: PlanDate[];
}

const FlightCard: React.FC<TravelItem> = ({
  airline,
  flightNumber,
  from,
  to,
  departure,
  arrival,
  duration,
  class: flightClass,
}) => {
  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaPlane className="w-5 h-5 text-gray-500" />
          <span className="font-medium">{airline}</span>
          <span className="text-sm text-gray-500">#{flightNumber}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="text-2xl font-bold">{from}</div>
          <div className="text-sm text-gray-500">{departure}</div>
        </div>
        <div className="flex-1 mx-4 border-t-2 border-dashed relative"></div>
        <div className="text-center">
          <div className="text-2xl font-bold">{to}</div>
          <div className="text-sm text-gray-500">{arrival}</div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-700">
        <p>Duration: {duration}</p>
        <p>Class: {flightClass}</p>
      </div>
    </div>
  );
};

const TravelPlanner: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isTripPlanActive, setTripPlanActive] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>("Overview");
  const [sections, setSections] = useState<{
    travel: TravelItem[];
    accommodation: AccommodationItem[];
    bookings: BookingItem[];
  }>({
    travel: [
      {
        airline: "Spirit Airways",
        flightNumber: "SP 0983",
        from: "YVR",
        to: "LAX",
        departure: "12:00",
        arrival: "13:00",
        duration: "6hr 10min",
        class: "Business",
      },
    ],
    accommodation: [
      {
        hotel: "Hilton Los Angeles",
        address: "1234 London Way, UK",
        checkIn: "June 25th 8:00pm",
        checkOut: "June 27th 10:00am",
      },
    ],
    bookings: [
      {
        name: "Lakers vs Warriors",
        type: "Event",
        date: "June 26th",
      },
    ],
  });

  const tripData: TripData = {
    title: "Trip to LA",
    date: "June 7, 2024 - June 12, 2024",
    budget: 600.0,
    notes: [
      "Where after landing on the last day?",
      "Garden center only open with Kev",
      "Check restaurant reviews",
      "Confirm hotel check-in time",
      "Pack sunscreen",
    ],
    expenses: [
      { category: "Transportation", amount: 250 },
      { category: "Accommodation", amount: 150 },
      { category: "Activities", amount: 100 },
      { category: "Food", amount: 100 },
    ],
    bookings: [
      {
        type: "Plane",
        price: 199,
        time: "9:45 AM",
        icon: FaPlane,
        color: "text-blue-700",
      },
      {
        type: "Hotel",
        price: 299,
        location: "LA Downtown",
        icon: FaBuilding,
        color: "text-blue-700",
      },
      {
        type: "NBA Game",
        price: 150,
        time: "7:30 PM",
        icon: FaBasketballBall,
        color: "text-blue-700",
      },
      {
        type: "Dinner",
        price: 50,
        location: "MamaLas",
        icon: FaUtensils,
        color: "text-blue-700",
      },
    ],
    planDates: [
      {
        date: "June 25th",
        activities: [
          {
            type: "Flight",
            time: "9:45",
            details: "YVR to LAX",
            icon: FaPlane,
          },
          { type: "Uber", time: "11:30", details: "To Hotel", icon: FaCar },
          {
            type: "NBA Game",
            time: "7:30 PM",
            details: "LA vs LAL",
            icon: FaBasketballBall,
          },
          {
            type: "Dinner",
            time: "9:30 PM",
            details: "MamaLas",
            icon: FaUtensils,
          },
        ],
      },
      { date: "June 26th", activities: [] },
      { date: "June 27th", activities: [] },
    ],
  };

  const [expandedDays, setExpandedDays] = useState<boolean[]>(
    Array(tripData.planDates.length).fill(false)
  );

  const toggleDay = (index: number) => {
    setExpandedDays((prev) =>
      prev.map((expanded, i) => (i === index ? !expanded : expanded))
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white ${
          isSidebarOpen ? "w-64" : "w-0"
        } mt-6 transition-all duration-300 overflow-hidden rounded-lg shadow-md h-[90vh]`}
      >
        {isSidebarOpen && (
          <div className="p-4 flex flex-col h-full justify-between">
            {/* Top Section */}
            <div>
              {/* Trip Plan and Copilot Buttons */}
              <div className="flex space-x-2 mb-4">
                <Button
                  variant="ghost"
                  onClick={() => setTripPlanActive(true)}
                  className={`flex-1 text-sm font-medium border h-8 ${
                    isTripPlanActive
                      ? "border-gray-300 text-gray-700 bg-gray-100"
                      : "border-gray-300 text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Trip Plan
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setTripPlanActive(false)}
                  className={`flex-1 text-sm font-medium border h-8 ${
                    !isTripPlanActive
                      ? "border-transparent bg-gradient-to-r from-pink-100 via-pink-200 to-purple-200 text-black"
                      : "border-gray-300 text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <FaMagic className="w-3.5 h-3.5 mr-2" />
                  Copilot
                </Button>
              </div>

              {/* Trip Plan Submenu */}
              {isTripPlanActive && (
                <div className="space-y-1">
                  {["Overview", "Budget", "Bookings", "Your Plan"].map(
                    (tab) => (
                      <Button
                        key={tab}
                        variant="ghost"
                        onClick={() => setSelectedTab(tab)}
                        className={`w-full flex justify-start text-left text-sm rounded-md py-2 ${
                          selectedTab === tab
                            ? "text-black font-medium"
                            : "text-gray-400 hover:text-black"
                        }`}
                      >
                        <span
                          className={`pl-2 ${
                            selectedTab === tab ? "font-semibold" : "font-light"
                          }`}
                        >
                          {tab}
                        </span>
                      </Button>
                    )
                  )}
                </div>
              )}

              {/* Copilot Chat Section */}
              {!isTripPlanActive && (
                <div className="space-y-3 border-t pt-3">
                  <div className="relative h-[60dvh] flex flex-col border rounded-lg p-3">
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center opacity-50">
                        <div className="border rounded-lg p-1"></div>
                      </div>
                      <div className="w-5/6 flex flex-col justify-center gap-y-3 mt-2">
                        <h1 className="text-lg font-semibold tracking-tight text-center">
                          Copilot
                        </h1>
                        <p className="text-xs font-medium text-gray-600 text-center">
                          👋 Hi, I&apos;m Copilot. I can help you plan your trip
                          and also add them to your itinerary for future
                          planning.
                        </p>
                        <div className="bg-gray-100 font-medium text-xs rounded-lg px-3 py-2 border shadow-sm">
                          Can you recommend places to visit that everyone in our
                          group would enjoy?
                        </div>
                        <div className="bg-gray-100 font-medium text-xs rounded-lg px-3 py-2 border shadow-sm">
                          Are there any unique attractions that fit our
                          group&apos;s interests?
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto mt-2">
                      <p className="text-center text-gray-500 text-xs">
                        Start a conversation by typing a message below.
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <Input
                        placeholder="Message Copilot"
                        className="border-none rounded-l-lg rounded-r-none h-10 flex-1 text-sm"
                      />
                      <Button
                        size="icon"
                        className="bg-gray-200 rounded-l-none rounded-r-lg flex items-center justify-center h-10"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-gray-600"
                        >
                          <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Spacer */}
            <div className="pb-6" />
          </div>
        )}

        {/* Sidebar Toggle Button */}
        <Button
          variant="ghost"
          className="w-full justify-start p-4"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <>
              <FaChevronLeft className="w-4 h-4 mr-2" />
              Close sidebar
            </>
          ) : (
            <>
              <FaChevronRight className="w-4 h-4 mr-2" />
              Open sidebar
            </>
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        <div className="max-w-5xl mx-auto space-y-6">
          {selectedTab === "Bookings" && (
            <div>
              <div
                className="mb-6 bg-gradient-to-r text-white rounded-lg shadow-md p-6"
                style={{
                  backgroundImage:
                    " linear-gradient(90deg, rgba(97,98,233,1) 51%, rgba(52,52,139,1) 100%)",
                }}
              >
                <h1 className="text-2xl font-bold mb-2">Bookings</h1>
                <p>Book with your group email: groupsystem@radiair.com</p>
              </div>
              <div className="mb-6">
                <Section
                  title="Travel"
                  items={sections.travel}
                  renderItem={(item) => <FlightCard {...item} />}
                  fields={[
                    { name: "airline", label: "Airline" },
                    { name: "flightNumber", label: "Flight Number" },
                    { name: "from", label: "From" },
                    { name: "to", label: "To" },
                    { name: "departure", label: "Departure Time" },
                    { name: "arrival", label: "Arrival Time" },
                    { name: "duration", label: "Duration" },
                    { name: "class", label: "Class" },
                  ]}
                  onAdd={(data) =>
                    setSections((prev) => ({
                      ...prev,
                      travel: [...prev.travel, data],
                    }))
                  }
                />
              </div>
              <div className="mb-6">
                <Section
                  title="Accommodation"
                  items={sections.accommodation}
                  renderItem={(item) => (
                    <div className="p-4 bg-gray-50 rounded-xl shadow-md border border-gray-200">
                      <p className="font-medium">{item.hotel}</p>
                      <p className="text-sm text-gray-500">{item.address}</p>
                      <div className="flex justify-between mt-2">
                        <div>
                          <p className="font-bold">Check-in:</p>
                          <p>{item.checkIn}</p>
                        </div>
                        <div>
                          <p className="font-bold">Check-out:</p>
                          <p>{item.checkOut}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  fields={[
                    { name: "hotel", label: "Hotel" },
                    { name: "address", label: "Address" },
                    { name: "checkIn", label: "Check-in Date & Time" },
                    { name: "checkOut", label: "Check-out Date & Time" },
                  ]}
                  onAdd={(data) =>
                    setSections((prev) => ({
                      ...prev,
                      accommodation: [...prev.accommodation, data],
                    }))
                  }
                />
              </div>
              <div className="mb-6">
                <Section
                  title="Bookings"
                  items={sections.bookings}
                  renderItem={(item) => (
                    <div className="p-4 bg-gray-50 rounded-xl shadow-md border border-gray-200">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Type: {item.type}</p>
                      <p className="text-sm text-gray-500">Date: {item.date}</p>
                    </div>
                  )}
                  fields={[
                    { name: "name", label: "Name" },
                    { name: "type", label: "Type" },
                    { name: "date", label: "Date" },
                  ]}
                  onAdd={(data) =>
                    setSections((prev) => ({
                      ...prev,
                      bookings: [...prev.bookings, data],
                    }))
                  }
                />
              </div>
            </div>
          )}
          {selectedTab === "Overview" && (
            <div>
              <div className="max-w-5xl mx-auto space-y-6">
                {/* Header Banner */}
                <div
                  className="mb-6 bg-gradient-to-r text-white rounded-lg shadow-md p-6"
                  style={{
                    backgroundImage:
                      " linear-gradient(90deg, rgba(97,98,233,1) 51%, rgba(52,52,139,1) 100%)",
                  }}
                >
                  <h1 className="text-2xl font-bold mb-2">Trip to LA</h1>
                  <p>Book with your group email: groupsystem@radiair.com</p>
                </div>

                {/* Overview Section */}
                <Card className="mb-6">
                  <CardHeader>
                    <h2 className="text-xl font-bold">Your Overview</h2>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Notes Section */}
                      <Card className="shadow-lg transition-shadow duration-200 flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <FaRegStickyNote className="w-5 h-5" />
                            Notes
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                          <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start gap-2">
                              • Where after landing on the last day?
                            </li>
                            <li className="flex items-start gap-2">
                              • Garden center only open with Kev
                            </li>
                          </ul>
                          <Button
                            variant="outline"
                            className="w-full mt-4 self-end bg-white border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 hover:text-black"
                          >
                            View Notes
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Budget Section */}
                      <Card className="shadow-lg transition-shadow duration-200 flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <FaRegCreditCard className="w-5 h-5" />
                            Budget
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-xl font-bold">$600.00</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full mt-4 self-end bg-white border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 hover:text-black"
                          >
                            View Budget
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Bookings Section */}
                    {/* Bookings Section */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                          Bookings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* Grid of Booking Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {tripData.bookings.map((booking, index) => {
                            const Icon = booking.icon; // Use the icon directly from booking data
                            return (
                              <div
                                key={index}
                                className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-gray-300"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-corporate-50/50 to-corporate-100/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                                <div className="relative flex flex-col items-center space-y-4">
                                  <div
                                    className={`rounded-full p-4 ${booking.color} bg-opacity-10 transition-colors duration-200 group-hover:bg-opacity-20`}
                                  >
                                    <Icon className="h-6 w-6 transition-colors duration-200 group-hover:text-opacity-80" />
                                  </div>
                                  <div className="text-center">
                                    <h3 className="text-lg font-semibold text-corporate-800">
                                      {booking.type}
                                    </h3>
                                    <p className="mt-1 text-2xl font-bold text-corporate-900">
                                      ${booking.price}
                                    </p>
                                    {/* Add optional location or time details */}
                                    {booking.location && (
                                      <p className="text-sm text-corporate-600">
                                        {booking.location}
                                      </p>
                                    )}
                                    {booking.time && (
                                      <p className="text-sm text-corporate-600">
                                        {booking.time}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Confirm Button */}
                        <Button className="w-full py-3 text-white bg-gradient-to-r from-[#6162e9] to-[#e961e9] hover:from-[#5a57d6] hover:to-[#d657d6] transition-colors duration-200">
                          Confirm Flight and Hotel Booking
                        </Button>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

                {/* Plan Section */}
                <Card className="mb-6">
                  <CardHeader>
                    <h2 className="text-xl font-bold">Your Plan</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tripData.planDates.map((day, index) => (
                        <div
                          key={index}
                          className="flex flex-col bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-lg">
                              {day.date}
                            </h4>
                            <button
                              onClick={() => toggleDay(index)}
                              className="text-gray-500 hover:text-black"
                            >
                              {expandedDays[index] ? (
                                <FaChevronDown className="w-5 h-5" />
                              ) : (
                                <FaChevronRight className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          {expandedDays[index] && (
                            <div className="mt-4">
                              {day.activities.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                  {day.activities.map((activity, actIndex) => (
                                    <div
                                      key={actIndex}
                                      className="flex flex-col items-center text-center p-3 bg-white rounded-lg"
                                    >
                                      <activity.icon className="w-5 h-5 mb-2 text-gray-600" />
                                      <div className="text-sm text-gray-500 mb-1">
                                        {activity.time}
                                      </div>
                                      <div className="font-semibold mb-1">
                                        {activity.type}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {activity.details}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                                  <p className="text-gray-500 text-xs">
                                    No activities planned
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          {selectedTab === "Budget" && (
            <div>
              <h2 className="text-xl font-semibold">Budget</h2>
              <p className="text-gray-600">This is the Budget page.</p>
            </div>
          )}
          {selectedTab === "Your Plan" && (
            <div>
              <h2 className="text-xl font-semibold">Your Plan</h2>
              <p className="text-gray-600">This is the Your Plan page.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Generic Section Component
interface SectionProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  fields: Field[];
  onAdd: (data: T) => void;
}

const Section = <T extends object>({
  title,
  items,
  renderItem,
  fields,
  onAdd,
}: SectionProps<T>) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
      <Button
        variant="ghost"
        className="w-full justify-between mb-4"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className="text-xl font-semibold">{title}</span>
        {isCollapsed ? (
          <FaChevronRight className="w-5 h-5" />
        ) : (
          <FaChevronDown className="w-5 h-5" />
        )}
      </Button>

      {!isCollapsed && (
        <div className="space-y-4">
          {items.map((item, index) => renderItem(item, index))}
          <AddItemDialog<T>
            title={`Add ${title}`}
            fields={fields}
            onAdd={onAdd}
          />
        </div>
      )}
    </div>
  );
};

export default TravelPlanner;
