import { useState } from "react";
import locationData from "@/data/locations.json";

interface Props {
  onCitySelect: (city: string) => void;
}

export default function SearchAutocomplete({ onCitySelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

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
    setQuery(city);
    setResults([]);
    onCitySelect(city);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Stadt eingeben..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm"
      />

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
