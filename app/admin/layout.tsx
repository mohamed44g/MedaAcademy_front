"use client"
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import type React from "react"

import { Dashboard, People, School, Comment, ExitToApp, Menu as MenuIcon, Event } from "@mui/icons-material"
import { useState } from "react"
import { useTheme } from "@mui/material/styles"
import Link from "next/link"
import Image from "next/image"

const drawerWidth = 280

const menuItems = [
  { text: "لوحة التحكم", icon: Dashboard, href: "/admin/dashboard" },
  { text: "المستخدمين", icon: People, href: "/admin/users" },
  { text: "الكورسات", icon: School, href: "/admin/courses" },
  { text: "الورشات", icon: Event, href: "/admin/workshops" },
  { text: "التعليقات", icon: Comment, href: "/admin/comments" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ height: "100%", backgroundColor: theme.palette.background.paper }}>
      {/* Logo */}
      <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ width: 40, height: 40, position: "relative" }}>
            <Image src="/images/meda-logo.png" alt="MedA+ Academy" fill style={{ objectFit: "contain" }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              MedA+ Academy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              لوحة التحكم الإدارية
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ px: 2, py: 3 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            href={item.href}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&:hover": {
                backgroundColor: theme.palette.primary.main + "10",
              },
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ListItemIcon>
              <item.icon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Logout */}
      <Box sx={{ position: "absolute", bottom: 20, left: 16, right: 16 }}>
        <ListItem
          sx={{
            borderRadius: 2,
            backgroundColor: theme.palette.error.main + "10",
            "&:hover": {
              backgroundColor: theme.palette.error.main + "20",
            },
            cursor: "pointer",
          }}
        >
          <ListItemIcon>
            <ExitToApp sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <ListItemText
            primary="تسجيل الخروج"
            sx={{
              "& .MuiListItemText-primary": {
                color: theme.palette.error.main,
                fontWeight: 500,
              },
            }}
          />
        </ListItem>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", direction: "rtl" }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mr: { md: `${drawerWidth}px` },
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            لوحة التحكم الإدارية - MedA+ Academy
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              right: 0,
              left: "auto",
            },
          }}
          anchor="right"
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              right: 0,
              left: "auto",
            },
          }}
          anchor="right"
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
