import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  loggingOut: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("civorax-user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loggingOut, setLoggingOut] = useState(false);

  const isAuthenticated = !!user;

  const login = (user: User, token: string) => {
    localStorage.setItem("civorax-token", token);
    localStorage.setItem("civorax-user", JSON.stringify(user));
    setUser(user);
    navigate("/analyze");
  };

  const logout = async () => {
    setLoggingOut(true);

    // Small UX delay for animation
    await new Promise((res) => setTimeout(res, 300));

    localStorage.removeItem("civorax-token");
    localStorage.removeItem("civorax-user");
    setUser(null);
    setLoggingOut(false);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}