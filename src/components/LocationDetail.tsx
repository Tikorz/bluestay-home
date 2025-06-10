import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  WifiIcon,
  CarIcon,
  CoffeeIcon,
  StarIcon,
  ArrowLeftIcon,
} from "lucide-react";

interface LocationDetailProps {
  locationId: string;
  onBack: () => void;
}

const locationData = {
  prague: {
    name: "Prague Old Town Square",
    city: "Prague, Czech Republic",
    rating: 4.8,
    reviewCount: 324,
    price: 89,
    badge: "New",
    badgeColor: "bg-green-100 text-green-800",
    description:
      "Experience the magic of Prague from our stunning apartment located just steps away from the iconic Old Town Square. This beautifully designed space combines historic charm with modern amenities.",
    amenities: [
      "Free WiFi",
      "Kitchen",
      "Parking",
      "Coffee Machine",
      "Workspace",
      "City View",
    ],
    images: [
      "https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    features: [
      "Historic Building from 1890",
      "2-minute walk to Old Town Square",
      "Modern renovated interior",
      "Perfect for couples or business travelers",
    ],
  },
  barcelona: {
    name: "Barcelona Eixample District",
    city: "Barcelona, Spain",
    rating: 4.9,
    reviewCount: 278,
    price: 112,
    badge: "Prime location",
    badgeColor: "bg-blue-100 text-blue-800",
    description:
      "Discover Barcelona from our elegant apartment in the prestigious Eixample district. Enjoy easy access to Gaudí's masterpieces and the city's best restaurants.",
    amenities: [
      "Free WiFi",
      "Kitchen",
      "Balcony",
      "Coffee Machine",
      "Workspace",
      "Metro Nearby",
    ],
    images: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da60b8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    features: [
      "Modernist architecture",
      "5-minute walk to Sagrada Familia",
      "Private balcony with city views",
      "Metro station at the doorstep",
    ],
  },
  amsterdam: {
    name: "Amsterdam Canal District",
    city: "Amsterdam, Netherlands",
    rating: 4.7,
    reviewCount: 412,
    price: 95,
    badge: "Featured",
    badgeColor: "bg-purple-100 text-purple-800",
    description:
      "Stay in the heart of Amsterdam's famous canal ring. This charming apartment offers authentic Dutch architecture with all modern conveniences.",
    amenities: [
      "Free WiFi",
      "Kitchen",
      "Bike Rental",
      "Coffee Machine",
      "Canal View",
      "Historic Building",
    ],
    images: [
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    features: [
      "17th-century canal house",
      "UNESCO World Heritage location",
      "Free bike rental included",
      "Walk to all major attractions",
    ],
  },
  rome: {
    name: "Rome Trastevere",
    city: "Rome, Italy",
    rating: 4.9,
    reviewCount: 189,
    price: 98,
    badge: "Best rated",
    badgeColor: "bg-yellow-100 text-yellow-800",
    description:
      "Experience authentic Roman life in the bohemian Trastevere neighborhood. Cobblestone streets, local trattorias, and genuine Italian culture await.",
    amenities: [
      "Free WiFi",
      "Kitchen",
      "Terrace",
      "Coffee Machine",
      "Workspace",
      "Roman View",
    ],
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555992040-ea9c7aec9d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    features: [
      "Medieval neighborhood charm",
      "10-minute walk to Vatican",
      "Rooftop terrace with city views",
      "Surrounded by authentic restaurants",
    ],
  },
};

export default function LocationDetail({
  locationId,
  onBack,
}: LocationDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const location = locationData[locationId as keyof typeof locationData];

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Location not found
          </h2>
          <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
            Go Back
          </Button>
        </div>
      </div>
    );
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
            Back to locations
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="relative mb-4">
              <img
                src={location.images[selectedImage]}
                alt={location.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge className={location.badgeColor}>{location.badge}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {location.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-blue-600" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${location.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Location Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {location.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-gray-600">{location.city}</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{location.rating}</span>
                  <span className="text-gray-600 ml-1">
                    ({location.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                €{location.price}{" "}
                <span className="text-lg text-gray-600 font-normal">
                  / night
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                About this place
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {location.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What makes this special
              </h3>
              <ul className="space-y-2">
                {location.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Amenities
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {location.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || WifiIcon;
                  return (
                    <div
                      key={index}
                      className="flex items-center text-gray-700"
                    >
                      <IconComponent className="w-4 h-4 mr-2 text-blue-600" />
                      {amenity}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking Card */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    Book your stay
                  </div>
                  <p className="text-gray-600">
                    Experience {location.city} like never before
                  </p>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                  Check Availability
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Free cancellation • Best price guarantee
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
