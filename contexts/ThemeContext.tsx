// app/context/ThemeContext.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import ClientOnly from "../theme/ClientOnly";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({
  children,
  lightTheme,
  darkTheme,
}: {
  children: React.ReactNode;
  lightTheme: any;
  darkTheme: any;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <ClientOnly>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </ClientOnly>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
}
