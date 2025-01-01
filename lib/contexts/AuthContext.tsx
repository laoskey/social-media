import { User } from "@supabase/supabase-js";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  user: null;
  setAuth: (authUser: any) => void;
  setUserData: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setAuth: () => {},
  setUserData: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

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
