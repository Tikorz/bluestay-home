import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { format } from "date-fns";
import SearchAutocomplete from "./SearchAutocomplete";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchLocation, setSearchLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("1");

  const popularDestinations = [
    "Prague, Czech Republic",
    "Barcelona, Spain",
    "Amsterdam, Netherlands",
    "Rome, Italy",
    "Paris, France",
    "Vienna, Austria",
    "Berlin, Germany",
    "Budapest, Hungary",
  ];

  const handleSearch = () => {
    if (!searchLocation || !checkIn || !checkOut) {
      alert("Please fill in all search fields");
      return;
    }

    // Navigate to search results or show alert
    if (onSearch) {
      onSearch(searchLocation);
    } else {
      alert(
        `Searching for ${guests} guest(s) in ${searchLocation} from ${format(checkIn, "MMM dd")} to ${format(checkOut, "MMM dd")}`
      );
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 min-h-[80vh] flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Beautiful hotel room"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-blue-900 mb-4">
            Welcome to BlueStay
          </h1>
          <p className="text-xl md:text-2xl text-blue-800 mb-8">
            15 countries. 120+ cities. 250+ locations.
          </p>
          <p className="text-lg text-blue-700 mb-12 max-w-2xl mx-auto">
            Discover our premium accommodations across Europe. All our BlueStay
            locations are situated in prime spots, perfectly connected to
            transport networks and designed for both short city breaks and
            extended business stays.
          </p>

          {/* Enhanced Booking Form */}
          <Card className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {/* Location Search */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    Where to?
                  </label>
                  <SearchAutocomplete onCitySelect={setSearchLocation} />
                </div>

                {/* Check-in Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Check-in
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-12 w-full justify-start text-left font-normal"
                      >
                        {checkIn ? (
                          format(checkIn, "MMM dd, yyyy")
                        ) : (
                          <span className="text-gray-500">Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Check-out Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Check-out
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-12 w-full justify-start text-left font-normal"
                      >
                        {checkOut ? (
                          format(checkOut, "MMM dd, yyyy")
                        ) : (
                          <span className="text-gray-500">Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => date < (checkIn || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <UsersIcon className="w-4 h-4 mr-1" />
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
                onClick={handleSearch}
                className="w-full md:w-auto px-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
              >
                Search Available Rooms
              </Button>

              {/* Quick suggestion chips */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-gray-600 mr-2">Popular:</span>
                {["Prague", "Barcelona", "Amsterdam"].map((city) => (
                  <button
                    key={city}
                    onClick={() =>
                      setSearchLocation(
                        `${city}, ${city === "Prague" ? "Czech Republic" : city === "Barcelona" ? "Spain" : "Netherlands"}`
                      )
                    }
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Prime Locations
              </h3>
              <p className="text-blue-700">
                Central locations in the heart of European cities
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Digital Check-in
              </h3>
              <p className="text-blue-700">
                Seamless contactless check-in and check-out
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Crafted Experience
              </h3>
              <p className="text-blue-700">
                Thoughtfully designed spaces for modern travelers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
