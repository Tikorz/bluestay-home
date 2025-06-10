import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

const cities = [
  { value: "prague", label: "Prague, Czech Republic" },
  { value: "barcelona", label: "Barcelona, Spain" },
  { value: "amsterdam", label: "Amsterdam, Netherlands" },
  { value: "rome", label: "Rome, Italy" },
  { value: "berlin", label: "Berlin, Germany" },
  { value: "vienna", label: "Vienna, Austria" },
  { value: "budapest", label: "Budapest, Hungary" },
  { value: "krakow", label: "Krakow, Poland" },
];

export default function BookingForm() {
  const [selectedCity, setSelectedCity] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState("1");
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  const handleSearch = () => {
    if (!selectedCity || !checkInDate || !checkOutDate) {
      alert("Please fill in all fields");
      return;
    }

    // Here you would normally navigate to search results
    console.log("Searching for:", {
      city: selectedCity,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
    });

    alert(
      `Searching for accommodations in ${cities.find((c) => c.value === selectedCity)?.label} from ${format(checkInDate, "MMM dd")} to ${format(checkOutDate, "MMM dd")} for ${guests} guest${guests !== "1" ? "s" : ""}`
    );
  };

  return (
    <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-xl">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* City Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Where to?
            </label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Search destination..." />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Check-in Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in
            </label>
            <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 w-full justify-start text-left font-normal"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {checkInDate
                    ? format(checkInDate, "MMM dd, yyyy")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={(date) => {
                    setCheckInDate(date);
                    setIsCheckInOpen(false);
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-out
            </label>
            <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 w-full justify-start text-left font-normal"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {checkOutDate
                    ? format(checkOutDate, "MMM dd, yyyy")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={(date) => {
                    setCheckOutDate(date);
                    setIsCheckOutOpen(false);
                  }}
                  disabled={(date) => date <= (checkInDate || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guests
            </label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5 Guests</SelectItem>
                <SelectItem value="6">6+ Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full md:w-auto px-8 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
          onClick={handleSearch}
        >
          Search Available Rooms
        </Button>
      </CardContent>
    </Card>
  );
}
