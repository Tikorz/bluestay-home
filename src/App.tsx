import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LocationsSection from "./components/LocationsSection";
import AboutSection from "./components/AboutSection";
import ReviewsSection from "./components/ReviewsSection";
import BlogSection from "./components/BlogSection";
import MembershipSection from "./components/MembershipSection";
import Footer from "./components/Footer";
import LocationDetail from "./components/LocationDetail";
import SearchResults from "./components/SearchResults";

type AppView = "home" | "search" | "location";

function App() {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView("search");
  };

  const handleLocationClick = (locationId: string) => {
    setSelectedLocationId(locationId);
    setCurrentView("location");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  const handleBackToSearch = () => {
    setCurrentView("search");
  };

  // Home View
  if (currentView === "home") {
    return (
      <div className="min-h-screen">
        <Header />
        <HeroSection onSearch={handleSearch} />
        <LocationsSection onLocationClick={handleLocationClick} />
        <AboutSection />
        <ReviewsSection />
        <BlogSection />
        <MembershipSection />
        <Footer />
      </div>
    );
  }

  // Search Results View
  if (currentView === "search") {
    return (
      <div className="min-h-screen">
        <Header />
        <SearchResults
          searchQuery={searchQuery}
          onBack={handleBackToHome}
          onPropertyClick={handleLocationClick}
        />
      </div>
    );
  }

  // Location Detail View
  if (currentView === "location") {
    return (
      <div className="min-h-screen">
        <Header />
        <LocationDetail
          locationId={selectedLocationId}
          onBack={searchQuery ? handleBackToSearch : handleBackToHome}
        />
      </div>
    );
  }

  return null;
}

export default App;
