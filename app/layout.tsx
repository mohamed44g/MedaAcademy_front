// app/layout.tsx
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import ThemeRegistry from "../theme/ThemeRegistry";
import QueryClientWrapper from "../components/QueryClientWrapper";
import { Changa } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import { headers } from "next/headers";

const changa = Changa({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-changa",
});

export const metadata: Metadata = {
  title: "MedA+ Academy - Medical Education Excellence",
  description:
    "Advanced medical courses and training programs for healthcare professionals",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const currentPath = headersList.get("x-current-path");

  return (
    <html lang="ar" className={changa.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <QueryClientWrapper>
          <ThemeRegistry>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
              }}
            />
            <Navbar />
            {children}
          </ThemeRegistry>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
