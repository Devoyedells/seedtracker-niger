import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/services/api";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  actorType?: string;
  registrationState?: string;
  address?: string;
  lat?: string;
  lng?: string;
  // Extended profile fields
  phone?: string;
  website?: string;
  bio?: string;
  profilePhoto?: string;
  organization?: string;
  licenseNumber?: string;
  yearsOfExperience?: number;
  seedVarieties?: string[];
  certifications?: string[];
  productsHandled?: string[];
  suppliers?: string[];
  areasOfCoverage?: string[];
  storageCapacityMT?: number;
  processingCapacityMT?: number;
  farmSizeHectares?: number;
  farmerGroupSize?: number;
  cropsGrown?: string[];
  createdAt?: string;
}

interface AuthResponse {
  access_token: string;
  user: User;
}

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  actorType?: string;
  registrationState?: string;
  address?: string;
  lat?: string;
  lng?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await api.get("/users/me");
    setUser(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/users/me")
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload: LoginPayload) => {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    localStorage.setItem("token", data.access_token);
    setUser(data.user);
  };

  const register = async (payload: RegisterPayload) => {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    localStorage.setItem("token", data.access_token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    const res = await api.patch("/users/me", data);
    setUser(res.data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
