"use client";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu, ArrowBack, DarkMode, LightMode } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useThemeContext } from "@/contexts/ThemeContext";

interface VideoMobileHeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function VideoMobileHeader({
  title,
  onMenuClick,
}: VideoMobileHeaderProps) {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        mb: isMobile ? 1 : 0,
        backgroundColor: isDarkMode
          ? "rgba(31, 41, 55, 0.95)"
          : "rgba(23, 132, 173, 0.95)",
        color: "white",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        flexDirection: !isMobile ? "row-reverse" : "row",
      }}
    >
      <IconButton onClick={() => router.back()} sx={{ color: "white" }}>
        <ArrowBack />
      </IconButton>

      <IconButton onClick={toggleTheme} sx={{ color: "white" }}>
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </IconButton>

      {isMobile && (
        <IconButton onClick={onMenuClick} sx={{ color: "white" }}>
          <Menu />
        </IconButton>
      )}
    </Box>
  );
}
