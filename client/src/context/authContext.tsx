import { createContext, useState, type ReactNode } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface User {
  email: string;
  role?: string;
  password: string;
  id?: string;
}

export interface AuthContextType {
  isAuth: boolean;
  token?: string;
  user: User | null;
  login: (user: User) => Promise<void>;
  signup: (user: User) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  function validateUser({ email, password }: User) {
    if (!email || !email.trim()) {
      throw new Error("Email is required.");
    }
    if (!password || !password.trim()) {
      throw new Error("Password is required.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new Error("Invalid email format.");
    }
  }

  async function login({ email, password }: User) {
    validateUser({ email, password });

    const res = await axios.post(`http://localhost:3001/api/user/login`, {
      email: email.trim(),
      password: password.trim(),
    });
    const resData = res.data;
    console.log(resData);
    setUser(() => {
      setIsAuth(resData.success);
      if (resData.token) {
        console.log("Setting token:", resData.token);
        setToken(resData.token);
        localStorage.setItem("token", resData.token);
      }

      type DecodedToken = {
        role?: string;
        id?: string;
      };

      const decoded = jwtDecode<DecodedToken>(resData.token);
      if (!(decoded?.role && decoded?.id)) {
        throw new Error("Invalid token payload: missing role or id.");
      }

      console.log("Decoded token:", decoded);

      return {
        ...resData.user,
        role: decoded.role,
        id: decoded.id,
      };
    });
  }

  async function signup({ email, password }: User) {
    validateUser({ email, password });

    const res = await axios.post(`http://localhost:3001/api/user/register`, {
      email: email.trim(),
      password: password.trim(),
    });
    const resData = res.data;
    setUser(() => {
      setIsAuth(resData.success);
      if (resData.token) {
        setToken(resData.token);
        localStorage.setItem("token", resData.token);
      }
      return resData.user;
    });
  }

  function logout() {
    setUser(null);
    setIsAuth(false);
    setToken(undefined);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{ login, signup, token, isAuth, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
