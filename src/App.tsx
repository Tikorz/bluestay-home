import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
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
import BookingForm from "@/components/BookingForm";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLocationClick = (locationId: string) => {
    navigate(`/location/${locationId}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection onSearch={handleSearch} />
              <LocationsSection onLocationClick={handleLocationClick} />
              <AboutSection />
              <ReviewsSection />
              <BlogSection />
              <MembershipSection />
              <Footer />
            </>
          }
        />
        <Route path="/search" element={<SearchResults />} />

        <Route
          path="/location/:id"
          element={<LocationDetail onBack={() => navigate(-1)} />}
        />
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
