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
  updateLoginState: () => void;
  updateLogoutState: () => void;
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
  const decodedToken: any = token ? jwtDecode(token) : null;
  const [IsNewUser, SetIsNewUser] = useState(true);
  const [IslogedIn, SetIslogedIn] = useState(false);
  const [role, SetRole] = useState<string | null>(null);
  //make function to update user login state
  const updateLoginState = () => {
    SetIsNewUser(false);
    SetIslogedIn(true);
    SetRole(`${decodedToken?.role}`);
  };

  //make function to update user logout state
  const updateLogoutState = () => {
    SetIsNewUser(true);
    SetIslogedIn(false);
    SetRole(null);
  };
  //check if token is expired
  const isTokenExpired = decodedToken?.exp
    ? decodedToken.exp < Date.now() / 1000
    : true;

  useEffect(() => {
    if (!isTokenExpired) {
      updateLoginState();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        IsNewUser,
        IslogedIn,
        role,
        updateLoginState,
        updateLogoutState,
      }}
    >
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
