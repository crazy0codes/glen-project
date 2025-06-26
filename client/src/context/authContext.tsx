import { createContext, useState, type ReactNode } from "react";
import axios from "axios";

interface User {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => Promise<void>;
  signup: (user: User) => Promise<void>;
}

// const defaultContext = {
//   user : {
//     email: "example@gmail.com",
//     password: "example"
//   },

//   login : async () => Promise.resolve(),

//   signup : async () => Promise.resolve(),

// }

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login({ email, password }: User) {
    email = email.trim();
    password = password.trim();
    const res = await axios.post(`http://localhost:3001/api/user/login`, {
      email,
      password,
    });
    const resData = res.data;
    console.log(resData);
    setUser(resData.user);
  }

  async function signup({ email, password }: User) {
    const res = await axios.post(`http://localhost:3001/api/user/create`, {
      email,
      password,
    });
    const resData = res.data;
    console.log(resData);
    setUser(resData.user);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
