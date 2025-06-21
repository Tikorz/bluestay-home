import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { UserIcon, LogOutIcon } from "lucide-react";

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, isLoggedIn, login, signup, logout } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      setIsLoginOpen(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await signup(email, password);
      setIsSignupOpen(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">BlueStay</h1>
            <span className="ml-2 text-sm text-gray-500">
              crafted to explore
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Locations
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Become a Member
              <Badge className="ml-2 bg-blue-100 text-blue-800">15% off</Badge>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="py-6">
                    <div className="flex items-center mb-8">
                      <h1 className="text-2xl font-bold text-blue-600">
                        BlueStay
                      </h1>
                      <span className="ml-2 text-sm text-gray-500">
                        crafted to explore
                      </span>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="space-y-4">
                      <a
                        href="#"
                        className="block text-lg text-gray-700 hover:text-blue-600 transition-colors py-2"
                      >
                        Locations
                      </a>
                      <a
                        href="#"
                        className="block text-lg text-gray-700 hover:text-blue-600 transition-colors py-2"
                      >
                        About
                      </a>
                      <a
                        href="#"
                        className="block text-lg text-gray-700 hover:text-blue-600 transition-colors py-2"
                      >
                        Blog
                      </a>
                      <a
                        href="#"
                        className="flex items-center text-lg text-gray-700 hover:text-blue-600 transition-colors py-2"
                      >
                        Become a Member
                        <Badge className="ml-2 bg-blue-100 text-blue-800">
                          15% off
                        </Badge>
                      </a>
                    </nav>
                  </div>

                  {/* Mobile Auth Buttons */}
                  <div className="mt-auto pb-6 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLoginOpen(true);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsSignupOpen(true);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <UserIcon className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">
                    Welcome, {user?.name}
                  </div>
                  <div className="text-gray-600">
                    {user?.membershipLevel === "premium"
                      ? "Premium Member"
                      : "Standard Member"}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <LogOutIcon className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Sign In
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-center">
                        Welcome back!
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleLogin} className="space-y-4 py-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                      <div className="text-center">
                        <button
                          type="button"
                          className="text-sm text-blue-600 hover:underline"
                          onClick={() => {
                            setIsLoginOpen(false);
                            setIsSignupOpen(true);
                          }}
                        >
                          New to BlueStay? Sign up
                        </button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Sign Up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-center">
                        Join BlueStay
                      </DialogTitle>
                      <p className="text-center text-gray-600">
                        As a member you get 15% off every stay
                      </p>
                    </DialogHeader>
                    <form onSubmit={handleSignup} className="space-y-4 py-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <Input
                          type="password"
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="newsletter"
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="newsletter"
                          className="text-sm text-gray-700"
                        >
                          I want to receive BlueStay newsletter for exclusive
                          offers
                        </label>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                      <div className="text-center">
                        <button
                          type="button"
                          className="text-sm text-blue-600 hover:underline"
                          onClick={() => {
                            setIsSignupOpen(false);
                            setIsLoginOpen(true);
                          }}
                        >
                          Already have an account? Sign in
                        </button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
