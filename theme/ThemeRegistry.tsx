// theme/ThemeRegistry.tsx
"use client";
import * as React from "react";
import { responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { lightTheme, darkTheme } from "./theme";
import { UserContextProvider } from "@/contexts/UserContext";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const light_theme = responsiveFontSizes(lightTheme);
  const dark_theme = responsiveFontSizes(darkTheme);

  return (
    <ThemeContextProvider lightTheme={light_theme} darkTheme={dark_theme}>
      <CssBaseline enableColorScheme />
      <UserContextProvider>
        <div style={{ fontFamily: "var(--font-changa), sans-serif" }}>
          {children}
        </div>
      </UserContextProvider>
    </ThemeContextProvider>
  );
}
