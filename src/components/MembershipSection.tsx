import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MembershipSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-white">
            <Badge className="bg-blue-500 text-white mb-6">
              Member Exclusive
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Members get the best rates
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Enjoy 15% off every stay when you book directly with us—no fees,
              no catches, just perks. We believe in instant gratification, so
              our membership rewards you from your very first stay.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-blue-100">
                  15% off every stay - no minimum required
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-blue-100">
                  Exclusive access to member-only deals
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-blue-100">Priority customer support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-blue-100">
                  Free cancellation on all bookings
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-blue-100">
                  Early access to new locations
                </span>
              </div>
            </div>

            <p className="text-blue-100 mb-8">
              Sign up for free in seconds and join the BlueStay community of
              smart travelers.
            </p>

            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 font-semibold"
            >
              Become a member
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Happy travelers"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-white rounded-lg flex items-center justify-center shadow-xl">
              <div className="text-center text-blue-600">
                <div className="text-2xl font-bold">15%</div>
                <div className="text-sm">Savings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
