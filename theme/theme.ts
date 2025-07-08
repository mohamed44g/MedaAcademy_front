"use client";
import { createTheme } from "@mui/material/styles";
import { Changa } from "next/font/google";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xss: true; // أضف الـ breakpoint الجديد
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

const changa = Changa({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1784ad",
      light: "#4fa8c5",
      dark: "#0f5a78",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f8f9fa",
      dark: "#e9ecef",
    },
    background: {
      default: "#ffffff",
      paper: "#f8f9fa",
    },
    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
    },
  },
  typography: {
    fontFamily: changa.style.fontFamily,
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
  },
  breakpoints: {
    values: {
      xss: 0, // breakpoint جديد للشاشات الصغيرة جدًا
      xs: 360, // القيم الافتراضية أو حسب احتياجك
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1784ad",
      light: "#4fa8c5",
      dark: "#0f5a78",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#374151",
      dark: "#1f2937",
    },
    background: {
      default: "#111827",
      paper: "#1f2937",
    },
    text: {
      primary: "#f9fafb",
      secondary: "#d1d5db",
    },
  },
  typography: {
    fontFamily: changa.style.fontFamily,
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
  },

  breakpoints: {
    values: {
      xss: 0, // breakpoint جديد للشاشات الصغيرة جدًا
      xs: 360, // القيم الافتراضية أو حسب احتياجك
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
