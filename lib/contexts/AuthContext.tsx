import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  user: User | undefined | any;
  setAuth: (authUser: any) => void;
  setUserData: (userData: any) => void;
}

interface User {
  address?: string | null;
  bio?: string | null;
  created_at: string;
  email?: string | null;
  id: string;
  image?: string | null;
  name: string;
  phone_number?: string | null;
}
const AuthContext = createContext<AuthContextType>({
  user: {
    address: "",
    bio: "",
    created_at: "",
    email: "",
    id: "",
    image: "",
    name: "",
    phone_number: "",
  },
  setAuth: () => {},
  setUserData: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState();

  const setAuth = (authUser: any) => {
    setUser(authUser);
  };

  const setUserData = (userData: any) => {
    setUser({ ...userData });
  };

  return <AuthContext.Provider value={{ user, setAuth, setUserData }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used out of the AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
