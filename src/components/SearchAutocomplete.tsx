import { useState } from "react";
import { useNavigate } from "react-router-dom";
import locationData from "@/data/locations.json";

export default function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();

  const allCities = Array.from(
    new Set(Object.values(locationData).map((loc) => loc.city))
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) return setResults([]);

    const lower = value.toLowerCase();
    const matches = allCities
      .filter((city) => city.toLowerCase().includes(lower))
      .slice(0, 5);

    setResults(matches);
  };

  const handleSelect = (city: string) => {
    if (!checkIn || !checkOut) {
      alert("Bitte Check-in und Check-out Datum wählen.");
      return;
    }

    setQuery("");
    setResults([]);
    navigate(
      `/search?q=${encodeURIComponent(city)}&from=${checkIn}&to=${checkOut}`
    );
  };

  return (
    <div className="relative max-w-md mx-auto space-y-2">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Stadt eingeben..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm"
      />

      <div className="flex gap-2">
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-1/2 border border-gray-300 rounded-md px-2 py-2"
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-1/2 border border-gray-300 rounded-md px-2 py-2"
        />
      </div>

      {results.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded-md mt-1 shadow-lg">
          {results.map((city) => (
            <li
              key={city}
              onClick={() => handleSelect(city)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
