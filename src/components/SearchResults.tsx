import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  MapPinIcon,
  StarIcon,
  WifiIcon,
  CarIcon,
  CoffeeIcon,
  ArrowLeftIcon,
  FilterIcon,
} from "lucide-react";

interface SearchResultsProps {
  searchQuery: string;
  onBack: () => void;
  onPropertyClick: (locationId: string) => void;
}

const mockProperties = [
  {
    id: "prague",
    name: "Prague Old Town Square",
    city: "Prague, Czech Republic",
    image:
      "https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewCount: 324,
    price: 89,
    badge: "New",
    badgeColor: "bg-green-100 text-green-800",
    amenities: ["Free WiFi", "Kitchen", "Parking", "Coffee Machine"],
    description:
      "Historic building in the heart of Prague with modern amenities.",
  },
  {
    id: "prague-2",
    name: "Prague Castle District",
    city: "Prague, Czech Republic",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviewCount: 156,
    price: 76,
    badge: "",
    badgeColor: "",
    amenities: ["Free WiFi", "Kitchen", "Coffee Machine"],
    description: "Charming apartment near Prague Castle with stunning views.",
  },
  {
    id: "barcelona",
    name: "Barcelona Eixample District",
    city: "Barcelona, Spain",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewCount: 278,
    price: 112,
    badge: "Prime location",
    badgeColor: "bg-blue-100 text-blue-800",
    amenities: ["Free WiFi", "Kitchen", "Balcony", "Coffee Machine"],
    description: "Elegant apartment in prestigious Eixample district.",
  },
  {
    id: "barcelona-2",
    name: "Barcelona Gothic Quarter",
    city: "Barcelona, Spain",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewCount: 198,
    price: 95,
    badge: "",
    badgeColor: "",
    amenities: ["Free WiFi", "Kitchen", "Coffee Machine"],
    description: "Authentic apartment in the historic Gothic Quarter.",
  },
  {
    id: "amsterdam",
    name: "Amsterdam Canal District",
    city: "Amsterdam, Netherlands",
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewCount: 412,
    price: 95,
    badge: "Featured",
    badgeColor: "bg-purple-100 text-purple-800",
    amenities: ["Free WiFi", "Kitchen", "Bike Rental", "Coffee Machine"],
    description: "Charming canal house in the heart of Amsterdam.",
  },
];

export default function SearchResults({
  searchQuery,
  onBack,
  onPropertyClick,
}: SearchResultsProps) {
  const [sortBy, setSortBy] = useState("recommended");
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [amenityFilter, setAmenityFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter properties based on search query and filters
  let filteredProperties = mockProperties.filter(
    (property) =>
      property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply price filter
  filteredProperties = filteredProperties.filter(
    (property) =>
      property.price >= priceRange[0] && property.price <= priceRange[1]
  );

  // Apply amenity filter
  if (amenityFilter !== "all") {
    filteredProperties = filteredProperties.filter((property) =>
      property.amenities.some((amenity) =>
        amenity.toLowerCase().includes(amenityFilter.toLowerCase())
      )
    );
  }

  // Sort properties
  switch (sortBy) {
    case "price-low":
      filteredProperties.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProperties.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProperties.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // Keep default order (recommended)
      break;
  }

  const amenityIcons: { [key: string]: any } = {
    "Free WiFi": WifiIcon,
    Parking: CarIcon,
    "Coffee Machine": CoffeeIcon,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to search
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {filteredProperties.length} properties in {searchQuery}
              </h1>
              <p className="text-gray-600">Find your perfect stay</p>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <FilterIcon className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Filters
                </h3>

                {/* Sort By */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">
                        Price (Low to High)
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price (High to Low)
                      </SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per night: €{priceRange[0]} - €{priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={30}
                    max={300}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <Select
                    value={amenityFilter}
                    onValueChange={setAmenityFilter}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All amenities</SelectItem>
                      <SelectItem value="wifi">Free WiFi</SelectItem>
                      <SelectItem value="parking">Parking</SelectItem>
                      <SelectItem value="kitchen">Kitchen</SelectItem>
                      <SelectItem value="coffee">Coffee Machine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setPriceRange([50, 200]);
                    setAmenityFilter("all");
                    setSortBy("recommended");
                  }}
                >
                  Clear filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredProperties.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No properties found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your filters or search for a different
                      location.
                    </p>
                    <Button
                      onClick={() => {
                        setPriceRange([50, 200]);
                        setAmenityFilter("all");
                      }}
                    >
                      Clear filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredProperties.map((property) => (
                  <Card
                    key={property.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => onPropertyClick(property.id)}
                  >
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        {/* Image */}
                        <div className="relative">
                          <img
                            src={property.image}
                            alt={property.name}
                            className="w-full h-64 md:h-48 object-cover rounded-l-lg"
                          />
                          {property.badge && (
                            <div className="absolute top-4 left-4">
                              <Badge className={property.badgeColor}>
                                {property.badge}
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="md:col-span-2 p-6">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                {property.name}
                              </h3>
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPinIcon className="w-4 h-4 mr-1" />
                                {property.city}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">
                                €{property.price}
                              </div>
                              <div className="text-sm text-gray-600">
                                per night
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">
                            {property.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <StarIcon className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span className="font-semibold">
                                {property.rating}
                              </span>
                              <span className="text-gray-600 ml-1">
                                ({property.reviewCount} reviews)
                              </span>
                            </div>

                            <div className="flex items-center space-x-3">
                              {property.amenities
                                .slice(0, 3)
                                .map((amenity, index) => {
                                  const IconComponent =
                                    amenityIcons[amenity] || WifiIcon;
                                  return (
                                    <IconComponent
                                      key={index}
                                      className="w-4 h-4 text-gray-500"
                                      title={amenity}
                                    />
                                  );
                                })}
                              {property.amenities.length > 3 && (
                                <span className="text-sm text-gray-500">
                                  +{property.amenities.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
