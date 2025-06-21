import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  membershipLevel: "standard" | "premium";
  role: "standard" | "admin";
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const demoUsers: {
  email: string;
  password: string;
  role: User["role"];
  membershipLevel: User["membershipLevel"];
}[] = [
  {
    email: "admin@demo.com",
    password: "admin123",
    role: "admin",
    membershipLevel: "premium",
  },
  {
    email: "user@demo.com",
    password: "user123",
    role: "standard",
    membershipLevel: "standard",
  },
  {
    email: "premium@demo.com",
    password: "premium123",
    role: "standard",
    membershipLevel: "premium",
  },
];

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
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
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simuliertes Delay

    const match = demoUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (match) {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: match.email,
        name: match.email.split("@")[0],
        role: match.role,
        membershipLevel: match.membershipLevel,
      };
      localStorage.setItem("bluestay_user", JSON.stringify(user));
      setAuthState({ user, isLoading: false });
      return { success: true };
    }

    return { success: false };
  };

  const signup = async (email: string, password: string, name?: string) => {
    // Registrierung deaktiviert, da nur Demo-User erlaubt
    return { success: false, message: "Registrierung deaktiviert" };
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
