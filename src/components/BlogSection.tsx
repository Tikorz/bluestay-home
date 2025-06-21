import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "Your ultimate European summer guide",
    excerpt:
      "Discover Europes top summer 2024 events—from classical music in Vienna to art festivals in Barcelona. Culture, adventure & unforgettable moments await!",
    image: "https://demo-source.imgix.net/scooter.jpg",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "15 hidden European gems to visit in 2024",
    excerpt:
      "Discover Europes hidden gems in 2024 — charming, crowd-free and authentic destinations. Skip the tourist traps and find your next favourite place.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    readTime: "12 min read",
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get inspired on our blog
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the best travel tips, hidden gems, and destination guides
            to make your European adventure unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-700">
                  {post.readTime}
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                  Read more →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline">
            View all blog posts →
          </button>
        </div>
      </div>
    </section>
  );
}
