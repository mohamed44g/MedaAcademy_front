"use client";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Person,
  Lock,
  School,
  WorkSharp,
  AccountBalanceWallet,
  DeleteForever,
  Comment,
  Home,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeContext } from "@/contexts/ThemeContext";

interface ProfileSidebarProps {
  activeSection: string;
}

export function ProfileSidebar({ activeSection }: { activeSection: any }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isDarkMode } = useThemeContext();
  const pathname = usePathname();

  const menuItems = [
    {
      id: "info",
      label: "البيانات الشخصية",
      icon: <Person />,
      color: "#1784ad",
      href: "/profile",
    },

    {
      id: "home",
      label: "الصفحة الرئيسية",
      icon: <Home />,
      color: "#1784ad",
      href: "/",
    },
    {
      id: "password",
      label: "تغيير كلمة المرور",
      icon: <Lock />,
      color: "#ff6b6b",
      href: "/profile/password",
    },
    {
      id: "courses",
      label: "كورساتي",
      icon: <School />,
      color: "#4caf50",
      href: "/profile/courses",
    },
    {
      id: "workshops",
      label: "ورشي",
      icon: <WorkSharp />,
      color: "#ff9800",
      href: "/profile/workshops",
    },
    {
      id: "comments",
      label: "تعليقاتي",
      icon: <Comment />,
      color: "#9c27b0",
      href: "/profile/comments",
    },
    {
      id: "wallet",
      label: "المحفظة",
      icon: <AccountBalanceWallet />,
      color: "#2196f3",
      href: "/profile/wallet",
    },
    {
      id: "delete",
      label: "حذف الحساب",
      icon: <DeleteForever />,
      color: "#f44336",
      href: "/profile/delete",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/profile") {
      return pathname === "/profile" || pathname === "/profile/";
    }
    return pathname === href;
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        background: isDarkMode ? "#1f2937" : "#f8fafc",
        backdropFilter: "blur(10px)",
        height: "100vh",
      }}
    >
      {/* Navigation Menu */}
      <CardContent sx={{ p: 0 }}>
        <List sx={{ p: 2 }}>
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <ListItem
                key={item.id}
                component={Link}
                href={item.href}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  textDecoration: "none",
                  color: "inherit",
                  backgroundColor: active ? `${item.color}15` : "transparent",
                  border: active
                    ? `2px solid ${item.color}30`
                    : "2px solid transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: `${item.color}10`,
                    transform: "translateX(-4px)",
                    textDecoration: "none",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active ? item.color : "text.secondary",
                    minWidth: 45,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: active ? 700 : 500,
                      color: active ? item.color : "text.primary",
                      fontSize: "0.95rem",
                    },
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
