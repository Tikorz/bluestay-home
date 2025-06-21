import { useState } from "react";
import {
  MapPinIcon,
  WifiIcon,
  CarIcon,
  CoffeeIcon,
  StarIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";
import locationData from "@/data/locations.json";

interface LocationDetailProps {
  onBack: () => void;
}

export default function LocationDetail({ onBack }: LocationDetailProps) {
  const { id } = useParams();
  const locationId = id || "";
  const [selectedImage, setSelectedImage] = useState(0);

  const location = locationData[locationId as keyof typeof locationData];

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Location not found
          </h2>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
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
          <button
            onClick={onBack}
            className="mb-4 text-blue-600 hover:text-blue-700 flex items-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to locations
          </button>
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
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${location.badgeColor}`}
                >
                  {location.badge}
                </span>
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
            <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-6 shadow">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  Book your stay
                </div>
                <p className="text-gray-600">
                  Experience {location.city} like never before
                </p>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded">
                Check Availability
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Free cancellation • Best price guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
