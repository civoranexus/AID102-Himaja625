import {
  createContext,
  useContext,
  useState,
} from "react";
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
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("civorax-user");
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!user;

  const login = (user: User, token: string) => {
    localStorage.setItem("civorax-token", token);
    localStorage.setItem("civorax-user", JSON.stringify(user));
    setUser(user);
    navigate("/analyze");
  };

  const logout = () => {
    localStorage.removeItem("civorax-token");
    localStorage.removeItem("civorax-user");
    setUser(null);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
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