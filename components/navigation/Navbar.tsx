"use client";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import Link from "next/link";
import { useThemeContext } from "@/contexts/ThemeContext";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "عنا", href: "#about" },
  { label: "مميزاتنا", href: "#features" },
  { label: "كورسات", href: "#courses" },
  { label: "الورشات", href: "#workshops" },
  { label: "فريقنا", href: "#team" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const muiTheme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const path = usePathname();
  const isMainPage = path === "/";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            onClick={handleDrawerToggle}
            component={Link}
            href={item.href}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            سجل الآن
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        className="navbar"
        sx={{
          backgroundColor:
            scrolled || !isMainPage
              ? isDarkMode
                ? "rgba(31, 41, 55, 0.95)"
                : "rgba(23, 132, 173, 0.95)"
              : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? 3 : 0,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            component={Link}
            href="/"
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: "white",
                fontSize: "1.5rem",
                textDecoration: "none",
              }}
            >
              MedA+ Academy
            </Typography>
          </Box>

          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  component={Link}
                  href={item.href}
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <IconButton onClick={toggleTheme} sx={{ color: "white" }}>
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>

              <Button
                variant="contained"
                component={Link}
                href="/auth/login"
                sx={{
                  backgroundColor: "white",
                  color: muiTheme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              >
                سجل الآن
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton onClick={toggleTheme} sx={{ color: "white" }}>
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
