// make user context to get the auth_tocken from cookies and decode it.
import { createContext, useContext, useEffect, useState } from "react";
import jsCookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface ThemeContextType {
  IsNewUser: boolean;
  IslogedIn: boolean;
  role: string | null;
}

interface UserContextType {
  IsNewUser: boolean;
  IslogedIn: boolean;
  role: string | null;
}

interface Ipayload {
  id: number;
  email: string;
  role: string;
  exp: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = jsCookie.get("auth_token") || "";
  const decodedToken: any = token && jwtDecode(token);
  const [IsNewUser, SetIsNewUser] = useState(true);
  const [IslogedIn, SetIslogedIn] = useState(false);
  const [role, SetRole] = useState<string | null>(null);
  console.log("renderd");
  //check if token is expired
  const isTokenExpired = decodedToken.exp
    ? decodedToken.exp < Date.now() / 1000
    : true;

  useEffect(() => {
    if (!isTokenExpired) {
      SetIsNewUser(false);
      SetIslogedIn(true);
      SetRole(`${decodedToken.role}`);
    }
  }, []);

  return (
    <UserContext.Provider value={{ IsNewUser, IslogedIn, role }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
