import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    comment:
      "Amazing location in the heart of Prague! The digital check-in was super smooth and the apartment was spotless.",
    platform: "Booking.com",
    daysAgo: 1,
    avatar: "SM",
  },
  {
    id: 2,
    name: "Marco L.",
    rating: 5,
    comment:
      "Perfect stay in Barcelona. Beautiful apartment with stunning city views and excellent amenities.",
    platform: "Google",
    daysAgo: 2,
    avatar: "ML",
  },
  {
    id: 3,
    name: "Emma K.",
    rating: 5,
    comment:
      "The Amsterdam location exceeded our expectations. Clean, modern, and perfectly located near the canals.",
    platform: "Booking.com",
    daysAgo: 3,
    avatar: "EK",
  },
  {
    id: 4,
    name: "David R.",
    rating: 5,
    comment:
      "Excellent service and beautiful accommodation in Rome. The contactless experience was fantastic.",
    platform: "Google",
    daysAgo: 4,
    avatar: "DR",
  },
  {
    id: 5,
    name: "Lisa T.",
    rating: 5,
    comment:
      "Outstanding stay! The apartment was modern, clean, and the location was perfect for exploring.",
    platform: "Booking.com",
    daysAgo: 5,
    avatar: "LT",
  },
  {
    id: 6,
    name: "Thomas B.",
    rating: 5,
    comment:
      "Great experience from booking to checkout. The digital process made everything so easy.",
    platform: "Google",
    daysAgo: 6,
    avatar: "TB",
  },
];

const platforms = [
  { name: "All Reviews", active: true },
  { name: "Booking.com", active: false },
  { name: "Google", active: false },
  { name: "TripAdvisor", active: false },
];

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What you say about us
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Check out our latest reviews and convince yourself to book your next
            trip directly with us!
          </p>

          {/* Platform Filter */}
          <div className="flex justify-center space-x-4 mb-8">
            {platforms.map((platform) => (
              <button
                key={platform.name}
                className={`px-4 py-2 rounded-full transition-colors ${
                  platform.active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {platform.name}
              </button>
            ))}
          </div>

          {/* Overall Rating */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">4.8</span>
              <span className="text-gray-600">Overall Rating</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {review.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {review.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {review.daysAgo} day{review.daysAgo > 1 ? "s" : ""} ago
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {review.platform}
                  </Badge>
                </div>

                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline">
            Read more reviews →
          </button>
        </div>
      </div>
    </section>
  );
}
