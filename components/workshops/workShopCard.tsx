"use client";
import {
  CalendarToday,
  Schedule,
  AttachMoney,
  ArrowForward,
  Sell,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useThemeContext } from "@/contexts/ThemeContext";
import axiosInstance from "@/lib/axiosClient";

interface IWorkShopProps {
  workshop: any;
  onEnroll: () => void;
}

export default function WorkShopCard({ workshop, onEnroll }: IWorkShopProps) {
  const { isDarkMode } = useThemeContext();
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: `0 20px 40px #1784ad20`,
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Stack direction="column">
          <Box
            sx={{
              position: "relative",
              height: { xss: 200, md: 280 },
              overflow: "hidden",
              borderRadius: "16px 16px 0 0",
            }}
          >
            <Image
              src={`${axiosInstance.defaults.baseURL}${workshop.image}`}
              alt={workshop.title}
              fill
              style={{ objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                borderRadius: 2,
                px: 2,
                py: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "white", fontWeight: 600 }}
              >
                {workshop.description}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: { xss: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: isDarkMode ? "#f9fafb" : "#1f2937",
              }}
            >
              {workshop.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarToday
                sx={{
                  color: "primary.main",
                  fontSize: 20,
                }}
              />
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  التاريخ:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                >
                  {workshop.formattedDate}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Schedule
                sx={{
                  color: "primary.main",
                  fontSize: 20,
                }}
              />
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  المدة:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                >
                  {workshop.duration}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Sell
                sx={{
                  color: "primary.main",
                  fontSize: 20,
                }}
              />
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  السعر:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                >
                  {workshop.price} ₪
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                endIcon={<ArrowForward sx={{ mr: 1 }} />}
                onClick={() => onEnroll()}
                sx={{
                  borderRadius: 25,
                  px: 4,
                  py: 1.5,
                  background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                  boxShadow: `0 8px 20px #1784ad30`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 12px 25px #1784ad40`,
                  },
                }}
              >
                التسجيل في الورشة
              </Button>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
