import { useNavigate } from "react-router-dom";
import locationData from "@/data/locations.json";

interface LocationsSectionProps {
  onLocationClick?: (locationId: string) => void;
}

export default function LocationsSection({
  onLocationClick,
}: LocationsSectionProps = {}) {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Locations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our wide variety of locations across Europe. All our
            BlueStay properties are situated in prime locations, conveniently
            connected to public transport & our suites are suitable for short
            city trips as well as longer business stays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(locationData).map(([id, location]) => (
            <div
              key={id}
              onClick={() => onLocationClick?.(id)}
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-lg"
            >
              <div className="relative">
                <img
                  src={location.images[0]}
                  alt={location.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${location.badgeColor}`}
                  >
                    {location.badge}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {location.name}
                </h3>
                <p className="text-gray-600">{location.city}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/search?q=all")}
            className="text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline"
          >
            View all locations →
          </button>
        </div>
      </div>
    </section>
  );
}
