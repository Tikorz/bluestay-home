import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  membershipLevel: "standard" | "premium";
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem("bluestay_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({ user, isLoading: false });
      } catch (error) {
        localStorage.removeItem("bluestay_user");
        setAuthState({ user: null, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user creation
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      membershipLevel: "standard",
    };

    localStorage.setItem("bluestay_user", JSON.stringify(user));
    setAuthState({ user, isLoading: false });
    return { success: true };
  };

  const signup = async (email: string, password: string, name?: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user creation
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: name || email.split("@")[0],
      membershipLevel: "standard",
    };

    localStorage.setItem("bluestay_user", JSON.stringify(user));
    setAuthState({ user, isLoading: false });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("bluestay_user");
    setAuthState({ user: null, isLoading: false });
  };

  const upgradeMembership = () => {
    if (authState.user) {
      const updatedUser = {
        ...authState.user,
        membershipLevel: "premium" as const,
      };
      localStorage.setItem("bluestay_user", JSON.stringify(updatedUser));
      setAuthState({ user: updatedUser, isLoading: false });
    }
  };

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    isLoggedIn: !!authState.user,
    login,
    signup,
    logout,
    upgradeMembership,
  };
}
