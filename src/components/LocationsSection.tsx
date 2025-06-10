import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface LocationsSectionProps {
  onLocationClick?: (locationId: string) => void;
}

const featuredLocations = [
  {
    id: "prague",
    city: "Prague",
    area: "Old Town Square",
    image:
      "https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "New",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    id: "barcelona",
    city: "Barcelona",
    area: "Eixample District",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Prime location",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "amsterdam",
    city: "Amsterdam",
    area: "Canal District",
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Featured",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    id: "rome",
    city: "Rome",
    area: "Trastevere",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Best rated",
    badgeColor: "bg-yellow-100 text-yellow-800",
  },
];

export default function LocationsSection({
  onLocationClick,
}: LocationsSectionProps = {}) {
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
          {featuredLocations.map((location) => (
            <Card
              key={location.id}
              onClick={() => onLocationClick?.(location.id)}
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
            >
              <div className="relative">
                <img
                  src={location.image}
                  alt={location.city}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={location.badgeColor}>
                    {location.badge}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {location.city}
                </h3>
                <p className="text-gray-600">{location.area}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline">
            View all locations →
          </button>
        </div>
      </div>
    </section>
  );
}
