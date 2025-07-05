// profileHeader.tsx
"use client";
import { useThemeContext } from "@/contexts/ThemeContext";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DarkMode, LightMode, Menu } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function ProfileHeader() {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = 230;
  const [toggleDrawer, setToggleDrawer] = useState<() => void>(() => {});

  useEffect(() => {
    const handleDrawerToggle = (event: CustomEvent) => {
      setToggleDrawer(() => event.detail);
    };
    window.addEventListener(
      "drawerToggle",
      handleDrawerToggle as EventListener
    );
    return () => {
      window.removeEventListener(
        "drawerToggle",
        handleDrawerToggle as EventListener
      );
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: isDarkMode
          ? "rgba(31, 41, 55, 0.95)"
          : "rgba(23, 132, 173, 0.95)",
        width: isMobile ? "100%" : `calc(100vw - ${drawerWidth}px)`,
        mr: isMobile ? 0 : `${drawerWidth}px`,
        mt: 0,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isMobile && (
            <IconButton
              onClick={toggleDrawer}
              sx={{ color: "white" }}
              edge="start"
            >
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
            Profile
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={toggleTheme} sx={{ color: "white" }}>
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
