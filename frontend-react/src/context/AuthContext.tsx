import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Restore auth on refresh
  useEffect(() => {
    const saved = localStorage.getItem("civorax-auth");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem("civorax-auth", "true");
    setIsAuthenticated(true);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("civorax-auth");
    setIsAuthenticated(false);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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