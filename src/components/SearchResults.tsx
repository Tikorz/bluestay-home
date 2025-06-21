import { useSearchParams } from "react-router-dom";
import locationData from "@/data/locations.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const checkIn = searchParams.get("from") || "";
  const checkOut = searchParams.get("to") || "";
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const query = searchQuery.trim().toLowerCase();

  // Initialfilter: Stadt & Preis
  let filteredProperties = Object.values(locationData)
    .filter((property) => property.city.toLowerCase() === query)
    .filter(
      (property) =>
        property.price >= priceRange[0] && property.price <= priceRange[1]
    )
    .map((property) => ({
      ...property,
      image: property.images?.[0] || "",
    }));

  // Optional: für später (z. B. Demo-Verfügbarkeiten pro Wohnung)
  // filteredProperties = filteredProperties.filter((property) => {
  //   return (
  //     new Date(checkIn) >= new Date(property.availableFrom) &&
  //     new Date(checkOut) <= new Date(property.availableTo)
  //   );
  // });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Ergebnisse für: <span className="text-blue-600">{searchQuery}</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="border rounded-md p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold">{property.name}</h2>
            <p className="text-sm text-gray-500">{property.city}</p>
            <p className="text-blue-600 font-bold mt-2">
              {property.price}€ / Nacht
            </p>
            <Link
              to={`/booking/${property.id}?from=${checkIn}&to=${checkOut}`}
              className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Jetzt buchen
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
