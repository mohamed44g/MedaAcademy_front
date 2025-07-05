"use client";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid2,
  Button,
} from "@mui/material";
import { CalendarToday, Schedule, ArrowForward } from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/lib/axiosClient";

interface Workshop {
  id: number;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  image_url: string;
}

interface MyWorkshopsProps {
  workshops: Workshop[];
}

export function MyWorkshops({ workshops }: MyWorkshopsProps) {
  const { isDarkMode } = useThemeContext();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  if (!workshops || workshops.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          لم تسجل في أي ورشة بعد
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: isDarkMode ? "#f9fafb" : "#1f2937",
          mb: 3,
          textAlign: "center",
        }}
      >
        ورشي ({workshops.length})
      </Typography>

      <Grid2 container spacing={3}>
        {workshops.map((workshop) => {
          const formattedDate = new Date(
            workshop.event_date
          ).toLocaleDateString("ar-EG", {
            timeZone: "UTC",
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          const isUpcoming = new Date(workshop.event_date) > new Date();

          return (
            <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={workshop.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  background: isDarkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.9)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 20px 40px #1784ad20`,
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={`${axiosInstance.defaults.baseURL}${workshop.image_url}`}
                      alt={workshop.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: isUpcoming
                          ? `linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)`
                          : `linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)`,
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "white", fontWeight: 600 }}
                      >
                        {isUpcoming ? "قادمة" : "منتهية"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: isDarkMode ? "#f9fafb" : "#1f2937",
                        mb: 2,
                      }}
                    >
                      {workshop.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {workshop.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <CalendarToday
                        sx={{
                          color: "primary.main",
                          fontSize: 18,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "primary.main",
                        }}
                      >
                        {formattedDate}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 3,
                      }}
                    >
                      <Schedule
                        sx={{
                          color: "primary.main",
                          fontSize: 18,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "primary.main",
                        }}
                      >
                        {workshop.event_time} ساعات
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForward />}
                      component={Link}
                      href={`/workshops/${workshop.id}`}
                      sx={{
                        borderRadius: 25,
                        py: 1.5,
                        background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                        boxShadow: `0 8px 20px #1784ad30`,
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: `0 12px 25px #1784ad40`,
                        },
                      }}
                    >
                      عرض تفاصيل الورشة
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
}
