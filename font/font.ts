"use client";
import { Changa } from "next/font/google";

const changa = Changa({
  weight: ["300", "400", "500", "700"], // Specify desired weights
  subsets: ["latin", "arabic"], // Include relevant subsets
  display: "swap", // Optimize font loading to prevent layout shift
  variable: "--font-changa", // Optional: CSS variable for the font
});

export default changa;
